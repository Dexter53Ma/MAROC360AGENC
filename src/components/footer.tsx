"use client";

import Image from "next/image";
import Link from "next/link";
import { LinkedIn20 } from "@/components/icons";
import { EmailSubscribe } from "@/components/email-subscribe";
import type { FooterDict } from "@/lib/i18n/dict.types";

export function Footer({ dict, locale }: { dict: FooterDict; locale: "en" | "fr" }) {
  const homeHref = locale === "fr" ? "/fr" : "/en";
  const contactHref = locale === "fr" ? "/fr/contact" : "/en/contact";
  const privacyHref = locale === "fr" ? "/fr/privacy" : "/en/privacy";
  const termsHref = locale === "fr" ? "/fr/terms" : "/en/terms";

  return (
    <footer className="bg-surface-primary pt-14 sm:pt-20 pb-10 pb-safe">
      <div className="container-page">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 mb-12 sm:mb-16">
          <div className="lg:col-span-4 flex flex-col gap-5 sm:gap-6">
            <Link href={homeHref} aria-label={dict.columns[0] ? dict.columns[0].title : "Home"}>
              <div className="relative h-24 w-[190px] sm:h-28 sm:w-[220px]">
                <Image
                  src="/brand/maroc360-logo.png"
                  alt="Maroc 360 Agency"
                  width={533}
                  height={433}
                  className="logo-mark absolute inset-0 w-full h-full object-contain object-bottom-left"
                />
              </div>
            </Link>
            <p className="body-lg max-w-md">{dict.tagline}</p>
            <EmailSubscribe
              placeholder="your@work-email.com"
              buttonLabel="Subscribe"
              successLabel="Subscribed"
              variant="surface"
              size="md"
            />
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-8 sm:gap-y-10">
            {dict.columns.map((col) => (
              <div key={col.title} className="flex flex-col gap-3">
                <h4 className="font-semibold text-xs sm:text-sm uppercase tracking-wide">
                  {col.title}
                </h4>
                <ul className="flex flex-col gap-2">
                  {col.links.map((link) => (
                    <li key={`${link.href}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="text-sm text-text-secondary hover:text-text-primary transition-colors inline-block min-h-[28px]"
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
          <p className="text-xs sm:text-sm text-text-secondary">
            {dict.copyright}
          </p>
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            <Link href={contactHref} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
              {dict.columns[4]?.links[2]?.label ?? "Contact"}
            </Link>
            <Link href={privacyHref} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
              {dict.legalLinks[0]?.label ?? "Privacy"}
            </Link>
            <Link href={termsHref} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
              {dict.legalLinks[1]?.label ?? "Terms"}
            </Link>
            <Link
              href="https://www.linkedin.com/company/maroc360"
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
