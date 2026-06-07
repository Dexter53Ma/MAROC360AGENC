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

export const metadata: Metadata = {
  title: "Careers at Maroc 360 Agency – Great brands aren't built alone",
  description:
    "That's the idea at the heart of Maroc 360. We're here to help people do their best work together, and that starts with our team.",
};

export default function CareersPage() {
  const dict = getDict("en");
  const url = absoluteUrl("/en/careers");
  const schema = webPageSchema({
    id: `${url}#webpage`,
    name: metadata.title as string,
    description: metadata.description as string,
    url,
    inLanguage: "en",
    type: "WebPage",
  });
  const crumbs = breadcrumbSchema([
    { name: "Home", item: absoluteUrl("/en") },
    { name: "Careers", item: url },
  ]);
  return (
    <>
      <Navbar dict={dict.nav} locale="en" multiStepForm={dict.multiStepForm} />
      <main id="main" tabIndex={-1}>
        <Breadcrumbs dict={dict.careers} />
        <HeroMarquee dict={dict.careers} />
        <TeamsCarousel dict={dict.careers} />
        <VideoSection />
        <ValuesGrid dict={dict.careers} />
        <InterviewList dict={dict.careers} />
        <CtaSection dict={dict} />
      </main>
      <Footer dict={dict.footer} locale="en" />
      <JsonLd data={schema} />
      <JsonLd data={crumbs} />
    </>
  );
}
