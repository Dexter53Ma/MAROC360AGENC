"use client";

import { useState, type FormEvent } from "react";
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

const CATEGORY_LABELS: Record<string, string> = {
  core: "Core SEO",
  perf: "Performance",
  security: "Security",
  links: "Links",
  images: "Images",
  content: "Content",
  technical: "Technical",
  schema: "Structured Data",
};

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
                    · {CATEGORY_LABELS[issue.category] ?? issue.category}
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!url.trim() || status === "loading") return;

    setStatus("loading");
    setError(null);

    try {
      const res = await fetch("/api/seo-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = (await res.json()) as Partial<AuditResult> & { error?: string; details?: string };

      if (!res.ok || data.error) {
        throw new Error(data.details ?? data.error ?? dict.errorFallback);
      }

      setResult(data as AuditResult);
      setStatus("ok");
    } catch (err) {
      setError(err instanceof Error ? err.message : dict.errorFallback);
      setStatus("error");
    }
  };

  const reset = () => {
    setStatus("idle");
    setError(null);
    setResult(null);
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

      {status === "loading" ? (
        <p className="mt-2 max-w-xl text-xs text-text-tertiary">
          {dict.loadingHint}
        </p>
      ) : null}

      {status === "ok" && result ? (
        <AuditResultPanel result={result} onReset={reset} dict={dict} />
      ) : null}
    </div>
  );
}
