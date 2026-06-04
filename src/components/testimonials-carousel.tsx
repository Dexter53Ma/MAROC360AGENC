"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useCallback } from "react";
import Link from "next/link";
import { ChevronLeft24, ChevronRight24, ChevronRight12 } from "@/components/icons";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  companyLogo: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Maroc 360 turned our online presence around. In six months, our qualified leads grew 3× and our cost per lead dropped by half.",
    name: "Sophie Wardan",
    role: "Marketing Director",
    avatar: "/images/testimonials/avatar-1.avif",
    companyLogo: "/images/testimonials/logo-1.svg",
  },
  {
    quote:
      "The team rebuilt our brand, our site, and our paid media from scratch. We finally feel like a modern Moroccan brand.",
    name: "Virginie Caro",
    role: "Head of Growth",
    avatar: "/images/testimonials/avatar-2.avif",
    companyLogo: "/images/testimonials/logo-2.svg",
  },
  {
    quote:
      "Their strategist aligned 12 different teams on the same campaign calendar. Maroc 360 paid for itself in two months.",
    name: "Laurence Sauphanor",
    role: "Chief Marketing Officer",
    avatar: "/images/testimonials/avatar-3.avif",
    companyLogo: "/images/testimonials/logo-3.svg",
  },
  {
    quote:
      "We finally have one team running all our performance marketing. Briefs that took weeks now take days, and the numbers are up.",
    name: "Camille Nironi",
    role: "Brand Director",
    avatar: "/images/testimonials/avatar-4.avif",
    companyLogo: "/images/testimonials/logo-4.svg",
  },
  {
    quote:
      "The creative output is sharp, the media buying is sharp, and reporting is clear. Exactly the partner we needed in Morocco.",
    name: "Audrey Evin",
    role: "E-commerce Lead",
    avatar: "/images/testimonials/avatar-5.avif",
    companyLogo: "/images/testimonials/logo-5.svg",
  },
  {
    quote:
      "They launched our creator program across MENA in four weeks. Influencer revenue is now a real line in our P&L.",
    name: "Anonymous",
    role: "Partnerships Manager",
    avatar: "/images/testimonials/avatar-6.svg",
    companyLogo: "/images/testimonials/logo-6.svg",
  },
];

export function TestimonialsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 6000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="section-y overflow-hidden">
      <div className="container-page">
        <div className="flex items-end justify-between gap-6 mb-10">
          <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl">
            What our clients say
          </h2>
          <Link
            href="/en/resources/blog"
            className="group hidden md:inline-flex items-center gap-1 text-base font-medium hover:opacity-70 transition-opacity"
          >
            Read More
            <ChevronRight12 className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <p className="body-lg max-w-3xl mb-10">
          Brands of all sizes choose Maroc 360 for our creativity, our discipline, and the measurable growth we deliver.
        </p>
        <div className="md:hidden -mt-6 mb-2">
          <Link
            href="/en/resources/blog"
            className="group inline-flex items-center gap-1 text-base font-medium hover:opacity-70 transition-opacity"
          >
            Read More
            <ChevronRight12 className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Previous testimonial"
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-15 h-22 px-3 items-center justify-start bg-surface-tertiary rounded-r-full transition-colors hover:bg-surface-secondary"
        >
          <ChevronLeft24 className="text-text-primary" />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Next testimonial"
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-15 h-22 px-3 items-center justify-end bg-surface-tertiary rounded-l-full transition-colors hover:bg-surface-secondary"
        >
          <ChevronRight24 className="text-text-primary" />
        </button>

        <div className="embla" ref={emblaRef}>
          <div className="embla__container pl-6 md:pl-20 lg:pl-[calc((100vw-84rem)/2+2.5rem)]">
            {testimonials.map((t, i) => (
              <div
                key={`${t.name}-${i}`}
                className="flex-[0_0_85vw] md:flex-[0_0_22rem] lg:flex-[0_0_30rem] min-w-0 md:px-2"
              >
                <div className="bg-surface-tertiary rounded-3xl p-8 h-full flex flex-col">
                  <div className="relative h-12 w-32 mb-6">
                    <Image
                      src={t.companyLogo}
                      alt=""
                      fill
                      sizes="8rem"
                      className="object-contain object-left"
                    />
                  </div>
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
      </div>
    </section>
  );
}
