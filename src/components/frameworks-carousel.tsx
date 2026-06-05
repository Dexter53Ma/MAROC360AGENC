"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import type { HomePageDict } from "@/lib/i18n/dict.types";

export function FrameworksCarousel({
  dict,
}: {
  dict: HomePageDict["frameworks"];
}) {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: false },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  return (
    <section className="section-y overflow-hidden">
      <div className="container-page">
        <h2 className="heading-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl max-w-xl mb-8 sm:mb-10 text-balance">
          {dict.heading}
        </h2>
      </div>

      <div className="embla" ref={emblaRef}>
        <div className="embla__container pl-6 md:pl-10 lg:pl-[calc((100vw-84rem)/2+2.5rem)]">
          {dict.cards.map((card) => (
            <div key={card.title} className="embla__slide">
              <a
                href={card.href}
                className="group block bg-surface-tertiary rounded-3xl p-6 sm:p-8 h-full transition-transform hover:-translate-y-1"
              >
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 mb-5 sm:mb-6">
                  <Image
                    src={card.icon}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl font-heading font-medium mb-2">
                  <strong>{card.title}</strong>
                </h3>
                <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                  {card.description}
                </p>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
