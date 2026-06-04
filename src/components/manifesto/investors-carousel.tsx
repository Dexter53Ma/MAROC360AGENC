"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback } from "react";
import { ChevronLeft24, ChevronRight24 } from "@/components/icons";

interface Investor {
  name: string;
}

const investors: Investor[] = [
  { name: "Kfund" },
  { name: "Ring Capital" },
  { name: "Bpifrance" },
  { name: "Investisseurs" },
  { name: "Aglaé Ventures" },
  { name: "Hi Inov" },
  { name: "Raise Sherpas" },
  { name: "Normandie Participations" },
];

export function InvestorsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="section-y overflow-hidden">
      <div className="container-page">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl mb-2">
            Our investors
          </h2>
          <p className="text-sm text-text-secondary">
            Partnership is in our DNA and we&apos;re proud to work with many of
            the best.
          </p>
        </div>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Previous investor"
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-15 h-22 px-3 items-center justify-start bg-surface-tertiary rounded-r-full transition-colors hover:bg-surface-secondary"
        >
          <ChevronLeft24 className="text-text-primary" />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Next investor"
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-15 h-22 px-3 items-center justify-end bg-surface-tertiary rounded-l-full transition-colors hover:bg-surface-secondary"
        >
          <ChevronRight24 className="text-text-primary" />
        </button>

        <div className="embla" ref={emblaRef}>
          <div className="embla__container pl-6 md:pl-20 lg:pl-[calc((100vw-84rem)/2+2.5rem)]">
            {investors.map((inv) => (
              <div
                key={inv.name}
                className="flex-[0_0_60vw] md:flex-[0_0_10rem] lg:flex-[0_0_12rem] min-w-0"
              >
                <div className="h-24 w-full flex items-center justify-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
                  <span className="text-lg font-heading text-text-primary text-center px-2">
                    {inv.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
