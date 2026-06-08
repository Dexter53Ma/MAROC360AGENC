import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { JsonLd } from "@/components/json-ld";
import { pageAlternates } from "@/lib/metadata-helpers";

export const metadata: Metadata = {
  title: "À Propos",
  description:
    "Découvrez Maroc 360 Agency, une agence de marketing digital 360° basée au Maroc. Rencontrez notre équipe et découvrez notre mission.",
  alternates: pageAlternates({ path: "/fr/about" }),
  openGraph: {
    title: "À Propos | Maroc 360 Agency",
    description:
      "Découvrez Maroc 360 Agency, une agence de marketing digital 360° basée au Maroc.",
    url: `${siteConfig.url}/fr/about`,
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "À Propos de Maroc 360 Agency",
  description: metadata.description,
  url: `${siteConfig.url}/fr/about`,
  inLanguage: "fr",
  mainEntity: {
    "@type": "Organization",
    name: "Maroc 360 Agency",
    url: siteConfig.url,
    description: siteConfig.description,
  },
};

export default function AboutPageFr() {
  return (
    <>
      <JsonLd data={aboutSchema} />
      <main className="min-h-screen">
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-8 text-4xl font-bold tracking-tight md:text-5xl">
              À Propos de Maroc 360 Agency
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground">
                Nous sommes une agence de marketing digital 360° basée au Maroc,
                accompagnant les marques dans leur croissance grâce à la
                stratégie, le créatif, la publicité payante, le SEO, les réseaux
                sociaux et le contenu qui génèrent des résultats mesurables.
              </p>

              <h2>Notre Mission</h2>
              <p>
                Chez Maroc 360, nous croyons que chaque marque mérite une
                stratégie digitale globale qui stimule une croissance réelle.
                Notre mission est d&apos;accompagner les entreprises au-delà avec
                des solutions marketing basées sur les données qui génèrent un
                ROI mesurable.
              </p>

              <h2>Ce Que Nous Faisons</h2>
              <p>
                Nous offrons une gamme complète de services de marketing digital
                :
              </p>
              <ul>
                <li>
                  <strong>Stratégie :</strong> Stratégie de marketing digital,
                  positionnement de marque, études de marché et analyse
                  concurrentielle.
                </li>
                <li>
                  <strong>Créatif :</strong> Identité de marque, design graphique,
                  production vidéo et création de contenu.
                </li>
                <li>
                  <strong>Médias Payants :</strong> Google Ads, Meta Ads, LinkedIn
                  Ads, publicité programmatique et optimisation des campagnes.
                </li>
                <li>
                  <strong>SEO :</strong> SEO technique, optimisation on-page,
                  link building, SEO local et stratégie de contenu.
                </li>
                <li>
                  <strong>Réseaux Sociaux :</strong> Gestion de communauté,
                  stratégie sociale, marketing d&apos;influence et publicité
                  sociale.
                </li>
                <li>
                  <strong>Contenu :</strong> Rédaction de blog, email marketing,
                  copywriting, calendriers de contenu et stratégie éditoriale.
                </li>
              </ul>

              <h2>Pourquoi Nous Choisir</h2>
              <p>
                Avec des années d&apos;expérience au service de clients au Maroc,
                en France et dans la région MENA, nous apportons un mélange
                unique d&apos;expertise locale et de standards mondiaux. Notre
                équipe d&apos;experts est passionnée par l&apos;excellence créative et les
                résultats mesurables.
              </p>

              <h2>Nos Valeurs</h2>
              <ul>
                <li>
                  <strong>Basé sur les Données :</strong> Chaque décision est
                  étayée par des données et des analyses.
                </li>
                <li>
                  <strong>Excellence Créative :</strong> Nous repoussons les
                  limites pour créer des campagnes convaincantes.
                </li>
                <li>
                  <strong>Transparence :</strong> Rapports clairs et
                  communication honnête.
                </li>
                <li>
                  <strong>Focus Résultats :</strong> Nous mesurons le succès par
                  votre croissance.
                </li>
              </ul>

              <h2>Contactez-Nous</h2>
              <p>
                Prêt à développer votre marque ?{" "}
                <Link href="/fr/contact">Contactez-nous dès aujourd&apos;hui</Link> pour
                discuter de vos besoins en marketing digital.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
