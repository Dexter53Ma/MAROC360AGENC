"use client";

import { useState } from "react";
import { LinkedIn16, Link16, Check } from "@/components/icons";

export function ShareButtons({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt("Copy link:", url);
    }
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
      <span className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
        Share
      </span>
      <div className="flex items-center gap-2">
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
          className="press inline-flex h-10 w-10 items-center justify-center rounded-full border border-text-primary/15 bg-surface-tertiary text-text-primary hover:bg-text-primary hover:text-surface-primary"
        >
          <LinkedIn16 aria-hidden />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X / Twitter"
          className="press inline-flex h-10 w-10 items-center justify-center rounded-full border border-text-primary/15 bg-surface-tertiary text-text-primary hover:bg-text-primary hover:text-surface-primary text-sm font-semibold"
        >
          X
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
          className="press inline-flex h-10 w-10 items-center justify-center rounded-full border border-text-primary/15 bg-surface-tertiary text-text-primary hover:bg-text-primary hover:text-surface-primary text-sm font-semibold"
        >
          f
        </a>
        <button
          type="button"
          onClick={copyLink}
          aria-label={copied ? "Link copied" : "Copy link"}
          className="press inline-flex h-10 w-10 items-center justify-center rounded-full border border-text-primary/15 bg-surface-tertiary text-text-primary hover:bg-text-primary hover:text-surface-primary"
        >
          {copied ? <Check aria-hidden /> : <Link16 aria-hidden />}
        </button>
      </div>
    </div>
  );
}
