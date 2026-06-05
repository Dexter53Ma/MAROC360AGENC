"use client";

import Image from "next/image";
import Link from "next/link";
import { HeroSeoAuditForm } from "@/components/hero-seo-audit-form";
import { Reveal } from "@/components/motion/reveal";
import { StarIcon } from "@/components/icons";
import type { HomePageDict } from "@/lib/i18n/dict.types";

export function Hero({ dict }: { dict: HomePageDict["hero"] }) {
  return (
    <section className="relative overflow-hidden">
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center pt-6 sm:pt-12 pb-12 sm:pb-16 lg:pt-20 lg:pb-24">
          <div className="flex flex-col gap-5 sm:gap-6 max-w-2xl">
            <Reveal>
              <h1 className="heading-display text-[2.25rem] leading-[1.05] sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] text-balance">
                {dict.heading}
              </h1>
            </Reveal>
            <Reveal delay={100}>
              <p className="body-lg sm:text-lg lg:text-[1.375rem]">
                {dict.subheading}
              </p>
            </Reveal>

            <Reveal delay={200}>
              <HeroSeoAuditForm dict={dict.seoAuditForm} />
            </Reveal>

            <Reveal delay={300}>
              <Link
                href={dict.contactLink}
                className="link-underline inline-flex items-center gap-2 text-sm font-medium text-text-primary"
              >
                <span className="stars-rating flex items-center gap-0.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <StarIcon key={i} className="text-brand-green w-4 h-4" />
                  ))}
                </span>
                <span>{dict.rating}</span>
              </Link>
            </Reveal>
          </div>

          <div className="relative aspect-[1391/910] w-full">
            <Image
              src="/images/hero/frameworks-hero.png"
              alt="Maroc 360 digital marketing services overview"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="lift rounded-3xl object-cover"
            />
          </div>
        </div>
      </div>

      <div
        className="hidden sm:block absolute left-1/2 -translate-x-1/2 bottom-0 w-[110%] h-12 pointer-events-none"
        aria-hidden
      >
        <svg
          viewBox="0 0 1544 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <g style={{ mixBlendMode: "multiply" }}>
            <rect x="1100" width="80" height="100" rx="40" fill="#FFE228" />
            <rect x="200" width="127" height="100" rx="63" fill="#E261E5" />
            <rect width="64" height="100" rx="32" fill="#FFE228" />
          </g>
        </svg>
      </div>
    </section>
  );
}
