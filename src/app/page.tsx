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
    eyebrow: "Management system",
    title: "An AI-powered central place for all your CSR knowledge",
    description:
      "Ditto is a single source of truth for your team's CSR and compliance data, so you can easily search, collaborate, and improve over time.",
    href: "/en/solutions/management-system",
    image: "/images/features/management-system.avif",
    imageAlt: "Management system illustration",
  },
  {
    eyebrow: "Questionnaire automation",
    title: "Answer questionnaires and RFPs automatically",
    description:
      "Ditto organizes your data and our AI assistants generate answers from your knowledge base to pre-fill questionnaires, forms, and RFPs, all with just the click of a button.",
    href: "/en/solutions/compliance-questionnaires",
    image: "/images/features/questionnaire-automation.avif",
    imageAlt: "Questionnaire automation illustration",
  },
  {
    eyebrow: "AI and embedded intelligence",
    title: "Ask Ditto for insights and areas to improve",
    description:
      "Ditto uses AI to understand your unique data in the context of industry best practices and frameworks, so it can answer questions and surface recommendations proactively.",
    href: "/en/solutions/ai-solutions",
    image: "/images/features/ai-embedded.avif",
    imageAlt: "AI and embedded intelligence illustration",
  },
  {
    eyebrow: "Supplier engagement",
    title: "Help your partners extend your impact",
    description:
      "Your partners are a reflection of your business. Help them become their best with improved CSR practices and ratings.",
    href: "/en/solutions/supplier-engagement",
    image: "/images/features/supplier-engagement.avif",
    imageAlt: "Supplier engagement illustration",
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
            key={feature.href}
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
