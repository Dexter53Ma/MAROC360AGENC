import Link from "next/link";
import type { ContactDict } from "@/lib/i18n/dict.types";

const DEFAULT_BREADCRUMBS_LABEL = "Get in touch";

type ContactBreadcrumbsProps = {
  dict?: Pick<ContactDict, "heroTitle">;
  locale?: "en" | "fr";
};

export function ContactBreadcrumbs({
  dict,
  locale = "en",
}: ContactBreadcrumbsProps) {
  const label = dict?.heroTitle ?? DEFAULT_BREADCRUMBS_LABEL;
  const homeHref = locale === "fr" ? "/fr" : "/en";
  const contactHref = locale === "fr" ? "/fr/contact" : "/en/contact";
  return (
    <section className="bg-brand-yellow">
      <div className="container-page">
        <div className="py-4 flex items-center gap-2 text-sm text-text-primary">
          <Link
            href={homeHref}
            className="hover:underline min-h-[44px] inline-flex items-center"
          >
            {locale === "fr" ? "Accueil" : "Home"}
          </Link>
          <span aria-hidden>/</span>
          <Link
            href={contactHref}
            className="no-underline min-h-[44px] inline-flex items-center"
            aria-current="page"
          >
            {label}
          </Link>
        </div>
      </div>
    </section>
  );
}
