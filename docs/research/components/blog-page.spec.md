# Blog Page Specification

## Overview
- **Target file:** `src/app/en/resources/blog/page.tsx`
- **Screenshot:** `docs/design-references/trustditto.com-blog/desktop.png`
- **Interaction model:** click-driven (tabs + search filter posts, Load more button paginates)
- **Path:** `/en/resources/blog` (Next.js App Router: `src/app/en/resources/blog/page.tsx`)
- **Reuses:** `Navbar`, `Footer`, `LinkButton`, `Button`, all design tokens from `globals.css`

## DOM Structure (top to bottom)

1. **Navbar** — reuse existing `Navbar` component
2. **Breadcrumb** — `Resources > Blog` (small text, no link on last item)
3. **Hero/Filter Section** — H1 "Resources & Blog" + tab pills (All, Blog, News, Guide) + search icon
4. **Featured Post** — large card, image right, text left, yellow background `bg-[#FFE228]`
5. **Posts Grid** — 3-column grid of post cards (each: image top, text bottom on light green `bg-surface-tertiary`)
6. **Load More button** — yellow pill button centered, loads more posts on click
7. **Subscribe Form** — reuse footer-style inline form: "Practical CSR insights—tools, studies, and templates, in your inbox" + email input + Subscribe button
8. **Footer** — reuse existing `Footer` component

## Computed Styles (from desktop screenshot at 1440px)

### Container
- maxWidth: 84rem (use `.container-page`)
- horizontal padding: 2.5rem (use container-page)
- vertical padding per section: 6rem desktop / 4rem mobile (use `.section-y`)

### Breadcrumb
- fontSize: 0.875rem (14px)
- fontWeight: 400
- color: `text-text-secondary`
- layout: flex row, gap 0.5rem, separator "/" between items
- vertical padding above: 2rem

### Hero/Filter Section
- H1: `font-heading`, text-3xl md:text-4xl lg:text-5xl, centered, mb-8
- Tab pills: flex row, gap-2, centered, mb-8
  - Pill button: rounded-full, h-10, px-5, text-sm font-medium
  - Active state: `bg-text-primary text-surface-primary` (dark pill)
  - Inactive: `bg-surface-tertiary text-text-primary` (light pill)
  - Tabs: All (→ `/en/resources`), Blog (active, → `/en/resources/blog`), News (→ `/en/resources/news`), Guide (→ `/en/resources/guides`)
- Search icon button: absolute right of tab row, circular, h-10 w-10, `bg-surface-tertiary` rounded-full

### Featured Post Card
- Layout: 2-column grid (text left, image right) on md+, stacked on mobile
- Background: `bg-[#FFE228]` (yellow brand)
- Border radius: rounded-3xl (1.5rem)
- Padding: 2.5rem
- Gap between columns: 2.5rem
- Text column max-width: 50%
- H2: font-heading, text-3xl md:text-4xl, mb-3
- Description: text-base, color `text-text-primary` (no secondary), line-clamp-3
- Image: aspect-[4/3] on mobile / aspect-[16/10] on md+, object-cover, rounded-2xl
- Whole card is a `<Link>` to the post

### Post Cards (grid)
- Grid: 1 col mobile, 2 col md (768px), 3 col lg (1024px), gap 1.5rem
- Each card:
  - background: `bg-surface-tertiary` (light green)
  - border-radius: rounded-3xl
  - overflow: hidden
  - hover: `-translate-y-1` transition-transform
  - Image: aspect-[16/9], object-cover, full width
  - Padding bottom: 1.5rem px-6
  - Category label: text-xs uppercase tracking-wide, `text-text-secondary`, mt-4
  - Title: font-heading, text-xl md:text-2xl, line-clamp-2, mb-3
  - "Read article" link: text-sm font-medium with ChevronRight12 icon

