# ContactSection Specification

## Overview
- **Target file:** `src/components/contact/contact-section.tsx`
- **Screenshot:** `docs/design-references/trustditto.com-get-started/desktop-viewport.png` (main 1012px block)
- **Interaction model:** static layout, form is interactive (controlled inputs, submit handler)

## DOM Structure
```
<section.contact_section>
  <div.padding-global>           (px-6 md:px-10 lg:px-12, max-w-84rem)
    <div.spacer-3rem>            (top 48px)
    <div.container-84rem>
      <div.contact_component>
        <div.contact_content_wrapper>           (grid lg:grid-cols-2 gap)
          <div.contact_content>                 (LEFT)
            <h1.heading-size-4rem>Get in touch</h1>
            <p.text-size-1x375rem>...Tell us about your project...</p>
            <div.socialproof_item>              (Trustpilot)
              <a>4.6/5 on Trustpilot</a> + <img trustpilot.svg>
            </div>
            <h3.heading-size-2rem>Why teams reach out:</h3>
            <div.contact_features_list>         (4 features)
              <div.contact_features_item>        (icon + text)
                <div.contact_features_icon>     (24x24 checkmark SVG)
                <p>Win more deals</p>
              </div> x4
            </div>
          </div>
          <div.contact_form_wrapper>            (RIGHT)
            <div.contact_form>                   (form goes here)
              <form>...5 inputs + 1 checkbox group + submit</form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div.spacer-6rem>             (bottom 96px)
  </div>
  <div.layer-4><div.background data-wf--background--color="primary" /></div>
</section>
```

## Computed Styles (from getComputedStyle at 1440x900)

### section.contact_section
- background: `rgb(239, 242, 229)` (surface-primary)
- position: relative
- zIndex: 1
- width: 1440px
- height: 1012px

### div.contact_content_wrapper
- display: grid (1-col mobile, 2-col desktop)
- gridTemplateColumns: `1fr 1fr` (computed) at lg breakpoint
- gap: 80px (computed: 5rem)

### h1.heading-size-4rem
- fontSize: 40px
- lineHeight: 44px
- letterSpacing: -0.4px
- color: `rgb(19, 14, 48)` (text-primary)
- fontWeight: 400
- fontFamily: Newsreader, "Hedvig Letters Serif" → project uses Newsreader (--font-heading)

### p.text-size-1x375rem
- fontSize: 22px
- lineHeight: 27.5px
- color: `rgb(19, 14, 48)` (text-primary)

### div.socialproof_item
- display: flex, gap
- Trustpilot link: 18px, semibold "4.6" + tertiary "/5" + " on Trustpilot"
- Trustpilot star icon: 28x28, next to text

### h3.heading-size-2rem
- fontSize: 32px
- fontWeight: 400
- lineHeight: 1.2

### div.contact_features_item
- display: flex, align-items: center, gap: 12px
- icon: 24x24 checkmark in dark color
- text: 22px, line-height 1.25

### div.contact_form_wrapper
- background: `rgb(249, 251, 242)` (surface-tertiary, lighter)
- borderRadius: 24px
- padding: 40px

## Per-State Content

### State: default
- Form fields visible
- Submit button: "Send message"

### State: submitting
- Button shows loading spinner
- Inputs disabled

### State: success
- Button shows check + "Thanks!"
- After 2.4s, resets

## Form Fields (5 visible, 1 hidden group, 2 hidden UTM)

| Label | Name | Type | Required | Placeholder |
|-------|------|------|----------|-------------|
| Nom/Last Name | firstname | text | yes | John |
| Prénom/First Name | lastname | text | yes | Doe |
| Email | email | email | yes | john@acme.com |
| Numéro de téléphone | phone_number_from_form | tel | yes | +33 6 21 34 65 78 |
| Nom de l'entreprise | company | text | yes | Acme |
| Services | 0-2/services | checkbox[] | no | (multi-select) |
| utm_source | utm_source | hidden | no | — |
| utm_campaign | utm_campaign | hidden | no | — |

### Field styling
- height: 48px
- padding: 0 16px
- background: white
- border: none
- border-bottom: 1px solid `rgb(182, 186, 149)`
- borderRadius: 6px
- fontSize: 16px, color: text-primary

### Label styling
- fontSize: 16px, weight: 400
- color: text-primary

### Submit button
- background: `rgb(19, 14, 48)` (text-primary)
- color: `rgb(239, 242, 229)` (surface-primary)
- borderRadius: 9999px (pill)
- padding: 14px 24px
- fontSize: 16px, weight: 400

## Reuse
- Use `<Reveal>` from `@/components/motion/reveal` for left content sections
- Use `<LinkButton>` from `@/components/button` if a CTA is needed (not in this section)
- Form: build a local `ContactForm` component (client component) using existing `<input>` styling

## Text Content (verbatim)

### H1
"Get in touch"

### Subhead
"Tell us about your project. We typically reply within 24 hours."

### Social proof
"4.6 /5 on Trustpilot"

### H3
"Why teams reach out:"

### Features list
1. "Free 30-min strategy call"
2. "Tailored proposal within 48h"
3. "No long-term contracts"
4. "Dedicated account manager"

### Submit button
"Send message"

## Assets
- Trustpilot star icon: `https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/69a7fb7319962df0c9f5adbc_trustpilot-2.svg` — save to `public/seo/trustpilot.svg`
- Checkmark icon (inline SVG) — add to `src/components/icons.tsx` as `CheckIcon`

## Responsive Behavior
- **Desktop (1440px):** 2-col grid, left content / right form, gap-20
- **Tablet (768px):** stacks to 1-col, form below content
- **Mobile (390px):** stacks to 1-col, padding 24px
- **Breakpoint:** 1-col → 2-col at lg (1024px)
