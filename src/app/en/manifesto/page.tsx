import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
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

const beliefs = [
  {
    title: "Great partnerships build great brands",
    body: "A great partner can help you grow faster, work smarter, and reach audiences you couldn't reach alone. That's the kind of partner we aim to be for our clients and everyone they work with, too.",
    image: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6835af9a9762f62378e46c0e_manifesto-illus-1.avif",
    imageAlt: "Illustration of professionals collaborating in a colorful creative studio",
    reverse: false,
  },
  {
    title: "We see marketing as a craft, not guesswork",
    body: "At Maroc 360, we treat marketing as a craft—built on research, sharpened by creative, and proven by results. The brands that win are the ones that take both seriously.",
    image: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6835af9a177815a656ca465b_manifesto-illus-2.avif",
    imageAlt: "Illustration of a vibrant Moroccan city with modern branding and digital media",
    reverse: true,
  },
  {
    title: "When Moroccan brands win, we all win",
    body: "We believe building a strong, modern brand is one of the surest ways to future-proof a Moroccan business. It's a win for the founders, their teams, and the country we all call home.",
    reverse: true,
  },
];

export default function ManifestoPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="pt-8 pb-0 md:pt-12 md:pb-0">
          <div className="container-page">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="heading-display text-5xl md:text-6xl mb-6 text-balance">
                We&apos;re here to help Moroccan brands grow and shine, together
              </h1>
              <p className="body-lg max-w-2xl mx-auto mb-10">
                Every post you publish, every campaign you run, every customer you earn—they&apos;re all a part of your story. But building a brand that grows in Morocco? It takes more than ads. We started Maroc 360 to change that.
              </p>
            </div>
          </div>
          <div className="overflow-hidden">
            <HeroPills />
          </div>
        </section>

        <section className="section-y">
          <div className="container-page">
            <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl text-center max-w-2xl mx-auto mb-12 text-balance">
              Our core beliefs
            </h2>
            <div className="flex flex-col gap-16 md:gap-24">
              {beliefs.map((b) => (
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

        <CopilotsCta />

        <CommitmentCarousel />

        <InvestorsCarousel />

        <GetStartedCta />
      </main>
      <Footer />
    </>
  );
}
