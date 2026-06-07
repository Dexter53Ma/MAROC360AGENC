import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { getDict } from "@/lib/i18n/dict";
import { Footer } from "@/components/footer";
import { HeroPills } from "@/components/manifesto/hero-pills";
import { BeliefBlock } from "@/components/manifesto/belief-block";
import { CopilotsCta } from "@/components/manifesto/copilots-cta";
import { CommitmentCarousel } from "@/components/manifesto/commitment-carousel";
import { InvestorsCarousel } from "@/components/manifesto/investors-carousel";
import { GetStartedCta } from "@/components/manifesto/get-started-cta";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl } from "@/lib/site-config";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { pageAlternates } from "@/lib/metadata-helpers";

export const metadata: Metadata = {
  title: "Manifeste – Maroc 360 Agency",
  description:
    "Nous sommes là pour aider les marques marocaines à grandir et à briller, ensemble. Découvrez les convictions de Maroc 360, notre approche et les partenaires qui soutiennent notre mission.",
  alternates: pageAlternates({ path: "/fr/why-us", otherLocalePath: "/en/manifesto" }),
};

export default function ManifestoPageFR() {
  const dict = getDict("fr");
  const w = dict.whyUs;
  const url = absoluteUrl("/fr/why-us");
  const schema = webPageSchema({
    id: `${url}#webpage`,
    name: metadata.title as string,
    description: metadata.description as string,
    url,
    inLanguage: "fr",
    type: "AboutPage",
  });
  const crumbs = breadcrumbSchema([
    { name: "Accueil", item: absoluteUrl("/fr") },
    { name: "Manifeste", item: url },
  ]);
  return (
    <>
      <Navbar dict={dict.nav} locale="fr" multiStepForm={dict.multiStepForm} />
      <main id="main" tabIndex={-1}>
        <section className="pt-6 pb-0 sm:pt-12 md:pb-0">
          <div className="container-page">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="heading-display text-[2.25rem] sm:text-4xl md:text-5xl lg:text-6xl mb-6 text-balance">
                {w.heroHeading}
              </h1>
              <p className="body-lg max-w-2xl mx-auto mb-8 sm:mb-10">
                {w.heroBody}
              </p>
            </div>
          </div>
          <div className="overflow-hidden">
            <HeroPills />
          </div>
        </section>

        <section className="section-y">
          <div className="container-page">
            <h2 className="heading-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center max-w-2xl mx-auto mb-10 md:mb-12 text-balance">
              {w.beliefsHeading}
            </h2>
            <div className="flex flex-col gap-12 md:gap-24">
              {w.beliefs.map((b) => (
                <BeliefBlock
                  key={b.title}
                  title={b.title}
                  body={b.body}
                  image={b.image}
                  imageAlt={b.imageAlt}
                  reverse={b.reverse}
                />
              ))}
            </div>
          </div>
        </section>

        <CopilotsCta dict={w} />

        <CommitmentCarousel dict={w} />

        <InvestorsCarousel dict={w} />

        <GetStartedCta dict={w} />
      </main>
      <Footer dict={dict.footer} locale="fr" />
      <JsonLd data={schema} />
      <JsonLd data={crumbs} />
    </>
  );
}
