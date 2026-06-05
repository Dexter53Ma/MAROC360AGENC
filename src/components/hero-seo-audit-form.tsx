"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, Loader2, SearchIcon, Check, X } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { HomeSeoAuditFormDict } from "@/lib/i18n/dict.types";

type GradeTone = "good" | "ok" | "warn" | "bad";

interface CategorySummary {
  id: string;
  score: number;
  pass: number;
  warn: number;
  fail: number;
}

interface TopIssue {
  category: string;
  ruleId: string;
  message: string;
  severity: "warn" | "fail";
}

interface AuditResult {
  url: string;
  overallScore: number;
  grade: { letter: string; tone: GradeTone };
  crawledPages: number;
  timestamp: string;
  categories: CategorySummary[];
  topIssues: TopIssue[];
}

type CategoryStatus = "pending" | "running" | "done";

interface CategoryProgress {
  id: string;
  status: CategoryStatus;
  score?: number;
}

type Status = "idle" | "loading" | "ok" | "error";

const GRADE_STYLES: Record<GradeTone, { bg: string; text: string; ring: string; chip: string }> = {
  good: {
    bg: "bg-brand-green",
    text: "text-text-primary",
    ring: "ring-brand-green/40",
    chip: "bg-brand-green/20 text-text-primary",
  },
  ok: {
    bg: "bg-brand-yellow",
    text: "text-text-primary",
    ring: "ring-brand-yellow/40",
    chip: "bg-brand-yellow/30 text-text-primary",
  },
  warn: {
    bg: "bg-brand-pink",
    text: "text-text-primary",
    ring: "ring-brand-pink/40",
    chip: "bg-brand-pink/20 text-text-primary",
  },
  bad: {
    bg: "bg-text-primary",
    text: "text-surface-primary",
    ring: "ring-text-primary/40",
    chip: "bg-text-primary/10 text-text-primary",
  },
};

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
  | { type: "complete"; result: AuditResult }
  | { type: "error"; message: string; code: string };

function gradeLabel(tone: GradeTone, dict: HomeSeoAuditFormDict): string {
  switch (tone) {
    case "good":
      return dict.gradeGood;
    case "ok":
      return dict.gradeOk;
    case "warn":
      return dict.gradeWarn;
    case "bad":
      return dict.gradeBad;
  }
}

function categoryLabel(id: string, fallback: string | undefined, dict: HomeSeoAuditFormDict): string {
  return dict.categoryLabels[id] ?? fallback ?? id;
}

async function consumeAuditStream(
  res: Response,
  onEvent: (event: StreamEvent) => void,
  signal: AbortSignal,
): Promise<void> {
  if (!res.body) {
    throw new Error("The audit service did not return a stream.");
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      if (signal.aborted) {
        try {
          await reader.cancel();
        } catch {
          // ignore
        }
        return;
      }
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      let nlIndex = buffer.indexOf("\n");
      while (nlIndex >= 0) {
        const line = buffer.slice(0, nlIndex).trim();
        buffer = buffer.slice(nlIndex + 1);
        if (line) {
          try {
            const event = JSON.parse(line) as StreamEvent;
            onEvent(event);
          } catch {
            // skip malformed line
          }
        }
        nlIndex = buffer.indexOf("\n");
      }
    }

    const tail = buffer.trim();
    if (tail) {
      try {
        const event = JSON.parse(tail) as StreamEvent;
        onEvent(event);
      } catch {
        // ignore
      }
    }
  } finally {
    try {
      reader.releaseLock();
    } catch {
      // ignore
    }
  }
}

