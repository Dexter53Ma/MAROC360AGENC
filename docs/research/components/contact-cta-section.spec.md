# ContactCtaSection Specification

## Overview
- **Target file:** `src/components/contact/cta-section.tsx`
- **Screenshot:** `docs/design-references/trustditto.com-get-started/desktop-fullpage.png` (bottom 726px)
- **Interaction model:** static layout, button is interactive

## DOM Structure
```
<section.cta_section>
  <div.padding-global>
    <div.spacer-6rem>             (top 96px)
    <div.container-84rem>
      <div.cta_header>             (2-col flex)
        <div.cta_header_content>   (LEFT)
          <h2.heading-size-4rem>Ready to grow? Maroc 360.</h2>
        </div>
        <div.cta_header_content>   (RIGHT)
          <div.max-width-32rem>
            <p.text-size-1x375rem>Turn your CSR program into a strategic advantage...</p>
          </div>
          <div.spacer-1x5rem>
          <div.button-group>
            <a.button>Get in touch</a>
          </div>
        </div>
      </div>
      <div.spacer-3rem>             (48px)
      <div.cta_illus_embed>         (decorative SVG)
        <svg>...</svg>
      </div>
    </div>
    <div.spacer-6rem>             (bottom 96px)
  </div>
  <div.layer-4><div.background data-wf--background--color="primary" /></div>
</section>
```

## Computed Styles (from getComputedStyle at 1440x900)

### section.cta_section
- background: surface-primary
- position: relative, zIndex: 1
- width: 1440px, height: 726.11px

### div.cta_header
- display: flex (or grid 2-col)
- gap: 32px
- alignItems: flex-start

### h2.heading-size-4rem
- fontSize: 40px (also 56px at lg)
- lineHeight: 1.1
- letterSpacing: -0.01em
- fontWeight: 400
- fontFamily: Newsreader
- color: text-primary
- maxWidth: 28rem

### p.text-size-1x375rem (right)
- fontSize: 22px
- lineHeight: 1.25
- color: text-primary
- maxWidth: 32rem

### a.button
- background: text-primary (#130E30)
- color: surface-primary (#EFF2E5)
- borderRadius: 9999px (pill)
- padding: 14px 24px
- fontSize: 16px, weight: 400

### div.cta_illus_embed svg
- viewBox: 0 0 1780 345
- width: 100%
- height: auto
- 8 `<rect>` shapes with mix-blend-mode: multiply
- Colors: `#E261E5` (pink), `#59E25D` (green), `#3A93FF` (blue), `#FFE228` (yellow)

## Reuse
- Use `<LinkButton>` from `@/components/button` for the "Get in touch" button (variant="primary")
- Use `<Reveal>` to animate the heading and body

## Text Content (verbatim)

### H2
"Ready to grow? Maroc 360."

### Body
"Let's build a marketing engine that compounds — strategy, media, and content working as one."

### Button
"Get in touch"
- Href: `/en/contact` (self-link)

## SVG Illustration
The 8-shape blob decoration is decorative only. Render inline as SVG in the component.
The full SVG is saved at `docs/research/trustditto.com-get-started/tree/cta-illus.svg`.

## Responsive Behavior
- **Desktop (1440px):** 2-col header, heading left / body+button right
- **Tablet (768px):** stacks, heading above body, full-width
- **Mobile (390px):** stacks, padding reduces
- **Breakpoint:** flex → column at md (768px)
- SVG width 100% across all viewports
