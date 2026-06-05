export interface IndustryFeature {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface Industry {
  slug: string;
  navLabel: string;
  href: string;
  hero: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  };
  intro: string;
  features: readonly IndustryFeature[];
  caseStudyTeaser?: string;
  tagline: string;
}

const FEATURE_1 =
  "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6845a66f5477b1045463028a_management-feature-1.svg";
const FEATURE_2 =
  "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6845a66f9c270652d7eda46c_management-feature-2.avif";
const FEATURE_3 =
  "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6845a66f7cad01a6d24095f6_management-feature-3.svg";

export const INDUSTRIES: readonly Industry[] = [
  {
    slug: "ecommerce",
    navLabel: "E-commerce",
    href: "/en/industries/ecommerce",
    hero: {
      title: "Performance marketing for Moroccan e-commerce brands",
      description:
        "From paid acquisition to retention, we help e-commerce brands in Morocco turn paid spend into profitable, repeatable growth — across Meta, Google, TikTok, and email.",
      image:
        "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6942d63b10ef5124dfea78d7_ditto_better_world_illustration_6%20-%20Grande.avif",
      imageAlt: "E-commerce performance marketing dashboard with revenue and ROAS",
    },
    intro:
      "E-commerce is the most measurable, optimisable form of marketing — and the most punishing if you get the fundamentals wrong. We bring the systems, the creative volume, and the discipline to scale profitably.",
    features: [
      {
        eyebrow: "Acquisition at scale",
        title: "Profitable paid media across Meta, Google, and TikTok",
        description:
          "Campaigns designed around contribution margin, not just ROAS. Smart bidding, broad-audience Advantage+ structures, creative testing at volume, and weekly iteration on what's working — across Search, Shopping, Performance Max, and the Meta auction.",
        image: FEATURE_1,
        imageAlt: "Paid media campaign structure for e-commerce",
      },
      {
        eyebrow: "Retention & LTV",
        title: "Turn one-time buyers into repeat customers",
        description:
          "Email flows, SMS, push, and retargeting that bring customers back. Loyalty programs, post-purchase sequences, and win-back campaigns that compound the value of every acquisition dollar.",
        image: FEATURE_2,
        imageAlt: "Retention marketing automation flow with email and SMS",
      },
      {
        eyebrow: "Multilingual SEO",
        title: "Earn organic traffic in French, Arabic, and English",
        description:
          "Category pages, product schema, and content that ranks for the queries Moroccan shoppers actually search. Multilingual SEO (FR/AR/EN) done right — hreflang, content quality, and link building.",
        image: FEATURE_3,
        imageAlt: "Multilingual SEO dashboard for e-commerce category pages",
      },
    ],
    caseStudyTeaser:
      "How we helped a Moroccan fashion D2C brand cut CAC by 38% and double repeat purchase rate in 6 months.",
    tagline: "See the full picture of your e-commerce growth and scale with confidence",
  },
  {
    slug: "hospitality-travel",
    navLabel: "Hospitality & Travel",
    href: "/en/industries/hospitality-travel",
    hero: {
      title: "Direct bookings and brand loyalty for hospitality brands",
      description:
        "Hotels, riads, and travel brands across Morocco — we help you win direct bookings, build brand loyalty, and reduce dependence on OTAs and third-party platforms.",
      image:
        "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/696ea520c97cc0946ee7bef9_new_better_businesses_illustration_04.png",
      imageAlt: "Hospitality marketing dashboard with direct booking conversion",
    },
    intro:
      "The hospitality industry is more competitive than ever. The brands that win are the ones that own the customer relationship, not the ones that rent it from OTAs.",
    features: [
      {
        eyebrow: "Direct booking engine",
        title: "Convert more visitors into direct bookings",
        description:
          "SEO, paid search, and on-site conversion work that turns your brand website into a real booking channel. Reduce OTA commissions, grow direct revenue, and own the customer relationship from the first click.",
        image: FEATURE_1,
        imageAlt: "Direct booking funnel from search to confirmation",
      },
      {
        eyebrow: "Visual storytelling",
        title: "Social and creator content that sells the experience",
        description:
          "Instagram, TikTok, and YouTube content that does the thing brochures never could: make people feel the experience before they book. Creator partnerships, UGC campaigns, and a content engine that ships 8–12 pieces a week.",
        image: FEATURE_2,
        imageAlt: "Social content calendar for hospitality brand",
      },
      {
        eyebrow: "Seasonal campaigns",
        title: "Plan the year, ship the month, learn the week",
        description:
          "Annual campaign planning, monthly campaign execution, weekly performance reviews. Seasonal pushes (summer, Ramadan, year-end) with creative, offers, and budgets planned in advance.",
        image: FEATURE_3,
        imageAlt: "Seasonal campaign timeline and budget allocation",
      },
    ],
    caseStudyTeaser:
      "How a Moroccan hotel chain grew direct bookings from 18% to 47% of total revenue in 12 months.",
    tagline: "See the full picture of your hospitality growth and grow with confidence",
  },
  {
    slug: "real-estate",
    navLabel: "Real Estate",
    href: "/en/industries/real-estate",
    hero: {
      title: "Lead generation and brand building for real estate developers",
      description:
        "Real estate is a long-cycle, high-stakes sale. We help developers and agencies generate qualified leads, build lasting trust, and close more deals — across paid, organic, and content.",
      image:
        "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6a1850c71817ffd03370ffa3_new_better_businesses_illustration_10.png",
      imageAlt: "Real estate marketing dashboard with qualified leads and pipeline",
    },
    intro:
      "Real estate marketing is uniquely demanding: long cycles, high stakes, and decisions that affect a customer's biggest asset. We bring the systems and the discipline to generate qualified leads at scale.",
    features: [
      {
        eyebrow: "High-intent paid search",
        title: "Capture demand the moment buyers raise their hand",
        description:
          "Google Ads, Meta retargeting, and YouTube pre-roll campaigns designed for the real estate funnel. Keyword strategy built around buyer intent, with landing pages and lead forms that convert.",
        image: FEATURE_1,
        imageAlt: "Google Ads campaign structure for real estate",
      },
      {
        eyebrow: "Showcase creative",
        title: "Property marketing that earns attention and trust",
        description:
          "Photography, video, drone, 3D walkthroughs, and the creative assets that make a project stand out. From concept to launch, with the production discipline to ship on time, every time.",
        image: FEATURE_2,
        imageAlt: "Real estate showcase creative with photography and 3D walkthroughs",
      },
      {
        eyebrow: "Lead nurturing",
        title: "Turn leads into signed contracts, not just contacts",
        description:
          "CRM integration, lead scoring, automated follow-up, and the sales-marketing alignment that turns a marketing lead into a signed contract. We work with your sales team to close the loop.",
        image: FEATURE_3,
        imageAlt: "Lead nurturing workflow with CRM integration",
      },
    ],
    caseStudyTeaser:
      "How a Casablanca developer cut cost-per-qualified-lead by 62% and doubled their sales pipeline in 9 months.",
    tagline: "See the full picture of your real estate growth and grow with confidence",
  },
  {
    slug: "professional-services",
    navLabel: "Professional Services",
    href: "/en/industries/professional-services",
    hero: {
      title: "Authority and lead generation for professional services",
      description:
        "Law firms, consultancies, financial advisors, agencies — we help professional services firms build authority, generate qualified leads, and win the engagements that matter.",
      image:
        "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6a184a915f82cad90b79a145_ditto_better_world_illustration_6%20-%20Grande.jpeg",
      imageAlt: "Professional services marketing with thought leadership content",
    },
    intro:
      "Professional services firms compete on trust and authority, not on price. The marketing that works is the marketing that builds both — over time, with consistency, and with content that actually demonstrates expertise.",
    features: [
      {
        eyebrow: "LinkedIn thought leadership",
        title: "Build authority in the rooms your buyers inhabit",
        description:
          "LinkedIn content, founder branding, and the editorial discipline to show up consistently with insight, not noise. The right strategy turns your team into the most credible voices in your category.",
        image: FEATURE_1,
        imageAlt: "LinkedIn thought leadership content strategy",
      },
      {
        eyebrow: "Long-form SEO",
        title: "Rank for the questions your buyers are actually asking",
        description:
          "In-depth articles, case studies, and pillar pages that earn organic traffic for the most valuable queries in your practice. SEO built for the long cycle of professional services sales.",
        image: FEATURE_2,
        imageAlt: "Long-form SEO content for professional services",
      },
      {
        eyebrow: "Referral & partner programs",
        title: "Turn one great engagement into a steady pipeline",
        description:
          "Referral programs, partner networks, and the systematic work of staying top-of-mind with the people who already know you. The best professional services leads come from people who already trust you.",
        image: FEATURE_3,
        imageAlt: "Referral program design and partner network",
      },
    ],
    caseStudyTeaser:
      "How a Casablanca law firm 3x'd qualified leads in 12 months through content, SEO, and LinkedIn thought leadership.",
    tagline: "See the full picture of your professional services growth and grow with confidence",
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}
