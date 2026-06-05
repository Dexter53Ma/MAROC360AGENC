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
  title: `Publicité payante – ${siteConfig.name}`,
  description:
    "Nous planifions, achetons et optimisons des campagnes sur Google, Meta et TikTok avec la discipline d'une équipe senior intégrée et l'expertise d'une agence spécialiste. Chaque dirham est rattaché à un résultat business.",
  alternates: { canonical: absoluteUrl("/fr/services/paid-media") },
  openGraph: {
    title: `Publicité payante – ${siteConfig.name}`,
    description:
      "Des campagnes payantes rentables sur Google, Meta et TikTok — chaque dirham rattaché à un résultat business.",
    url: absoluteUrl("/fr/services/paid-media"),
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6a184a915f82cad90b79a145_ditto_better_world_illustration_6%20-%20Grande.jpeg",
        width: 1200,
        height: 800,
        alt: "Dashboard de campagne paid media avec performance Google, Meta et TikTok",
      },
    ],
  },
};

const features = [
  {
    eyebrow: "Search & Shopping",
    title: "Captez l'intention au moment où vos clients se manifestent",
    description:
      "Des campagnes Google Search, Performance Max et Shopping construites autour de vos mots-clés les plus rentables, de vos produits à plus forte marge et des moments où vos clients cherchent activement ce que vous vendez. Discipline de mots-clés stricte, données de conversion réelles et enchères qui protègent la marge.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6845a66f5477b1045463028a_management-feature-1.svg",
    imageAlt: "Structure de campagne Google Ads avec termes de recherche et groupes de produits",
  },
  {
    eyebrow: "Social paid (Meta & TikTok)",
    title: "Touchez la bonne audience avec un créatif qui capte l'attention",
    description:
      "Des campagnes Meta et TikTok pensées pour la performance, pas seulement la portée. Structures d'audiences intelligentes, frameworks de tests créatifs et itération hebdomadaire sur ce qui fonctionne. On avance vite, on coupe ce qui ne marche pas, on double la mise sur ce qui marche.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6845a66f9c270652d7eda46c_management-feature-2.avif",
    imageAlt: "Comparaison de performance pub Meta et TikTok par audience et créatif",
  },
  {
    eyebrow: "Mesure & incrementality",
    title: "Sachez ce qui marche vraiment, pas seulement ce qui est reporté",
    description:
      "Tracking server-side, études de lift de conversion et tests d'incrémentalité. Nous ne faisons pas confiance au dashboard des plateformes — nous croisons revenu réel, conversions réelles et incrément réel, pour que vous décidiez sur des faits, pas sur des attributions enjolivées.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6845a66f7cad01a6d24095f6_management-feature-3.svg",
    imageAlt: "Dashboard de mesure d'incrémentalité avec lift de conversion et tests holdout",
  },
];

export default function PaidMediaPage() { const dict = getDict("fr"); return (
    <>
      <Navbar dict={dict.nav} locale="fr" multiStepForm={dict.multiStepForm} />
      <main id="main" tabIndex={-1}>
        <ServiceHero
          title="De la publicité payante qui transforme le budget en chiffre d'affaires, pas seulement en clics"
          description="Nous planifions, achetons et optimisons des campagnes sur Google, Meta et TikTok avec la discipline d'une équipe senior intégrée et l'expertise d'une agence spécialiste. Chaque dirham est rattaché à un résultat business."
          image="/images/hero/frameworks-hero.png"
          imageAlt="Dashboard de campagne paid media avec performance Google, Meta et TikTok"
        />

        <section className="pt-24 pb-8 md:pt-32 md:pb-10">
          <div className="container-page">
            <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl max-w-2xl mx-auto text-center">
              Voyez la vision d&apos;ensemble de votre paid media et grandissez en confiance
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
