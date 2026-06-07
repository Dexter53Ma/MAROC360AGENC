import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { getDict } from "@/lib/i18n/dict";
import { Footer } from "@/components/footer";
import { CtaSection } from "@/components/cta-section";
import { ServiceHero } from "@/components/solutions/service-hero";
import { FeatureBlock } from "@/components/solutions/feature-block";
import { CustomersCarousel } from "@/components/solutions/customers-carousel";
import { absoluteUrl, siteConfig } from "@/lib/site-config";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: `Hôtellerie & Voyage – ${siteConfig.name}`,
  description:
    "Hôtels, riads et marques de voyage au Maroc — nous vous aidons à gagner des réservations directes, à bâtir la fidélité et à réduire la dépendance aux OTA et aux plateformes tierces.",
  alternates: { canonical: absoluteUrl("/fr/industries/hospitality-travel") },
  openGraph: {
    title: `Hôtellerie & Voyage – ${siteConfig.name}`,
    description:
      "Réservations directes et fidélité pour marques hôtelières et de voyage au Maroc.",
    url: absoluteUrl("/fr/industries/hospitality-travel"),
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/696ea520c97cc0946ee7bef9_new_better_businesses_illustration_04.png",
        width: 1200,
        height: 800,
        alt: "Dashboard marketing hôtellerie avec conversion réservation directe",
      },
    ],
  },
};

const features = [
  {
    eyebrow: "Moteur de réservation directe",
    title: "Convertissez plus de visiteurs en réservations directes",
    description:
      "SEO, paid search et optimisation on-site qui font de votre site de marque un vrai canal de réservation. Réduisez les commissions OTA, développez le revenu direct et reprenez la main sur la relation client dès le premier clic.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6845a66f5477b1045463028a_management-feature-1.svg",
    imageAlt: "Funnel de réservation directe de la recherche à la confirmation",
  },
  {
    eyebrow: "Storytelling visuel",
    title: "Du contenu social et créateur qui vend l'expérience",
    description:
      "Des contenus Instagram, TikTok et YouTube qui font ce que les brochures n'ont jamais su faire : donner envie de vivre l'expérience avant de réserver. Partenariats créateurs, campagnes UGC et un moteur de contenu qui sort 8 à 12 pièces par semaine.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6845a66f9c270652d7eda46c_management-feature-2.avif",
    imageAlt: "Calendrier de contenu social pour marque hôtelière",
  },
  {
    eyebrow: "Campagnes saisonnières",
    title: "Planifiez l'année, déployez le mois, apprenez la semaine",
    description:
      "Plan de campagne annuel, exécution mensuelle, revues de performance hebdomadaires. Poussées saisonnières (été, Ramadan, fin d'année) avec créatif, offres et budgets pensés en amont.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6845a66f7cad01a6d24095f6_management-feature-3.svg",
    imageAlt: "Calendrier de campagne saisonnière et allocation de budget",
  },
];

export default function HospitalityTravelPage() {
  const dict = getDict("fr");
  const url = absoluteUrl("/fr/industries/hospitality-travel");
  const schema = serviceSchema({
    name: "Hôtellerie & Voyage",
    description: metadata.description as string,
    url,
    inLanguage: "fr",
    category: "Industrie hôtellerie & voyage",
    serviceType: "Marketing hôtellerie & voyage",
  });
  const crumbs = breadcrumbSchema([
    { name: "Accueil", item: absoluteUrl("/fr") },
    { name: "Industries", item: absoluteUrl("/fr/industries") },
    { name: "Hôtellerie & Voyage", item: url },
  ]);
  return (
    <>
      <Navbar dict={dict.nav} locale="fr" multiStepForm={dict.multiStepForm} />
      <main id="main" tabIndex={-1}>
        <ServiceHero
          title="Réservations directes et fidélité pour les marques de l'hôtellerie"
          description="Hôtels, riads et marques de voyage au Maroc — nous vous aidons à gagner des réservations directes, à bâtir la fidélité et à réduire la dépendance aux OTA et aux plateformes tierces."
          image="https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/696ea520c97cc0946ee7bef9_new_better_businesses_illustration_04.png"
          imageAlt="Dashboard marketing hôtellerie avec conversion réservation directe"
        />

        <section className="pt-24 pb-8 md:pt-32 md:pb-10">
          <div className="container-page">
            <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl max-w-2xl mx-auto text-center">
              Voyez la vision d&apos;ensemble de votre croissance hôtellerie et grandissez en confiance
            </h2>
          </div>
        </section>

        {features.map((feature, i) => (
          <FeatureBlock
            key={feature.eyebrow}
            eyebrow={feature.eyebrow}
            title={feature.title}
            description={feature.description}
            image={feature.image}
            imageAlt={feature.imageAlt}
            reverse={i % 2 === 1}
            eager={i === 0}
          />
        ))}

        <section className="section-y">
          <div className="container-page">
            <div className="max-w-3xl mx-auto text-center bg-surface-tertiary rounded-3xl p-8 md:p-12">
              <p className="eyebrow mb-3">Étude de cas</p>
              <p className="text-xl md:text-2xl font-heading text-text-primary mb-6 text-balance">
                Comment une chaîne hôtelière marocaine a fait passer ses réservations directes de 18 % à 47 % du chiffre d&apos;affaires total en 12 mois.
              </p>
              <Link
                href="/fr/case-studies"
                className="press inline-flex items-center gap-2 rounded-full bg-text-primary px-5 py-3 text-sm font-semibold text-surface-primary"
              >
                Voir toutes les études de cas
              </Link>
            </div>
          </div>
        </section>

        <CustomersCarousel dict={dict.services} />
        <CtaSection dict={dict} />
      </main>
      <Footer dict={dict.footer} locale="fr" />
      <JsonLd data={schema} />
      <JsonLd data={crumbs} />
    </>
  );
}
