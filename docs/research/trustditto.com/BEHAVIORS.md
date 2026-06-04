# Ditto – Behaviors Reference

Captured from live site on 2026-06-04 via Playwright. Use as the source of truth when writing component specs.

## 1. Navbar
- **Position:** `sticky; top: 0; z-index: 1000;`
- **Height:** 80px desktop, 64px mobile
- **Background:** `rgb(239, 242, 229)` (matches page bg, no contrast on scroll)
- **Scroll behavior:** No transform, no background change, no shadow — the bar just stays in place.
- **Dropdown menus:** Webflow dropdowns on hover OR click (data-hover="true"). On desktop, hover opens the menu; on mobile, click opens. Dropdown menu has rounded bottom corners (border-radius 0 0 1.5rem 1.5rem) and contains 2-column link grid.
- **Mobile:** Hamburger button (40x40) shows; menu slides down full-width.
- **Hamburger animation:** 2 lines that rotate to form an X over 0.4s cubic-bezier(0.645, 0.045, 0.355, 1).

## 2. Hero
- **Layout:** 2-column on desktop (text left, image right). Stacks to single column on mobile.
- **Background:** Has decorative SVG pill-blob pattern (mix-blend-mode:multiply) at the bottom of the section.
- **Email form:** input + yellow submit button "Get Started" on the same line. On mobile, they stack.
- **No state animation on scroll.**

## 3. Logo strip
- **Layout:** 1 row of 10 logos (5 columns × 2 rows) on desktop. The visible logos are 8 companies + 2 in the second row.
- **Logos:** All grayscale, sized uniformly (width ~6rem, height ~3rem).
- **Each logo is clickable** → external "Case study" page (the `Case study` overlay text is a small link).

## 4. Frameworks carousel (Get compliant four times faster)
- **Library:** Splide (auto-init from `splide` attribute)
- **Slides:** 4 unique cards (CSRD, EcoVadis, ISO 14001, CDP) + clones for infinite loop
- **Slide width:** 26rem (416px)
- **Gap:** 3rem
- **Card structure:** icon (top, 64x64) + h3 (heading-size-2rem) + body text (1.375rem)
- **Background:** None on the slide, the wrapper has a tinted card-ish background? Actually the slide has no bg. The card-icon is positioned above the heading.
- **Auto-scroll:** Yes, splide-interval 5000ms
- **Drag:** Yes
- **No visible nav buttons** on the public-facing first carousel

## 5. Home illustration
- **Wrapper:** border-radius 48px, 1px navy border, contains a wide illustration (1440x360)
- **Image has the brand "blobs" already baked in** — no need to layer SVGs on top

## 6. Intro (Embedded expertise)
- **Layout:** Centered H2 (max-width 32rem) + paragraph
- **Text wrap balance** (text-wrap-balance CSS property)

## 7-10. Feature sections (4x identical structure)
- **Layout:** 2-column flex on desktop. Text block on one side, image on the other.
- **Alternating:** Variants swap which side has the text vs image.
- **Image:** avif illustration with aspect-ratio preserved
- **Eyebrow text:** small label above h2 (e.g., "Management system")
- **Heading:** Hedvig Letters Serif, large
- **Description:** body text in muted color
- **"Learn More" link:** pill button with chevron-right icon

## 11. Pill illustration
- **Wrapper:** border-radius 390px (full pill), 1px navy border, aspect-ratio 69.5/39
- **Image:** avif team photo

## 12. Tech & expertise carousel (Advanced technology meets human expertise)
- **Library:** Splide
- **Slides:** 5 unique cards (Proprietary methodology, Dedicated coach, EcoVadis training partner, Friend of EFRAG, Compliance watch) + clones
- **Slide width:** 26rem
- **Each card:** icon (SVG, 64x64) + h3 + body
- **Nav buttons:** Visible left/right pill buttons at the sides
  - 60px wide × 88px tall
  - border-radius asymmetric pill (right side / left side)
  - bg `rgb(249, 251, 242)` (surface-tertiary)
  - transition `opacity 0.25s ease-in-out, background-color 0.25s ease-in-out`
- **Plus a "Get Started" CTA button** in the same row as the nav arrows

## 13. Testimonials carousel (What customers are saying)
- **Library:** Splide
- **Slides:** 6 testimonial cards (Sophie Wardan, Virginie Caro, Laurence Sauphanor, Camille Nironi, Audrey Evin, anonymous)
- **Card structure:** Company logo (top), quote text, person name + role, avatar
- **Slide width:** 30rem (480px), padding 2rem
- **Nav buttons:** Same pill-style as the previous carousel
- **Link:** "Read More" link to customer stories
- **Quote text is in Hedvig Letters Serif (serif)**

## 14. Blog preview
- **Layout:** 3-column grid of article cards
- **Each card:** thumbnail image + title (Hedvig Letters Serif) + small "Read more" link
- **Card border-radius:** 1.5rem
- **Images use `object-fit: cover`** in a 16:9 wrapper

## 15. CTA section
- **Layout:** Pill-shaped (rounded all-around) container with text + email form
- **H2:** "Ready to get compliant? Ditto."
- **Email form:** Input + button, similar to hero
- **Bg:** Some sort of branded color (the pill SVG blobs appear as background)

## 16. Footer
- **Layout:** Multi-column with link groups (EcoVadis, ISO 14001, CDP, CSRD, Solutions, Resources, Company)
- **Logo** + tagline at top
- **Subscribe form** at top: "Practical CSR insights..." with email input
- **Social:** LinkedIn icon
- **Copyright:** "© 2026 Ditto — All rights reserved" + small links (Legal, Privacy, Terms, Cookie settings)

## Global hover / interactive states
- **Primary button** (`.button`): bg `rgb(19, 14, 48)` → hover `rgb(95, 92, 110)` (#5f5c6e), text stays white
- **Secondary button** (Log in variant): border navy, transparent bg → hover bg `#efd624` (yellow) with navy text
- **Tertiary button** (no border): transparent → hover bg `rgba(182, 186, 149, 0.13)` (subtle sage with alpha)
- **Nav links:** text weight 600, font-size 1rem. On hover, parent shows underline.
- **"link-hover-parent" pattern:** The link itself is the child; on parent hover, child gets underline (Webflow convention).
- **Carousel nav buttons:** bg `rgb(249, 251, 242)` → hover bg `rgb(232, 235, 217)` (darker), opacity 0.75 on idle? Actually transitions opacity 0.25s.

## Global scroll behavior
- **No Lenis, no Locomotive** — default native scroll.
- **scroll-behavior: auto** (no smooth scroll)
- No anchor link smooth scroll in CSS
- Page jumps are instant

## Section spacing (vertical rhythm)
- Section padding-y: typically 6rem (96px) at top, 6rem at bottom (via `.padding-global` + `spacer-component`)
- `medium-6rem` is the standard space variant
- Spacers: `.spacer-0x5rem` (8px), `.spacer-1rem` (16px), `.spacer-2rem` (32px), `.spacer-3rem` (48px), `.spacer-4rem` (64px), `.spacer-5rem` (80px), `.spacer-6rem` (96px)
