import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { getDict } from "@/lib/i18n/dict";
import { Footer } from "@/components/footer";
import { CtaSection } from "@/components/cta-section";
import { ServiceHero } from "@/components/solutions/service-hero";
import { FeatureBlock } from "@/components/solutions/feature-block";
import { CustomersCarousel } from "@/components/solutions/customers-carousel";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Stratégie & Planning – ${siteConfig.name}`,
  description:
    "Feuilles de route étayées par la recherche, stratégie de canaux et frameworks KPI adaptés au marché marocain — pour que chaque dirham de budget marketing travaille à un objectif clair.",
  alternates: { canonical: absoluteUrl("/fr/services/strategy-planning") },
  openGraph: {
    title: `Stratégie & Planning – ${siteConfig.name}`,
    description:
      "Feuilles de route étayées par la recherche, stratégie de canaux et frameworks KPI adaptés au marché marocain.",
    url: absoluteUrl("/fr/services/strategy-planning"),
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6a1850c71817ffd03370ffa3_new_better_businesses_illustration_10.png",
        width: 1200,
        height: 800,
        alt: "Roadmap de stratégie marketing avec canaux, KPI et jalons",
      },
    ],
  },
};

const features = [
  {
    eyebrow: "Étude d'audience et de marché",
    title: "Sachez exactement à qui vous parlez — et à qui vous ne parlez pas",
    description:
      "Nous combinons entretiens clients, données de recherche, social listening et analyse concurrentielle pour dresser un portrait clair de votre vraie audience : son langage, ses plateformes, ses critères de décision et les déclencheurs qui la font passer de la découverte à l'achat.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6845a66f5477b1045463028a_management-feature-1.svg",
    imageAlt: "Dashboard d'étude d'audience avec segments de personas et signaux comportementaux",
  },
  {
    eyebrow: "Stratégie de canaux et de budget",
    title: "Choisissez les bons canaux et placez le budget là où il compte",
    description:
      "Nous concevons un mix de canaux adapté à votre maturité, à votre économie unitaire et à votre audience. SEO, publicité payante, réseaux sociaux, contenu, email — chacun avec un rôle clair, une ligne de budget définie et un indicateur de succès précis.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6845a66f9c270652d7eda46c_management-feature-2.avif",
    imageAlt: "Dashboard de planification du mix de canaux avec allocation budgétaire par étape du funnel",
  },
  {
    eyebrow: "Roadmap et cadence opérationnelle",
    title: "Une stratégie 12 mois qui survit aux 90 premiers jours",
    description:
      "Nous traduisons la stratégie en roadmap trimestrielle, avec des priorités hebdomadaires, des revues mensuelles et des points de recalibrage trimestriels. Votre équipe sait toujours quoi faire cette semaine — et pourquoi.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6845a66f7cad01a6d24095f6_management-feature-3.svg",
    imageAlt: "Roadmap marketing trimestrielle avec jalons, responsables et KPI",
  },
];

export default function StrategyPlanningPage() { const dict = getDict("fr"); return (
    <>
      <Navbar dict={dict.nav} locale="fr" multiStepForm={dict.multiStepForm} />
      <main id="main" tabIndex={-1}>
        <ServiceHero
          title="Une stratégie qui transforme le marketing en croissance mesurable"
          description="Feuilles de route étayées par la recherche, stratégie de canaux et frameworks KPI adaptés au marché marocain — pour que chaque dirham de budget marketing travaille à un objectif clair."
          image="https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6a1850c71817ffd03370ffa3_new_better_businesses_illustration_10.png"
          imageAlt="Roadmap de stratégie marketing avec canaux, KPI et jalons"
        />

        <section className="pt-24 pb-8 md:pt-32 md:pb-10">
          <div className="container-page">
            <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl max-w-2xl mx-auto text-center">
              Voyez la vision d&apos;ensemble de votre marketing et grandissez en confiance
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
    </>
  );
}
