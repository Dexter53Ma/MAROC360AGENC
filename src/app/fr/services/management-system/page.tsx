import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { getDict } from "@/lib/i18n/dict";
import { Footer } from "@/components/footer";
import { CtaSection } from "@/components/cta-section";
import { HeroWithIllustration } from "@/components/solutions/hero-with-illustration";
import { FeatureBlock } from "@/components/solutions/feature-block";
import { CustomersCarousel } from "@/components/solutions/customers-carousel";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl } from "@/lib/site-config";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Plateforme marketing – Maroc 360 Agency | Le moteur de croissance de votre marque",
  description:
    "Un endroit central pour toute votre connaissance marketing. Centralisez les briefs, suivez la performance et gardez une trace de chaque campagne avec la plateforme marketing de Maroc 360.",
};

const features = [
  {
    eyebrow: "Dashboard unifié",
    title: "Voyez tous vos canaux et KPI au même endroit",
    description:
      "En marketing, savoir ce qui marche, c'est déjà la moitié du chemin. Maroc 360 vous donne une vision centrale de chaque campagne, canal et KPI, pour repérer ce qui drive la croissance et ce qui mérite votre attention.",
    image: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6845a66f5477b1045463028a_management-feature-1.svg",
    imageAlt: "Aperçu du dashboard marketing unifié",
  },
  {
    eyebrow: "Suivi de performance",
    title: "Fixez de grands objectifs et regardez-les bouger en temps réel",
    description:
      "Définissez des objectifs marketing clairs — awareness, leads, ventes — et suivez leur progression en temps réel. Avec Maroc 360, vous savez toujours quelles campagnes délivrent et où réallouer votre budget.",
    image: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6845a66f9c270652d7eda46c_management-feature-2.avif",
    imageAlt: "Aperçu du suivi de performance",
  },
  {
    eyebrow: "Bibliothèque créative",
    title: "Gardez chaque brief, asset et résultat au même endroit",
    description:
      "Maroc 360 est la mémoire vivante de toutes les campagnes que vous avez menées. Retrouver un ancien brief, ressortir une pub gagnante, partager les résultats avec l'équipe ? Il suffit de demander à la plateforme.",
    image: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6845a66f7cad01a6d24095f6_management-feature-3.svg",
    imageAlt: "Aperçu de la bibliothèque créative",
  },
];

export default function ManagementSystemPage() {
  const dict = getDict("fr");
  const url = absoluteUrl("/fr/services/management-system");
  const schema = serviceSchema({
    name: "Plateforme marketing",
    description: metadata.description as string,
    url,
    inLanguage: "fr",
    category: "Technologie marketing",
    serviceType: "Plateforme marketing",
  });
  const crumbs = breadcrumbSchema([
    { name: "Accueil", item: absoluteUrl("/fr") },
    { name: "Services", item: absoluteUrl("/fr/services") },
    { name: "Plateforme marketing", item: url },
  ]);
  return (
    <>
      <Navbar dict={dict.nav} locale="fr" multiStepForm={dict.multiStepForm} />
      <main id="main" tabIndex={-1}>
        <HeroWithIllustration
          dict={{
            heading: "Le moteur de croissance de votre marque, tout au même endroit",
            body: "Fini la chasse aux briefs sur les drives ou la reconstruction de rapports à partir de rien. Maroc 360 vous donne tout ce qu'il faut pour planifier, piloter et mesurer votre marketing — là où votre équipe travaille déjà.",
            emailPlaceholder: "Votre e-mail professionnel",
            emailButton: "Démarrer",
            emailSuccess: "Merci !",
            rating: "4,9/5 sur Google Avis",
            contactLink: "/fr/contact",
          }}
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
      <JsonLd data={schema} />
      <JsonLd data={crumbs} />
    </>
  );
}
