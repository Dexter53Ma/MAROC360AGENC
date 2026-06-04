import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FeaturedPost } from "@/components/blog/featured-post";
import { FilterTabs } from "@/components/blog/filter-tabs";
import { PostsGrid } from "@/components/blog/posts-grid";
import { SubscribeInline } from "@/components/blog/subscribe-inline";
import type { BlogPost } from "@/types/blog";

export const metadata = {
  title: "Resources & Blog | Maroc 360 Agency",
  description:
    "Practical digital marketing insights — guides, playbooks, and case studies on SEO, paid media, social, and branding from the Maroc 360 team.",
};

const posts: BlogPost[] = [
  {
    title: "How to Build a Digital Marketing Strategy in Morocco",
    description:
      "A clear digital marketing strategy is the difference between guessing and growing. This guide walks through audience research, channel mix, KPIs, and budget allocation tailored to the Moroccan market in 2026.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6a1850c71817ffd03370ffa3_new_better_businesses_illustration_10.png",
    imageAlt: "Illustration of a digital marketing strategy mapped across channels and KPIs",
    href: "/en/resources/blog/digital-marketing-strategy-morocco",
    category: "Strategy",
    featured: true,
  },
  {
    title: "The Complete Guide to Paid Ads in 2026",
    description:
      "Google Ads, Meta, TikTok, and the new rules of audience targeting. Everything a Moroccan brand needs to know to plan, launch, and scale profitable paid campaigns in 2026.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6a184a915f82cad90b79a145_ditto_better_world_illustration_6%20-%20Grande.jpeg",
    imageAlt: "Visual guide to running paid ads on Google, Meta, and TikTok in 2026",
    href: "/en/resources/blog/paid-ads-guide-2026",
    category: "Paid Media",
  },
  {
    title: "SEO in Morocco: How to Rank Locally and Beyond",
    description:
      "Local SEO, multilingual content, and link building that actually moves the needle. A practical playbook for Moroccan brands that want to win on Google in French, Arabic, and English.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6970ff9bf4ef80b4ce269d2b_ditto_better_businesses_illustration_7%20-%20Grande.jpeg",
    imageAlt: "Illustration of a brand climbing search rankings in Morocco",
    href: "/en/resources/blog/seo-morocco-local-rankings",
    category: "SEO",
  },
  {
    title: "What Makes a Great Social Media Strategy?",
    description:
      "Frequency, format, voice, and measurement—the four levers we use to build social media programs that grow audiences and drive real revenue for our clients.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/696ea520c97cc0946ee7bef9_new_better_businesses_illustration_04.png",
    imageAlt: "Diagram of a social media strategy across content, audience, and measurement",
    href: "/en/resources/blog/social-media-strategy-playbook",
    category: "Social",
  },
  {
    title:
      "How to make the most of your brand — Lessons from our Casablanca roundtable",
    description:
      "On March 17th, Maroc 360 hosted its first marketing roundtable in Casablanca, together with leading Moroccan CMOs. Around twenty professionals gathered to tackle a question that comes up constantly with our clients: how do you turn a strong brand into measurable growth? Three key lessons emerged from the discussion.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/69cbf6e3c98e9e31f4bd7485_IMG_4109.jpeg",
    imageAlt: "Marketing roundtable in Casablanca — Maroc 360 client event, March 2026",
    href: "/en/resources/blog/casablanca-roundtable-brand-growth",
    category: "Strategy",
  },
  {
    title:
      "Mastering Influencer Marketing: The Critical Role of Creator Partnerships in MENA",
    description:
      "Choosing the wrong creator can mean wasted budget and brand risk. Meet the Maroc 360 framework for vetting, briefing, and measuring influencers across the MENA region.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/69cb8a1a3cd9022dfcea8b8c_1768810480327.jpeg",
    imageAlt:
      "Maroc 360 – Influencer Marketing Playbook for the MENA region",
    href: "/en/resources/blog/influencer-marketing-mena-playbook",
    category: "Creator",
  },
  {
    title:
      "Meta Ads: definition, purpose, and how to make them work in 2026",
    description:
      "In this article, we break down Meta Ads in 2026—how the auction works, where the best opportunities are, and the levers that move your cost per result.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/694c04c336a030107a9b3ba3_asset_article_13.avif",
    imageAlt: "Meta Ads in 2026 – auction, audiences, and creative",
    href: "/en/resources/blog/meta-ads-2026",
    category: "Paid Media",
  },
  {
    title: "Brand Identity: How to Build a Brand Moroccan Consumers Trust",
    description:
      "A strong brand identity helps you stand out in a crowded market. This article explains the pillars of brand work, from positioning and naming to visual identity and voice.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/695d0b0a2c306512ed87e240_ditto_better_businesses_illustration_2%20-%20Grande.avif",
    imageAlt: "Illustration explaining brand identity, positioning, and visual systems",
    href: "/en/resources/blog/brand-identity-morocco",
    category: "Branding",
  },
  {
    title: "Content Marketing in Morocco: A Step-by-Step Guide",
    description:
      "Discover a practical framework for planning, producing, and distributing content that earns attention, ranks on search, and converts—built for the Moroccan market.",
    image:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6942d63b10ef5124dfea78d7_ditto_better_world_illustration_6%20-%20Grande.avif",
    imageAlt: "Content marketing in Morocco – planning, production, and distribution",
    href: "/en/resources/blog/content-marketing-morocco",
    category: "Content",
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
                  href="/en"
                  className="hover:text-text-primary transition-colors"
                >
                  Home
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
