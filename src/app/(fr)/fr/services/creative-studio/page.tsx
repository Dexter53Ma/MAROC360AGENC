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
import { pageAlternates } from "@/lib/metadata-helpers";

export const metadata: Metadata = {
  title: `Studio créatif – ${siteConfig.name}`,
  description:
    "Branding, systèmes d'identité, concepts de campagne, motion et design — le travail créatif qui rend votre marque reconnaissable et votre marketing efficace. Des directeurs artistiques seniors, designers et motion designers qui connaissent le marché marocain.",
  alternates: pageAlternates({ path: "/fr/services/creative-studio" }),
  openGraph: {
    title: `Studio créatif – ${siteConfig.name}`,
    description:
      "Branding, motion et campagnes qui captent l'attention et font bouger le business.",
    url: absoluteUrl("/fr/services/creative-studio"),
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/695d0b0a2c306512ed87e240_ditto_better_businesses_illustration_2%20-%20Grande.avif",
        width: 1200,
        height: 800,
        alt: "Système d'identité de marque avec logo, palette de couleurs, typographie et applications",
      },
    ],
  },
};

const features = [
  {
    eyebrow: "Identité de marque & systèmes",
    title: "Une identité de marque qui fonctionne sur tous les points de contact",
    description:
      "Travail de marque piloté par la stratégie : positionnement, naming, systèmes de logo, couleurs, typographie, style photographique et charte de marque. Conçu pour s'adapter au packaging, au digital, au retail et aux campagnes — et pour s'appliquer de façon cohérente pendant des années.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6845a66f5477b1045463028a_management-feature-1.svg",
    imageAlt: "Moodboard d'identité de marque avec logo, couleurs, typographie et applications",
  },
  {
    eyebrow: "Campagnes & concepts",
    title: "Des idées fortes qui deviennent des campagnes réelles et mesurables",
    description:
      "Concepts de campagne, direction artistique, copywriting et production. Nous apportons la réflexion stratégique et le savoir-faire pour transformer un insight de marque en campagne réelle, sur les réseaux, en paid, en OOH et au-delà.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6845a66f9c270652d7eda46c_management-feature-2.avif",
    imageAlt: "Board de concept de campagne avec direction artistique et applications multi-canales",
  },
  {
    eyebrow: "Motion, vidéo & design",
    title: "La capacité de production derrière chaque canal",
    description:
      "Motion design, production vidéo, photographie, systèmes de design et la production créative quotidienne qui alimente vos canaux. Direction artistique senior, délais rapides, et un style qui colle à votre marque.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6845a66f7cad01a6d24095f6_management-feature-3.svg",
    imageAlt: "Espace de production motion et design avec assets de marque",
  },
];

export default function CreativeStudioPage() {
  const dict = getDict("fr");
  const url = absoluteUrl("/fr/services/creative-studio");
  const schema = serviceSchema({
    name: "Studio créatif",
    description: metadata.description as string,
    url,
    inLanguage: "fr",
    category: "Création",
    serviceType: "Studio créatif",
  });
  const crumbs = breadcrumbSchema([
    { name: "Accueil", item: absoluteUrl("/fr") },
    { name: "Services", item: absoluteUrl("/fr/services") },
    { name: "Studio créatif", item: url },
  ]);
  return (
    <>
      <Navbar dict={dict.nav} locale="fr" multiStepForm={dict.multiStepForm} />
      <main id="main" tabIndex={-1}>
        <ServiceHero
          title="Du créatif qui capte l'attention et fait bouger le business"
          description="Branding, systèmes d'identité, concepts de campagne, motion et design — le travail créatif qui rend votre marque reconnaissable et votre marketing efficace. Des directeurs artistiques seniors, designers et motion designers qui connaissent le marché marocain."
          image="/images/hero/frameworks-hero.png"
          imageAlt="Système d'identité de marque avec logo, palette de couleurs, typographie et applications"
        />

        <section className="pt-24 pb-8 md:pt-32 md:pb-10">
          <div className="container-page">
            <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl max-w-2xl mx-auto text-center">
              Voyez la vision d&apos;ensemble de votre moteur créatif et grandissez en confiance
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
