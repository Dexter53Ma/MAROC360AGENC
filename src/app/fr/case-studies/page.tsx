import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { getDict } from "@/lib/i18n/dict";
import { Footer } from "@/components/footer";
import { CtaSection } from "@/components/cta-section";

export const metadata: Metadata = {
  title: "Études de cas – Maroc 360 Agency",
  description:
    "Campagnes réelles, chiffres réels, résultats réels. Découvrez comment Maroc 360 a aidé des marques marocaines à grandir dans l'e-commerce, l'hôtellerie, le B2B SaaS et l'immobilier.",
};

interface CaseStudyResult {
  metric: string;
  value: string;
  detail: string;
}

interface CaseStudy {
  slug: string;
  client: string;
  industry: string;
  headline: string;
  summary: string;
  services: readonly string[];
  challenge: string;
  approach: readonly string[];
  results: ReadonlyArray<CaseStudyResult>;
  quote: { text: string; name: string; role: string };
  heroImage: string;
  heroAlt: string;
  publishedLabel: string;
}

const CASE_STUDIES: readonly CaseStudy[] = [
  {
    slug: "moroccan-fashion-d2c",
    client: "Atlas Glow",
    industry: "E-commerce · Mode D2C",
    headline:
      "Réduction du CAC de 38 % et doublement du taux d'achat récurrent en 6 mois",
    summary:
      "Une marque de mode D2C marocaine tournait à 1,6x de ROAS sur Meta Ads et brûlait ses stocks. Nous avons restructuré le compte publicitaire, reconstruit l'usine à créatifs et ajouté une couche de rétention qui a transformé les acheteurs ponctuels en une véritable communauté.",
    services: ["Publicité payante", "Studio créatif", "Rétention & CRM"],
    challenge:
      "Atlas Glow avait grandi rapidement sur Instagram, mais l'économie unitaire était cassée. Le coût d'acquisition d'un nouveau client était 1,4x supérieur au panier moyen. L'équipe tournait 6 ensembles de publicités avec 3 créatifs chacun, renouvelés tous les mois, et brûlait 250 000 MAD/mois avec peu de résultats. Le CEO voulait croître — mais les chiffres disaient stop.",
    approach: [
      "Audit du compte Meta Ads et identification des problèmes structurels : trop d'ensembles, pas assez de créatifs, et une architecture de campagne optimisée pour les mauvais événements.",
      "Reconstruction du compte autour d'une seule campagne Advantage+ Shopping avec 30+ créatifs par ensemble, renouvelés chaque semaine. Bascule de l'optimisation de « ajout au panier » vers « achat » une fois les 50+ conversions hebdomadaires atteintes.",
      "Construction d'un moteur de rétention : séquence email post-achat (5 emails sur 21 jours), séquence de win-back pour les clients inactifs (90+ jours), et un programme de fidélité récompensant les deuxième et troisième achats.",
      "Ajout de TikTok comme canal d'acquisition secondaire une fois Meta stabilisé, avec un moteur créatif piloté par des créateurs livrant 8 nouveaux contenus par semaine.",
    ],
    results: [
      {
        metric: "ROAS",
        value: "2,4x → 4,1x",
        detail: "Sous 90 jours avec la nouvelle architecture de compte",
      },
      {
        metric: "Coût d'acquisition",
        value: "−38 %",
        detail: "Tout en augmentant le budget de 250K à 480K MAD/mois",
      },
      {
        metric: "Taux d'achat récurrent",
        value: "12 % → 28 %",
        detail: "Porté par le nouveau moteur de rétention",
      },
      {
        metric: "Revenu email",
        value: "18 % du total",
        detail: "En hausse par rapport à 3 % il y a 6 mois",
      },
    ],
    quote: {
      text: "Maroc 360 n'a pas fait que optimiser nos pubs — ils ont reconstruit tout le moteur de croissance. Nous savons enfin ce qui marche et pourquoi.",
      name: "Yasmine B.",
      role: "Fondatrice, Atlas Glow",
    },
    heroImage:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6942d63b10ef5124dfea78d7_ditto_better_world_illustration_6%20-%20Grande.avif",
    heroAlt: "Étude de cas Atlas Glow e-commerce — Maroc 360",
    publishedLabel: "T1 2026",
  },
  {
    slug: "moroccan-hotel-chain",
    client: "Riad Collection",
    industry: "Hôtellerie · Groupe hôtelier",
    headline:
      "Réservations directes passées de 18 % à 47 % du chiffre d'affaires en 12 mois",
    summary:
      "Un groupe hôtelier boutique avec 8 établissements au Maroc était surdépendant de Booking.com et Expedia. Nous avons construit un moteur de réservation directe via SEO, contenu et une stratégie paid à forte intention — qui a remboursé les honoraires de l'agence dès le premier trimestre.",
    services: ["SEO & Contenu", "Publicité payante", "Identité de marque"],
    challenge:
      "Riad Collection avait une belle marque mais quasiment aucune présence organique. 82 % des réservations venaient des OTAs, qui prélevaient 18 à 22 % de commission et possédaient la relation client. Le budget marketing était consacré à 90 % à des offres promotionnelles sur les listings OTA — une course vers le bas. Les propriétaires voulaient investir dans la marque et le canal direct, mais ne savaient pas par où commencer.",
    approach: [
      "Audit de la marque et reconstruction du système d'identité visuelle pour qu'il soit prêt à être déployé sur tous les points de contact digitaux, sociaux et sur place.",
      "Construction d'un programme SEO ciblant des requêtes longue traîne à forte intention : « riad avec piscine en médina », « hôtel romantique marrakech », « hôtel famille essaouira ». Contenu approfondi et multilingue (FR/EN/AR) soutenu par une campagne agressive de netlinking local.",
      "Lancement d'une stratégie paid marque et performance : Google Search + retargeting, campagnes de marque Meta pour la notoriété, et partenariats avec des créateurs voyage sur TikTok pour la portée.",
      "Construction d'un parcours d'offres de réservation directe : garantie du meilleur tarif, surclassements gratuits pour les réservations directes, et un programme de fidélité récompensant les séjours répétés.",
    ],
    results: [
      {
        metric: "Réservations directes",
        value: "18 % → 47 %",
        detail: "Du chiffre d'affaires total, en 12 mois",
      },
      {
        metric: "Trafic organique",
        value: "3,2x",
        detail: "Croissance d'une année sur l'autre",
      },
      {
        metric: "Commissions OTA économisées",
        value: "2,4M MAD",
        detail: "Sur les 12 premiers mois",
      },
      {
        metric: "Taux de repeat en direct",
        value: "+24 %",
        detail: "Membres du programme de fidélité vs. réservations directes ponctuelles",
      },
    ],
    quote: {
      text: "Nous pensions être une entreprise hôtelière. Maroc 360 nous a aidés à comprendre que nous étions une entreprise de marque qui possède des hôtels. Le canal direct est désormais notre plus rentable.",
      name: "Karim L.",
      role: "CEO, Riad Collection",
    },
    heroImage:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/696ea520c97cc0946ee7bef9_new_better_businesses_illustration_04.png",
    heroAlt: "Étude de cas Riad Collection réservations directes — Maroc 360",
    publishedLabel: "T4 2025",
  },
  {
    slug: "casablanca-b2b-saas",
    client: "Talenta",
    industry: "B2B SaaS · HR Tech",
    headline:
      "Construction d'un pipeline de 40 SQL/mois à partir de zéro notoriété en 6 mois",
    summary:
      "Une startup B2B SaaS à Casablanca avait le product-market fit et une levée seed — mais pas de pipeline ni de notoriété au Maroc. Nous avons construit la fonction marketing de zéro : positionnement, moteur de contenu, paid, et la passabilité marketing-vente qui a produit un vrai pipeline qualifié.",
    services: ["Stratégie & Planning", "Content marketing", "Publicité payante"],
    challenge:
      "Talenta avait un excellent produit (logiciel RH pour les PME marocaines) mais aucune infrastructure marketing. Pas de site au-delà d'une landing page, pas de contenu, pas de campagnes payantes, pas de CRM. Les fondateurs vendaient à 100 % via leur réseau. Pour lever leur Series A, ils avaient besoin d'un pipeline — et ils en avaient besoin en 6 mois.",
    approach: [
      "Sprint stratégique de 3 semaines : positionnement, définition d'ICP, proposition de valeur, et un playbook clair contenu + paid + vente.",
      "Construction d'un moteur de contenu : 2 articles piliers approfondis par semaine, thought leadership des fondateurs sur LinkedIn (3 posts/semaine), un podcast avec des leaders RH marocains, et un rapport trimestriel sur les tendances RH au Maroc.",
      "Lancement d'une stratégie paid ciblée : LinkedIn pour le B2B (DRH, DAF, fondateurs d'entreprises de 50 à 500 salariés), Google Search pour les requêtes à forte intention, et une couche de retargeting sur Meta.",
      "Mise en place de la passabilité marketing-vente : CRM HubSpot, lead scoring, relance automatisée, et un pipeline review hebdomadaire avec les fondateurs.",
    ],
    results: [
      {
        metric: "Leads qualifiés",
        value: "40 SQL/mois",
        detail: "En hausse par rapport à 0 il y a 6 mois",
      },
      {
        metric: "Trafic organique",
        value: "3,5x",
        detail: "Croissance mois par mois",
      },
      {
        metric: "Valeur du pipeline",
        value: "8,5M MAD",
        detail: "Créés sur les 6 premiers mois",
      },
      {
        metric: "CAC payback",
        value: "11 mois",
        detail: "En trajectoire pour passer sous 8 mois d'ici le mois 12",
      },
    ],
    quote: {
      text: "Maroc 360 a construit la fonction marketing dont nous avions besoin pour lever notre Series A. Ils ont été un partenaire, pas un prestataire.",
      name: "Mehdi A.",
      role: "Co-fondateur & CEO, Talenta",
    },
    heroImage:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6a184a915f82cad90b79a145_ditto_better_world_illustration_6%20-%20Grande.jpeg",
    heroAlt: "Étude de cas Talenta B2B SaaS — Maroc 360",
    publishedLabel: "T3 2025",
  },
  {
    slug: "casablanca-developer",
    client: "Marina Towers",
    industry: "Immobilier · Promoteur",
    headline:
      "Réduction du coût par lead qualifié de 62 % et doublement du pipeline commercial en 9 mois",
    summary:
      "Un promoteur immobilier casablancais générait des leads, mais le coût était insoutenable et la qualité inconsistante. Nous avons reconstruit le tunnel de A à Z — paid, créatif, lead nurturing et passabilité vente — produisant 2,1x plus de leads qualifiés à moins de la moitié du coût.",
    services: ["Publicité payante", "Studio créatif", "Stratégie & Planning"],
    challenge:
      "Marina Towers avait lancé 3 projets en 5 ans, chaque fois avec une poussée marketing de 6 mois qui coûtait 8 à 12 % du chiffre d'affaires prévisionnel. La qualité des leads était inconsistante : 70 % des « leads » n'étaient en fait pas qualifiés, la vente passait 80 % de son temps à filtrer, et le coût par lead qualifié était de 4 200 MAD. Le DAF voulait des résultats, pas des excuses.",
    approach: [
      "Reconstruction du tunnel : search payante (Google + Meta), créatif de showcase de haute qualité, et un formulaire de lead qui filtrait la vraie intention d'achat (fourchette de budget, timeline, financement).",
      "Construction d'un système de lead nurturing : séquence email en 5 touches sur 14 jours, suivi WhatsApp automatisé, et un modèle de lead scoring intégré au CRM qui priorisait les leads chauds pour l'équipe commerciale.",
      "Restructuration de la passabilité vente : les leads étaient routés vers le bon commercial sous 30 minutes, avec le contexte complet (quel projet, quelle pub, quel formulaire).",
      "Ajout d'une couche de retargeting : 95 % des visiteurs du site ne convertissaient pas à la première visite. Le retargeting les a ramenés avec des créatifs et offres spécifiques au projet.",
    ],
    results: [
      {
        metric: "Coût par lead qualifié",
        value: "4 200 → 1 600 MAD",
        detail: "−62 % tout en augmentant le budget",
      },
      {
        metric: "Pipeline commercial",
        value: "2,1x",
        detail: "D'une année sur l'autre, en 9 mois",
      },
      {
        metric: "Taux lead → visite",
        value: "11 % → 34 %",
        detail: "Porté par une meilleure qualification + suivi plus rapide",
      },
      {
        metric: "Visite → réservation",
        value: "8 % → 17 %",
        detail: "Process de vente amélioré + meilleurs leads",
      },
    ],
    quote: {
      text: "Nous pensions que notre problème était les leads. Maroc 360 nous a montré que notre problème était le tunnel. Le nouveau système fait deux fois le pipeline pour moins de la moitié du coût par lead.",
      name: "Hassan T.",
      role: "Directeur marketing, Marina Towers",
    },
    heroImage:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6a1850c71817ffd03370ffa3_new_better_businesses_illustration_10.png",
    heroAlt: "Étude de cas Marina Towers immobilier — Maroc 360",
    publishedLabel: "T2 2025",
  },
];

