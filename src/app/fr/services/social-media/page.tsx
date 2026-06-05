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
  title: `Réseaux sociaux – ${siteConfig.name}`,
  description:
    "Stratégie, production de contenu, community management et partenariats créateurs — le programme social complet piloté par une équipe senior qui a fait passer des marques marocaines à plusieurs millions d'abonnés et à un chiffre d'affaires significatif.",
  alternates: { canonical: absoluteUrl("/fr/services/social-media") },
  openGraph: {
    title: `Réseaux sociaux – ${siteConfig.name}`,
    description:
      "Stratégie social media, contenu, community management et créateurs — pour bâtir audience, marque et chiffre d'affaires.",
    url: absoluteUrl("/fr/services/social-media"),
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/696ea520c97cc0946ee7bef9_new_better_businesses_illustration_04.png",
        width: 1200,
        height: 800,
        alt: "Calendrier éditorial social media avec métriques d'engagement par plateforme",
      },
    ],
  },
};

const features = [
  {
    eyebrow: "Stratégie & moteur de contenu",
    title: "Une voix claire, une cadence claire, une vraie machine de production",
    description:
      "Étude d'audience, piliers de contenu, définition de la voix et un moteur de production qui sort 8 à 12 contenus par semaine sur les plateformes qui comptent pour votre marque. De la qualité à fort volume, sans brûler l'équipe.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6845a66f5477b1045463028a_management-feature-1.svg",
    imageAlt: "Framework de piliers de contenu avec mix de plateformes et cadence de publication",
  },
  {
    eyebrow: "Communauté & partenariats créateurs",
    title: "Transformez vos abonnés en communauté et vos créateurs en canal d'acquisition",
    description:
      "Community management, réponses DM et partenariats créateurs qui font de votre présence sociale un vrai canal de croissance. Des relations long terme avec des créateurs, sélectionnés pour leur pertinence, leur taux d'engagement et la sécurité de marque.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6845a66f9c270652d7eda46c_management-feature-2.avif",
    imageAlt: "Portfolio de partenariats créateurs avec recoupement d'audience et données d'engagement",
  },
  {
    eyebrow: "Mesure & amplification payante",
    title: "Des métriques sincères, une amplification payante qui performe vraiment",
    description:
      "Awareness, engagement, conversion et brand lift suivis honnêtement. Le meilleur contenu organique est amplifié en paid — pour transformer vos réseaux en canal de performance, pas seulement en vitrine.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6845a66f7cad01a6d24095f6_management-feature-3.svg",
    imageAlt: "Dashboard de performance social media avec métriques paid et organiques",
  },
];

export default function SocialMediaPage() { const dict = getDict("fr"); return (
    <>
      <Navbar dict={dict.nav} locale="fr" multiStepForm={dict.multiStepForm} />
      <main id="main" tabIndex={-1}>
        <ServiceHero
          title="Des réseaux sociaux qui bâtissent audience, marque et chiffre d'affaires"
          description="Stratégie, production de contenu, community management et partenariats créateurs — le programme social complet piloté par une équipe senior qui a fait passer des marques marocaines à plusieurs millions d'abonnés et à un chiffre d'affaires significatif."
          image="/images/hero/frameworks-hero.png"
          imageAlt="Calendrier éditorial social media avec métriques d'engagement par plateforme"
        />

        <section className="pt-24 pb-8 md:pt-32 md:pb-10">
          <div className="container-page">
            <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl max-w-2xl mx-auto text-center">
              Voyez la vision d&apos;ensemble de votre présence sociale et grandissez en confiance
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
