"use client";

import Image from "next/image";
import Link from "next/link";
import { EmailSubscribe } from "@/components/email-subscribe";
import { StarIcon } from "@/components/icons";

export interface ServiceHeroProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  subscribeVariant?: "surface" | "primary";
}

export function ServiceHero({
  title,
  description,
  image,
  imageAlt,
  imageWidth = 1391,
  imageHeight = 910,
  subscribeVariant = "surface",
}: ServiceHeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center pt-10 sm:pt-14 pb-14 sm:pb-20 lg:pt-20 lg:pb-16">
          <div className="flex flex-col gap-6 max-w-xl">
            <h1 className="heading-display text-4xl sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="body-lg text-lg lg:text-[1.375rem] max-w-md">
              {description}
            </p>

            <EmailSubscribe
              placeholder="Your work email"
              buttonLabel="Get Started"
              successLabel="Thanks!"
              variant={subscribeVariant}
              size="md"
            />

            <Link
              href="/en/contact"
              className="link-underline inline-flex items-center gap-2 text-sm font-medium text-text-primary"
            >
              <span className="stars-rating flex items-center gap-0.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <StarIcon key={i} className="text-brand-green w-4 h-4" />
                ))}
              </span>
              <span>4.9/5 on Google Reviews</span>
            </Link>
          </div>

          <div className="relative w-full" style={{ aspectRatio: `${imageWidth} / ${imageHeight}` }}>
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="lift object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
