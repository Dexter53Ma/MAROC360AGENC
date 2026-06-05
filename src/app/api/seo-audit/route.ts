import { NextResponse } from "next/server";
import { createAuditor } from "@seomator/seo-audit";

export const runtime = "nodejs";
export const maxDuration = 60;

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

export async function POST(request: Request) {
  let body: { url?: string };
  try {
    body = (await request.json()) as { url?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const normalized = normalizeUrl(body?.url ?? "");
  if (!normalized) {
    return NextResponse.json(
      { error: "Please provide a valid URL (e.g. example.com or https://example.com)" },
      { status: 400 },
    );
  }

  let raw: Awaited<ReturnType<ReturnType<typeof createAuditor>["audit"]>>;
  try {
    const auditor = createAuditor({
      categories: [...CATEGORIES],
      measureCwv: false,
      timeout: 45_000,
    });
    raw = await auditor.audit(normalized);
  } catch (err) {
    const { code, message } = describeError(err);
    console.error(`[seo-audit] ${normalized} failed (${code}):`, err);
    return NextResponse.json(
      {
        error: "Couldn’t complete the audit",
        details: message,
        code,
      },
      { status: 502 },
    );
  }

  const grade = gradeFromScore(raw.overallScore);

  return NextResponse.json({
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
  });
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    description: "POST { url: 'example.com' } to run a SEOmator audit.",
    categories: CATEGORIES,
  });
}
