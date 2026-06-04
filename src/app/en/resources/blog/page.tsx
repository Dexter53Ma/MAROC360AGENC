import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FeaturedPost } from "@/components/blog/featured-post";
import { FilterTabs } from "@/components/blog/filter-tabs";
import { PostsGrid } from "@/components/blog/posts-grid";
import { SubscribeInline } from "@/components/blog/subscribe-inline";
import type { BlogPost } from "@/types/blog";

export const metadata = {
  title: "Resources & Blog | Ditto",
  description:
    "Practical CSR insights — guides, articles, and case studies on EcoVadis, CSRD, ISO, and CDP from the Ditto team.",
};

const posts: BlogPost[] = [
  {
    title: "ESG: Definition, Criteria and Challenges",
    description:
      "ESG — Environment, Social, Governance — structures the sustainable transformation of companies. It encompasses the practices, policies and indicators that help reconcile economic performance with positive impact on society and the planet.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6a1850c71817ffd03370ffa3_new_better_businesses_illustration_10.png",
    imageAlt: "Infographic showing the three ESG pillars: Environment, Social, Governance",
    href: "/en/resources/blog/esg-definition-criteria-challenges",
    category: "Blog",
    featured: true,
  },
  {
    title: "CSR: A Clear Definition and Scope",
    description:
      "Corporate Social Responsibility (CSR) structures an organisation's commitment to sustainable and ethical development. Its scope, built on precise principles, connects strategic management, measurable performance and regulatory compliance.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6a184a915f82cad90b79a145_ditto_better_world_illustration_6%20-%20Grande.jpeg",
    imageAlt: "Definition and scope of corporate social responsibility in business",
    href: "/en/resources/blog/csr-definition-scope",
    category: "Blog",
  },
  {
    title: "What is Corporate Social Responsibility?",
    description:
      "Corporate Social Responsibility (CSR) structures an organisation's commitment to society and the environment. Understanding its foundations, its impact on compliance and CSR performance helps build a credible, long-term sustainability strategy.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6970ff9bf4ef80b4ce269d2b_ditto_better_businesses_illustration_7%20-%20Grande.jpeg",
    imageAlt: "Illustration of a company integrating corporate social responsibility into its strategy",
    href: "/en/resources/blog/corporate-social-responsibility-definition",
    category: "Blog",
  },
  {
    title: "What is CSR performance?",
    description:
      "CSR performance reflects a company's ability to turn its sustainability commitments into measurable, lasting results across environmental, social and governance dimensions. This guide clarifies the difference with a CSR approach, covers the key KPIs, major frameworks and continuous improvement levers.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/696ea520c97cc0946ee7bef9_new_better_businesses_illustration_04.png",
    imageAlt: "CSR performance diagram with ESG indicators for businesses",
    href: "/en/resources/blog/csr-performance",
    category: "Blog",
  },
  {
    title:
      "How to make the most of your CSR commitments — Lessons from our Lyon roundtable",
    description:
      "On March 17th, Ditto hosted its first CSR afterwork in Lyon, together with VERACY. Around twenty professionals gathered to tackle a question that comes up constantly with our clients: how do you structure and communicate your CSR commitments as an SME or mid-sized company? Three key lessons emerged from the discussion.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/69cbf6e3c98e9e31f4bd7485_IMG_4109.jpeg",
    imageAlt: "CSR roundtable in Lyon — Ditto and VERACY afterwork event, March 2026",
    href: "/en/resources/blog/csr-roundtable-lyon-commitments",
    category: "Blog",
  },
  {
    title:
      "Mastering ISO Compliance in Biotech & Medtech: The Critical Role of Global Regulatory Monitoring",
    description:
      "Missing a single regulatory update can mean delayed product launches and risks to patient safety. Meet Qalico — Ditto's specialized compliance monitoring engine built for life sciences.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/69cb8a1a3cd9022dfcea8b8c_1768810480327.jpeg",
    imageAlt:
      "Qalico by Ditto – Global Regulatory Monitoring for Biotech and Medtech ISO Compliance",
    href: "/en/resources/blog/mastering-iso-compliance-biotech-medtech",
    category: "Other",
  },
  {
    title:
      "CDP: definition, purpose, how it works, and why it matters for companies",
    description:
      "In this article, we explain the Carbon Disclosure Project (CDP), how it works in 2026, and the key levers to improve your score.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/694c04c336a030107a9b3ba3_asset_article_13.avif",
    imageAlt: "CDP – Carbon Disclosure Project",
    href: "/en/resources/blog/cdp-definition-purpose",
    category: "CDP",
  },
  {
    title: "CSR Assessment: Understand, Measure and Structure Your CSR Strategy",
    description:
      "A CSR assessment helps measure the maturity and structure of a company's CSR approach. This article explains key pillars, indicators and CSR maturity levels to move from an intuitive approach to a structured, well-managed CSR strategy.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/695d0b0a2c306512ed87e240_ditto_better_businesses_illustration_2%20-%20Grande.avif",
    imageAlt: "Illustration explaining CSR assessment and CSR maturity in companies",
    href: "/en/resources/blog/csr-assessment",
    category: "Blog",
  },
  {
    title: "Carbon Footprint in Business: A Step-by-Step Guide",
    description:
      "Discover practical advice for measuring and reducing your GHG emissions step by step, from data collection to action planning.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6942d63b10ef5124dfea78d7_ditto_better_world_illustration_6%20-%20Grande.avif",
    imageAlt: "Carbon Footprint in Business",
    href: "/en/resources/blog/company-carbon-footprint-step-by-step",
    category: "Blog",
  },
];

const featured = posts.find((p) => p.featured) ?? posts[0];
const rest = posts.filter((p) => p !== featured);

export default function BlogPage() {
  return (
    <>
      <Navbar />

      <main>
        <div className="container-page pt-8">
          <nav aria-label="Breadcrumb" className="py-8">
            <ol className="flex items-center gap-2 text-sm text-text-secondary">
              <li>
                <Link
                  href="/en/resources"
                  className="hover:text-text-primary transition-colors"
                >
                  Resources
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-text-primary">Blog</li>
            </ol>
          </nav>
        </div>

        <section className="pb-12">
          <div className="container-page flex flex-col items-center text-center gap-8">
            <h1 className="heading-display text-3xl md:text-4xl lg:text-5xl">
              Resources &amp; Blog
            </h1>
            <FilterTabs />
          </div>
        </section>

        <section className="pb-12 md:pb-16">
          <div className="container-page">
            <FeaturedPost post={featured} />
          </div>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="container-page">
            <PostsGrid posts={rest} />
          </div>
        </section>

        <section>
          <div className="container-page">
            <SubscribeInline />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
