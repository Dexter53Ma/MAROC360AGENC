import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { JsonLd } from "@/components/json-ld";
import { pageAlternates } from "@/lib/metadata-helpers";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Maroc 360 Agency, a full-service digital marketing agency based in Morocco. Meet our team and discover our mission to help brands grow.",
  alternates: pageAlternates({ path: "/en/about" }),
  openGraph: {
    title: "About Us | Maroc 360 Agency",
    description:
      "Learn about Maroc 360 Agency, a full-service digital marketing agency based in Morocco.",
    url: `${siteConfig.url}/en/about`,
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Maroc 360 Agency",
  description: metadata.description,
  url: `${siteConfig.url}/en/about`,
  mainEntity: {
    "@type": "Organization",
    name: "Maroc 360 Agency",
    url: siteConfig.url,
    description: siteConfig.description,
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutSchema} />
      <main className="min-h-screen">
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-8 text-4xl font-bold tracking-tight md:text-5xl">
              About Maroc 360 Agency
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground">
                We&apos;re a full-service digital marketing agency based in Morocco,
                helping brands grow with strategy, creative, paid media, SEO,
                social, and content that delivers measurable results.
              </p>

              <h2>Our Mission</h2>
              <p>
                At Maroc 360, we believe every brand deserves a comprehensive
                digital strategy that drives real growth. Our mission is to
                empower businesses in Morocco and beyond with data-driven
                marketing solutions that deliver measurable ROI.
              </p>

              <h2>What We Do</h2>
              <p>
                We offer a complete suite of digital marketing services:
              </p>
              <ul>
                <li>
                  <strong>Strategy:</strong> Digital marketing strategy, brand
                  positioning, market research, and competitive analysis.
                </li>
                <li>
                  <strong>Creative:</strong> Brand identity, graphic design, video
                  production, and content creation.
                </li>
                <li>
                  <strong>Paid Media:</strong> Google Ads, Meta Ads, LinkedIn Ads,
                  programmatic advertising, and campaign optimization.
                </li>
                <li>
                  <strong>SEO:</strong> Technical SEO, on-page optimization, link
                  building, local SEO, and content strategy.
                </li>
                <li>
                  <strong>Social Media:</strong> Community management, social
                  strategy, influencer marketing, and social advertising.
                </li>
                <li>
                  <strong>Content:</strong> Blog writing, email marketing,
                  copywriting, content calendars, and editorial strategy.
                </li>
              </ul>

              <h2>Why Choose Us</h2>
              <p>
                With years of experience serving clients across Morocco, France,
                and the MENA region, we bring a unique blend of local expertise
                and global standards. Our team of experts is passionate about
                delivering creative excellence and measurable results.
              </p>

              <h2>Our Values</h2>
              <ul>
                <li>
                  <strong>Data-Driven:</strong> Every decision is backed by data
                  and analytics.
                </li>
                <li>
                  <strong>Creative Excellence:</strong> We push boundaries to
                  create compelling campaigns.
                </li>
                <li>
                  <strong>Transparency:</strong> Clear reporting and honest
                  communication.
                </li>
                <li>
                  <strong>Results-Focused:</strong> We measure success by your
                  growth.
                </li>
              </ul>

              <h2>Get in Touch</h2>
              <p>
                Ready to grow your brand?{" "}
                <Link href="/en/contact">Contact us today</Link> to discuss your
                digital marketing needs.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
