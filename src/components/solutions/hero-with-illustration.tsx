"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LinkButton } from "@/components/button";
import { StarIcon } from "@/components/icons";

export function HeroWithIllustration() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="relative overflow-hidden">
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center pt-10 sm:pt-14 pb-14 sm:pb-20 lg:pt-20 lg:pb-16">
          <div className="flex flex-col gap-6 max-w-xl">
            <h1 className="heading-display text-4xl sm:text-5xl lg:text-6xl">
              Your team&apos;s single source of truth for CSR and compliance
            </h1>
            <p className="body-lg text-lg lg:text-[1.375rem] max-w-md">
              No more searching across documents or chasing down answers—Ditto
              gives you everything you need to manage your team&apos;s CSR and
              compliance, right where you need it.
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
              <LinkButton
                type="submit"
                variant="primary"
                size="md"
                className="sm:px-6"
              >
                {submitted ? "Thanks!" : "Get Started"}
              </LinkButton>
            </form>

            <Link
              href="https://fr.trustpilot.com/review/trustditto.com"
              className="inline-flex items-center gap-2 text-sm font-medium text-text-primary hover:opacity-70 transition-opacity"
              target="_blank"
              rel="noreferrer noopener"
            >
              <span className="flex items-center gap-0.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <StarIcon key={i} className="text-brand-green w-4 h-4" />
                ))}
              </span>
              <span>4.6/5 on Trustpilot</span>
            </Link>
          </div>

          <div className="relative aspect-[1391/910] w-full">
            <Image
              src="https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6845a66f8a93f372dc9be585_management-hero.svg"
              alt="Ditto management system dashboard"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
