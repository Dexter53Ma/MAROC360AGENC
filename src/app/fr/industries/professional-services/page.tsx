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
  title: `Services professionnels – ${siteConfig.name}`,
  description:
    "Cabinets d'avocats, conseils, advisors financiers, agences — nous aidons les firmes de services professionnels à bâtir leur autorité, à générer des leads qualifiés et à remporter les missions qui comptent.",
  alternates: { canonical: absoluteUrl("/fr/industries/professional-services") },
  openGraph: {
    title: `Services professionnels – ${siteConfig.name}`,
    description:
      "Autorité et génération de leads pour cabinets de services professionnels au Maroc.",
    url: absoluteUrl("/fr/industries/professional-services"),
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6a184a915f82cad90b79a145_ditto_better_world_illustration_6%20-%20Grande.jpeg",
        width: 1200,
        height: 800,
        alt: "Marketing services professionnels avec contenu thought leadership",
      },
    ],
  },
};

const features = [
  {
    eyebrow: "Thought leadership LinkedIn",
    title: "Bâtissez votre autorité dans les cercles où vos acheteurs évoluent",
    description:
      "Contenu LinkedIn, personal branding des associés et la discipline éditoriale pour apparaître régulièrement avec de l'insight, pas du bruit. La bonne stratégie transforme vos équipes en voix les plus crédibles de leur catégorie.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6845a66f5477b1045463028a_management-feature-1.svg",
    imageAlt: "Stratégie de contenu thought leadership LinkedIn",
  },
  {
    eyebrow: "SEO long-form",
    title: "Positionnez-vous sur les vraies questions que se posent vos acheteurs",
    description:
      "Articles de fond, études de cas et pages piliers qui captent le trafic organique sur les requêtes les plus stratégiques de votre pratique. Un SEO conçu pour le cycle long de la vente en services professionnels.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6845a66f9c270652d7eda46c_management-feature-2.avif",
    imageAlt: "Contenu SEO long-form pour services professionnels",
  },
  {
    eyebrow: "Programmes de parrainage & partenaires",
    title: "Transformez une belle mission en pipeline régulier",
    description:
      "Programmes de parrainage, réseaux de partenaires et le travail systématique pour rester top-of-mind avec les gens qui vous connaissent déjà. Les meilleurs leads en services professionnels viennent de gens qui vous font déjà confiance.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6845a66f7cad01a6d24095f6_management-feature-3.svg",
    imageAlt: "Conception de programme de parrainage et réseau de partenaires",
  },
];

export default function ProfessionalServicesPage() {
  const dict = getDict("fr");
  const url = absoluteUrl("/fr/industries/professional-services");
  const schema = serviceSchema({
    name: "Services professionnels",
    description: metadata.description as string,
    url,
    inLanguage: "fr",
    category: "Industrie services professionnels",
    serviceType: "Marketing services professionnels",
  });
  const crumbs = breadcrumbSchema([
    { name: "Accueil", item: absoluteUrl("/fr") },
    { name: "Industries", item: absoluteUrl("/fr/industries") },
    { name: "Services professionnels", item: url },
  ]);
  return (
    <>
      <Navbar dict={dict.nav} locale="fr" multiStepForm={dict.multiStepForm} />
      <main id="main" tabIndex={-1}>
        <ServiceHero
          title="Autorité et génération de leads pour les services professionnels"
          description="Cabinets d'avocats, conseils, advisors financiers, agences — nous aidons les firmes de services professionnels à bâtir leur autorité, à générer des leads qualifiés et à remporter les missions qui comptent."
          image="https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6a184a915f82cad90b79a145_ditto_better_world_illustration_6%20-%20Grande.jpeg"
          imageAlt="Marketing services professionnels avec contenu thought leadership"
        />

        <section className="pt-24 pb-8 md:pt-32 md:pb-10">
          <div className="container-page">
            <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl max-w-2xl mx-auto text-center">
              Voyez la vision d&apos;ensemble de votre croissance en services professionnels et grandissez en confiance
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
                Comment un cabinet d&apos;avocats casablancais a triplé ses leads qualifiés en 12 mois grâce au contenu, au SEO et au thought leadership LinkedIn.
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
