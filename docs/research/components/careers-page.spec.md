# Careers Page Specification

## Overview
- **Target file:** `src/app/en/careers/page.tsx`
- **Components:** `src/components/careers/{breadcrumbs,hero-marquee,teams-carousel,video-section,values-grid,interview-list}.tsx`
- **Screenshots:** `docs/design-references/trustditto.com/careers/{desktop,hero-section,teams-section,values-section}.png`
- **Interaction model:** mostly static; hero + teams have auto-advancing carousels; values cards overlap with multiply blend

## Page Background Tokens (reused project tokens)
- Page bg: `bg-surface-primary` = `rgb(239, 242, 229)` (light beige-green)
- Secondary bg: `bg-surface-tertiary` = `rgb(232, 235, 217)` (slightly greener)
- Text: `text-text-primary` = `rgb(19, 14, 48)` (very dark indigo)
- Inverse text on dark bg: `rgb(239, 242, 229)`
- Headings font: `font-heading` (Newsreader — close enough to Hedvig Letters Serif on the live site)

## Section 1 — Breadcrumbs
- Plain `<a href="/en/careers">Careers</a>` link
- YELLOW background (`bg-[#FFE228]`) covering the section
- Container: `container-page`
- Vertical padding: ~16px top, ~16px bottom
- Link color: `text-text-primary`, font-size 14px, no underline by default

## Section 2 — Hero
- YELLOW background (`bg-[#FFE228]`) for the entire section (same as breadcrumbs above it)
- Container: `container-55rem` (max-w-[55rem], 880px), centered
- Top spacer: 64px, bottom spacer: 48px before marquee
- H1: "Great businesses aren't built alone" (use `<br>` between "businesses" and "aren't")
  - `font-heading`, 64px, weight 400, line-height 1.1 (`70.4px`), letter-spacing -0.01em (`-0.64px`), text-center
  - color: `text-text-primary`
- Subtitle: "That's the idea at the heart of Ditto. We're here to help people do their best work together, and that starts with our team."
  - 22px, line-height 1.25 (`27.5px`), text-center, color `text-text-primary`, max-w-[36rem] centered
- 24px gap above button
- Button: "See open roles" → `https://jobs.ashbyhq.com/beavr`
  - Reuse existing `<LinkButton variant="primary">` (dark bg, light text, pill, 12px 22px padding)
- 48px gap before marquee

### Hero Marquee (`hero-marquee.tsx`)
- Full-bleed horizontally, extends past container (`-mx-...` or just `w-screen` + offset)
- Continuous auto-scroll left to right (marquee), NOT a regular carousel
- 4 images cycling. Use the marquee technique (CSS `@keyframes` translateX) instead of a slider:
  - Duplicate the list once (8 slides total) and animate `translateX(0) → -50%` linearly
  - `animation: marquee 40s linear infinite` (slow scroll, no easing)
  - Pause on hover: `group-hover:animation-play-state: paused` (optional)
- Each slide:
  - `width: 532px`, `height: 426px` (first/third) or `532x532` (second/fourth)
  - `borderRadius: 24px` (visually has large rounded corners, especially top-left)
  - `object-cover`, `flex-shrink-0`
  - marginRight: 3rem (gap between slides)
- Slide images (use these exact CDN URLs):
  - `https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6835be3b96b3778a0240361d_careers-pic-1.avif` (532×426)
  - `https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6835be3bdf9d66cbce6004ba_careers-pic-2.avif` (532×532)
  - `https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6835be3b9246f2b838b95d92_careers-pic-3.avif` (532×426)
  - `https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6835be3b583cc387c26aca5c_careers-pic-4.avif` (532×532)
- Below the marquee, 64px spacer before next section

## Section 3 — Teams Carousel (`teams-carousel.tsx`)
- Background: `bg-surface-primary` (page default)
- Container: 84rem (1344px) max-width centered
- Top spacer: 96px
- Header: H2 "Many teams, one vision" + P description
  - H2: `font-heading`, 48px, weight 400, line-height 1.15 (`55.2px`), letter-spacing -0.01em, text-center
  - P: "Compliance is complex—that's exactly what makes this work so exciting. Each team at Ditto plays a unique and interconnected role in realizing our mission." (text-wrap-balance if available, otherwise just text-center)
  - 22px, line-height 1.25, max-w-[48rem] centered
  - 48px gap below header
- Carousel: use existing `.embla` pattern if available, otherwise use Splide-like custom carousel
  - 6 slides, show 3 at desktop, 1.5 at tablet, 1 at mobile
  - Each slide: 416px wide (use `w-[26rem]` to match the existing pattern), gap 3rem between
  - First/Last slide bleeds off the edge of the container (use `-mx-...` or negative margin)