export default function CaseStudiesPage() {
  const dict = getDict("fr");
  return (
    <>
      <Navbar dict={dict.nav} locale="fr" multiStepForm={dict.multiStepForm} />
      <main id="main" tabIndex={-1}>
        <section className="pt-10 sm:pt-12 md:pt-20 pb-8 md:pb-12">
          <div className="container-page">
            <div className="max-w-3xl mx-auto text-center">
              <p className="eyebrow mb-4">Études de cas</p>
              <h1 className="heading-display text-[2.25rem] sm:text-4xl md:text-5xl lg:text-6xl mb-6 text-balance">
                Campagnes réelles, chiffres réels, résultats réels
              </h1>
              <p className="body-lg max-w-2xl mx-auto">
                Nous nous mesurons à la seule métrique qui compte : la croissance de nos
                clients. Voici quatre histoires dont nous sommes particulièrement fiers.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-12 md:pb-20">
          <div className="container-page flex flex-col gap-16 md:gap-24">
            {CASE_STUDIES.map((study, idx) => (
              <article
                key={study.slug}
                className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-start"
              >
                <div
                  className={`lg:col-span-7 ${
                    idx % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl md:rounded-3xl bg-surface-tertiary">
                    <Image
                      src={study.heroImage}
                      alt={study.heroAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div
                  className={`lg:col-span-5 flex flex-col gap-4 ${
                    idx % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="inline-flex items-center rounded-full bg-text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-surface-primary">
                      Étude de cas
                    </span>
                    <span className="text-text-secondary font-medium">
                      {study.industry}
                    </span>
                    <span className="text-text-tertiary">·</span>
                    <span className="text-text-secondary">{study.publishedLabel}</span>
                  </div>

                  <h2 className="heading-display text-2xl md:text-3xl lg:text-4xl text-text-primary text-balance">
                    {study.headline}
                  </h2>

                  <p className="text-base text-text-secondary leading-relaxed">
                    {study.summary}
                  </p>

                  <dl className="grid grid-cols-2 gap-3 mt-2">
                    {study.results.slice(0, 4).map((r) => (
                      <div
                        key={r.metric}
                        className="rounded-2xl bg-surface-tertiary border border-text-primary/10 p-4"
                      >
                        <dt className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                          {r.metric}
                        </dt>
                        <dd className="font-heading text-2xl md:text-3xl text-text-primary mt-1">
                          {r.value}
                        </dd>
                        <dd className="text-xs text-text-secondary mt-1 leading-snug">
                          {r.detail}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <blockquote className="mt-4 border-l-2 border-brand-yellow pl-4 italic text-text-primary">
                    &laquo;&nbsp;{study.quote.text}&nbsp;&raquo;
                    <footer className="mt-2 text-sm not-italic text-text-secondary">
                      <span className="font-semibold text-text-primary">
                        {study.quote.name}
                      </span>
                      {" · "}
                      {study.quote.role}
                    </footer>
                  </blockquote>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {study.services.map((service) => (
                      <span
                        key={service}
                        className="text-xs font-semibold uppercase tracking-wider text-text-secondary bg-surface-tertiary border border-text-primary/10 rounded-full px-3 py-1"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="pb-12 md:pb-20">
          <div className="container-page">
            <div className="max-w-3xl mx-auto text-center bg-surface-tertiary rounded-3xl p-8 md:p-12">
              <h2 className="heading-display text-2xl md:text-3xl text-text-primary mb-3">
                Votre étude de cas pourrait être la prochaine
              </h2>
              <p className="text-text-secondary text-base md:text-lg max-w-xl mx-auto mb-6">
                Si vous faites grandir une marque au Maroc et que vous voulez voir votre
                histoire sur cette page, parlons-en.
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

        <CtaSection dict={dict} />
      </main>
      <Footer dict={dict.footer} locale="fr" />
    </>
  );
}
