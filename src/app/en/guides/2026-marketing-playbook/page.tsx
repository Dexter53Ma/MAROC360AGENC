import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { getDict } from "@/lib/i18n/dict";
import { Footer } from "@/components/footer";
import { CtaSection } from "@/components/cta-section";
import { BlogBreadcrumbs } from "@/components/blog/blog-breadcrumbs";
import { absoluteUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "The 2026 Marketing Playbook for Morocco – Maroc 360",
  description:
    "Our annual flagship guide. Channels, budgets, KPIs, and benchmarks for Moroccan brands in 2026 — built from the data of 100+ active campaigns.",
  alternates: { canonical: absoluteUrl("/en/guides/2026-marketing-playbook") },
};

const sections = [
  {
    eyebrow: "Section 01",
    title: "The state of marketing in Morocco, 2026",
    summary:
      "What's changed in the last 12 months, what's working, and what to ignore. A ground-truth view from 100+ active campaigns and the agencies, in-house teams, and founders running them.",
    points: [
      "Where Moroccan marketing budgets are actually going (and where they're not).",
      "The platforms that grew, the platforms that stalled, and the ones that disappeared.",
      "The single biggest shift in 2026: creative as the new targeting.",
      "Why the brand-performance divide is a false choice.",
    ],
  },
  {
    eyebrow: "Section 02",
    title: "Channel mix & budget allocation",
    summary:
      "How to split your 2026 budget across paid, organic, brand, and retention — by stage of growth, by category, and by the unit economics of your business.",
    points: [
      "The 40/30/20/10 budget template for Moroccan growth-stage brands.",
      "When to over-invest in brand, when to over-invest in performance, and when to do both.",
      "The right mix for e-commerce, B2B SaaS, hospitality, and professional services.",
      "How to defend your budget in a board meeting.",
    ],
  },
  {
    eyebrow: "Section 03",
    title: "The four operating principles",
    summary:
      "The four principles we use with every Maroc 360 client to keep marketing focused, accountable, and compounding.",
    points: [
      "Principle 1: the strategy is in the cadence. 90 days beats 12 months.",
      "Principle 2: the only durable moat is creative quality. Targeting is rented.",
      "Principle 3: measurement is a system, not a dashboard.",
      "Principle 4: brand is a leading indicator of performance. Act like it.",
    ],
  },
  {
    eyebrow: "Section 04",
    title: "KPIs and the measurement stack",
    summary:
      "The metrics that matter, the metrics that mislead, and the small set of numbers we report to leadership every Monday morning.",
    points: [
      "The 5 numbers in every CMO dashboard.",
      "How to triangulate platform-reported conversions, real revenue, and incrementality.",
      "When to trust last-click, when to ignore it, and when to invest in incrementality testing.",
      "A simple weekly reporting template you can copy.",
    ],
  },
  {
    eyebrow: "Section 05",
    title: "The 12-month roadmap template",
    summary:
      "A working template for planning the year: quarterly themes, monthly priorities, weekly execution. The same template we use internally and with our clients.",
    points: [
      "The 4-box annual plan: brand, performance, retention, innovation.",
      "How to sequence campaigns across the year for compounding effect.",
      "When to hire, when to fire, and when to redesign.",
      "The 30-60-90 day onboarding plan for a new marketing lead.",
    ],
  },
  {
    eyebrow: "Section 06",
    title: "Common pitfalls and how to avoid them",
    summary:
      "The 8 most common mistakes we see in Moroccan marketing programs in 2026 — and what to do instead.",
    points: [
      "Mistake 1: chasing reach instead of revenue.",
      "Mistake 2: measuring on platform-reported numbers.",
      "Mistake 3: cutting brand budget first.",
      "Mistake 4: treating social as a broadcast channel.",
      "...and the other four.",
    ],
  },
];

export default function MarketingPlaybookGuidePage() {
  return (
    <>
      <Navbar dict={getDict("en").nav} locale="en" multiStepForm={getDict("en").multiStepForm} />
      <main id="main" tabIndex={-1}>
        <div className="container-page">
          <BlogBreadcrumbs
            items={[
              { label: "Home", href: "/en" },
              { label: "Guides", href: "/en/guides" },
              { label: "2026 Marketing Playbook" },
            ]}
          />
        </div>

        <section className="pb-10">
          <div className="container-page max-w-3xl">
            <span className="inline-flex w-fit items-center rounded-full bg-text-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-surface-primary mb-4">
              Featured guide · 2026 edition
            </span>
            <h1 className="heading-display text-3xl md:text-5xl lg:text-6xl text-text-primary mb-4">
              The 2026 Marketing Playbook for Morocco
            </h1>
            <p className="body-lg text-text-secondary">
              Channels, budgets, KPIs, and benchmarks for Moroccan brands in 2026 — built from the data
              of 100+ active campaigns. The same playbook we use with our clients, in a guide you can
              read, share, and put into practice.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-text-secondary">
              <span>18 min read</span>
              <span>·</span>
              <span>Updated January 2026</span>
              <span>·</span>
              <span>Strategy Team, Maroc 360</span>
            </div>
          </div>
        </section>

        <section className="pb-12 md:pb-20">
          <div className="container-page max-w-3xl flex flex-col gap-10">
            {sections.map((section) => (
              <article
                key={section.title}
                className="rounded-3xl bg-surface-tertiary border border-text-primary/10 p-6 md:p-10"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
                  {section.eyebrow}
                </p>
                <h2 className="heading-display text-2xl md:text-3xl text-text-primary mt-2 mb-3">
                  {section.title}
                </h2>
                <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-4">
                  {section.summary}
                </p>
                <ul className="flex flex-col gap-2">
                  {section.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-text-primary text-sm md:text-base"
                    >
                      <span
                        aria-hidden
                        className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-brand-green"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="pb-12 md:pb-20">
          <div className="container-page max-w-3xl">
            <div className="rounded-3xl bg-[#FFE228] p-8 md:p-12 text-text-primary">
              <h2 className="heading-display text-2xl md:text-3xl mb-3">
                Want the rest of the playbook?
              </h2>
              <p className="text-base md:text-lg max-w-xl mb-6">
                The full 2026 Marketing Playbook for Morocco is 42 pages, with detailed channel
                templates, budget tables, KPI dashboards, and the 12-month roadmap. We share it with
                serious conversations — book a call and we&apos;ll send the deck.
              </p>
              <Link
                href="/en/contact"
                className="press inline-flex items-center gap-2 rounded-full bg-text-primary px-5 py-3 text-sm font-semibold text-surface-primary"
              >
                Book a strategy call
              </Link>
            </div>
          </div>
        </section>

        <CtaSection dict={getDict("en")} />
      </main>
      <Footer dict={getDict("en").footer} locale="en" />
    </>
  );
}