### Team Card
- BG: `bg-surface-tertiary` (`rgb(232, 235, 217)`)
- Padding: 24px
- Border radius: 24px
- Display: flex, flex-direction column, height: 100% (or fixed min-h)
- Content (top to bottom):
  1. Icon image (64×64 SVG): icon at top
  2. Spacer: 48px (`spacer-3rem` equivalent)
  3. H3 (32px font-heading, weight 400, line-height 1.2, letter-spacing -0.01em)
  4. Spacer: 12px (`spacer-0x75rem` equivalent)
  5. P: 22px (`text-size-1x375rem`), line-height 1.25, color `text-text-primary`
  6. Spacer-auto (pushes anything below to bottom)
- H3 text: "Product & Engineering", "Customer Success", "Growth", "Partnerships", "Sales", "Expertise"
- P text (verbatim from live site):
  1. "We're putting technology to work on some of our customers' most challenging problems. Our Product and Engineering teams work hard to make it not only easy, but enjoyable."
  2. "Our Customer Success team listens deeply and works actively to incorporate our customers' needs and feedback into Ditto, so that we're always getting better."
  3. "The more customers we can serve, the better off our world will be. Our Growth team helps us reach as many people as we can to make CSR and compliance easy for all."
  4. "The right partners can have a major impact. Our Partnerships team looks for opportunities to grow alongside likeminded folks while serving our customers."
  5. "Our Sales team gives our customers their first experience of Ditto. From the start, we're here to help, freeing them up from their biggest CSR and compliance challenges."
  6. "Our Expertise team gives our customers a competitive edge by embedding their deep framework knowledge into our products and experiences."
- Icons (real CDN URLs):
  1. `https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6835bf7d14f094acd3522f9a_Product%20%26%20Engineering.svg`
  2. `https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6835bf7d2fb51d794312f086_Customer%20Success.svg`
  3. `https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6835bf7db5d31160927462de_Growth.svg`
  4. `https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6835bf7d469b1259f48c91b6_Partnerships.svg`
  5. `https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6835bf7d5d9f87b8c6ceaee6_Sales.svg`
  6. `https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6835bf7db7bd07f019d52762_Expertise.svg`

### Carousel Navigation
- Prev/Next buttons: 48px round, bg `bg-surface-primary`, border `border border-text-primary/10`, hover: bg `bg-surface-tertiary`
- Icon: 24px chevron (use existing `ChevronRight12` rotated 180° for prev)
- Position: absolutely positioned at vertical center, `left-0` (prev) and `right-0` (next), at the edge of the section
- Mobile (<lg): hide buttons

### Pagination Dots
- 6 dots, ~8px each, gap 8px, centered below carousel
- Active dot: `bg-[#FFE228]` (yellow)
- Inactive dot: `bg-text-primary/15`
- Spacing: 32px above dots, 32px below before Apply button

### Apply Button
- Centered below dots
- "Apply" → `https://jobs.ashbyhq.com/beavr`
- Reuse existing `<LinkButton variant="primary" size="md">`

## Section 4 — Video Section (`video-section.tsx`)
- Background: `bg-surface-tertiary` (`rgb(232, 235, 217)`)
- Top spacer: 64px
- Container: 84rem (1344px) max-width centered
- Single full-width image: `https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6850610bde83d5cb6e3e8044_IMG_3632%20(1).avif`
  - Use `<Image>` with `width: 3815, height: ...` (preserve aspect ratio with `w-full h-auto`)
  - `borderRadius: 16px` (slight rounded corners)
  - `object-cover`
- Bottom spacer: 0 (no extra padding)

## Section 5 — Values Section (`values-grid.tsx`)
- Background: `bg-surface-tertiary` (`rgb(232, 235, 217)`) — same as video section
- Top spacer: 96px
- Container: 84rem (1344px) max-width centered
- H2: "Our values make us" (font-heading, 48px, weight 400, line-height 1.15, letter-spacing -0.01em, text-center, no eyebrow)
- 64px spacer
- Grid: 4 cards in a row (`flex flex-nowrap`)
  - **Important: cards OVERLAP each other** with `mix-blend-mode: multiply` (so where magenta + yellow overlap, you get orange; magenta + green = darker; etc.)
  - Each card is `flex-1 min-w-[16rem]` so they share the width evenly
  - Cards are full-bleed to viewport: the section's container is 1344px but the 4 cards extend beyond the right edge of the container (last card partially clipped). This is by design — it's a "bento" style layout.
  - **Implementation tip:** use `mx-[calc(50%-50vw)] w-screen` on the cards container, then `max-w-screen-xl` to keep some bound. Alternative: use negative margins on the section.

### Value Cards (4 total)
- Each card: padding `64px 72px`, flex flex-col, min-height ~272px
- H3 (font-heading, 32px, weight 400, line-height 1.2, letter-spacing -0.01em)
- Spacer 12px
- P (22px, line-height 1.25, max-w-[15rem]) — so the text doesn't fill the full card width

