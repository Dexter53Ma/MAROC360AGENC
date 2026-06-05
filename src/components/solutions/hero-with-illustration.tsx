"use client";

import Image from "next/image";
import Link from "next/link";
import { EmailSubscribe } from "@/components/email-subscribe";
import { StarIcon } from "@/components/icons";

export function HeroWithIllustration({
  dict,
}: {
  dict: {
    heading: string;
    body: string;
    emailPlaceholder: string;
    emailButton: string;
    emailSuccess: string;
    rating: string;
    contactLink: string;
  };
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center pt-10 sm:pt-14 pb-14 sm:pb-20 lg:pt-20 lg:pb-16">
          <div className="flex flex-col gap-6 max-w-xl">
            <h1 className="heading-display text-4xl sm:text-5xl lg:text-6xl">
              {dict.heading}
            </h1>
            <p className="body-lg text-lg lg:text-[1.375rem] max-w-md">
              {dict.body}
            </p>

            <EmailSubscribe
              placeholder={dict.emailPlaceholder}
              buttonLabel={dict.emailButton}
              successLabel={dict.emailSuccess}
              variant="surface"
              size="md"
            />

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
          </div>

          <div className="relative aspect-[1391/910] w-full">
            <Image
              src="/images/hero/frameworks-hero.png"
              alt="Maroc 360 marketing services overview"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="lift object-cover rounded-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
