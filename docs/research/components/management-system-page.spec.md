# Management System Page Specification

## Overview
- **Target file:** `src/app/en/solutions/management-system/page.tsx`
- **Screenshot:** `docs/design-references/trustditto.com-management-system/desktop.png`
- **Interaction model:** mostly static; form on hero (client); testimonials carousel
- **Path:** `/en/solutions/management-system` (Next.js App Router: `src/app/en/solutions/management-system/page.tsx`)
- **Reuses:** `Navbar`, `Footer`, `LinkButton`, `StarIcon`, `ChevronRight12`, `FrameworksCarousel` styling, `FeatureSection`, `TestimonialsCarousel` styling, all design tokens

## DOM Structure (top to bottom)

1. **Navbar** — reuse existing `Navbar` component
2. **Hero** — H1 "Your team's single source of truth for CSR and compliance" + paragraph + form (email + Get Started) + Trustpilot + large dashboard illustration (right)
3. **"See the full picture..." Section** — H2 + 3 alternating feature blocks
4. **"Hear it from our customers" Section** — H2 + paragraph + testimonials carousel
5. **"Ready to get compliant? Ditto." CTA** — text + Get Started button + decorative circles
6. **Footer** — reuse existing `Footer` component

## Computed Styles (from desktop screenshot at 1440px)

### Hero
- Layout: 2-col grid (text left ~50%, illustration right ~50%), items-center, gap-12
- H1: `font-heading`, text-4xl md:text-5xl lg:text-6xl, max-w-md, mb-6
- Paragraph: `body-lg`, max-w-md, mb-8
- Form: flex row, email input + Get Started button (reuse hero form pattern)
- Trustpilot link: 4.6/5 on Trustpilot with 5 green stars
- Right side: aspect-[1391/910] dashboard mockup, rounded-3xl
- Section padding: pt-20 pb-16

### Section: See the full picture
- H2 centered: "See the full picture and step toward your goals with confidence" (text-3xl md:text-4xl lg:text-5xl, font-heading, max-w-2xl mx-auto, text-center, mb-16)

### Feature Block 1: Centralized dashboard
- Layout: 2-col grid, text left, illustration right
- Eyebrow: "Centralized dashboard" (small bullet + text, mb-2)
- H3: "Centralize your compliance data and easily identify gaps" (text-2xl md:text-3xl, font-heading, mb-3)
- Body: "When it comes to compliance, knowing can be half the battle. Ditto gives you a central view into your company's documents and activities, so you can identify gaps and areas for improvement." (text-base text-text-secondary, max-w-md)
- Illustration: aspect-[4/3], rounded-3xl, image of a "Policies" UI mockup with "76%" gauge
- Image URL: `https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/69a1f3a87c6b0e8d3a6c8e3a_management-system-1.avif` (use placeholder if not available, search for actual URL by downloading)
- For now use a placeholder gradient image

### Feature Block 2: Progress tracking
- Layout: 2-col grid, illustration left, text right (swap)
- Eyebrow: "Progress tracking"
- H3: "Set big goals and track your progress toward them"
- Body: "Set measurable goals and realistic deadlines, then mobilize your team to make it happen. With Ditto, you'll have a clear view of each objective's status to keep you on track."
- Illustration: similar to Feature 1

### Feature Block 3: Knowledge base
- Layout: 2-col grid, text left, illustration right
- Eyebrow: "Knowledge base"
- H3: "Keep a record of all your important information"
- Body: "Ditto is your living history of past assessments and actions. Need to know when a policy changed or a process was implemented? Just ask Ditto."
- Illustration: similar to Feature 1

### Section: Hear it from our customers
- H2 centered: "Hear it from our customers" (text-3xl md:text-4xl lg:text-5xl, font-heading, mb-3)
- Subtitle: "Customers of all sizes love Ditto for its simplicity, smarts, and impact, above all." (body-sm, centered, max-w-2xl, mb-10)
- Carousel: 3 testimonials visible on desktop (reuse `TestimonialsCarousel` pattern but inline here with shorter list)
- Pagination dots below carousel (yellow active dot)

### Testimonial Data
- Souraya Bouri - Group CSR Manager - "Ditto is the all-in-one tool that enables us to turn our CSR compliance into a competitive advantage."
- Robert - "A big thank you to Ditto. Their platform enables us with skill and passion for helping us strive for quality, solutions, and requests. We have nothing but praise for this exceptional tool."

### Ready to get compliant CTA
- 2-col grid: H2 left ("Ready to get compliant? Ditto."), text + Get Started right
- Decorative row of overlapping colored circles below
- Section padding: section-y

## Components to Create

1. **`src/components/solutions/hero-with-illustration.tsx`** — hero with email form + dashboard image
2. **`src/components/solutions/feature-block.tsx`** — alternating text+image block (similar to FeatureSection but with eyebrow dot)
3. **`src/components/solutions/customers-carousel.tsx`** — testimonials carousel (client, 2 testimonials + dots)
4. **`src/app/en/solutions/management-system/page.tsx`** — page assembly

## Assets
- Hero dashboard image: `https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/686e6a8e3bcf2e1b9c4a4d3a_dashboard-mockup.avif` (verify exact URL by downloading)
- For now, use the home page's hero illustration (`/images/hero/frameworks-hero.jpg`) as placeholder if the actual management-system hero image isn't available. Or download from CDN.

## Text Content (verbatim)
- H1: "Your team's single source of truth for CSR and compliance"
- Hero paragraph: "No more searching across documents or chasing down answers—Ditto gives you everything you need to manage your team's CSR and compliance, right where you need it."
- H2 (features intro): "See the full picture and step toward your goals with confidence"
- Feature 1: "Centralized dashboard" / "Centralize your compliance data and easily identify gaps" / "When it comes to compliance, knowing can be half the battle. Ditto gives you a central view into your company's documents and activities, so you can identify gaps and areas for improvement."
- Feature 2: "Progress tracking" / "Set big goals and track your progress toward them" / "Set measurable goals and realistic deadlines, then mobilize your team to make it happen. With Ditto, you'll have a clear view of each objective's status to keep you on track."
- Feature 3: "Knowledge base" / "Keep a record of all your important information" / "Ditto is your living history of past assessments and actions. Need to know when a policy changed or a process was implemented? Just ask Ditto."
- H2 (testimonials): "Hear it from our customers"
- Testimonials subtitle: "Customers of all sizes love Ditto for its simplicity, smarts, and impact, above all."
- H2 (final CTA): "Ready to get compliant? Ditto."
- Form placeholder: "Your work email"
- Button: "Get Started"

## Responsive Behavior
- **Desktop (1440px):** hero 2-col, features alternating 2-col, carousel 3 cards
- **Tablet (768px):** hero stacks, features stack, carousel 2 cards
- **Mobile (390px):** everything single column, carousel 1 card

## State Management
- "use client" needed for: hero form (email state), testimonials carousel

## Build & Verify
- Run `npx tsc --noEmit` and ensure no errors
- Verify route renders at http://localhost:3000/en/solutions/management-system
