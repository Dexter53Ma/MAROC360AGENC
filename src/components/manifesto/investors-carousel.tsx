"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useCallback } from "react";
import { ChevronLeft24, ChevronRight24 } from "@/components/icons";

interface Investor {
  name: string;
  logo: string;
}

const investors: Investor[] = [
  { name: "Nine Capital", logo: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6835b96085a32e7106c24bfb_nine.avif" },
  { name: "Purple", logo: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6835b9606ef3fedec0757bf1_purple.avif" },
  { name: "Better Angle", logo: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6835b960ce58e09d2418ad5e_better-angle.avif" },
  { name: "Aonia Ventures", logo: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6835b96042c32bcf5e05cab4_aonia.avif" },
  { name: "Kima Ventures", logo: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6835b960f81118f10549ee7a_kima-ventures.avif" },
  { name: "Motier Ventures", logo: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6835b960ce3117638f74790e_motier-ventures.avif" },
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
            Backed by great partners
          </h2>
          <p className="text-sm text-text-secondary">
            Partnership is in our DNA and we&apos;re proud to work with many of the best.
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
                <div className="relative h-16 w-full grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
                  <Image
                    src={inv.logo}
                    alt={inv.name}
                    fill
                    sizes="12rem"
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
