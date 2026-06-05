# ContactNumbersSection Specification

## Overview
- **Target file:** `src/components/contact/numbers-section.tsx`
- **Screenshot:** `docs/design-references/trustditto.com-get-started/desktop-fullpage.png` (numbers band, 651px)
- **Interaction model:** static

## DOM Structure
```
<section.numbers_section>
  <div.padding-global>
    <div.spacer-6rem>             (top 96px)
    <div.container-84rem>
      <div.header>
        <h2.heading-size-3rem>Our impact</h2>
      </div>
      <div.spacer-3rem>            (48px)
      <div.numbers_list>           (flex row, gap)
        <div.numbers_card>          (yellow, 80px radius)
          <p.heading-size-display>150+</p>
          <p.text-size-1x375rem>brands served across Morocco, France, and the wider MENA region</p>
        </div>
        <div.numbers_card.is--blue>  (blue, 1440px radius — pill shape, overlaps)
          <p.heading-size-display>12M+</p>
          <p.text-size-1x375rem>in paid media spend managed for our clients</p>
        </div>
        <div.numbers_card.is--green>  (green, 80px radius)
          <p.heading-size-display>+3.2x</p>
          <p.text-size-1x375rem>average return on ad spend for our clients</p>
        </div>
      </div>
      <div.spacer-3rem>            (48px)
      <div.button-group.x-center></div>     (empty)
    </div>
    <div.spacer-6rem>             (bottom 96px)
  </div>
  <div.layer-4><div.background data-wf--background--color="primary" /></div>
</section>
```

## Computed Styles (from getComputedStyle at 1440x900)

### section.numbers_section
- background: surface-primary
- position: relative, zIndex: 1
- width: 1440px, height: 650.578px

### h2.heading-size-3rem
- fontSize: 48px
- fontWeight: 400
- lineHeight: 1.15
- letterSpacing: -0.01em
- color: text-primary
- text-align: center (from .header or section)

### div.numbers_list
- display: flex
- flexDirection: row
- gap: 0 (cards overlap with negative margin)
- alignItems: stretch

### div.numbers_card (yellow)
- backgroundColor: `rgb(255, 226, 40)` (brand-yellow)
- borderRadius: 80px
- padding: 48px 72px
- width: 480px
- height: 286.89px
- display: flex, flexDirection: column, justifyContent: center, alignItems: center, gap: 16px
- mixBlendMode: multiply (creates overlap effect)

### div.numbers_card.is--blue
- backgroundColor: `rgb(58, 147, 255)` (brand-blue)
- borderRadius: 1440px (full pill)
- padding: 72px
- margin: 0 -48px (negative side margins cause overlap)
- width: 480px, height: 307.39px
- display: flex, flexDirection: column, justifyContent: center, alignItems: center, gap: 16px
- mixBlendMode: multiply

### div.numbers_card.is--green
- backgroundColor: `rgb(89, 226, 93)` (brand-green)
- borderRadius: 80px
- padding: 48px 72px
- width: 480px, height: 259.39px
- display: flex, flexDirection: column, justifyContent: center, alignItems: center, gap: 16px
- mixBlendMode: multiply

### p.heading-size-display
- fontSize: 88px
- fontWeight: 400
- fontFamily: Newsreader (or Hedvig Letters Serif — project uses Newsreader)
- lineHeight: 92.4px
- letterSpacing: -0.88px
- color: text-primary
- text-align: center

### p.text-size-1x375rem (card subtitle)
- fontSize: 22px
- lineHeight: 27.5px (1.25)
- color: text-primary
- text-align: center
- maxWidth: ~30rem (constrained for readability)

## Reuse
- Apply `<Reveal variant="stagger">` on the numbers_list so cards fade in one after another
- Use the brand-* Tailwind tokens already in globals.css

## Text Content (verbatim)

### H2
"Our impact"

### Card 1 (yellow)
- Stat: "150+"
- Body: "brands served across Morocco, France, and the wider MENA region"

### Card 2 (blue)
- Stat: "12M+"
- Body: "in paid media spend managed for our clients"

### Card 3 (green)
- Stat: "+3.2x"
- Body: "average return on ad spend for our clients"

## Responsive Behavior
- **Desktop (1440px):** 3 cards horizontal, blue card overlaps with -48px margin, mix-blend-multiply
- **Tablet (768px):** cards stack or wrap; recommend flex-wrap with smaller widths
- **Mobile (390px):** stack vertically, each card full-width minus padding, no overlap
- **Breakpoint:** flex → column at md (768px)
