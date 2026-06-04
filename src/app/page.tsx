import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { LogoStrip } from "@/components/logo-strip";
import { FrameworksCarousel } from "@/components/frameworks-carousel";
import { HomeIllustration } from "@/components/home-illustration";
import { IntroSection } from "@/components/intro-section";
import { FeatureSection } from "@/components/feature-section";
import { PillIllustration } from "@/components/pill-illustration";
import { ExpertiseCarousel } from "@/components/expertise-carousel";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { BlogPreview } from "@/components/blog-preview";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

const features = [
  {
    eyebrow: "Marketing platform",
    title: "One workspace for every campaign, channel, and result",
    description:
      "Maroc 360 is the single source of truth for your marketing. Briefs, assets, KPIs, and reports all live in one place, so your team spends less time chasing files and more time shipping work that grows the brand.",
    href: "/en/solutions/management-system",
    image: "/images/features/management-system.avif",
    imageAlt: "Marketing platform illustration",
  },
  {
    eyebrow: "Performance reporting",
    title: "Reports your CMO actually wants to read",
    description:
      "Maroc 360 pulls data from every channel and turns it into clean, weekly performance reports. Spend less time in spreadsheets and more time making decisions that move the needle.",
    href: "/en/solutions/management-system",
    image: "/images/features/questionnaire-automation.avif",
    imageAlt: "Performance reporting illustration",
  },
  {
    eyebrow: "AI-assisted creative",
    title: "Brief, generate, and iterate in hours, not weeks",
    description:
      "Our strategists and creative leads use AI to draft concepts, audience angles, and copy faster—so you get more tested ideas, sharper messaging, and campaigns that launch sooner.",
    href: "/en/solutions/management-system",
    image: "/images/features/ai-embedded.avif",
    imageAlt: "AI-assisted creative illustration",
  },
  {
    eyebrow: "Creator partnerships",
    title: "Tap into Morocco's top creators and media partners",
    description:
      "Your brand is shaped by the partners you choose. We connect you with vetted influencers, publishers, and media partners across Morocco and the MENA region to extend your reach authentically.",
    href: "/en/solutions/management-system",
    image: "/images/features/supplier-engagement.avif",
    imageAlt: "Creator partnerships illustration",
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LogoStrip />
        <FrameworksCarousel />
        <HomeIllustration />
        <IntroSection />
        {features.map((feature, i) => (
          <FeatureSection
            key={feature.eyebrow}
            feature={feature}
            eager={i === 0}
          />
        ))}
        <PillIllustration />
        <ExpertiseCarousel />
        <TestimonialsCarousel />
        <BlogPreview />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
