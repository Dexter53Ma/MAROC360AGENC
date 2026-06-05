# ContactBreadcrumbs Specification

## Overview
- **Target file:** `src/components/contact/breadcrumbs.tsx`
- **Screenshot:** `docs/design-references/trustditto.com-get-started/desktop-viewport.png` (top strip, 68px)
- **Interaction model:** static

## DOM Structure
```
<section.breadcrumbs_section>
  <div.padding-global>           (max-w-84rem, px-6 md:px-10)
    <div.spacer-1x5rem>          (24px top)
    <div.container-84rem>
      <div.breadcrumbs_list>
        <a.link-size-1rem.w--current>Get in touch</a>
    </div>
    <div.spacer-1x5rem>          (24px bottom)
  </div>
  <div.layer-4><div.background data-wf--background--color="primary" /></div>
</section>
```

## Computed Styles (from getComputedStyle at 1440x900)

### section.breadcrumbs_section
- background: `rgb(255, 226, 40)` (brand-yellow)
- backgroundColor: `#FFE228`
- padding: 24px 48px (vertical 1.5rem, horizontal 3rem via padding-global)
- position: relative
- zIndex: 1

### a.link-size-1rem
- fontSize: 16px
- lineHeight: 24px
- color: `rgb(19, 14, 48)` (text-primary)
- textDecoration: none (inherited from a reset)

## Reuse
Mirror `src/components/careers/breadcrumbs.tsx` — same yellow band pattern. Replace text/link target.

## Text Content (verbatim)
- Link text: "Get in touch"
- Href: `/en/contact`

## Responsive Behavior
- **Desktop (1440px):** Yellow band, full-width, link left-aligned
- **Tablet (768px):** Same layout, container-page padding reduces
- **Mobile (390px):** Stacks naturally, link text remains 16px
