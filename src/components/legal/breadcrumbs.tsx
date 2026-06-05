import Link from "next/link";

type LegalBreadcrumbsProps = {
  current: string;
  href: string;
  locale?: "en" | "fr";
  homeLabel?: string;
};

export function LegalBreadcrumbs({
  current,
  href,
  locale = "en",
  homeLabel,
}: LegalBreadcrumbsProps) {
  const homeHref = locale === "fr" ? "/fr" : "/en";
  const label = homeLabel ?? (locale === "fr" ? "Accueil" : "Home");
  return (
    <section className="bg-brand-yellow">
      <div className="container-page">
        <div className="py-4 flex items-center gap-2 text-sm text-text-primary">
          <Link
            href={homeHref}
            className="hover:underline min-h-[44px] inline-flex items-center"
          >
            {label}
          </Link>
          <span aria-hidden>/</span>
          <Link
            href={href}
            className="no-underline min-h-[44px] inline-flex items-center"
            aria-current="page"
          >
            {current}
          </Link>
        </div>
      </div>
    </section>
  );
}
