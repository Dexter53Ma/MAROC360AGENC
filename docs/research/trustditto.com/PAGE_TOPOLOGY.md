# Ditto – Page Topology

Target: https://www.trustditto.com/en
Captured: 2026-06-04
Total page height: ~10,564px (desktop 1440)

## High-level structure (top → bottom, scroll order)

| # | Section | Class | Height (desktop) | Interaction model |
|---|---------|-------|------------------|-------------------|
| 1 | Navbar | `navbar1` | 80px | sticky; no scroll-state change; dropdowns on hover/click |
| 2 | Hero | `hero_section` | 564px | static; email form submit |
| 3 | Logo strip | `logostrip_section` | 355px | static; logo cards |
| 4 | Frameworks carousel | `carousel_section` (#1) | 528px | auto-scrolling Splide loop (4 cards × N clones) |
| 5 | Home illustration banner | `home-illus_section` | 432px | static; rounded-rect image banner |
| 6 | Intro (Embedded expertise) | `generic_section` | 313px | static; centered H2 + paragraph |
| 7 | Feature 1 — Management system | `feature1_section` | 696px | static; 2-col with reversed variants |
| 8 | Feature 2 — Questionnaire automation | `feature1_section` | 696px | static; 2-col |
| 9 | Feature 3 — AI and embedded intelligence | `feature1_section` | 696px | static; 2-col |
| 10 | Feature 4 — Supplier engagement | `feature1_section` | 696px | static; 2-col |
| 11 | Pill illustration | `pill-illus_section` | 768px | static; full-width pill-shaped team photo |
| 12 | Tech & expertise carousel | `carousel_section` (#2) | 833px | auto-scrolling Splide (5 cards) + nav buttons |
| 13 | Testimonials carousel | `carousel_section` (#3) | 1026px | auto-scrolling Splide (6 testimonial cards w/ logos) + nav buttons |
| 14 | Blog preview | `blog-preview_section` | 997px | static; 3 article cards in a row |
| 15 | CTA | `cta_section` | 723px | static; email form |
| 16 | Footer | `footer` | 1160px | static; multi-column links + subscribe |

## z-index layers
- 0: page content
- 2: navbar dropdown contents / hamburger button
- 1000: navbar (sticky)

## Container system
- Page bg: `rgb(239, 242, 229)` (cream/sage)
- Main wrapper: `padding-global` → `container-84rem` (max-width ~84rem = 1344px)
- Many sections use `container-84rem` with `max-width-32rem` for headings and `max-width-...` for content.

## Carousels (3 Splide instances)
- Each has: `.splide` → `.splide__track` → `.splide__list` → `.splide__slide` (× 4 / 5 / 6 unique)
- Auto-loop with `splide-interval="5000"` (5s), clones added for infinite loop effect
- Gap 3rem (48px) between slides
- Mobile gap: 1rem
- Slide width: 26rem (416px) for the first two carousels
- Testimonial slide width: 30rem (480px) with 2rem padding inside
- Carousel #2 and #3 have left/right nav buttons with pill shapes (border-radius 1440px, height 88px)
- Drag is enabled

## Feature section layout (`.feature1_section`)
- 2-column flex: left text block + right image (or reversed via `w-variant`)
- Gap: ~2-3rem
- Vertical alignment: text/image at center
- Mobile: stacks column-reverse, image first

## Responsive breakpoints (from Webflow CSS)
- ≤ 991px (tablet): nav switches to hamburger; hero stacks; logostrip becomes 3-col grid; features stack vertically
- ≤ 767px (mobile): single-column; spacing reduces
- ≥ 992px (desktop): full nav and 2-column layouts

## Critical asset locations
- `public/images/logos/` — company logos for strip + footer (10 logos)
- `public/images/cards/` — framework icons (csrd, ecovadis, iso, cdp) + "methodology" SVGs
- `public/images/features/` — 4 feature illustrations (avif)
- `public/images/team/` — pill-illus team photo
- `public/images/testimonials/` — 6 person avatars + 5 company logos
- `public/images/blog/` — 3 article thumbnails
- `public/images/hero/` — hero image (frameworks-hero)
- `public/images/home-illus/` — narrow illustration banner
- `public/seo/` — favicon, webclip, og-image
