import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { getDict } from "@/lib/i18n/dict";
import { Footer } from "@/components/footer";
import { CtaSection } from "@/components/cta-section";
import { ChevronRight12 } from "@/components/icons";
import { INDUSTRIES } from "@/lib/industries";

export const metadata: Metadata = {
  title: "Industries – Maroc 360 Agency",
  description:
    "Specialist marketing for e-commerce, hospitality, real estate, and professional services in Morocco. Industry-specific playbooks, creative, and measurement.",
};

export default function IndustriesIndexPage() {
  return (
    <>
      <Navbar dict={getDict("en").nav} locale="en" multiStepForm={getDict("en").multiStepForm} />
      <main id="main" tabIndex={-1}>
        <section className="pt-10 sm:pt-12 md:pt-20 pb-8 md:pb-12">
          <div className="container-page">
            <div className="max-w-3xl mx-auto text-center">
              <p className="eyebrow mb-4">Industries</p>
              <h1 className="heading-display text-[2.25rem] sm:text-4xl md:text-5xl lg:text-6xl mb-6 text-balance">
                Specialist marketing for the industries we know best
              </h1>
              <p className="body-lg max-w-2xl mx-auto">
                We don&apos;t work with everyone. We work with the categories where we have deep experience
                and proven playbooks — so the strategy we deliver is the strategy that works.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="container-page">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {INDUSTRIES.map((industry) => (
                <Link
                  key={industry.slug}
                  href={industry.href}
                  className="group relative flex flex-col gap-3 p-6 rounded-3xl bg-surface-tertiary border border-border-strong/10 hover:border-text-primary/30 transition-colors"
                >
                  <h2 className="heading-display text-2xl text-text-primary">
                    {industry.navLabel}
                  </h2>
                  <p className="text-base text-text-secondary leading-snug">
                    {industry.hero.description}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-text-primary">
                    Learn more about {industry.navLabel}
                    <ChevronRight12 className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CtaSection dict={getDict("en")} />
      </main>
      <Footer dict={getDict("en").footer} locale="en" />
    </>
  );
}
