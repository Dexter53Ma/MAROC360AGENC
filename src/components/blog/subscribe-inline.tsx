"use client";

import { EmailSubscribe } from "@/components/email-subscribe";
import type { BlogPostDict } from "@/lib/i18n/dict.types";

export function SubscribeInline({ dict }: { dict: BlogPostDict }) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-16 px-6 py-5 md:px-8 md:py-6 rounded-3xl bg-surface-tertiary">
      <div className="flex flex-col sm:flex-row items-stretch gap-3 sm:items-center">
        <p className="flex-1 text-sm text-text-primary">
          {dict.ctaTitle}
        </p>
        <div className="sm:flex-1 sm:max-w-md">
          <EmailSubscribe
            placeholder="name@company.com"
            buttonLabel="Subscribe"
            successLabel="Thanks!"
            variant="primary"
            size="sm"
          />
        </div>
      </div>
    </div>
  );
}
