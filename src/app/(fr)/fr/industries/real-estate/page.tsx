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
import { pageAlternates } from "@/lib/metadata-helpers";

export const metadata: Metadata = {
  title: `Immobilier – ${siteConfig.name}`,
  description:
    "L'immobilier est un cycle long, à forts enjeux. Nous aidons les promoteurs et agences à générer des leads qualifiés, à bâtir une confiance durable et à signer plus de deals — en paid, en organique et en contenu.",
  alternates: pageAlternates({ path: "/fr/industries/real-estate" }),
  openGraph: {
    title: `Immobilier – ${siteConfig.name}`,
    description:
      "Génération de leads et construction de marque pour promoteurs immobiliers au Maroc.",
    url: absoluteUrl("/fr/industries/real-estate"),
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6a1850c71817ffd03370ffa3_new_better_businesses_illustration_10.png",
        width: 1200,
        height: 800,
        alt: "Dashboard marketing immobilier avec leads qualifiés et pipeline",
      },
    ],
  },
};

const features = [
  {
    eyebrow: "Paid search à forte intention",
    title: "Captez la demande au moment où les acheteurs se manifestent",
    description:
      "Google Ads, retargeting Meta et pré-roll YouTube pensés pour le funnel immobilier. Stratégie de mots-clés construite autour de l'intention d'achat, avec landing pages et formulaires qui convertissent.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6845a66f5477b1045463028a_management-feature-1.svg",
    imageAlt: "Structure de campagne Google Ads pour immobilier",
  },
  {
    eyebrow: "Créatif de showcase",
    title: "Un marketing de projet qui capte l'attention et inspire confiance",
    description:
      "Photographie, vidéo, drone, visites 3D et tous les assets créatifs qui font sortir un projet du lot. Du concept au lancement, avec la discipline de production pour livrer à l'heure, à chaque fois.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6845a66f9c270652d7eda46c_management-feature-2.avif",
    imageAlt: "Créatif de showcase immobilier avec photo et visites 3D",
  },
  {
    eyebrow: "Lead nurturing",
    title: "Transformez les leads en contrats signés, pas seulement en contacts",
    description:
      "Intégration CRM, scoring de leads, relance automatisée et l'alignement sales-marketing qui transforme un lead marketing en contrat signé. Nous travaillons avec votre équipe commerciale pour fermer la boucle.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6845a66f7cad01a6d24095f6_management-feature-3.svg",
    imageAlt: "Workflow de lead nurturing avec intégration CRM",
  },
];

export default function RealEstatePage() {
  const dict = getDict("fr");
  const url = absoluteUrl("/fr/industries/real-estate");
  const schema = serviceSchema({
    name: "Immobilier",
    description: metadata.description as string,
    url,
    inLanguage: "fr",
    category: "Industrie immobilière",
    serviceType: "Marketing immobilier",
  });
  const crumbs = breadcrumbSchema([
    { name: "Accueil", item: absoluteUrl("/fr") },
    { name: "Industries", item: absoluteUrl("/fr/industries") },
    { name: "Immobilier", item: url },
  ]);
  return (
    <>
      <Navbar dict={dict.nav} locale="fr" multiStepForm={dict.multiStepForm} />
      <main id="main" tabIndex={-1}>
        <ServiceHero
          title="Génération de leads et construction de marque pour promoteurs immobiliers"
          description="L'immobilier est un cycle long, à forts enjeux. Nous aidons les promoteurs et agences à générer des leads qualifiés, à bâtir une confiance durable et à signer plus de deals — en paid, en organique et en contenu."
          image="https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6a1850c71817ffd03370ffa3_new_better_businesses_illustration_10.png"
          imageAlt="Dashboard marketing immobilier avec leads qualifiés et pipeline"
        />

        <section className="pt-24 pb-8 md:pt-32 md:pb-10">
          <div className="container-page">
            <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl max-w-2xl mx-auto text-center">
              Voyez la vision d&apos;ensemble de votre croissance immobilière et grandissez en confiance
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
                Comment un promoteur casablancais a réduit son coût par lead qualifié de 62 % et doublé son pipeline commercial en 9 mois.
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
