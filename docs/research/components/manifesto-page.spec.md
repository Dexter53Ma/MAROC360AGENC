# Manifesto Page Specification

## Overview
- **Target file:** `src/app/en/manifesto/page.tsx`
- **Screenshot:** `docs/design-references/trustditto.com-manifesto/desktop.png`
- **Interaction model:** mostly static; "Careers" CTA + commitment/investors carousels
- **Path:** `/en/manifesto` (Next.js App Router: `src/app/en/manifesto/page.tsx`)
- **Reuses:** `Navbar`, `Footer`, `LinkButton`, existing CSS tokens, existing carousel patterns from `expertise-carousel.tsx`

## DOM Structure (top to bottom)

1. **Navbar** — reuse existing `Navbar` component
2. **Hero** — H1 "We're here to help businesses build trust and build better, together" + paragraph + decorative circle/pill row
3. **"Our core beliefs" Section** — H2 + 3 alternating-image belief blocks
4. **"We're all copilots on this journey" CTA banner** — yellow background + green/blue/pink decorative pills + "Explore open roles" button
5. **"We're committed to a sustainable future for everyone" Section** — H2 + carousel of 3 cards (EcoVadis Platinum, UN Global Compact, EcoVadis training)
6. **"Our investors" Section** — H2 + carousel of investor logos
7. **"Ready to get compliant? Ditto." CTA** — text + Get Started button + decorative circles
8. **Footer** — reuse existing `Footer` component

## Computed Styles (from desktop screenshot at 1440px)

