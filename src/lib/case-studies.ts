export interface CaseStudy {
  slug: string;
  client: string;
  industry: string;
  headline: string;
  summary: string;
  services: readonly string[];
  challenge: string;
  approach: readonly string[];
  results: ReadonlyArray<{ metric: string; value: string; detail: string }>;
  quote: { text: string; name: string; role: string };
  heroImage: string;
  heroAlt: string;
  publishedLabel: string;
}

export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    slug: "moroccan-fashion-d2c",
    client: "Atlas Glow",
    industry: "E-commerce · D2C Fashion",
    headline: "Cut CAC by 38% and doubled repeat purchase rate in 6 months",
    summary:
      "A Moroccan D2C fashion brand was running Meta Ads at a 1.6x ROAS and burning through inventory. We restructured the ad account, rebuilt the creative engine, and added a retention layer that turned one-time buyers into a community.",
    services: ["Paid Media", "Creative Studio", "Retention & CRM"],
    challenge:
      "Atlas Glow had grown quickly on Instagram, but the unit economics were broken. The cost to acquire a new customer was 1.4x the average order value. The team was running 6 ad sets with 3 creatives each, refreshing monthly, and burning through 250K MAD/month with little to show for it. The CEO wanted to grow — but the numbers said stop spending.",
    approach: [
      "Audited the Meta Ads account and identified the structural problems: too many ad sets, too few creatives, and a campaign structure that was optimising for the wrong events.",
      "Rebuilt the account around a single Advantage+ Shopping campaign with 30+ creatives per ad set, refreshed weekly. Moved optimisation from 'add to cart' to 'purchase' once we had 50+ weekly conversions.",
      "Built a retention engine: post-purchase email flow (5 emails over 21 days), a win-back flow for lapsed customers (90+ days), and a loyalty programme that rewarded second and third purchases.",
      "Added TikTok as a secondary acquisition channel once Meta was stable, with a creator-led creative engine shipping 8 new pieces per week.",
    ],
    results: [
      {
        metric: "ROAS",
        value: "2.4x → 4.1x",
        detail: "Within 90 days of the new account structure",
      },
      {
        metric: "Customer acquisition cost",
        value: "−38%",
        detail: "While scaling spend from 250K to 480K MAD/month",
      },
      {
        metric: "Repeat purchase rate",
        value: "12% → 28%",
        detail: "Driven by the new retention engine",
      },
      {
        metric: "Email revenue",
        value: "18% of total",
        detail: "Up from 3% in 6 months",
      },
    ],
    quote: {
      text: "Maroc 360 didn't just optimise our ads — they rebuilt the whole growth engine. We finally know what works and why.",
      name: "Yasmine B.",
      role: "Founder, Atlas Glow",
    },
    heroImage:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6942d63b10ef5124dfea78d7_ditto_better_world_illustration_6%20-%20Grande.avif",
    heroAlt: "Atlas Glow e-commerce growth case study — Maroc 360",
    publishedLabel: "Q1 2026",
  },
  {
    slug: "moroccan-hotel-chain",
    client: "Riad Collection",
    industry: "Hospitality · Hotel Group",
    headline: "Grew direct bookings from 18% to 47% of total revenue in 12 months",
    summary:
      "A boutique hotel group with 8 properties across Morocco was over-dependent on Booking.com and Expedia. We built a direct booking engine through SEO, content, and a high-intent paid strategy that paid back the agency fees in the first quarter.",
    services: ["SEO & Content", "Paid Media", "Brand Identity"],
    challenge:
      "Riad Collection had a beautiful brand but almost no organic presence. 82% of bookings came from OTAs, who took 18–22% commissions and owned the customer relationship. The marketing budget was 90% promotional offers on OTA listings — a race to the bottom. The owners wanted to invest in the brand and the direct channel, but didn't know where to start.",
    approach: [
      "Audited the brand and rebuilt the visual identity system to be production-ready across digital, social, and on-property touchpoints.",
      "Built an SEO programme targeting long-tail, high-intent queries: 'riad with pool in medina', 'romantic hotel marrakech', 'family hotel essaouira'. In-depth, multilingual content (FR/EN/AR) backed by an aggressive local link-building push.",
      "Launched a brand-and-performance paid strategy: Google Search + retargeting, Meta brand campaigns for awareness, and TikTok creator partnerships with travel creators for reach.",
      "Built a direct booking offer ladder: best-rate guarantee, free upgrades for direct bookers, and a loyalty programme that rewarded repeat stays.",
    ],
    results: [
      {
        metric: "Direct bookings",
        value: "18% → 47%",
        detail: "Of total revenue, in 12 months",
      },
      {
        metric: "Organic traffic",
        value: "3.2x",
        detail: "Year-over-year growth",
      },
      {
        metric: "OTA commissions saved",
        value: "2.4M MAD",
        detail: "In the first 12 months",
      },
      {
        metric: "Direct booking repeat rate",
        value: "+24%",
        detail: "Loyalty programme members, vs. one-time direct bookers",
      },
    ],
    quote: {
      text: "We thought we were a hotel company. Maroc 360 helped us realise we were a brand company that owns hotels. The direct channel is now our most profitable.",
      name: "Karim L.",
      role: "CEO, Riad Collection",
    },
    heroImage:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/696ea520c97cc0946ee7bef9_new_better_businesses_illustration_04.png",
    heroAlt: "Riad Collection direct bookings case study — Maroc 360",
    publishedLabel: "Q4 2025",
  },
  {
    slug: "casablanca-b2b-saas",
    client: "Talenta",
    industry: "B2B SaaS · HR Tech",
    headline: "Built a 40-SQL/month pipeline from zero brand awareness in 6 months",
    summary:
      "A B2B SaaS startup in Casablanca had product-market fit and seed funding — but no pipeline and no brand awareness in the Moroccan market. We built the marketing function from scratch: positioning, content engine, paid, and the sales-marketing handoff that produced real, qualified pipeline.",
    services: ["Strategy & Planning", "Content Marketing", "Paid Media"],
    challenge:
      "Talenta had built a great product (HR software for Moroccan SMEs) but had zero marketing infrastructure. No website beyond a landing page, no content, no paid campaigns, no CRM. The founders were selling 100% through warm intros. To raise the Series A, they needed a pipeline — and they needed it in 6 months.",
    approach: [
      "Ran a 3-week strategy sprint: positioning, ICP definition, value proposition, and a clear content + paid + sales playbook.",
      "Built a content engine: 2 in-depth pillar articles per week, founder thought leadership on LinkedIn (3 posts/week), a podcast with Moroccan HR leaders, and a quarterly research report on HR trends in Morocco.",
      "Launched a focused paid strategy: LinkedIn for B2B targeting (HR directors, CFOs, founders at companies 50–500 employees), Google Search for high-intent queries, and a retargeting layer on Meta.",
      "Set up the sales-marketing handoff: HubSpot CRM, lead scoring, automated follow-up, and a weekly pipeline review with the founders.",
    ],
    results: [
      {
        metric: "Qualified leads",
        value: "40 SQLs/month",
        detail: "Up from 0 in 6 months",
      },
      {
        metric: "Organic traffic",
        value: "3.5x",
        detail: "Month-over-month growth",
      },
      {
        metric: "Pipeline value",
        value: "8.5M MAD",
        detail: "Created in the first 6 months",
      },
      {
        metric: "CAC payback",
        value: "11 months",
        detail: "On track to under 8 by month 12",
      },
    ],
    quote: {
      text: "Maroc 360 built the marketing function we needed to raise our Series A. They were a partner, not a vendor.",
      name: "Mehdi A.",
      role: "Co-founder & CEO, Talenta",
    },
    heroImage:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6a184a915f82cad90b79a145_ditto_better_world_illustration_6%20-%20Grande.jpeg",
    heroAlt: "Talenta B2B SaaS case study — Maroc 360",
    publishedLabel: "Q3 2025",
  },
  {
    slug: "casablanca-developer",
    client: "Marina Towers",
    industry: "Real Estate · Developer",
    headline: "Cut cost-per-qualified-lead by 62% and doubled the sales pipeline in 9 months",
    summary:
      "A Casablanca real estate developer was generating leads, but the cost was unsustainable and the quality was inconsistent. We rebuilt the funnel from top to bottom — paid, creative, lead nurturing, and sales handoff — producing 2.1x more qualified leads at less than half the cost.",
    services: ["Paid Media", "Creative Studio", "Strategy & Planning"],
    challenge:
      "Marina Towers had launched 3 projects in 5 years, each time with a 6-month marketing push that cost 8–12% of projected revenue. The lead quality was inconsistent: 70% of 'leads' were not actually qualified, sales spent 80% of their time filtering, and cost-per-qualified-lead was 4,200 MAD. The CFO wanted results, not excuses.",
    approach: [
      "Rebuilt the funnel: paid search (Google + Meta), high-quality showcase creative, and a lead form that filtered for real buying intent (budget range, timeline, financing).",
      "Built a lead nurturing system: 5-touch email sequence over 14 days, automated WhatsApp follow-up, and a CRM-integrated lead scoring model that prioritised hot leads for the sales team.",
      "Restructured the sales handoff: leads were routed to the right sales rep within 30 minutes, with full context (which project, which ad, which form).",
      "Added a retargeting layer: 95% of website visitors didn't convert on first visit. Retargeting brought them back with project-specific creative and offers.",
    ],
    results: [
      {
        metric: "Cost per qualified lead",
        value: "4,200 → 1,600 MAD",
        detail: "−62% while scaling spend",
      },
      {
        metric: "Sales pipeline",
        value: "2.1x",
        detail: "Year-over-year, in 9 months",
      },
      {
        metric: "Lead-to-visit rate",
        value: "11% → 34%",
        detail: "Driven by better qualification + faster follow-up",
      },
      {
        metric: "Visit-to-reservation",
        value: "8% → 17%",
        detail: "Improved sales process + better leads",
      },
    ],
    quote: {
      text: "We thought our problem was leads. Maroc 360 showed us our problem was the funnel. The new system is twice the pipeline at less than half the cost per lead.",
      name: "Hassan T.",
      role: "Marketing Director, Marina Towers",
    },
    heroImage:
      "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6a1850c71817ffd03370ffa3_new_better_businesses_illustration_10.png",
    heroAlt: "Marina Towers real estate case study — Maroc 360",
    publishedLabel: "Q2 2025",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
