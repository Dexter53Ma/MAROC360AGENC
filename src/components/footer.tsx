"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LinkedIn20 } from "@/components/icons";
import { LinkButton } from "@/components/button";

const columns = [
  {
    title: "EcoVadis",
    links: [
      { label: "EcoVadis platform", href: "/en/frameworks/ecovadis" },
      { label: "EcoVadis score", href: "/en/frameworks/ecovadis/score" },
      { label: "EcoVadis medals", href: "/en/frameworks/ecovadis/medals" },
    ],
  },
  {
    title: "ISO 14001",
    links: [
      { label: "ISO 14001 certification", href: "/en/frameworks/iso-14001" },
      { label: "ISO 14001 requirements", href: "/en/frameworks/iso-14001/requirements" },
    ],
  },
  {
    title: "CDP",
    links: [
      { label: "CDP climate change", href: "/en/frameworks/cdp" },
      { label: "CDP disclosure", href: "/en/frameworks/cdp/disclosure" },
    ],
  },
  {
    title: "CSRD / VSME",
    links: [
      { label: "CSRD compliance", href: "/en/frameworks/csrd" },
      { label: "VSME standard", href: "/en/frameworks/vsme" },
      { label: "Double materiality", href: "/en/frameworks/csrd/double-materiality" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Management system", href: "/en/solutions/management-system" },
      { label: "Compliance questionnaires", href: "/en/solutions/compliance-questionnaires" },
      { label: "AI solutions", href: "/en/solutions/ai-solutions" },
      { label: "Supplier engagement", href: "/en/solutions/supplier-engagement" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/en/resources/blog" },
      { label: "Guides", href: "/en/resources/guides" },
      { label: "News", href: "/en/resources/news" },
      { label: "Customer stories", href: "/en/customer-stories" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/en/about" },
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
            <Link href="/en" aria-label="Ditto home">
              <Image
                src="/brand/ditto-logo.svg"
                alt="Ditto"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <p className="body-lg max-w-md">
              Practical CSR insights — tools, studies, and templates, in your inbox.
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

          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
            {columns.map((col) => (
              <div key={col.title} className="flex flex-col gap-3">
                <h4 className="font-semibold text-sm uppercase tracking-wide">
                  {col.title}
                </h4>
                <ul className="flex flex-col gap-2">
                  {col.links.map((link) => (
                    <li key={link.href}>
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
            © 2026 Ditto — All rights reserved
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/en/legal"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Legal
            </Link>
            <Link
              href="/en/privacy"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/en/terms"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Terms
            </Link>
            <Link
              href="https://www.linkedin.com/company/trustditto"
              aria-label="Ditto on LinkedIn"
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