| # | Color (bg) | border-radius | H3 text | P text |
|---|------------|---------------|---------|--------|
| 1 | `#E261E5` (magenta) | 80px | We have no ego | This is a team sport. We lead with humility and put each other first. |
| 2 | `#FFE228` (yellow) | 1000px (full pill) | We own it | We roll up our sleeves and do what it takes. Think it, do it, own it. |
| 3 | `#59E25D` (green) | 88px | We have impact | Our customers are our number one priority. We keep our eyes on the prize, always. |
| 4 | `#3A93FF` (blue) | 240px | We are relentless | Never sit still. We are obsessed with what's next and what's possible, always looking forward. |

- Apply `mix-blend-mode: multiply` to each card so they blend where they overlap
- Bottom spacer: 144px

## Section 6 — Interviewing Section (`interview-list.tsx`)
- Background: `bg-surface-primary` (page default)
- Container: 84rem (1344px) max-width centered
- Top spacer: 96px
- H2: "Interviewing at Ditto" (font-heading, 48px, weight 400, line-height 1.15, letter-spacing -0.01em, text-center)
- 24px gap below
- P: "We aim to be as sustainable and transparent as we can with our hiring practices. Regardless of role, the process typically takes 2-3 weeks from first call to final offer." (22px, line-height 1.25, max-w-[48rem] centered, text-center)
- 64px spacer
- 6 interview items, each a row with:
  - Colored bar (208px wide, 24px tall, border-radius 1440px = full pill)
  - P text (16px) to the right of bar
  - Flex row, gap 12px, padding 0 24px (so 24px left/right of each item)
  - Total row height: 76px
  - Items stacked vertically
  - Border between items: `border-t border-text-primary/10` (1px top border between rows, last one has no border OR no borders at all — the original has no visible borders in the screenshot, but the 76px height with internal padding suggests something. **Skip borders** unless needed for separation.)
- Bar colors cycle: yellow, green, blue, magenta, yellow, green
- 144px bottom spacer

| # | Bar color | Step text |
|---|-----------|-----------|
| 1 | `#FFE228` (yellow) | Introductory call with HR |
| 2 | `#59E25D` (green) | Hiring manager interview |
| 3 | `#3A93FF` (blue) | Take home case study |
| 4 | `#E261E5` (magenta) | On site interviews (4-5 across teams) |
| 5 | `#FFE228` (yellow) | Reference call |
| 6 | `#59E25D` (green) | Offer |

## Section 7 — CTA
- Reuse existing `<CtaSection />` from `src/components/cta-section.tsx` (already used on home + other pages)

## Footer
- Reuse existing `<Footer />` from `src/components/footer.tsx`

## Responsive Behavior
- **Desktop (≥1024px):** as specified above
- **Tablet (768–1023px):** teams carousel shows 2 cards; values cards stay in row but shrink
- **Mobile (<768px):**
  - H1: scale down to 40-48px
  - Hero marquee slides: full-width with smaller height (~280px), gap 1rem
  - Teams carousel: 1 card visible, full-width, navigation buttons hidden
  - Value cards: stack vertically (1 column), no blend mode (or keep blend mode if visible)
  - Interview items: keep horizontal layout but bar shrinks

## Files to Create
1. `src/app/en/careers/page.tsx` — the page
2. `src/components/careers/breadcrumbs.tsx` — "Careers" link
3. `src/components/careers/hero-marquee.tsx` — yellow hero with H1 + paragraph + button + auto-scrolling image marquee
4. `src/components/careers/teams-carousel.tsx` — H2 + carousel of 6 team cards + nav + dots + Apply
5. `src/components/careers/video-section.tsx` — full-width image
6. `src/components/careers/values-grid.tsx` — H2 + 4 overlapping colored cards
7. `src/components/careers/interview-list.tsx` — H2 + P + 6 step rows

## Reused Shared Components
- `<Navbar />` from `@/components/navbar`
- `<Footer />` from `@/components/footer`
- `<CtaSection />` from `@/components/cta-section`
- `<LinkButton />` from `@/components/button`
- `<Image />` from `next/image`
- Existing `.container-page`, `.container-84rem`, `.container-55rem` utility classes from globals.css
- Existing `font-heading`, `text-text-primary`, `bg-surface-primary`, `bg-surface-tertiary` tokens
- `cn()` from `@/lib/utils`
- `Link` from `next/link`

## Page Metadata
```ts
export const metadata: Metadata = {
  title: "Careers at Ditto – Great businesses aren't built alone",
  description: "That's the idea at the heart of Ditto. We're here to help people do their best work together, and that starts with our team.",
};
```

## Verify Before Finishing
1. `npx tsc --noEmit` passes (use `node_modules/next/dist/bin/next` if `next` command is missing)
2. Dev server hot-reloads the page at `/en/careers`
3. All 7 sections visible: breadcrumbs (yellow) + hero (yellow) + teams + video + values + interview + CTA + footer
4. No console errors (other than the ColorZilla `cz-shortcut-listen` hydration warning)
5. Hero marquee auto-scrolls continuously
6. Teams carousel prev/next buttons advance slides
7. Pagination dots update on slide change
8. All real CDN images load (no 403s)
