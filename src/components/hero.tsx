"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LinkButton } from "@/components/button";
import { StarIcon } from "@/components/icons";

export function Hero() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="relative overflow-hidden">
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center pt-8 sm:pt-12 pb-12 sm:pb-16 lg:pt-20 lg:pb-24">
          <div className="flex flex-col gap-6 max-w-2xl">
            <h1 className="heading-display text-[2.5rem] leading-[1.05] sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]">
              Your 360° digital marketing partner in Morocco
            </h1>
            <p className="body-lg text-lg lg:text-[1.375rem]">
              From the first brief to the last click, Maroc 360 helps Moroccan brands grow online with strategy, creative, and paid media that actually performs.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSubmitted(true);
              }}
              className="flex flex-col sm:flex-row items-stretch gap-2 max-w-xl"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your work email"
                aria-label="Your work email"
                className="flex-1 h-12 px-5 rounded-full bg-surface-tertiary border border-text-primary/10 text-base text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-text-primary/30"
              />
              <LinkButton type="submit" variant="primary" size="md" className="sm:px-6">
                {submitted ? "Thanks!" : "Get Started"}
              </LinkButton>
            </form>

            <Link
              href="/en/contact"
              className="inline-flex items-center gap-2 text-sm font-medium text-text-primary hover:opacity-70 transition-opacity"
            >
              <span className="flex items-center gap-0.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <StarIcon key={i} className="text-brand-green w-4 h-4" />
                ))}
              </span>
              <span>4.9/5 on Google Reviews</span>
            </Link>
          </div>

          <div className="relative aspect-[1391/910] w-full">
            <Image
              src="/images/hero/frameworks-hero.jpg"
              alt="Maroc 360 digital marketing services overview"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover rounded-3xl"
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
