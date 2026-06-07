import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { getDict } from "@/lib/i18n/dict";
import { Footer } from "@/components/footer";
import { CtaSection } from "@/components/cta-section";
import { HeroWithIllustration } from "@/components/solutions/hero-with-illustration";
import { FeatureBlock } from "@/components/solutions/feature-block";
import { CustomersCarousel } from "@/components/solutions/customers-carousel";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl } from "@/lib/site-config";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Marketing Platform – Maroc 360 Agency | Your brand's growth engine",
  description:
    "A central place for all your marketing knowledge. Centralize briefs, track performance, and keep a record of every campaign with Maroc 360's marketing platform.",
};

const features = [
  {
    eyebrow: "Unified dashboard",
    title: "See all your channels and KPIs in one place",
    description:
      "When it comes to marketing, knowing what's working is half the battle. Maroc 360 gives you a central view of every campaign, channel, and KPI, so you can spot what's driving growth and what needs attention.",
    image: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6845a66f5477b1045463028a_management-feature-1.svg",
    imageAlt: "Unified marketing dashboard preview",
  },
  {
    eyebrow: "Performance tracking",
    title: "Set big goals and watch them move in real time",
    description:
      "Set clear marketing goals—awareness, leads, sales—and watch progress in real time. With Maroc 360, you'll always know which campaigns are delivering and where to reallocate budget.",
    image: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6845a66f9c270652d7eda46c_management-feature-2.avif",
    imageAlt: "Performance tracking preview",
  },
  {
    eyebrow: "Creative library",
    title: "Keep every brief, asset, and result in one place",
    description:
      "Maroc 360 is the living history of every campaign you've run. Need to find a past brief, pull a winning ad, or share results with the team? Just ask the platform.",
    image: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6845a66f7cad01a6d24095f6_management-feature-3.svg",
    imageAlt: "Creative library preview",
  },
];

export default function ManagementSystemPage() {
  const dict = getDict("en");
  const url = absoluteUrl("/en/solutions/management-system");
  const schema = serviceSchema({
    name: "Marketing Platform",
    description: metadata.description as string,
    url,
    inLanguage: "en",
    category: "Marketing Technology",
    serviceType: "Marketing Platform",
  });
  const crumbs = breadcrumbSchema([
    { name: "Home", item: absoluteUrl("/en") },
    { name: "Solutions", item: absoluteUrl("/en/solutions") },
    { name: "Marketing Platform", item: url },
  ]);
  return (
    <>
      <Navbar dict={dict.nav} locale="en" multiStepForm={dict.multiStepForm} />
      <main id="main" tabIndex={-1}>
        <HeroWithIllustration
          dict={{
            heading: "Your brand's growth engine, all in one place",
            body: "No more chasing briefs across drives or rebuilding reports from scratch. Maroc 360 gives you everything you need to plan, run, and measure your marketing—right where your team already works.",
            emailPlaceholder: "Your work email",
            emailButton: "Get Started",
            emailSuccess: "Thanks!",
            rating: "4.9/5 on Google Reviews",
            contactLink: "/en/contact",
          }}
        />

        <section className="pt-24 pb-8 md:pt-32 md:pb-10">
          <div className="container-page">
            <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl max-w-2xl mx-auto text-center">
              See the full picture of your marketing and grow with confidence
            </h2>
          </div>
        </section>

        {features.map((feature, i) => (
          <FeatureBlock
            key={feature.eyebrow}
            eyebrow={feature.eyebrow}
            title={feature.title}
            description={feature.description}
            image={feature.image}
            imageAlt={feature.imageAlt}
            reverse={i % 2 === 1}
            eager={i === 0}
          />
        ))}

        <CustomersCarousel dict={dict.services} />
        <CtaSection dict={dict} />
      </main>
      <Footer dict={dict.footer} locale="en" />
      <JsonLd data={schema} />
      <JsonLd data={crumbs} />
    </>
  );
}
