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
  title: "Manifesto – Ditto",
  description:
    "We're here to help businesses build trust and build better, together. Learn about Ditto's core beliefs, commitments, and the partners backing our mission.",
};

const beliefs = [
  {
    title: "We think great partners make great businesses",
    body: "A great partner can help you scale faster, work smarter, and grow in ways you couldn't imagine. That's the kind of partner we aim to be for our customers and everyone they work with, too.",
    image: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6970ff9bf4ef80b4ce269d2b_ditto_better_businesses_illustration_7%20-%20Grande.jpeg",
    imageAlt: "Illustration of professionals in a colorful office space",
    reverse: false,
  },
  {
    title: "We see compliance as an opportunity, not an obstacle",
    body: "At Ditto, we see compliance as a chance to showcase your leadership, take pride in your CSR practices, and partner with people who share your values.",
    image: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6a184a915f82cad90b79a145_ditto_better_world_illustration_6%20-%20Grande.jpeg",
    imageAlt: "Illustration of a sustainable city with trees and modern buildings",
    reverse: true,
  },
  {
    title: "When sustainable businesses win, we all win",
    body: "We think building sustainability into your business is one of the surest ways to future-proof it. It's a win-win for the planet, your partners, and your business.",
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
                We&apos;re here to help businesses build trust and build better,
                together
              </h1>
              <p className="body-lg max-w-2xl mx-auto mb-10">
                Every partner you pick, every supplier you choose, every customer
                you serve—they&apos;re all a part of your story. But building
                trust across them? It&apos;s not easy. We started Ditto to
                change that.
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