function CategoryProgressList({
  items,
  doneCount,
  dict,
}: {
  items: CategoryProgress[];
  doneCount: number;
  dict: HomeSeoAuditFormDict;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="mt-4 max-w-xl w-full rounded-2xl border border-text-primary/10 bg-surface-tertiary p-4 sm:p-5"
    >
      <p className="text-[10px] font-semibold uppercase tracking-wider text-text-tertiary">
        {dict.progressTemplate
          .replace("{done}", String(doneCount))
          .replace("{total}", String(items.length))}
      </p>
      <ul className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
        {items.map((item) => {
          const label = categoryLabel(item.id, undefined, dict);
          const isDone = item.status === "done";
          const isRunning = item.status === "running";
          return (
            <li
              key={item.id}
              className="flex items-center gap-2 rounded-lg bg-surface-primary/60 px-3 py-2 text-xs text-text-primary"
            >
              <span
                className={cn(
                  "inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-bold",
                  isDone && "bg-brand-green text-text-primary",
                  isRunning && "bg-brand-yellow text-text-primary",
                  !isDone && !isRunning && "bg-text-primary/10 text-text-tertiary",
                )}
                aria-hidden
              >
                {isDone ? "✓" : isRunning ? "•" : ""}
              </span>
              <span className="min-w-0 flex-1 truncate font-medium">{label}</span>
              <span className="shrink-0 text-[10px] tabular-nums text-text-tertiary">
                {isDone
                  ? item.score
                  : isRunning
                    ? dict.categoryRunningLabel
                    : dict.categoryPendingLabel}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function AuditResultPanel({
  result,
  onReset,
  dict,
}: {
  result: AuditResult;
  onReset: () => void;
  dict: HomeSeoAuditFormDict;
}) {
  const styles = GRADE_STYLES[result.grade.tone];
  const hostname = (() => {
    try {
      return new URL(result.url).hostname.replace(/^www\./, "");
    } catch {
      return result.url;
    }
  })();

  const auditedText = dict.auditedPagesTemplate
    .replace("{n}", String(result.crawledPages))
    .replace("{date}", new Date(result.timestamp).toLocaleString());

  return (
    <div
      role="status"
      aria-live="polite"
      className="mt-4 max-w-xl w-full rounded-2xl border border-text-primary/10 bg-surface-tertiary p-4 sm:p-5"
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ring-4",
            styles.bg,
            styles.ring,
          )}
        >
          <div className="flex flex-col items-center leading-none">
            <span className={cn("text-2xl font-bold", styles.text)}>{result.grade.letter}</span>
            <span className={cn("text-[10px] font-semibold uppercase tracking-wide", styles.text)}>
              {result.overallScore}
            </span>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-semibold text-text-primary">{hostname}</p>
            <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide", styles.chip)}>
              {gradeLabel(result.grade.tone, dict)}
            </span>
          </div>
          <p className="mt-0.5 text-xs text-text-secondary">{auditedText}</p>
        </div>

        <button
          type="button"
          onClick={onReset}
          aria-label={dict.auditAnotherSiteLabel}
          className="press inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-text-secondary hover:bg-surface-primary hover:text-text-primary transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {result.topIssues.length > 0 ? (
        <div className="mt-4 space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-text-tertiary">
            {dict.topIssuesHeading}
          </p>
          <ul className="space-y-1.5">
            {result.topIssues.map((issue, i) => (
              <li
                key={`${issue.ruleId}-${i}`}
                className="flex items-start gap-2 rounded-lg bg-surface-primary/60 px-3 py-2 text-xs text-text-primary"
              >
                <span
                  className={cn(
                    "mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-bold",
                    issue.severity === "fail"
                      ? "bg-brand-pink text-text-primary"
                      : "bg-brand-yellow text-text-primary",
                  )}
                  aria-label={issue.severity === "fail" ? dict.severityFailLabel : dict.severityWarnLabel}
                >
                  {issue.severity === "fail" ? "!" : "i"}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="font-medium">{issue.message}</span>
                  <span className="ml-1 text-text-tertiary">
                    · {categoryLabel(issue.category, undefined, dict)}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-3 text-xs text-text-secondary">{dict.noIssues}</p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-text-primary/5 pt-3 text-[10px] text-text-tertiary">
        <span>{dict.footerCategories}</span>
        <span aria-hidden>·</span>
        <span>{dict.footerPoweredBy}</span>
      </div>
    </div>
  );
}

export function HeroSeoAuditForm({ dict }: { dict: HomeSeoAuditFormDict }) {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [progress, setProgress] = useState<CategoryProgress[]>([]);
  const [doneCount, setDoneCount] = useState(0);
  const abortRef = useRef<AbortController | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!url.trim() || status === "loading") return;

    setStatus("loading");
    setError(null);
    setResult(null);
    setProgress([]);
    setDoneCount(0);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/seo-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
        signal: controller.signal,
      });

      if (!res.ok && res.headers.get("Content-Type")?.includes("application/json")) {
        const data = (await res.json()) as { error?: string; details?: string };
        throw new Error(data.details ?? data.error ?? dict.errorFallback);
      }

      if (!res.ok) {
        throw new Error(dict.errorFallback);
      }

      await consumeAuditStream(res, (event) => {
        if (event.type === "start") {
          setProgress(
            event.categories.map((c) => ({ id: c.id, status: "pending" })),
          );
        } else if (event.type === "category-start") {
          setProgress((prev) =>
            prev.map((p) => (p.id === event.categoryId ? { ...p, status: "running" } : p)),
          );
        } else if (event.type === "category-complete") {
          setProgress((prev) =>
            prev.map((p) =>
              p.id === event.categoryId ? { ...p, status: "done", score: event.score } : p,
            ),
          );
          setDoneCount((c) => c + 1);
        } else if (event.type === "complete") {
          setResult(event.result);
          setStatus("ok");
        } else if (event.type === "error") {
          setError(event.message);
          setStatus("error");
        }
      }, controller.signal);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        return;
      }
      setError(err instanceof Error ? err.message : dict.errorFallback);
      setStatus("error");
    } finally {
      abortRef.current = null;
    }
  };

  const reset = () => {
    abortRef.current?.abort();
    abortRef.current = null;
    setStatus("idle");
    setError(null);
    setResult(null);
    setProgress([]);
    setDoneCount(0);
    setUrl("");
  };

  const inputDisabled = status === "loading";

  return (
    <div className="w-full max-w-xl">
      <form
        onSubmit={handleSubmit}
        className="group/form flex w-full flex-col items-stretch gap-2 sm:flex-row sm:items-center"
        noValidate
      >
        <label htmlFor="hero-seo-audit-url" className="sr-only">
          {dict.inputLabel}
        </label>
        <div className="relative min-w-0 flex-1">
          <SearchIcon
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary"
            aria-hidden
          />
          <input
            id="hero-seo-audit-url"
            type="url"
            inputMode="url"
            autoComplete="url"
            required
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (status === "error") {
                setStatus("idle");
                setError(null);
              }
            }}
            placeholder={dict.placeholder}
            disabled={inputDisabled}
            className={cn(
              "input-focus min-w-0 w-full border h-12 rounded-full pl-11 pr-5 text-base outline-none",
              "border-text-primary/10 bg-surface-tertiary text-text-primary placeholder:text-text-tertiary",
              inputDisabled && "opacity-70",
              status === "error" && "border-brand-pink/60",
            )}
          />
        </div>
        <button
          type="submit"
          disabled={inputDisabled || !url.trim()}
          className={cn(
            "press relative inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full font-semibold h-12 px-6 text-base",
            "bg-text-primary text-surface-primary",
            "disabled:cursor-not-allowed disabled:opacity-70",
            status === "loading" && "cursor-wait",
          )}
        >
          {status === "ok" ? (
            <>
              <Check className="h-4 w-4" />
              <span>{dict.doneButton}</span>
            </>
          ) : status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>{dict.loadingButton}</span>
            </>
          ) : (
            <>
              <span>{dict.idleButton}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/form:translate-x-0.5" />
            </>
          )}
        </button>
      </form>

      {status === "error" && error ? (
        <p
          role="alert"
          className="mt-2 max-w-xl text-xs text-text-secondary"
        >
          {error}
        </p>
      ) : null}

      {status === "loading" && progress.length === 0 ? (
        <p className="mt-2 max-w-xl text-xs text-text-tertiary">
          {dict.loadingHint}
        </p>
      ) : null}

      {status === "loading" && progress.length > 0 ? (
        <CategoryProgressList items={progress} doneCount={doneCount} dict={dict} />
      ) : null}

      {status === "ok" && result ? (
        <AuditResultPanel result={result} onReset={reset} dict={dict} />
      ) : null}
    </div>
  );
}