### Hero
- H1: `font-heading`, text-5xl md:text-6xl, text-center, max-w-3xl mx-auto, mb-6
- Paragraph: `body-lg`, text-center, max-w-2xl mx-auto, mb-10
- Decorative row: row of overlapping colored circles/pills, full-width, h-16, with mix-blend-multiply
  - Colors: yellow (#FFE228), blue (#3A93FF), green (#59E25D), pink (#E261E5)
  - Use SVG with mix-blend-multiply to recreate the watercolor/overlapping effect
- Section padding: 4rem 0 6rem

### Our Core Beliefs
- Section heading: H2 "Our core beliefs" centered, text-3xl md:text-4xl lg:text-5xl, mb-12
- Each belief = full-width row, 2-col grid (image + text) on md+, stacked on mobile
  - Even beliefs: text left, image right
  - Odd beliefs: image left, text right
  - Use `lg:order-1` and `lg:order-2` swaps
- Each belief has:
  - Image: aspect-square or 4/3, rounded-3xl, object-cover, max-w-md
  - H3: text-2xl md:text-3xl, font-heading, mb-3
  - Body: text-base text-text-secondary, max-w-md

### Belief 1
- Title: "We think great partners make great businesses"
- Body: "A great partner can help you scale faster, work smarter, and grow in ways you couldn't imagine. That's the kind of partner we aim to be for our customers and everyone they work with, too."
- Image: `https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6970ff9bf4ef80b4ce269d2b_ditto_better_businesses_illustration_7%20-%20Grande.jpeg`
- Image position: LEFT (text on right)

### Belief 2
- Title: "We see compliance as an opportunity, not an obstacle"
- Body: "At Ditto, we see compliance as a chance to showcase your leadership, take pride in your CSR practices, and partner with people who share your values."
- Image: `https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6a184a915f82cad90b79a145_ditto_better_world_illustration_6%20-%20Grande.jpeg`
- Image position: RIGHT (text on left)

### Belief 3
- Title: "When sustainable businesses win, we all win"
- Body: "We think building sustainability into your business is one of the surest ways to future-proof it. It's a win-win for the planet, your partners, and your business."
- Image: NONE / placeholder (the original has no image here, just text left)

### Copilots CTA Banner
- Full-width yellow background: `bg-[#FFE228]`
- Border radius: rounded-none on top/bottom, OR rounded-3xl on the whole banner
- Position: relative with decorative shapes
- Decorative shapes (absolute positioned):
  - Left: large green pill, blue pill, pink pill overlapping (like home page CTA)
  - Right: large yellow circle + magenta circle
  - Use mix-blend-multiply
- Content (centered, z-10):
  - Eyebrow: "Careers" (text-sm with bullet, `text-text-primary`)
  - H2: "We're all copilots on this journey" (text-3xl md:text-4xl lg:text-5xl, font-heading)
  - Paragraph: "This work is about building better together—and that starts with our team. If you want to work on the future of sustainable business, we'd love to hear from you."
  - Button: "Explore open roles" → `/en/careers`, primary variant
- Padding: 6rem 4rem
- Max-width: 42rem centered

### Commitment Section
- H2: "We're committed to a sustainable future for everyone" (text-3xl md:text-4xl lg:text-5xl, max-w-3xl, mb-12)
- Carousel: 3 cards, embla carousel (reuse pattern from `expertise-carousel.tsx`)
  - Each card: `bg-surface-tertiary`, rounded-3xl, p-6, aspect-[4/3]
  - Top: badge/logo image (h-16 w-16 object-contain, mb-4)
  - Title: text-xl font-semibold mb-2
  - Body: text-sm text-text-secondary
- Cards:
  1. EcoVadis Platinum badge - "Ditto is EcoVadis Platinum" / "We've put our methodology to the test on our own business and earned the highest EcoVadis rating." (image: `https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6854c3e94b5bc20dde8db6dc_ecovadis-platinum.svg`)
  2. UN Global Compact - "UN Global Compact" / "Our membership in the UN Global Compact means we're putting our values to work to build a sustainable business and a better world." (image: `https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6854c3e94b5bc20dde8db6dd_un-global-compact.svg`)
  3. EcoVadis training partner - "We're EcoVadis training partners" / "We've been working with EcoVadis since 2023 to increase sustainability in supply chains, one CSR program at a time." (image: `https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6854c3e94b5bc20dde8db6de_ecovadis-training-partner.svg`)

### Our Investors Section
- H2: "Our investors" (text-3xl md:text-4xl lg:text-5xl, centered, mb-2)
- Subtitle: "Partnership is in our DNA and we're proud to work with many of the best." (body-sm, centered, max-w-2xl mx-auto, mb-12)
- Carousel: investor logos (5-6 logos), embla carousel with smaller slides
  - Slide: h-24 w-40 flex items-center justify-center
  - Logos to use: Kfund, Ring Capital, etc. — for now use generic placeholder logos if exact ones not available. Use the `LogoStrip`-style grayscale with hover-to-color.

### Ready to get compliant CTA
- 2-col grid (text left, button right) on md+, stacked on mobile
- Left: H2 "Ready to get compliant? Ditto." (text-3xl md:text-4xl lg:text-5xl, max-w-md, font-heading)
- Right: paragraph + Get Started button (primary)
- Decorative: full-width row of colored overlapping circles below, mix-blend-multiply
- Padding: section-y

## State Management
- "use client" needed for the carousels (2 instances) and any animations
- Reuse embla-carousel-react pattern from existing components

## Components to Create

1. **`src/components/manifesto/belief-block.tsx`** — alternating image+text block
2. **`src/components/manifesto/copilots-cta.tsx`** — yellow CTA banner with decorative shapes
3. **`src/components/manifesto/commitment-carousel.tsx`** — 3-card carousel (client component)
4. **`src/components/manifesto/investors-carousel.tsx`** — logos carousel (client component)
5. **`src/components/manifesto/hero-pills.tsx`** — decorative SVG row of overlapping circles
6. **`src/app/en/manifesto/page.tsx`** — assembles all sections

## Assets
- All illustrations + logos are CDN URLs from `cdn.prod.website-files.com/`. Use them via `next/image` with the existing remotePatterns config. Or download to `public/images/manifesto/` if you want them local.

## Text Content (verbatim)
- H1: "We're here to help businesses build trust and build better, together"
- Hero paragraph: "Every partner you pick, every supplier you choose, every customer you serve—they're all a part of your story. But building trust across them? It's not easy. We started Ditto to change that."
- H2 (beliefs): "Our core beliefs"
- H2 (copilots): "We're all copilots on this journey"
- H2 (commitment): "We're committed to a sustainable future for everyone"
- H2 (investors): "Our investors"
- Investors subtitle: "Partnership is in our DNA and we're proud to work with many of the best."
- H2 (final CTA): "Ready to get compliant? Ditto."

## Responsive Behavior
- **Desktop (1440px):** all sections as described, alternating beliefs
- **Tablet (768px):** beliefs still 2-col but smaller; carousels work
- **Mobile (390px):** beliefs stack (image top, text bottom or vice versa); carousels work with mobile-friendly slide widths (reuse updated embla CSS)

## Build & Verify
- Run `npx tsc --noEmit` and ensure no errors
- Verify route renders at http://localhost:3000/en/manifesto
