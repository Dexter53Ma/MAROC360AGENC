import { LinkButton } from "@/components/button";

export function CopilotsCta() {
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-[#FFE228] px-6 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24">
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <svg
              viewBox="0 0 1200 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid slice"
              className="w-full h-full"
            >
              <g style={{ mixBlendMode: "multiply" }}>
                <ellipse cx="-40" cy="380" rx="220" ry="160" fill="#59E25D" />
                <ellipse cx="120" cy="420" rx="140" ry="100" fill="#3A93FF" />
                <ellipse cx="80" cy="500" rx="120" ry="80" fill="#E261E5" />
                <ellipse cx="1140" cy="120" rx="200" ry="160" fill="#FFE228" />
                <ellipse cx="1180" cy="320" rx="180" ry="160" fill="#E261E5" />
                <ellipse cx="1080" cy="260" rx="140" ry="120" fill="#3A93FF" />
              </g>
            </svg>
          </div>

          <div className="relative z-10 mx-auto max-w-xl text-left">
            <p className="eyebrow flex items-center gap-2 mb-6">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full bg-text-primary"
                aria-hidden
              />
              Careers
            </p>
            <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl mb-6 text-balance">
              We&apos;re all builders on this journey
            </h2>
            <p className="text-base md:text-lg text-text-primary/80 leading-relaxed mb-8">
              Great marketing comes from great people. If you want to help shape how Morocco&apos;s brands grow, we&apos;d love to hear from you.
            </p>
            <LinkButton href="/en/careers" variant="primary" size="md">
              Explore open roles
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
