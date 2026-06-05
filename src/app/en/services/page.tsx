import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { getDict } from "@/lib/i18n/dict";
import { Footer } from "@/components/footer";
import { CtaSection } from "@/components/cta-section";
import { ChevronRight12 } from "@/components/icons";

export const metadata: Metadata = {
  title: "Services – Maroc 360 Agency",
  description:
    "Strategy, paid media, SEO, social, and creative — every service your brand needs to grow, delivered as one connected team.",
};

const services = [
  {
    title: "Management system",
    description:
      "One workspace for every campaign, channel, and result. Briefs, assets, KPIs, and reports in one place.",
    href: "/en/services/management-system",
  },
  {
    title: "Strategy & Planning",
    description:
      "Research-backed roadmaps and playbooks tailored to your goals, audience, and budget in Morocco.",
    href: "/en/services/strategy-planning",
  },
  {
    title: "Paid Media",
    description:
      "Profitable campaigns across Google, Meta, and TikTok — planned, bought, and optimised weekly.",
    href: "/en/services/paid-media",
  },
  {
    title: "SEO & Content",
    description:
      "Rank, attract, and convert with search-first content in French, Arabic, and English.",
    href: "/en/services/seo-content",
  },
  {
    title: "Social Media",
    description:
      "Build community, grow audiences, and drive revenue on the platforms that matter for your brand.",
    href: "/en/services/social-media",
  },
  {
    title: "Creative Studio",
    description:
      "Branding, motion, and campaigns that earn attention — from concept to launch.",
    href: "/en/services/creative-studio",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar dict={getDict("en").nav} locale="en" multiStepForm={getDict("en").multiStepForm} />
      <main id="main" tabIndex={-1}>
        <section className="pt-10 sm:pt-12 md:pt-20 pb-8 md:pb-12">
          <div className="container-page">
            <div className="max-w-3xl mx-auto text-center">
              <p className="eyebrow mb-4">Our services</p>
              <h1 className="heading-display text-[2.25rem] sm:text-4xl md:text-5xl lg:text-6xl mb-6 text-balance">
                Every service your brand needs, delivered as one team
              </h1>
              <p className="body-lg max-w-2xl mx-auto">
                From the first strategy workshop to the weekly performance report, Maroc 360 covers
                the full marketing stack — so you work with one partner, not seven.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="container-page">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service) => (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group relative flex flex-col gap-3 p-6 rounded-3xl bg-surface-tertiary border border-border-strong/10 hover:border-text-primary/30 transition-colors"
                >
                  <h2 className="heading-display text-2xl text-text-primary">
                    {service.title}
                  </h2>
                  <p className="text-base text-text-secondary leading-snug">
                    {service.description}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-text-primary">
                    Learn more
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
