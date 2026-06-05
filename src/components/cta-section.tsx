"use client";

import { EmailSubscribe } from "@/components/email-subscribe";

export function CtaSection({ dict }: { dict: { ctaSection: import("@/lib/i18n/dict.types").CtaSectionDict } }) {
  const c = dict.ctaSection;
  return (
    <section className="section-y">
      <div className="container-page">
        <div className="relative bg-surface-tertiary rounded-[2rem] sm:rounded-[3rem] lg:rounded-[5rem] px-6 py-14 sm:px-12 sm:py-20 md:px-20 md:py-24 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            aria-hidden
          >
            <svg
              viewBox="0 0 1000 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <g style={{ mixBlendMode: "multiply" }}>
                <circle cx="100" cy="320" r="80" fill="#FFE228" />
                <circle cx="900" cy="80" r="120" fill="#59E25D" />
                <circle cx="500" cy="200" r="60" fill="#E261E5" />
              </g>
            </svg>
          </div>

          <div className="relative flex flex-col items-center text-center gap-6 max-w-2xl mx-auto">
            <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl">
              {c.title}
            </h2>
            <p className="body-lg">{c.description}</p>
            <div className="w-full max-w-xl mt-4">
              <EmailSubscribe
                placeholder={c.formPlaceholder}
                buttonLabel={c.formButton}
                successLabel={c.formSuccess}
                variant="primary"
                size="md"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
