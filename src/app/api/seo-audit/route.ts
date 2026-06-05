import { runAudit, AuditError, type CategoryResult } from "@/lib/seo-audit";

export const runtime = "nodejs";
export const maxDuration = 26;
export const dynamic = "force-dynamic";

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

function topIssues(
  categories: readonly CategoryResult[],
  limit = 3,
): Array<{ category: string; ruleId: string; message: string; severity: "warn" | "fail" }> {
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
  flat.sort((a, b) =>
    a.severity === b.severity ? 0 : a.severity === "fail" ? -1 : 1,
  );
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

const CATEGORY_SUMMARIES = [
  { id: "core", name: "Core SEO" },
  { id: "perf", name: "Performance" },
  { id: "security", name: "Security" },
  { id: "links", name: "Links" },
  { id: "images", name: "Images" },
  { id: "content", name: "Content" },
  { id: "schema", name: "Structured Data" },
  { id: "technical", name: "Technical" },
];

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
        emit({ type: "start", url: normalized, categories: CATEGORY_SUMMARIES });

        const raw = await runAudit(normalized, {
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
        if (err instanceof AuditError) {
          console.error(`[seo-audit] ${normalized} failed (${err.code}):`, err.message);
          emit({ type: "error", message: err.message, code: err.code });
        } else {
          console.error(`[seo-audit] ${normalized} crashed:`, err);
          const message =
            err instanceof Error ? err.message : "Something went wrong while running the audit.";
          emit({ type: "error", message, code: "INTERNAL" });
        }
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
      description: "POST { url: 'example.com' } to run an SEO audit.",
      categories: CATEGORY_SUMMARIES,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
}
