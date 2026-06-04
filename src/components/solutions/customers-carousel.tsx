"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Maroc 360 is the all-in-one team that turned our marketing into a real growth engine. We finally know what's working and why.",
    name: "Souraya Bouri",
    role: "Group Marketing Director",
    avatar: "/images/testimonials/avatar-1.avif",
  },
  {
    quote:
      "A big thank you to the Maroc 360 team. Their strategists, creatives, and media buyers bring skill and passion to every project. We have nothing but praise for them.",
    name: "Robert",
    role: "Head of Brand",
    avatar: "/images/testimonials/avatar-2.avif",
  },
];

export function CustomersCarousel() {
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

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  return (
    <section className="section-y overflow-hidden">
      <div className="container-page">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl mb-3">
            Hear it from our clients
          </h2>
          <p className="text-base text-text-secondary max-w-2xl mx-auto">
            Brands of all sizes choose Maroc 360 for our creativity, our discipline, and the measurable growth we deliver.
          </p>
        </div>
      </div>

      <div className="embla" ref={emblaRef}>
        <div className="embla__container pl-6 md:pl-10 lg:pl-[calc((100vw-84rem)/2+2.5rem)]">
          {testimonials.map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className="flex-[0_0_85vw] md:flex-[0_0_22rem] lg:flex-[0_0_30rem] min-w-0 md:px-2"
            >
              <div className="bg-surface-tertiary rounded-3xl p-8 h-full flex flex-col">
                <p className="font-heading text-xl leading-relaxed mb-8 flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-text-secondary text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container-page">
        <div className="flex items-center justify-center gap-2 mt-10">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === selectedIndex
                  ? "w-8 bg-brand-yellow"
                  : "w-1.5 bg-text-primary/20 hover:bg-text-primary/40"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
