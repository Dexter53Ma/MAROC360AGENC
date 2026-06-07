import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { getDict } from "@/lib/i18n/dict";
import { Footer } from "@/components/footer";
import { CtaSection } from "@/components/cta-section";
import { CASE_STUDIES } from "@/lib/case-studies";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl } from "@/lib/site-config";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Case Studies – Maroc 360 Agency",
  description:
    "Real campaigns, real numbers, real wins. See how Maroc 360 has helped Moroccan brands grow across e-commerce, hospitality, B2B SaaS, and real estate.",
};

export default function CaseStudiesPage() {
  const dict = getDict("en");
  const url = absoluteUrl("/en/case-studies");
  const schema = webPageSchema({
    id: `${url}#webpage`,
    name: metadata.title as string,
    description: metadata.description as string,
    url,
    inLanguage: "en",
    type: "CollectionPage",
  });
  const crumbs = breadcrumbSchema([
    { name: "Home", item: absoluteUrl("/en") },
    { name: "Case Studies", item: url },
  ]);
  return (
    <>
      <Navbar dict={dict.nav} locale="en" multiStepForm={dict.multiStepForm} />
      <main id="main" tabIndex={-1}>
        <section className="pt-10 sm:pt-12 md:pt-20 pb-8 md:pb-12">
          <div className="container-page">
            <div className="max-w-3xl mx-auto text-center">
              <p className="eyebrow mb-4">Case studies</p>
              <h1 className="heading-display text-[2.25rem] sm:text-4xl md:text-5xl lg:text-6xl mb-6 text-balance">
                Real campaigns, real numbers, real wins
              </h1>
              <p className="body-lg max-w-2xl mx-auto">
                We measure ourselves on the only metric that matters: growth for our clients.
                Here are four of the stories we&apos;re most proud of.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-12 md:pb-20">
          <div className="container-page flex flex-col gap-16 md:gap-24">
            {CASE_STUDIES.map((study, idx) => (
              <article
                key={study.slug}
                className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-start"
              >
                <div
                  className={`lg:col-span-7 ${
                    idx % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl md:rounded-3xl bg-surface-tertiary">
                    <Image
                      src={study.heroImage}
                      alt={study.heroAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div
                  className={`lg:col-span-5 flex flex-col gap-4 ${
                    idx % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="inline-flex items-center rounded-full bg-text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-surface-primary">
                      Case study
                    </span>
                    <span className="text-text-secondary font-medium">
                      {study.industry}
                    </span>
                    <span className="text-text-tertiary">·</span>
                    <span className="text-text-secondary">{study.publishedLabel}</span>
                  </div>

                  <h2 className="heading-display text-2xl md:text-3xl lg:text-4xl text-text-primary text-balance">
                    {study.headline}
                  </h2>

                  <p className="text-base text-text-secondary leading-relaxed">
                    {study.summary}
                  </p>

                  <dl className="grid grid-cols-2 gap-3 mt-2">
                    {study.results.slice(0, 4).map((r) => (
                      <div
                        key={r.metric}
                        className="rounded-2xl bg-surface-tertiary border border-text-primary/10 p-4"
                      >
                        <dt className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                          {r.metric}
                        </dt>
                        <dd className="font-heading text-2xl md:text-3xl text-text-primary mt-1">
                          {r.value}
                        </dd>
                        <dd className="text-xs text-text-secondary mt-1 leading-snug">
                          {r.detail}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <blockquote className="mt-4 border-l-2 border-brand-yellow pl-4 italic text-text-primary">
                    &ldquo;{study.quote.text}&rdquo;
                    <footer className="mt-2 text-sm not-italic text-text-secondary">
                      <span className="font-semibold text-text-primary">
                        {study.quote.name}
                      </span>
                      {" · "}
                      {study.quote.role}
                    </footer>
                  </blockquote>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {study.services.map((service) => (
                      <span
                        key={service}
                        className="text-xs font-semibold uppercase tracking-wider text-text-secondary bg-surface-tertiary border border-text-primary/10 rounded-full px-3 py-1"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="pb-12 md:pb-20">
          <div className="container-page">
            <div className="max-w-3xl mx-auto text-center bg-surface-tertiary rounded-3xl p-8 md:p-12">
              <h2 className="heading-display text-2xl md:text-3xl text-text-primary mb-3">
                Your case study could be next
              </h2>
              <p className="text-text-secondary text-base md:text-lg max-w-xl mx-auto mb-6">
                If you&apos;re growing a brand in Morocco and you want to see your story on this page, let&apos;s talk.
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

        <CtaSection dict={dict} />
      </main>
      <Footer dict={dict.footer} locale="en" />
      <JsonLd data={schema} />
      <JsonLd data={crumbs} />
    </>
  );
}