### Load More Button
- Centered horizontally, mt-12
- Style: yellow pill (bg-yellow-300 or #FFE228, dark text)
- padding: 0.625rem 1.5rem, rounded-full
- font-medium text-sm
- On click: append next batch of posts to grid (state: `visibleCount`, increment by 6)
- Hide when all posts are visible

### Subscribe Form
- Centered, max-width: 56rem, mb-16
- Layout: flex row on sm+, stacked on mobile
- Left text: "Practical CSR insights—tools, studies, and templates, in your inbox" (text-sm)
- Right: email input + Subscribe button (use existing footer subscribe pattern)

## Posts Data (initial 9 posts to show)

```typescript
const initialPosts: BlogPost[] = [
  {
    title: "ESG: Definition, Criteria and Challenges",
    description: "ESG — Environment, Social, Governance — structures the sustainable transformation of companies. It encompasses the practices, policies and indicators that help reconcile economic performance with positive impact on society and the planet.",
    image: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6a1850c71817ffd03370ffa3_new_better_businesses_illustration_10.png",
    imageAlt: "Infographic showing the three ESG pillars: Environment, Social, Governance",
    href: "/en/resources/blog/esg-definition-criteria-challenges",
    category: "Blog",
    featured: true,
  },
  {
    title: "CSR: A Clear Definition and Scope",
    description: "Corporate Social Responsibility (CSR) structures an organisation's commitment to sustainable and ethical development. Its scope, built on precise principles, connects strategic management, measurable performance and regulatory compliance.",
    image: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6a184a915f82cad90b79a145_ditto_better_world_illustration_6%20-%20Grande.jpeg",
    imageAlt: "Definition and scope of corporate social responsibility in business",
    href: "/en/resources/blog/csr-definition-scope",
    category: "Blog",
  },
  {
    title: "What is Corporate Social Responsibility?",
    description: "Corporate Social Responsibility (CSR) structures an organisation's commitment to society and the environment. Understanding its foundations, its impact on compliance and CSR performance helps build a credible, long-term sustainability strategy.",
    image: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6970ff9bf4ef80b4ce269d2b_ditto_better_businesses_illustration_7%20-%20Grande.jpeg",
    imageAlt: "Illustration of a company integrating corporate social responsibility into its strategy",
    href: "/en/resources/blog/corporate-social-responsibility-definition",
    category: "Blog",
  },
  {
    title: "What is CSR performance?",
    description: "CSR performance reflects a company's ability to turn its sustainability commitments into measurable, lasting results across environmental, social and governance dimensions. This guide clarifies the difference with a CSR approach, covers the key KPIs, major frameworks and continuous improvement levers.",
    image: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/696ea520c97cc0946ee7bef9_new_better_businesses_illustration_04.png",
    imageAlt: "CSR performance diagram with ESG indicators for businesses",
    href: "/en/resources/blog/csr-performance",
    category: "Blog",
  },
  {
    title: "How to make the most of your CSR commitments — Lessons from our Lyon roundtable",
    description: "On March 17th, Ditto hosted its first CSR afterwork in Lyon, together with VERACY. Around twenty professionals gathered to tackle a question that comes up constantly with our clients: how do you structure and communicate your CSR commitments as an SME or mid-sized company? Three key lessons emerged from the discussion.",
    image: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/69cbf6e3c98e9e31f4bd7485_IMG_4109.jpeg",
    imageAlt: "CSR roundtable in Lyon — Ditto and VERACY afterwork event, March 2026",
    href: "/en/resources/blog/csr-roundtable-lyon-commitments",
    category: "Blog",
  },
  {
    title: "Mastering ISO Compliance in Biotech & Medtech: The Critical Role of Global Regulatory Monitoring",
    description: "Missing a single regulatory update can mean delayed product launches and risks to patient safety. Meet Qalico — Ditto's specialized compliance monitoring engine built for life sciences.",
    image: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/69cb8a1a3cd9022dfcea8b8c_1768810480327.jpeg",
    imageAlt: "Qalico by Ditto – Global Regulatory Monitoring for Biotech and Medtech ISO Compliance",
    href: "/en/resources/blog/mastering-iso-compliance-biotech-medtech",
    category: "Other",
  },
  {
    title: "CDP: definition, purpose, how it works, and why it matters for companies",
    description: "In this article, we explain the Carbon Disclosure Project (CDP), how it works in 2026, and the key levers to improve your score.",
    image: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/694c04c336a030107a9b3ba3_asset_article_13.avif",
    imageAlt: "CDP – Carbon Disclosure Project",
    href: "/en/resources/blog/cdp-definition-purpose",
    category: "CDP",
  },
  {
    title: "CSR Assessment: Understand, Measure and Structure Your CSR Strategy",
    description: "A CSR assessment helps measure the maturity and structure of a company's CSR approach. This article explains key pillars, indicators and CSR maturity levels to move from an intuitive approach to a structured, well-managed CSR strategy.",
    image: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/695d0b0a2c306512ed87e240_ditto_better_businesses_illustration_2%20-%20Grande.avif",
    imageAlt: "Illustration explaining CSR assessment and CSR maturity in companies",
    href: "/en/resources/blog/csr-assessment",
    category: "Blog",
  },
  {
    title: "Carbon Footprint in Business: A Step-by-Step Guide",
    description: "Discover practical advice for measuring and reducing your GHG emissions step by step, from data collection to action planning.",
    image: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6942d63b10ef5124dfea78d7_ditto_better_world_illustration_6%20-%20Grande.avif",
    imageAlt: "Carbon Footprint in Business",
    href: "/en/resources/blog/company-carbon-footprint-step-by-step",
    category: "Blog",
  },
];
```

## Components to Create

1. **`src/components/blog/featured-post.tsx`** — featured post card (yellow background, large)
2. **`src/components/blog/post-card.tsx`** — regular post card (light green)
3. **`src/components/blog/filter-tabs.tsx`** — tab pills + search button (client component for active state)
4. **`src/components/blog/subscribe-inline.tsx`** — inline subscribe form (can copy from footer)

Or build everything inline in `page.tsx` for simplicity. The page is mostly data + simple card components.

## Assets
- All post images are CDN URLs from `cdn.prod.website-files.com/682d7fad3c89203197a56fce/` — either use remote URLs directly via `next/image` with `remotePatterns` (already configured in `next.config.ts`) or download to `public/images/blog/`. **Recommended:** keep remote URLs for now to save build time, ensure `unoptimized` if needed or rely on next/image's remote loader.

## Text Content (verbatim)
- H1: "Resources & Blog"
- Breadcrumb: "Resources > Blog"
- Tab labels: "All", "Blog", "News", "Guide"
- Subscribe: "Practical CSR insights—tools, studies, and templates, in your inbox" / "Subscribe"
- "Read article" link on each card
- Load more button: "Load more"

## Responsive Behavior
- **Desktop (1440px):** 3-col grid, tabs centered, featured post side-by-side
- **Tablet (768px):** 2-col grid, tabs centered, featured post side-by-side (smaller)
- **Mobile (390px):** 1-col grid, tabs scroll horizontally OR wrap, featured post stacks (text top, image bottom), subscribe form stacks

## Routes
- Main: `/en/resources/blog` (default export)
- Tabs link to: `/en/resources`, `/en/resources/blog`, `/en/resources/news`, `/en/resources/guides`

## State Management
- `useState<string>` for active tab (cosmetic; tabs link to other pages)
- `useState<number>` for visible post count (start 9, +6 on Load More, hide button when count >= posts.length)
- `useState<string>` for search input (optional: filter posts by title containing search text — for now just make it visual)
- "use client" needed for Load More interaction

## Build & Verify
- Run `npx tsc --noEmit` and ensure no errors
- Verify route renders at http://localhost:3000/en/resources/blog
