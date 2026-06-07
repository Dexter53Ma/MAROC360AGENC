import type { Metadata } from "next";
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
  title: `SEO & Contenu – ${siteConfig.name}`,
  description:
    "Nous aidons les marques marocaines à atteindre le sommet de Google en français, arabe et anglais — et à transformer cette visibilité en leads qualifiés, en ventes et en autorité de marque.",
  alternates: { canonical: absoluteUrl("/fr/services/seo-content") },
  openGraph: {
    title: `SEO & Contenu – ${siteConfig.name}`,
    description:
      "SEO multilingue, contenu orienté recherche et link building pour marques marocaines.",
    url: absoluteUrl("/fr/services/seo-content"),
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6970ff9bf4ef80b4ce269d2b_ditto_better_businesses_illustration_7%20-%20Grande.jpeg",
        width: 1200,
        height: 800,
        alt: "Dashboard SEO avec positions de mots-clés et tendances de trafic organique",
      },
    ],
  },
};

const features = [
  {
    eyebrow: "SEO technique & local",
    title: "Les fondations sur lesquelles tout le reste se construit",
    description:
      "Vitesse du site, expérience mobile, données structurées, hreflang, citations locales, Google Business Profile — tout le travail technique et local qui rend votre site visible, rapide et digne de confiance aux yeux des utilisateurs comme de Google. Audit, correction, suivi.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6845a66f5477b1045463028a_management-feature-1.svg",
    imageAlt: "Dashboard d'audit SEO technique avec vitesse, schema et indexation",
  },
  {
    eyebrow: "Contenu qui se positionne et convertit",
    title: "Des articles qui génèrent du trafic aujourd'hui et de l'autorité pour des années",
    description:
      "Recherche de mots-clés, briefs éditoriaux et production conçus pour ranker sur les requêtes que vos clients tapent réellement. Multilingue (FR/AR/EN), approfondi, pensé pour être le meilleur résultat de la page — pas un énième billet de blog.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6845a66f9c270652d7eda46c_management-feature-2.avif",
    imageAlt: "Calendrier éditorial avec mots-clés cibles et projections de trafic",
  },
  {
    eyebrow: "Autorité & link building",
    title: "Gagnez des liens depuis les publications et partenaires qui font bouger les classements",
    description:
      "RP digitales, stories data-led, partenariats et relations presse au Maroc qui décrochent des backlinks de qualité depuis les domaines en lesquels Google a confiance. Pas de PBN, pas de réseaux de liens — juste de l'autorité réelle, construite dans la durée.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6845a66f7cad01a6d24095f6_management-feature-3.svg",
    imageAlt: "Profil de backlinks avec domaines référents et scores d'autorité",
  },
];

export default function SeoContentPage() {
  const dict = getDict("fr");
  const url = absoluteUrl("/fr/services/seo-content");
  const schema = serviceSchema({
    name: "SEO & Contenu",
    description: metadata.description as string,
    url,
    inLanguage: "fr",
    category: "Marketing digital",
    serviceType: "SEO & Contenu",
  });
  const crumbs = breadcrumbSchema([
    { name: "Accueil", item: absoluteUrl("/fr") },
    { name: "Services", item: absoluteUrl("/fr/services") },
    { name: "SEO & Contenu", item: url },
  ]);
  return (
    <>
      <Navbar dict={dict.nav} locale="fr" multiStepForm={dict.multiStepForm} />
      <main id="main" tabIndex={-1}>
        <ServiceHero
          title="Du SEO et du contenu qui se cumulent pendant des années, pas des semaines"
          description="Nous aidons les marques marocaines à atteindre le sommet de Google en français, arabe et anglais — et à transformer cette visibilité en leads qualifiés, en ventes et en autorité de marque. Du contenu orienté recherche, du SEO technique et du link building fait par des gens qui connaissent le marché local."
          image="/images/hero/frameworks-hero.png"
          imageAlt="Dashboard SEO avec positions de mots-clés et tendances de trafic organique"
        />

        <section className="pt-24 pb-8 md:pt-32 md:pb-10">
          <div className="container-page">
            <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl max-w-2xl mx-auto text-center">
              Voyez la vision d&apos;ensemble de votre visibilité search et grandissez en confiance
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

        <CustomersCarousel dict={dict.services} />
        <CtaSection dict={dict} />
      </main>
      <Footer dict={dict.footer} locale="fr" />
      <JsonLd data={schema} />
      <JsonLd data={crumbs} />
    </>
  );
}
