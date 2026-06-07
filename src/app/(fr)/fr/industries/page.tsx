import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { getDict } from "@/lib/i18n/dict";
import { Footer } from "@/components/footer";
import { CtaSection } from "@/components/cta-section";
import { ChevronRight12 } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl } from "@/lib/site-config";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { pageAlternates } from "@/lib/metadata-helpers";

export const metadata: Metadata = {
  title: "Secteurs – Maroc 360 Agency",
  description:
    "Marketing spécialisé pour l'e-commerce, l'hôtellerie, l'immobilier et les services professionnels au Maroc. Playbooks, créatif et mesure spécifiques à chaque secteur.",
  alternates: pageAlternates({ path: "/fr/industries" }),
};

interface Industry {
  slug: string;
  navLabel: string;
  href: string;
  description: string;
}

const INDUSTRIES: readonly Industry[] = [
  {
    slug: "ecommerce",
    navLabel: "E-commerce",
    href: "/fr/industries/ecommerce",
    description:
      "De l'acquisition payante à la rétention, nous aidons les marques e-commerce au Maroc à transformer leurs dépenses publicitaires en croissance profitable et reproductible — sur Meta, Google, TikTok et email.",
  },
  {
    slug: "hospitality-travel",
    navLabel: "Hôtellerie & Voyage",
    href: "/fr/industries/hospitality-travel",
    description:
      "Hôtels, riads et marques de voyage à travers le Maroc — nous vous aidons à gagner des réservations directes, bâtir la fidélité et réduire la dépendance aux OTAs et plateformes tierces.",
  },
  {
    slug: "real-estate",
    navLabel: "Immobilier",
    href: "/fr/industries/real-estate",
    description:
      "L'immobilier est une vente à cycle long et à forts enjeux. Nous aidons les promoteurs et agences à générer des leads qualifiés, bâtir une confiance durable et signer plus de deals — en paid, organique et contenu.",
  },
  {
    slug: "professional-services",
    navLabel: "Services professionnels",
    href: "/fr/industries/professional-services",
    description:
      "Cabinets d'avocats, conseils, advisors financiers, agences — nous aidons les firmes de services professionnels à bâtir leur autorité, générer des leads qualifiés et remporter les missions qui comptent.",
  },
];

export default function IndustriesIndexPage() {
  const dict = getDict("fr");
  const url = absoluteUrl("/fr/industries");
  const schema = webPageSchema({
    id: `${url}#webpage`,
    name: metadata.title as string,
    description: metadata.description as string,
    url,
    inLanguage: "fr",
    type: "CollectionPage",
  });
  const crumbs = breadcrumbSchema([
    { name: "Accueil", item: absoluteUrl("/fr") },
    { name: "Secteurs", item: url },
  ]);
  return (
    <>
      <Navbar dict={dict.nav} locale="fr" multiStepForm={dict.multiStepForm} />
      <main id="main" tabIndex={-1}>
        <section className="pt-10 sm:pt-12 md:pt-20 pb-8 md:pb-12">
          <div className="container-page">
            <div className="max-w-3xl mx-auto text-center">
              <p className="eyebrow mb-4">Secteurs</p>
              <h1 className="heading-display text-[2.25rem] sm:text-4xl md:text-5xl lg:text-6xl mb-6 text-balance">
                Un marketing spécialisé pour les secteurs que nous connaissons le mieux
              </h1>
              <p className="body-lg max-w-2xl mx-auto">
                Nous ne travaillons pas avec tout le monde. Nous travaillons avec les
                catégories où nous avons une expérience approfondie et des playbooks
                éprouvés — pour que la stratégie que nous livrons soit celle qui marche.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="container-page">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {INDUSTRIES.map((industry) => (
                <Link
                  key={industry.slug}
                  href={industry.href}
                  className="group relative flex flex-col gap-3 p-6 rounded-3xl bg-surface-tertiary border border-border-strong/10 hover:border-text-primary/30 transition-colors"
                >
                  <h2 className="heading-display text-2xl text-text-primary">
                    {industry.navLabel}
                  </h2>
                  <p className="text-base text-text-secondary leading-snug">
                    {industry.description}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-text-primary">
                    En savoir plus sur {industry.navLabel}
                    <ChevronRight12 className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CtaSection dict={dict} />
      </main>
      <Footer dict={dict.footer} locale="fr" />
      <JsonLd data={schema} />
      <JsonLd data={crumbs} />
    </>
  );
}
