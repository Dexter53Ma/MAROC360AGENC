import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { getDict } from "@/lib/i18n/dict";
import { Footer } from "@/components/footer";
import { CtaSection } from "@/components/cta-section";
import { Breadcrumbs } from "@/components/careers/breadcrumbs";
import { HeroMarquee } from "@/components/careers/hero-marquee";
import { TeamsCarousel } from "@/components/careers/teams-carousel";
import { VideoSection } from "@/components/careers/video-section";
import { ValuesGrid } from "@/components/careers/values-grid";
import { InterviewList } from "@/components/careers/interview-list";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl } from "@/lib/site-config";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { pageAlternates } from "@/lib/metadata-helpers";

export const metadata: Metadata = {
  title: "Carrières chez Maroc 360 Agency – Les grandes marques ne se construisent pas seules",
  description:
    "C'est l'idée au cœur de Maroc 360. Nous sommes là pour aider les gens à faire leur meilleur travail ensemble, et cela commence par notre équipe.",
  alternates: pageAlternates({ path: "/fr/careers" }),
};

export default function CareersPageFR() {
  const dict = getDict("fr");
  const url = absoluteUrl("/fr/careers");
  const schema = webPageSchema({
    id: `${url}#webpage`,
    name: metadata.title as string,
    description: metadata.description as string,
    url,
    inLanguage: "fr",
    type: "WebPage",
  });
  const crumbs = breadcrumbSchema([
    { name: "Accueil", item: absoluteUrl("/fr") },
    { name: "Carrières", item: url },
  ]);
  return (
    <>
      <Navbar dict={dict.nav} locale="fr" multiStepForm={dict.multiStepForm} />
      <main id="main" tabIndex={-1}>
        <Breadcrumbs dict={dict.careers} />
        <HeroMarquee dict={dict.careers} />
        <TeamsCarousel dict={dict.careers} />
        <VideoSection />
        <ValuesGrid dict={dict.careers} />
        <InterviewList dict={dict.careers} />
        <CtaSection dict={dict} />
      </main>
      <Footer dict={dict.footer} locale="fr" />
      <JsonLd data={schema} />
      <JsonLd data={crumbs} />
    </>
  );
}
