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

export const metadata: Metadata = {
  title: "Manifesto – Maroc 360 Agency",
  description:
    "We're here to help Moroccan brands grow and shine, together. Learn about Maroc 360's core beliefs, our approach, and the partners backing our mission.",
};

export default function ManifestoPage() {
  const dict = getDict("en");
  const w = dict.whyUs;
  return (
    <>
      <Navbar dict={dict.nav} locale="en" multiStepForm={dict.multiStepForm} />
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
      <Footer dict={dict.footer} locale="en" />
    </>
  );
}
