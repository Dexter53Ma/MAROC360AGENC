"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LinkedIn20 } from "@/components/icons";
import { LinkButton } from "@/components/button";

const columns = [
  {
    title: "Services",
    links: [
      { label: "Strategy & Planning", href: "/en/solutions/management-system" },
      { label: "Paid Media", href: "/en/solutions/management-system" },
      { label: "SEO & Content", href: "/en/solutions/management-system" },
      { label: "Social Media", href: "/en/solutions/management-system" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Marketing Platform", href: "/en/solutions/management-system" },
      { label: "Performance Tracking", href: "/en/solutions/management-system" },
      { label: "Creative Studio", href: "/en/solutions/management-system" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "E-commerce", href: "/en/solutions/management-system" },
      { label: "Hospitality & Travel", href: "/en/solutions/management-system" },
      { label: "Real Estate", href: "/en/solutions/management-system" },
      { label: "Professional Services", href: "/en/solutions/management-system" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/en/resources/blog" },
      { label: "Case Studies", href: "/en/resources/blog" },
      { label: "Guides", href: "/en/resources/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Manifesto", href: "/en/manifesto" },
      { label: "Careers", href: "/en/careers" },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");

  return (
    <footer className="bg-surface-primary pt-20 pb-10">
      <div className="container-page">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 mb-16">
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link href="/en" aria-label="Maroc 360 Agency home">
              <div className="relative h-24 w-[190px]">
                <Image
                  src="/brand/maroc360-logo.png"
                  alt="Maroc 360 Agency"
                  width={533}
                  height={433}
                  className="absolute inset-0 w-full h-full object-contain object-bottom-left"
                />
              </div>
            </Link>
            <p className="body-lg max-w-md">
              Digital marketing insights—playbooks, case studies, and trend reports, in your inbox.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!email) return;
                setStatus("ok");
                setEmail("");
              }}
              className="flex flex-col sm:flex-row items-stretch gap-2 max-w-md"
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
              <LinkButton type="submit" variant="primary" size="md">
                Subscribe
              </LinkButton>
            </form>
            {status === "ok" && (
              <p className="text-sm text-brand-green">Thank you for subscribing!</p>
            )}
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-8">
            {columns.map((col) => (
              <div key={col.title} className="flex flex-col gap-3">
                <h4 className="font-semibold text-sm uppercase tracking-wide">
                  {col.title}
                </h4>
                <ul className="flex flex-col gap-2">
                  {col.links.map((link) => (
                    <li key={`${link.href}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-text-primary/10 pt-6 flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-text-secondary">
            © 2026 Maroc 360 Agency — All rights reserved
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/en/contact"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/en/contact"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/en/contact"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/en/contact"
              aria-label="Maroc 360 Agency on LinkedIn"
              className="text-text-primary hover:opacity-70 transition-opacity"
            >
              <LinkedIn20 />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
