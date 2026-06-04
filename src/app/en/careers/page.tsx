import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CtaSection } from "@/components/cta-section";
import { Breadcrumbs } from "@/components/careers/breadcrumbs";
import { HeroMarquee } from "@/components/careers/hero-marquee";
import { TeamsCarousel } from "@/components/careers/teams-carousel";
import { VideoSection } from "@/components/careers/video-section";
import { ValuesGrid } from "@/components/careers/values-grid";
import { InterviewList } from "@/components/careers/interview-list";

export const metadata: Metadata = {
  title: "Careers at Ditto – Great businesses aren't built alone",
  description:
    "That's the idea at the heart of Ditto. We're here to help people do their best work together, and that starts with our team.",
};

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main>
        <Breadcrumbs />
        <HeroMarquee />
        <TeamsCarousel />
        <VideoSection />
        <ValuesGrid />
        <InterviewList />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
