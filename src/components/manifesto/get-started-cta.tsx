import { LinkButton } from "@/components/button";

export function GetStartedCta() {
  return (
    <section className="section-y">
      <div className="container-page">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12">
          <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl max-w-md text-balance">
            Ready to grow? Maroc 360.
          </h2>
          <div className="flex flex-col gap-6 md:items-start">
            <p className="body-lg md:text-left">
              Let&apos;s build a marketing engine that turns your brand into a market leader in Morocco and beyond.
            </p>
            <LinkButton href="/en/contact" variant="primary" size="md">
              Get Started
            </LinkButton>
          </div>
        </div>

        <div
          className="w-full h-14 sm:h-16 md:h-20 pointer-events-none"
          aria-hidden
        >
          <svg
            viewBox="0 0 1440 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <g style={{ mixBlendMode: "multiply" }}>
              <circle cx="40" cy="50" r="44" fill="#FFE228" />
              <circle cx="130" cy="50" r="40" fill="#E261E5" />
              <circle cx="220" cy="50" r="44" fill="#59E25D" />
              <circle cx="310" cy="50" r="40" fill="#3A93FF" />
              <circle cx="400" cy="50" r="44" fill="#FFE228" />
              <circle cx="490" cy="50" r="40" fill="#E261E5" />
              <circle cx="580" cy="50" r="44" fill="#59E25D" />
              <circle cx="670" cy="50" r="40" fill="#3A93FF" />
              <circle cx="760" cy="50" r="44" fill="#FFE228" />
              <circle cx="850" cy="50" r="40" fill="#E261E5" />
              <circle cx="940" cy="50" r="44" fill="#59E25D" />
              <circle cx="1030" cy="50" r="40" fill="#3A93FF" />
              <circle cx="1120" cy="50" r="44" fill="#FFE228" />
              <circle cx="1210" cy="50" r="40" fill="#E261E5" />
              <circle cx="1300" cy="50" r="44" fill="#59E25D" />
              <circle cx="1390" cy="50" r="40" fill="#3A93FF" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
