"use client";

import { useState } from "react";
import { LinkButton } from "@/components/button";

export function SubscribeInline() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto mb-16 px-6 py-5 md:px-8 md:py-6 rounded-3xl bg-surface-tertiary">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (email) {
            setSubmitted(true);
            setEmail("");
          }
        }}
        className="flex flex-col sm:flex-row items-stretch gap-3 sm:items-center"
      >
        <p className="flex-1 text-sm text-text-primary">
          Practical CSR insights—tools, studies, and templates, in your inbox
        </p>
        <div className="flex flex-col sm:flex-row items-stretch gap-2 sm:flex-1 sm:max-w-md">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            aria-label="Your work email"
            className="flex-1 h-10 px-4 rounded-full bg-surface-primary border border-text-primary/10 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-text-primary/30"
          />
          <LinkButton
            type="submit"
            variant="primary"
            size="sm"
            className="h-10 px-5"
          >
            {submitted ? "Thanks!" : "Subscribe"}
          </LinkButton>
        </div>
      </form>
    </div>
  );
}
