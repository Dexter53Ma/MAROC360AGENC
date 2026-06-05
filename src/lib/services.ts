export interface ServiceFeature {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface Service {
  slug: string;
  navLabel: string;
  navDescription: string;
  href: string;
  hero: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  };
  intro: string;
  features: readonly ServiceFeature[];
  tagline: string;
}

const MANAGEMENT_FEATURE_1 =
  "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6845a66f5477b1045463028a_management-feature-1.svg";
const MANAGEMENT_FEATURE_2 =
  "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6845a66f9c270652d7eda46c_management-feature-2.avif";
const MANAGEMENT_FEATURE_3 =
  "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6845a66f7cad01a6d24095f6_management-feature-3.svg";

export const SERVICES: readonly Service[] = [
  {
    slug: "strategy-planning",
    navLabel: "Strategy & Planning",
    navDescription: "Roadmaps and playbooks tailored to your goals.",
    href: "/en/services/strategy-planning",
    hero: {
      title: "Strategy that turns marketing into measurable growth",
      description:
        "Research-backed roadmaps, channel strategy, and KPI frameworks tailored to the Moroccan market — so every dirham of marketing spend is working toward a clear outcome.",
      image:
        "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6a1850c71817ffd03370ffa3_new_better_businesses_illustration_10.png",
      imageAlt: "Marketing strategy roadmap with channels, KPIs, and milestones",
    },
    intro:
      "Most marketing plans die in a Google Drive. Ours end up in the boardroom, the weekly standup, and the day-to-day decisions of every team in your company.",
    features: [
      {
        eyebrow: "Audience & market research",
        title: "Know exactly who you're talking to — and who you're not",
        description:
          "We combine customer interviews, search data, social listening, and competitive analysis to build a clear picture of your real audience: their language, their platforms, their decision criteria, and the triggers that move them from awareness to purchase.",
        image: MANAGEMENT_FEATURE_1,
        imageAlt: "Audience research dashboard with persona segments and behavioural signals",
      },
      {
        eyebrow: "Channel & budget strategy",
        title: "Pick the right channels, and put the budget where it counts",
        description:
          "We design a channel mix matched to your stage, your unit economics, and your audience. SEO, paid media, social, content, email — each with a clear role, a clear budget line, and a clear success metric.",
        image: MANAGEMENT_FEATURE_2,
        imageAlt: "Channel mix planning dashboard with budget allocation by funnel stage",
      },
      {
        eyebrow: "Roadmap & operating cadence",
        title: "A 12-month strategy that survives the first 90 days",
        description:
          "We translate the strategy into a quarterly roadmap with weekly priorities, monthly reviews, and quarterly resets. Your team always knows what to do this week — and why.",
        image: MANAGEMENT_FEATURE_3,
        imageAlt: "Quarterly marketing roadmap with milestones, owners, and KPIs",
      },
    ],
    tagline: "See the full picture of your marketing and grow with confidence",
  },
  {
    slug: "paid-media",
    navLabel: "Paid Media",
    navDescription: "Profitable campaigns across Google, Meta, and TikTok.",
    href: "/en/services/paid-media",
    hero: {
      title: "Paid media that turns ad spend into revenue, not just clicks",
      description:
        "We plan, buy, and optimise campaigns across Google, Meta, and TikTok with the discipline of a senior in-house team and the breadth of a specialist agency. Every dirham is accountable to a business outcome.",
      image:
        "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6a184a915f82cad90b79a145_ditto_better_world_illustration_6%20-%20Grande.jpeg",
      imageAlt: "Paid media campaign dashboard with Google, Meta, and TikTok performance",
    },
    intro:
      "Paid media works when it's a system: tight briefs, clean data, creative volume, and weekly optimisation. We've built that system for dozens of Moroccan brands.",
    features: [
      {
        eyebrow: "Search & Shopping",
        title: "Capture intent the moment your customers raise their hand",
        description:
          "Google Search, Performance Max, and Shopping campaigns designed around your most profitable keywords, your best-margin products, and the moments when customers are actively looking for what you sell. Tight keyword discipline, real conversion data, and bidding that protects margin.",
        image: MANAGEMENT_FEATURE_1,
        imageAlt: "Google Ads campaign structure with search terms and product groups",
      },
      {
        eyebrow: "Social paid (Meta & TikTok)",
        title: "Reach the right audience with creative that earns attention",
        description:
          "Meta and TikTok campaigns built for performance, not just reach. Smart audience structures, creative testing frameworks, and weekly iteration on what works. We move fast, kill what doesn't, and double down on what does.",
        image: MANAGEMENT_FEATURE_2,
        imageAlt: "Meta and TikTok ad performance comparison by audience and creative",
      },
      {
        eyebrow: "Measurement & incrementality",
        title: "Know what's actually working, not just what's reported",
        description:
          "Server-side tracking, conversion lift studies, and incrementality testing. We don't trust the platform dashboard — we triangulate real revenue, real conversions, and real incremental lift, so you can make decisions on truth, not attribution fantasy.",
        image: MANAGEMENT_FEATURE_3,
        imageAlt: "Incrementality measurement dashboard with conversion lift and holdout tests",
      },
    ],
    tagline: "See the full picture of your paid media and grow with confidence",
  },
  {
    slug: "seo-content",
    navLabel: "SEO & Content",
    navDescription: "Rank, attract, and convert with search-first content.",
    href: "/en/services/seo-content",
    hero: {
      title: "SEO and content that compounds for years, not weeks",
      description:
        "We help Moroccan brands earn the top of Google in French, Arabic, and English — and turn that visibility into qualified leads, sales, and brand authority. Search-first content, technical SEO, and link building done by people who know the local market.",
      image:
        "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6970ff9bf4ef80b4ce269d2b_ditto_better_businesses_illustration_7%20-%20Grande.jpeg",
      imageAlt: "SEO ranking dashboard with keyword positions and organic traffic trends",
    },
    intro:
      "SEO is a long game, but the payoff is asymmetric: a single well-ranked article can drive leads for years. We play the long game on your behalf.",
    features: [
      {
        eyebrow: "Technical & local SEO",
        title: "The foundation that everything else is built on",
        description:
          "Site speed, mobile experience, structured data, hreflang, local citations, Google Business Profile — the technical and local SEO work that makes your site visible, fast, and trustworthy to both users and search engines. Audit, fix, monitor.",
        image: MANAGEMENT_FEATURE_1,
        imageAlt: "Technical SEO audit dashboard with site speed, schema, and indexation",
      },
      {
        eyebrow: "Content that ranks and converts",
        title: "Articles that earn traffic today and authority for years",
        description:
          "Keyword research, content briefs, and editorial production designed to rank for the queries your customers actually search. Multilingual (FR/AR/EN), in-depth, and built to be the best result on the page — not just another blog post.",
        image: MANAGEMENT_FEATURE_2,
        imageAlt: "Editorial content calendar with keyword targets and traffic projections",
      },
      {
        eyebrow: "Authority & link building",
        title: "Earn links from the publications and partners that move rankings",
        description:
          "Digital PR, data-led stories, partnerships, and Moroccan press relationships that earn high-quality backlinks from the domains Google trusts. No PBNs, no link schemes — just real authority, built over time.",
        image: MANAGEMENT_FEATURE_3,
        imageAlt: "Backlink profile with referring domains and authority scores",
      },
    ],
    tagline: "See the full picture of your search visibility and grow with confidence",
  },
  {
    slug: "social-media",
    navLabel: "Social Media",
    navDescription: "Build community and grow revenue on social.",
    href: "/en/services/social-media",
    hero: {
      title: "Social media that builds audience, brand, and revenue",
      description:
        "Strategy, content production, community management, and creator partnerships — the full social program run by a senior team that has scaled Moroccan brands to millions of followers and meaningful revenue.",
      image:
        "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/696ea520c97cc0946ee7bef9_new_better_businesses_illustration_04.png",
      imageAlt: "Social media content calendar with engagement metrics across platforms",
    },
    intro:
      "Social is the most competitive attention channel in 2026. The brands that win are the ones with a clear voice, a real production engine, and a measurement system that ties activity to business outcomes.",
    features: [
      {
        eyebrow: "Strategy & content engine",
        title: "A clear voice, a clear cadence, a real production machine",
        description:
          "Audience research, content pillars, voice definition, and a production engine that ships 8–12 pieces of content per week across the platforms that matter for your brand. Quality at volume, without burning the team out.",
        image: MANAGEMENT_FEATURE_1,
        imageAlt: "Content pillars framework with platform mix and posting cadence",
      },
      {
        eyebrow: "Community & creator partnerships",
        title: "Turn followers into a community, and creators into a channel",
        description:
          "Community management, DM responses, and creator partnerships that turn your social presence into a real growth channel. Long-term creator relationships, vetted for relevance, engagement, and brand safety.",
        image: MANAGEMENT_FEATURE_2,
        imageAlt: "Creator partnership portfolio with audience overlap and engagement data",
      },
      {
        eyebrow: "Measurement & paid amplification",
        title: "Real metrics, paid amplification that actually performs",
        description:
          "Awareness, engagement, conversion, and brand lift metrics tracked honestly. The best organic content gets amplified through paid — turning your social into a performance channel, not just a vanity play.",
        image: MANAGEMENT_FEATURE_3,
        imageAlt: "Social media performance dashboard with paid and organic metrics",
      },
    ],
    tagline: "See the full picture of your social presence and grow with confidence",
  },
  {
    slug: "creative-studio",
    navLabel: "Creative Studio",
    navDescription: "Branding, motion, and campaigns that earn attention.",
    href: "/en/services/creative-studio",
    hero: {
      title: "Creative that earns attention and moves business",
      description:
        "Branding, identity systems, campaign concepts, motion, and design — the creative work that makes your brand recognisable and your marketing effective. Senior creative directors, designers, and motion artists who understand the Moroccan market.",
      image:
        "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/695d0b0a2c306512ed87e240_ditto_better_businesses_illustration_2%20-%20Grande.avif",
      imageAlt: "Brand identity system with logo, color palette, typography, and applications",
    },
    intro:
      "Great creative isn't decoration — it's a business asset. The brands that win invest in creative that earns attention, communicates clearly, and supports every downstream marketing activity.",
    features: [
      {
        eyebrow: "Brand identity & systems",
        title: "A brand identity that works across every touchpoint",
        description:
          "Strategy-led brand work: positioning, naming, logo systems, color, typography, photography style, and brand guidelines. Built to scale across packaging, digital, retail, and campaigns — and to be applied consistently for years.",
        image: MANAGEMENT_FEATURE_1,
        imageAlt: "Brand identity moodboard with logo, color, typography, and applications",
      },
      {
        eyebrow: "Campaigns & concepts",
        title: "Big ideas that become real, measurable campaigns",
        description:
          "Campaign concepts, art direction, copywriting, and production. We bring the strategic thinking and the craft to take a brand insight from a slide to a real campaign across social, paid, OOH, and beyond.",
        image: MANAGEMENT_FEATURE_2,
        imageAlt: "Campaign concept board with art direction and channel applications",
      },
      {
        eyebrow: "Motion, video & design",
        title: "The production capability behind every channel",
        description:
          "Motion graphics, video production, photography, design systems, and the day-to-day creative output that fuels your channels. Senior creative, fast turnaround, and a style that fits your brand.",
        image: MANAGEMENT_FEATURE_3,
        imageAlt: "Motion and design production workspace with brand assets",
      },
    ],
    tagline: "See the full picture of your creative engine and grow with confidence",
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
