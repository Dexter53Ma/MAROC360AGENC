"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useCallback } from "react";
import { ChevronLeft24, ChevronRight24 } from "@/components/icons";
import { LinkButton } from "@/components/button";

interface ExpertiseCard {
  title: string;
  description: string;
  icon: string;
}

const expertise: ExpertiseCard[] = [
  {
    title: "Proprietary methodology",
    description:
      "Our 360° playbook is built in-house and refined on every brand we ship for",
    icon: "/icons/methodology.svg",
  },
  {
    title: "Dedicated strategist",
    description:
      "A senior strategist is assigned to your account to plan, steer, and grow every channel",
    icon: "/icons/coach.svg",
  },
  {
    title: "Google & Meta certified",
    description:
      "Our media team is certified by Google, Meta, and TikTok to run paid campaigns at scale",
    icon: "/icons/training-partner.svg",
  },
  {
    title: "Trusted by leading brands",
    description:
      "We partner with Morocco's most ambitious companies across e-commerce, hospitality, and services",
    icon: "/icons/efrag.svg",
  },
  {
    title: "Always-on optimization",
    description:
      "We monitor campaigns daily and reallocate budget in real time to maximize your ROI",
    icon: "/icons/compliance-watch.svg",
  },
];

export function ExpertiseCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="section-y overflow-hidden">
      <div className="container-page">
        <div className="flex items-end justify-between gap-6 mb-10">
          <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl max-w-2xl">
            Creative talent meets data-driven results
          </h2>
          <LinkButton href="/en/contact" variant="primary" size="md" className="hidden md:inline-flex">
            Get Started
          </LinkButton>
        </div>
        <p className="body-lg max-w-3xl mb-10">
          Maroc 360 pairs a senior in-house team with sharp creative and a culture of measurement, so every campaign we ship is built to perform—and we can prove it.
        </p>
        <div className="md:hidden mb-6">
          <LinkButton href="/en/contact" variant="primary" size="md" className="w-full sm:w-auto">
            Get Started
          </LinkButton>
        </div>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Previous slide"
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-15 h-22 px-3 items-center justify-start bg-surface-tertiary rounded-r-full transition-colors hover:bg-surface-secondary"
        >
          <ChevronLeft24 className="text-text-primary" />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Next slide"
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-15 h-22 px-3 items-center justify-end bg-surface-tertiary rounded-l-full transition-colors hover:bg-surface-secondary"
        >
          <ChevronRight24 className="text-text-primary" />
        </button>

        <div className="embla" ref={emblaRef}>
          <div className="embla__container pl-6 md:pl-20 lg:pl-[calc((100vw-84rem)/2+2.5rem)]">
            {expertise.map((card) => (
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
