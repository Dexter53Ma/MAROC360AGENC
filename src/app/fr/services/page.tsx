import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { getDict } from "@/lib/i18n/dict";
import { Footer } from "@/components/footer";
import { CtaSection } from "@/components/cta-section";
import { ChevronRight12 } from "@/components/icons";

export const metadata: Metadata = {
  title: "Services – Maroc 360 Agency",
  description:
    "Stratégie, publicité payante, SEO, réseaux sociaux et créatif — tous les services dont votre marque a besoin pour grandir, délivrés par une seule équipe connectée.",
};

const services = [
  {
    title: "Plateforme marketing",
    description:
      "Un espace de travail pour chaque campagne, canal et résultat. Briefs, assets, KPI et rapports au même endroit.",
    href: "/fr/services/management-system",
  },
  {
    title: "Stratégie & Planning",
    description:
      "Feuilles de route et playbooks fondés sur la recherche, adaptés à vos objectifs, audience et budget au Maroc.",
    href: "/fr/services/strategy-planning",
  },
  {
    title: "Publicité payante",
    description:
      "Campagnes rentables sur Google, Meta et TikTok — planifiées, achetées et optimisées chaque semaine.",
    href: "/fr/services/paid-media",
  },
  {
    title: "SEO & Contenu",
    description:
      "Positionnez-vous, attirez et convertissez grâce à du contenu orienté recherche, en français, arabe et anglais.",
    href: "/fr/services/seo-content",
  },
  {
    title: "Réseaux sociaux",
    description:
      "Construisez une communauté, faites grandir vos audiences et générez du chiffre d'affaires sur les plateformes qui comptent pour votre marque.",
    href: "/fr/services/social-media",
  },
  {
    title: "Studio créatif",
    description:
      "Branding, motion et campagnes qui retiennent l'attention — du concept au lancement.",
    href: "/fr/services/creative-studio",
  },
];

export default function ServicesPage() {
  const dict = getDict("fr");
  return (
    <>
      <Navbar dict={dict.nav} locale="fr" multiStepForm={dict.multiStepForm} />
      <main id="main" tabIndex={-1}>
        <section className="pt-10 sm:pt-12 md:pt-20 pb-8 md:pb-12">
          <div className="container-page">
            <div className="max-w-3xl mx-auto text-center">
              <p className="eyebrow mb-4">Nos services</p>
              <h1 className="heading-display text-[2.25rem] sm:text-4xl md:text-5xl lg:text-6xl mb-6 text-balance">
                Tous les services dont votre marque a besoin, délivrés par une seule équipe
              </h1>
              <p className="body-lg max-w-2xl mx-auto">
                Du premier atelier stratégique au rapport de performance hebdomadaire,
                Maroc 360 couvre toute la stack marketing — pour que vous travailliez avec un
                seul partenaire, pas sept.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="container-page">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service) => (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group relative flex flex-col gap-3 p-6 rounded-3xl bg-surface-tertiary border border-border-strong/10 hover:border-text-primary/30 transition-colors"
                >
                  <h2 className="heading-display text-2xl text-text-primary">
                    {service.title}
                  </h2>
                  <p className="text-base text-text-secondary leading-snug">
                    {service.description}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-text-primary">
                    En savoir plus sur {service.title}
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
    </>
  );
}
