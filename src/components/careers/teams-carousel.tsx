"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft24, ChevronRight24 } from "@/components/icons";
import { LinkButton } from "@/components/button";

interface TeamCard {
  title: string;
  body: string;
  icon: string;
}

const teams: TeamCard[] = [
  {
    title: "Strategy & Planning",
    body: "We put data and insight to work on our clients' most ambitious growth problems. Our Strategy and Planning team makes the complex simple—and the simple unforgettable.",
    icon: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6835bf7d14f094acd3522f9a_Product%20%26%20Engineering.svg",
  },
  {
    title: "Client Success",
    body: "Our Client Success team listens deeply and works actively to incorporate our clients' needs and feedback into every campaign, so we're always getting better.",
    icon: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6835bf7d2fb51d794312f086_Customer%20Success.svg",
  },
  {
    title: "Performance Media",
    body: "The more brands we can grow, the more our industry evolves. Our Performance Media team plans, buys, and optimizes campaigns that turn ad spend into real revenue.",
    icon: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6835bf7db5d31160927462de_Growth.svg",
  },
  {
    title: "Creative & Content",
    body: "The right creative can change everything. Our Creative and Content team turns strategy into stories, visuals, and campaigns people actually want to share.",
    icon: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6835bf7d469b1259f48c91b6_Partnerships.svg",
  },
  {
    title: "New Business",
    body: "Our New Business team gives Moroccan brands their first experience of Maroc 360. From the first call, we're here to help, freeing them up to focus on what they do best.",
    icon: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6835bf7d5d9f87b8c6ceaee6_Sales.svg",
  },
  {
    title: "SEO & Analytics",
    body: "Our SEO and Analytics team gives our clients a competitive edge by turning search data, attribution, and measurement into clear, actionable growth levers.",
    icon: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6835bf7db7bd07f019d52762_Expertise.svg",
  },
];

export function TeamsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 6000, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="pt-24 pb-0 overflow-hidden">
      <div className="container-page">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-heading text-[40px] md:text-[48px] font-normal leading-[1.15] tracking-[-0.01em] text-text-primary text-balance">
            Many teams, one vision
          </h2>
          <p className="mt-6 text-[22px] leading-[1.25] text-text-primary max-w-[48rem] mx-auto">
            Marketing moves fast—that&apos;s exactly what makes this work so exciting. Each team at Maroc 360 plays a unique and interconnected role in growing our clients&apos; brands.
          </p>
        </div>
      </div>

      <div className="relative mt-12">
        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Previous team"
          className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center bg-surface-primary border border-text-primary/10 rounded-full transition-colors hover:bg-surface-tertiary"
        >
          <ChevronLeft24 className="text-text-primary" />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Next team"
          className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center bg-surface-primary border border-text-primary/10 rounded-full transition-colors hover:bg-surface-tertiary"
        >
          <ChevronRight24 className="text-text-primary" />
        </button>

        <div className="embla" ref={emblaRef}>
          <div className="embla__container pl-6 md:pl-10 lg:pl-[calc((100vw-84rem)/2+2.5rem)]">
            {teams.map((team) => (
              <div
                key={team.title}
                className="flex-[0_0_85vw] md:flex-[0_0_calc(50%-0.5rem)] lg:flex-[0_0_26rem] min-w-0 md:px-2"
              >
                <div className="bg-surface-tertiary rounded-3xl p-6 h-full flex flex-col">
                  <div className="relative w-16 h-16 mb-12 flex-shrink-0">
                    <Image
                      src={team.icon}
                      alt=""
                      width={64}
                      height={64}
                      sizes="64px"
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-heading text-[32px] font-normal leading-[1.2] tracking-[-0.01em] text-text-primary">
                    {team.title}
                  </h3>
                  <p className="mt-3 text-[22px] leading-[1.25] text-text-primary">
                    {team.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-page">
        <div className="flex items-center justify-center gap-2 mt-8">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to team ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={cn(
                "h-2 rounded-full transition-all",
                i === selectedIndex
                  ? "w-2 bg-[#FFE228]"
                  : "w-2 bg-text-primary/15"
              )}
            />
          ))}
        </div>
        <div className="flex justify-center mt-8 mb-24">
          <LinkButton
            href="/en/contact"
            variant="primary"
            size="md"
          >
            Apply
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
