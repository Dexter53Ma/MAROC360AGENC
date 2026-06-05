import { LinkButton } from "@/components/button";
import { Reveal } from "@/components/motion/reveal";
import type { ContactDict } from "@/lib/i18n/dict.types";

type ContactCtaSectionProps = {
  dict?: Pick<ContactDict, "ctaTitle" | "ctaDescription" | "ctaButton">;
  locale?: "en" | "fr";
};

export function ContactCtaSection({
  dict,
  locale = "en",
}: ContactCtaSectionProps = {}) {
  const title = dict?.ctaTitle ?? "Ready to grow? Maroc 360.";
  const description =
    dict?.ctaDescription ??
    "Let's build a marketing engine that compounds — strategy, media, and content working as one.";
  const button = dict?.ctaButton ?? "Get in touch";
  const contactHref = locale === "fr" ? "/fr/contact" : "/en/contact";
  return (
    <section className="bg-surface-primary relative">
      <div className="container-page py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <Reveal>
            <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl max-w-md text-balance">
              {title}
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex flex-col gap-6 md:items-start">
              <p className="body-lg md:text-left max-w-[32rem]">
                {description}
              </p>
              <LinkButton href={contactHref} variant="primary" size="md">
                {button}
              </LinkButton>
            </div>
          </Reveal>
        </div>

        <div
          className="mt-12 w-full pointer-events-none"
          aria-hidden
        >
          <svg
            viewBox="0 0 1780 345"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-auto"
          >
            <g style={{ mixBlendMode: "multiply" }}>
              <rect
                width="224.495"
                height="220.02"
                rx="110.01"
                transform="matrix(-1 0 0 1 530.492 62.3984)"
                fill="#E261E5"
              />
            </g>
            <g style={{ mixBlendMode: "multiply" }}>
              <rect
                width="371.11"
                height="220.02"
                rx="110.01"
                transform="matrix(-1 0 0 1 1328.45 62.3984)"
                fill="#59E25D"
              />
            </g>
            <g style={{ mixBlendMode: "multiply" }}>
              <rect
                x="762.008"
                y="54.0938"
                width="235.199"
                height="236.908"
                rx="117.599"
                fill="#3A93FF"
              />
            </g>
            <g style={{ mixBlendMode: "multiply" }}>
              <rect
                x="1624.3"
                y="86.7773"
                width="154.917"
                height="171.543"
                rx="77.4584"
                fill="#59E25D"
              />
            </g>
            <g style={{ mixBlendMode: "multiply" }}>
              <rect
                x="1346.21"
                y="0.953125"
                width="327.882"
                height="343.195"
                rx="163.941"
                fill="#FFE228"
              />
            </g>
            <g style={{ mixBlendMode: "multiply" }}>
              <rect
                x="0.789062"
                y="0.953125"
                width="327.882"
                height="343.195"
                rx="163.941"
                fill="#FFE228"
              />
            </g>
            <g style={{ mixBlendMode: "multiply" }}>
              <rect
                width="450.288"
                height="236.907"
                rx="118.454"
                transform="matrix(-1 0 0 1 893.008 54.0938)"
                fill="#FFE228"
              />
            </g>
            <g style={{ mixBlendMode: "multiply" }}>
              <rect
                width="167.631"
                height="236.907"
                rx="83.8156"
                transform="matrix(-1 0 0 1 1425.18 54.0938)"
                fill="#E261E5"
              />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
