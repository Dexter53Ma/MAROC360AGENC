import type { Metadata } from "next";
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
import { getDict } from "@/lib/i18n/dict";
import { pageAlternates } from "@/lib/metadata-helpers";

export const metadata: Metadata = {
  alternates: pageAlternates({ path: "/fr" }),
};

export default function HomePageFR() {
  const dict = getDict("fr");
  const home = dict.home;

  return (
    <>
      <Navbar dict={dict.nav} locale="fr" multiStepForm={dict.multiStepForm} />
      <main id="main" tabIndex={-1}>
        <Hero dict={home.hero} />
        <LogoStrip dict={home.logoStrip} baseBlogHref="/fr/blog" />
        <FrameworksCarousel dict={home.frameworks} />
        <HomeIllustration />
        <IntroSection dict={home.intro} />
        {home.features.map((feature, i) => (
          <FeatureSection
            key={feature.eyebrow}
            feature={feature}
            learnMoreLabel={home.learnMore}
            eager={i === 0}
          />
        ))}
        <PillIllustration />
        <ExpertiseCarousel dict={home.expertise} contactHref="/fr/contact" />
        <TestimonialsCarousel dict={home.testimonials} blogHref="/fr/blog" />
        <BlogPreview dict={home.blogPreview} />
        <CtaSection dict={dict} />
      </main>
      <Footer dict={dict.footer} locale="fr" />
    </>
  );
}
