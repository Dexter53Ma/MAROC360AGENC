"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useCallback } from "react";
import { ChevronLeft24, ChevronRight24 } from "@/components/icons";
import { LinkButton } from "@/components/button";
import type { HomePageDict } from "@/lib/i18n/dict.types";

export function ExpertiseCarousel({
  dict,
  contactHref,
}: {
  dict: HomePageDict["expertise"];
  contactHref: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="section-y overflow-hidden">
      <div className="container-page">
        <div className="flex items-end justify-between gap-6 mb-8 sm:mb-10">
          <h2 className="heading-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl max-w-2xl text-balance">
            {dict.heading}
          </h2>
          <LinkButton
            href={contactHref}
            variant="primary"
            size="md"
            className="hidden md:inline-flex"
          >
            {dict.buttonLabel}
          </LinkButton>
        </div>
        <p className="body-lg max-w-3xl mb-10">{dict.body}</p>
        <div className="md:hidden mb-6">
          <LinkButton
            href={contactHref}
            variant="primary"
            size="md"
            className="w-full sm:w-auto"
          >
            {dict.buttonLabel}
          </LinkButton>
        </div>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={scrollPrev}
          aria-label={dict.previousSlide}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-15 h-22 px-3 items-center justify-start bg-surface-tertiary rounded-r-full transition-colors hover:bg-surface-secondary"
        >
          <ChevronLeft24 className="text-text-primary" />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          aria-label={dict.nextSlide}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-15 h-22 px-3 items-center justify-end bg-surface-tertiary rounded-l-full transition-colors hover:bg-surface-secondary"
        >
          <ChevronRight24 className="text-text-primary" />
        </button>

        <div className="embla" ref={emblaRef}>
          <div className="embla__container pl-6 md:pl-20 lg:pl-[calc((100vw-84rem)/2+2.5rem)]">
            {dict.cards.map((card) => (
              <div key={card.title} className="embla__slide">
                <div className="bg-surface-tertiary rounded-3xl p-8 h-full">
                  <div className="relative w-16 h-16 mb-6">
                    <Image
                      src={card.icon}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-heading font-medium mb-2">
                    {card.title}
                  </h3>
                  <p className="text-text-secondary text-base leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
