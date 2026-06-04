"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useCallback } from "react";
import { ChevronLeft24, ChevronRight24 } from "@/components/icons";

interface CommitmentCard {
  badge: string;
  badgeAlt: string;
  title: string;
  body: string;
}

const commitments: CommitmentCard[] = [
  {
    badge: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6854c3e94b5bc20dde8db6dc_ecovadis-platinum.svg",
    badgeAlt: "EcoVadis Platinum",
    title: "Ditto is EcoVadis Platinum",
    body: "We've put our methodology to the test on our own business and earned the highest EcoVadis rating.",
  },
  {
    badge: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6854c3e94b5bc20dde8db6dd_un-global-compact.svg",
    badgeAlt: "UN Global Compact",
    title: "UN Global Compact",
    body: "Our membership in the UN Global Compact means we're putting our values to work to build a sustainable business and a better world.",
  },
  {
    badge: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6854c3e94b5bc20dde8db6de_ecovadis-training-partner.svg",
    badgeAlt: "EcoVadis training partner",
    title: "We're EcoVadis training partners",
    body: "We've been working with EcoVadis since 2023 to increase sustainability in supply chains, one CSR program at a time.",
  },
];

export function CommitmentCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 6000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="section-y overflow-hidden">
      <div className="container-page">
        <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl max-w-3xl mb-12 text-balance">
          We&apos;re committed to a sustainable future for everyone
        </h2>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Previous commitment"
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-15 h-22 px-3 items-center justify-start bg-surface-tertiary rounded-r-full transition-colors hover:bg-surface-secondary"
        >
          <ChevronLeft24 className="text-text-primary" />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Next commitment"
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-15 h-22 px-3 items-center justify-end bg-surface-tertiary rounded-l-full transition-colors hover:bg-surface-secondary"
        >
          <ChevronRight24 className="text-text-primary" />
        </button>

        <div className="embla" ref={emblaRef}>
          <div className="embla__container pl-6 md:pl-20 lg:pl-[calc((100vw-84rem)/2+2.5rem)]">
            {commitments.map((card) => (
              <div key={card.title} className="embla__slide">
                <div className="bg-surface-tertiary rounded-3xl p-6 sm:p-8 h-full flex flex-col aspect-[4/3]">
                  <div className="relative w-16 h-16 mb-5 flex-shrink-0">
                    <Image
                      src={card.badge}
                      alt={card.badgeAlt}
                      fill
                      sizes="64px"
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-text-primary">
                    {card.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {card.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="container-page mt-8 flex justify-center md:hidden">
          <div className="w-8 h-1 rounded-full bg-text-primary/20" aria-hidden />
        </div>
      </div>
    </section>
  );
}
