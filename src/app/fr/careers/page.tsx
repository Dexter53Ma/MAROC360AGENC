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

export const metadata: Metadata = {
  title: "Carrières chez Maroc 360 Agency – Les grandes marques ne se construisent pas seules",
  description:
    "C'est l'idée au cœur de Maroc 360. Nous aidons les gens à donner le meilleur d'eux-mêmes, ensemble — et cela commence par notre équipe.",
};

export default function CareersPageFR() {
  const dict = getDict("fr");
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
    </>
  );
}
