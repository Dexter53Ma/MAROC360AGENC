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
  title: `E-commerce – ${siteConfig.name}`,
  description:
    "De l'acquisition payante à la rétention, nous aidons les marques e-commerce au Maroc à transformer leur budget publicitaire en croissance profitable et reproductible — sur Meta, Google, TikTok et email.",
  alternates: pageAlternates({ path: "/fr/industries/ecommerce" }),
  openGraph: {
    title: `E-commerce – ${siteConfig.name}`,
    description:
      "Performance marketing pour marques e-commerce marocaines — Meta, Google, TikTok et email.",
    url: absoluteUrl("/fr/industries/ecommerce"),
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6942d63b10ef5124dfea78d7_ditto_better_world_illustration_6%20-%20Grande.avif",
        width: 1200,
        height: 800,
        alt: "Dashboard de performance e-commerce avec revenu et ROAS",
      },
    ],
  },
};

const features = [
  {
    eyebrow: "Acquisition à l'échelle",
    title: "Du paid media rentable sur Meta, Google et TikTok",
    description:
      "Des campagnes pensées en marge sur contribution, pas seulement en ROAS. Enchères intelligentes, structures Advantage+ en audience large, tests créatifs à fort volume et itération hebdomadaire sur ce qui marche — sur Search, Shopping, Performance Max et la auction Meta.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6845a66f5477b1045463028a_management-feature-1.svg",
    imageAlt: "Structure de campagne paid media pour e-commerce",
  },
  {
    eyebrow: "Rétention & LTV",
    title: "Transformez les acheteurs ponctuels en clients récurrents",
    description:
      "Flux email, SMS, push et retargeting qui ramènent les clients. Programmes de fidélité, séquences post-achat et campagnes de réactivation qui démultiplient la valeur de chaque dirham d'acquisition.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6845a66f9c270652d7eda46c_management-feature-2.avif",
    imageAlt: "Flux d'automation rétention avec email et SMS",
  },
  {
    eyebrow: "SEO multilingue",
    title: "Gagnez du trafic organique en français, arabe et anglais",
    description:
      "Pages catégories, schema produit et contenu qui se positionnent sur les requêtes que les shoppers marocains tapent réellement. Du SEO multilingue (FR/AR/EN) fait dans les règles — hreflang, qualité de contenu et link building.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6845a66f7cad01a6d24095f6_management-feature-3.svg",
    imageAlt: "Dashboard SEO multilingue pour pages catégories e-commerce",
  },
];

export default function EcommercePage() {
  const dict = getDict("fr");
  const url = absoluteUrl("/fr/industries/ecommerce");
  const schema = serviceSchema({
    name: "E-commerce",
    description: metadata.description as string,
    url,
    inLanguage: "fr",
    category: "Industrie e-commerce",
    serviceType: "Marketing e-commerce",
  });
  const crumbs = breadcrumbSchema([
    { name: "Accueil", item: absoluteUrl("/fr") },
    { name: "Industries", item: absoluteUrl("/fr/industries") },
    { name: "E-commerce", item: url },
  ]);
  return (
    <>
      <Navbar dict={dict.nav} locale="fr" multiStepForm={dict.multiStepForm} />
      <main id="main" tabIndex={-1}>
        <ServiceHero
          title="Performance marketing pour marques e-commerce marocaines"
          description="De l'acquisition payante à la rétention, nous aidons les marques e-commerce au Maroc à transformer leur budget publicitaire en croissance profitable et reproductible — sur Meta, Google, TikTok et email."
          image="https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6942d63b10ef5124dfea78d7_ditto_better_world_illustration_6%20-%20Grande.avif"
          imageAlt="Dashboard de performance e-commerce avec revenu et ROAS"
        />

        <section className="pt-24 pb-8 md:pt-32 md:pb-10">
          <div className="container-page">
            <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl max-w-2xl mx-auto text-center">
              Voyez la vision d&apos;ensemble de votre croissance e-commerce et scalez en confiance
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
                Comment nous avons aidé une marque D2C de mode marocaine à réduire son CAC de 38 % et à doubler son taux d&apos;achat récurrent en 6 mois.
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
