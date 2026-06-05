import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { getDict } from "@/lib/i18n/dict";
import { Footer } from "@/components/footer";
import { CtaSection } from "@/components/cta-section";
import { ChevronRight12 } from "@/components/icons";
import { getAllBlogSummaries } from "@/lib/blog/loader";

export const metadata: Metadata = {
  title: "Guides – Maroc 360 Agency",
  description:
    "Playbooks, frameworks et guides pratiques approfondis pour les leaders du marketing au Maroc. Stratégie, publicité payante, SEO, réseaux sociaux et contenu.",
};

interface Guide {
  slug: string;
  title: string;
  description: string;
  href: string;
  readingTime: number;
  category: string;
  publishedLabel: string;
}

const FEATURED_GUIDES: ReadonlyArray<Guide> = [
  {
    slug: "2026-marketing-playbook",
    title: "Le Playbook Marketing 2026 pour le Maroc",
    description:
      "Notre guide phare annuel. Canaux, budgets, KPI et benchmarks pour les marques marocaines en 2026. Construit à partir des données de 100+ campagnes actives.",
    href: "/fr/guides/2026-marketing-playbook",
    readingTime: 18,
    category: "Stratégie",
    publishedLabel: "Mis à jour en janvier 2026",
  },
];

export default async function GuidesIndexPage() {
  const dict = getDict("fr");
  const posts = await getAllBlogSummaries("fr");

  const guidesFromPosts: Guide[] = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    href: p.href,
    readingTime: p.readingTimeMinutes,
    category: p.category,
    publishedLabel: p.datePublishedLabel,
  }));

  return (
    <>
      <Navbar dict={dict.nav} locale="fr" multiStepForm={dict.multiStepForm} />
      <main id="main" tabIndex={-1}>
        <section className="pt-10 sm:pt-12 md:pt-20 pb-8 md:pb-12">
          <div className="container-page">
            <div className="max-w-3xl mx-auto text-center">
              <p className="eyebrow mb-4">Guides</p>
              <h1 className="heading-display text-[2.25rem] sm:text-4xl md:text-5xl lg:text-6xl mb-6 text-balance">
                Playbooks, frameworks et guides pratiques approfondis
              </h1>
              <p className="body-lg max-w-2xl mx-auto">
                Les mêmes playbooks que nous utilisons avec nos clients, distillés en guides
                que vous pouvez lire, partager et mettre en pratique. Pas de blabla, pas de
                remplissage — juste le travail.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-12 md:pb-16">
          <div className="container-page">
            <div className="grid lg:grid-cols-3 gap-6">
              {FEATURED_GUIDES.map((guide) => (
                <Link
                  key={guide.slug}
                  href={guide.href}
                  className="lift group flex flex-col gap-3 p-6 md:p-8 rounded-3xl bg-[#FFE228] text-text-primary"
                >
                  <span className="inline-flex w-fit items-center rounded-full bg-text-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-surface-primary">
                    Guide à la une
                  </span>
                  <h2 className="heading-display text-2xl md:text-3xl text-text-primary text-balance">
                    {guide.title}
                  </h2>
                  <p className="text-text-primary/90 leading-relaxed">
                    {guide.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-3 text-sm font-semibold">
                    <span>{guide.readingTime} min de lecture · {guide.publishedLabel}</span>
                    <ChevronRight12 className="transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-12 md:pb-16">
          <div className="container-page">
            <div className="flex items-end justify-between mb-6">
              <h2 className="heading-display text-2xl md:text-3xl text-text-primary">
                Tous les guides
              </h2>
              <Link
                href="/fr/blog"
                className="link-underline text-sm font-medium text-text-primary"
              >
                Parcourir le blog →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {guidesFromPosts.map((guide) => (
                <Link
                  key={guide.slug}
                  href={guide.href}
                  className="lift group flex flex-col gap-3 p-6 rounded-3xl bg-surface-tertiary border border-border-strong/10 hover:border-text-primary/30 transition-colors"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                    {guide.category}
                  </span>
                  <h3 className="font-heading text-xl md:text-2xl text-text-primary leading-snug text-balance">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-snug line-clamp-3">
                    {guide.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between text-xs text-text-secondary pt-2">
                    <span>{guide.readingTime} min de lecture</span>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-text-primary">
                      Lire
                      <ChevronRight12 className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-12 md:pb-20">
          <div className="container-page">
            <div className="max-w-3xl mx-auto text-center bg-surface-tertiary rounded-3xl p-8 md:p-12">
              <h2 className="heading-display text-2xl md:text-3xl text-text-primary mb-3">
                Besoin d&apos;un guide sur-mesure ?
              </h2>
              <p className="text-text-secondary text-base md:text-lg max-w-xl mx-auto mb-6">
                Nous créons des playbooks sur-mesure pour nos clients — stratégie, canaux,
                mesure, tout. Parlez-nous de ce sur quoi vous travaillez, et nous vous
                enverrons un brouillon.
              </p>
              <Link
                href="/fr/contact"
                className="press inline-flex items-center gap-2 rounded-full bg-text-primary px-5 py-3 text-sm font-semibold text-surface-primary"
              >
                Demander un guide sur-mesure
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
