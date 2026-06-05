import { createAuditor } from "@seomator/seo-audit";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

const CATEGORIES = [
  "core",
  "perf",
  "security",
  "links",
  "images",
  "content",
  "technical",
  "schema",
] as const;

function normalizeUrl(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const candidate = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const u = new URL(candidate);
    if (!u.hostname) return null;
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    const isLoopback =
      u.hostname === "localhost" ||
      u.hostname === "127.0.0.1" ||
      u.hostname === "::1" ||
      u.hostname.endsWith(".localhost");
    if (!isLoopback && !u.hostname.includes(".")) return null;
    return u.toString();
  } catch {
    return null;
  }
}

function gradeFromScore(score: number): { letter: string; tone: "good" | "ok" | "warn" | "bad" } {
  if (score >= 90) return { letter: "A", tone: "good" };
  if (score >= 80) return { letter: "B", tone: "ok" };
  if (score >= 70) return { letter: "C", tone: "warn" };
  if (score >= 50) return { letter: "D", tone: "warn" };
  return { letter: "F", tone: "bad" };
}

function describeError(err: unknown): { message: string; code: string } {
  const e = err as { code?: string; message?: string; cause?: { code?: string; message?: string } };
  const code = e?.code ?? e?.cause?.code ?? "";
  const raw = e?.message ?? "";
  const causeMsg = e?.cause?.message ?? "";
  const haystack = `${raw} ${causeMsg}`;

  if (code === "ENOTFOUND" || /getaddrinfo/i.test(haystack) || /ENOTFOUND/i.test(haystack)) {
    return { code, message: "We couldn’t find that domain. Check the URL and try again." };
  }
  if (code === "EAI_AGAIN" || /eai_again/i.test(haystack)) {
    return { code, message: "DNS lookup failed. Check the URL and your network." };
  }
  if (code === "ECONNREFUSED") {
    return { code, message: "The site refused the connection. It may be down or blocking automated requests." };
  }
  if (code === "ECONNRESET" || code === "ETIMEDOUT" || /timeout/i.test(haystack)) {
    return { code, message: "The site took too long to respond. Try again, or pick a lighter page to audit." };
  }
  if (code === "CERT_HAS_EXPIRED" || code === "DEPTH_ZERO_SELF_SIGNED_CERT" || code === "UNABLE_TO_VERIFY_LEAF_SIGNATURE") {
    return { code, message: "The site has an SSL certificate issue. We can’t safely audit it right now." };
  }
  if (/403|forbidden/i.test(haystack)) {
    return { code, message: "The site blocked our audit request (403 Forbidden)." };
  }
  if (/404|not found/i.test(haystack)) {
    return { code, message: "The page returned a 404. Try the homepage or another public URL." };
  }
  if (/5\d\d|server error/i.test(haystack)) {
    return { code, message: "The site returned a server error. Try again in a moment." };
  }
  if (/fetch failed/i.test(haystack)) {
    return { code, message: "We couldn’t reach that site. Check the URL or try again later." };
  }
  return { code, message: raw || causeMsg || "Something went wrong while running the audit." };
}

function topIssues(
  categories: Array<{ categoryId: string; results: Array<{ ruleId: string; status: "pass" | "warn" | "fail"; message: string }> }>,
  limit = 3,
) {
  const flat = categories.flatMap((cat) =>
    cat.results
      .filter((r) => r.status !== "pass")
      .map((r) => ({
        category: cat.categoryId,
        ruleId: r.ruleId,
        message: r.message,
        severity: r.status as "warn" | "fail",
      })),
  );
  flat.sort((a, b) => (a.severity === b.severity ? 0 : a.severity === "fail" ? -1 : 1));
  return flat.slice(0, limit);
}

type StreamEvent =
  | { type: "start"; url: string; categories: Array<{ id: string; name: string }> }
  | { type: "category-start"; categoryId: string; categoryName: string }
  | {
      type: "category-complete";
      categoryId: string;
      categoryName: string;
      score: number;
      pass: number;
      warn: number;
      fail: number;
    }
  | {
      type: "complete";
      result: {
        url: string;
        overallScore: number;
        grade: { letter: string; tone: "good" | "ok" | "warn" | "bad" };
        crawledPages: number;
        timestamp: string;
        categories: Array<{ id: string; score: number; pass: number; warn: number; fail: number }>;
        topIssues: Array<{ category: string; ruleId: string; message: string; severity: "warn" | "fail" }>;
      };
    }
  | { type: "error"; message: string; code: string };

function ndjsonEvent(event: StreamEvent): string {
  return `${JSON.stringify(event)}\n`;
}

function buildErrorResponse(message: string, code = "INVALID_URL", status = 400) {
  return new Response(JSON.stringify({ error: message, code }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  let body: { url?: string };
  try {
    body = (await request.json()) as { url?: string };
  } catch {
    return buildErrorResponse("Invalid JSON body", "INVALID_JSON", 400);
  }

  const normalized = normalizeUrl(body?.url ?? "");
  if (!normalized) {
    return buildErrorResponse(
      "Please provide a valid URL (e.g. example.com or https://example.com)",
      "INVALID_URL",
      400,
    );
  }

  const encoder = new TextEncoder();
  let cancelled = false;

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const emit = (event: StreamEvent) => {
        if (cancelled) return;
        try {
          controller.enqueue(encoder.encode(ndjsonEvent(event)));
        } catch {
          cancelled = true;
        }
      };

      try {
        const auditor = createAuditor({
          categories: [...CATEGORIES],
          measureCwv: false,
          timeout: 30_000,
          onCategoryStart: (categoryId, categoryName) => {
            emit({ type: "category-start", categoryId, categoryName });
          },
          onCategoryComplete: (categoryId, categoryName, result) => {
            emit({
              type: "category-complete",
              categoryId,
              categoryName,
              score: result.score,
              pass: result.passCount,
              warn: result.warnCount,
              fail: result.failCount,
            });
          },
        });

        const categoryMeta = auditor.getCategoriesToAudit().map((c) => ({
          id: c.id,
          name: c.name,
        }));

        emit({ type: "start", url: normalized, categories: categoryMeta });

        const raw = await auditor.audit(normalized);
        if (cancelled) return;

        const grade = gradeFromScore(raw.overallScore);

        emit({
          type: "complete",
          result: {
            url: raw.url,
            overallScore: raw.overallScore,
            grade,
            crawledPages: raw.crawledPages,
            timestamp: raw.timestamp,
            categories: raw.categoryResults.map((c) => ({
              id: c.categoryId,
              score: c.score,
              pass: c.passCount,
              warn: c.warnCount,
              fail: c.failCount,
            })),
            topIssues: topIssues(raw.categoryResults, 3),
          },
        });
      } catch (err) {
        const { code, message } = describeError(err);
        console.error(`[seo-audit] ${normalized} failed (${code}):`, err);
        emit({ type: "error", message, code });
      } finally {
        try {
          controller.close();
        } catch {
          // already closed
        }
      }
    },
    cancel() {
      cancelled = true;
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}

export async function GET() {
  return new Response(
    JSON.stringify({
      status: "ok",
      description: "POST { url: 'example.com' } to run a SEOmator audit.",
      categories: CATEGORIES,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
}
