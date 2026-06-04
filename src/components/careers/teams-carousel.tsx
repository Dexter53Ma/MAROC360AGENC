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
    title: "Product & Engineering",
    body: "We're putting technology to work on some of our customers' most challenging problems. Our Product and Engineering teams work hard to make it not only easy, but enjoyable.",
    icon: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6835bf7d14f094acd3522f9a_Product%20%26%20Engineering.svg",
  },
  {
    title: "Customer Success",
    body: "Our Customer Success team listens deeply and works actively to incorporate our customers' needs and feedback into Ditto, so that we're always getting better.",
    icon: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6835bf7d2fb51d794312f086_Customer%20Success.svg",
  },
  {
    title: "Growth",
    body: "The more customers we can serve, the better off our world will be. Our Growth team helps us reach as many people as we can to make CSR and compliance easy for all.",
    icon: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6835bf7db5d31160927462de_Growth.svg",
  },
  {
    title: "Partnerships",
    body: "The right partners can have a major impact. Our Partnerships team looks for opportunities to grow alongside likeminded folks while serving our customers.",
    icon: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6835bf7d469b1259f48c91b6_Partnerships.svg",
  },
  {
    title: "Sales",
    body: "Our Sales team gives our customers their first experience of Ditto. From the start, we're here to help, freeing them up from their biggest CSR and compliance challenges.",
    icon: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6835bf7d5d9f87b8c6ceaee6_Sales.svg",
  },
  {
    title: "Expertise",
    body: "Our Expertise team gives our customers a competitive edge by embedding their deep framework knowledge into our products and experiences.",
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
            Compliance is complex—that&apos;s exactly what makes this work so
            exciting. Each team at Ditto plays a unique and interconnected role
            in realizing our mission.
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
            href="https://jobs.ashbyhq.com/beavr"
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
