import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { getDict } from "@/lib/i18n/dict";
import { Footer } from "@/components/footer";
import { CtaSection } from "@/components/cta-section";
import { BlogBreadcrumbs } from "@/components/blog/blog-breadcrumbs";
import { absoluteUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Le Playbook Marketing 2026 pour le Maroc – Maroc 360",
  description:
    "Notre guide phare annuel. Canaux, budgets, KPI et benchmarks pour les marques marocaines en 2026 — construit à partir des données de plus de 100 campagnes actives.",
  alternates: { canonical: absoluteUrl("/fr/guides/2026-marketing-playbook") },
};

const sections = [
  {
    eyebrow: "Section 01",
    title: "L'état du marketing au Maroc en 2026",
    summary:
      "Ce qui a changé en 12 mois, ce qui marche et ce qu'il faut ignorer. Une vision terrain tirée de plus de 100 campagnes actives et des agences, équipes internes et fondateurs qui les pilotent.",
    points: [
      "Où vont réellement les budgets marketing marocains (et où ils ne vont pas).",
      "Les plateformes qui ont grandi, celles qui ont calé, et celles qui ont disparu.",
      "Le plus grand basculement de 2026 : le créatif devient le nouveau ciblage.",
      "Pourquoi la fausse opposition entre brand et performance n'en est pas une.",
    ],
  },
  {
    eyebrow: "Section 02",
    title: "Mix de canaux et allocation budgétaire",
    summary:
      "Comment répartir votre budget 2026 entre paid, organique, brand et rétention — par maturité, par catégorie et selon l'économie unitaire de votre business.",
    points: [
      "Le template budgétaire 40/30/20/10 pour les marques marocaines en croissance.",
      "Quand sur-investir dans la marque, quand sur-investir dans la performance, et quand faire les deux.",
      "Le mix adapté à l'e-commerce, au B2B SaaS, à l'hôtellerie et aux services professionnels.",
      "Comment défendre votre budget en comité de direction.",
    ],
  },
  {
    eyebrow: "Section 03",
    title: "Les quatre principes opérationnels",
    summary:
      "Les quatre principes que nous appliquons avec chaque client Maroc 360 pour garder un marketing focus, accountable et cumulatif.",
    points: [
      "Principe 1 : la stratégie est dans la cadence. 90 jours battent 12 mois.",
      "Principe 2 : le seul moat durable, c'est la qualité créative. Le ciblage se loue.",
      "Principe 3 : la mesure est un système, pas un dashboard.",
      "Principe 4 : la marque est un indicateur avancé de la performance. Traitez-la comme tel.",
    ],
  },
  {
    eyebrow: "Section 04",
    title: "KPI et stack de mesure",
    summary:
      "Les métriques qui comptent, celles qui trompent, et la petite poignée de chiffres que nous reportons au leadership chaque lundi matin.",
    points: [
      "Les 5 chiffres du dashboard de tout CMO.",
      "Comment croiser les conversions reportées par les plateformes, le revenu réel et l'incrémentalité.",
      "Quand faire confiance au last-click, quand l'ignorer, et quand investir dans des tests d'incrémentalité.",
      "Un template simple de reporting hebdomadaire à copier.",
    ],
  },
  {
    eyebrow: "Section 05",
    title: "Le template de roadmap 12 mois",
    summary:
      "Un template opérationnel pour planifier l'année : thèmes trimestriels, priorités mensuelles, exécution hebdomadaire. Le même template que nous utilisons en interne et avec nos clients.",
    points: [
      "Le plan annuel en 4 cases : marque, performance, rétention, innovation.",
      "Comment séquencer les campagnes sur l'année pour un effet cumulatif.",
      "Quand embaucher, quand couper, et quand tout repenser.",
      "Le plan d'onboarding 30-60-90 jours pour un nouveau responsable marketing.",
    ],
  },
  {
    eyebrow: "Section 06",
    title: "Pièges classiques et comment les éviter",
    summary:
      "Les 8 erreurs les plus fréquentes que nous observons dans les programmes marketing marocains en 2026 — et ce qu'il faut faire à la place.",
    points: [
      "Erreur 1 : courir après la portée au lieu du chiffre d'affaires.",
      "Erreur 2 : mesurer sur les chiffres reportés par les plateformes.",
      "Erreur 3 : couper le budget marque en premier.",
      "Erreur 4 : traiter les réseaux sociaux comme un canal de diffusion.",
      "...et les quatre autres.",
    ],
  },
];

export default function MarketingPlaybookGuidePage() {
  return (
    <>
      <Navbar dict={getDict("fr").nav} locale="fr" multiStepForm={getDict("fr").multiStepForm} />
      <main id="main" tabIndex={-1}>
        <div className="container-page">
          <BlogBreadcrumbs
            items={[
              { label: "Accueil", href: "/fr" },
              { label: "Guides", href: "/fr/guides" },
              { label: "Playbook Marketing 2026" },
            ]}
          />
        </div>

        <section className="pb-10">
          <div className="container-page max-w-3xl">
            <span className="inline-flex w-fit items-center rounded-full bg-text-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-surface-primary mb-4">
              Guide à la une · Édition 2026
            </span>
            <h1 className="heading-display text-3xl md:text-5xl lg:text-6xl text-text-primary mb-4">
              Le Playbook Marketing 2026 pour le Maroc
            </h1>
            <p className="body-lg text-text-secondary">
              Canaux, budgets, KPI et benchmarks pour les marques marocaines en 2026 — construit à partir des données de plus de 100 campagnes actives. Le même playbook que nous utilisons avec nos clients, dans un guide à lire, partager et mettre en pratique.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-text-secondary">
              <span>18 min de lecture</span>
              <span>·</span>
              <span>Mis à jour en janvier 2026</span>
              <span>·</span>
              <span>Équipe Stratégie, Maroc 360</span>
            </div>
          </div>
        </section>

        <section className="pb-12 md:pb-20">
          <div className="container-page max-w-3xl flex flex-col gap-10">
            {sections.map((section) => (
              <article
                key={section.title}
                className="rounded-3xl bg-surface-tertiary border border-text-primary/10 p-6 md:p-10"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
                  {section.eyebrow}
                </p>
                <h2 className="heading-display text-2xl md:text-3xl text-text-primary mt-2 mb-3">
                  {section.title}
                </h2>
                <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-4">
                  {section.summary}
                </p>
                <ul className="flex flex-col gap-2">
                  {section.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-text-primary text-sm md:text-base"
                    >
                      <span
                        aria-hidden
                        className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-brand-green"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="pb-12 md:pb-20">
          <div className="container-page max-w-3xl">
            <div className="rounded-3xl bg-[#FFE228] p-8 md:p-12 text-text-primary">
              <h2 className="heading-display text-2xl md:text-3xl mb-3">
                Vous voulez la suite du playbook ?
              </h2>
              <p className="text-base md:text-lg max-w-xl mb-6">
                Le Playbook Marketing 2026 complet pour le Maroc fait 42 pages, avec des templates détaillés par canal, des tableaux de budget, des dashboards KPI et la roadmap 12 mois. Nous le partageons dans le cadre de conversations sérieuses — réservez un appel et nous vous envoyons le document.
              </p>
              <Link
                href="/fr/contact"
                className="press inline-flex items-center gap-2 rounded-full bg-text-primary px-5 py-3 text-sm font-semibold text-surface-primary"
              >
                Réserver un appel stratégique
              </Link>
            </div>
          </div>
        </section>

        <CtaSection dict={getDict("fr")} />
      </main>
      <Footer dict={getDict("fr").footer} locale="fr" />
    </>
  );
}
