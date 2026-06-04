"use client";

import { useState } from "react";
import { LinkButton } from "@/components/button";

export function CtaSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="section-y">
      <div className="container-page">
        <div className="relative bg-surface-tertiary rounded-[3rem] lg:rounded-[5rem] px-6 py-16 md:px-12 md:py-20 lg:px-20 lg:py-24 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            aria-hidden
          >
            <svg
              viewBox="0 0 1000 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <g style={{ mixBlendMode: "multiply" }}>
                <circle cx="100" cy="320" r="80" fill="#FFE228" />
                <circle cx="900" cy="80" r="120" fill="#59E25D" />
                <circle cx="500" cy="200" r="60" fill="#E261E5" />
              </g>
            </svg>
          </div>

          <div className="relative flex flex-col items-center text-center gap-6 max-w-2xl mx-auto">
            <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl">
              Ready to get compliant? Ditto.
            </h2>
            <p className="body-lg">
              Turn your CSR program into a strategic advantage with a compliance copilot that&apos;s with you
              every step of the way.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSubmitted(true);
              }}
              className="flex flex-col sm:flex-row items-stretch gap-2 w-full max-w-xl mt-4"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your work email"
                aria-label="Your work email"
                className="flex-1 h-12 px-5 rounded-full bg-surface-primary border border-text-primary/10 text-base text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-text-primary/30"
              />
              <LinkButton type="submit" variant="primary" size="md" className="sm:px-6">
                {submitted ? "Thanks!" : "Get Started"}
              </LinkButton>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
