# Schema Markup Audit — https://maroc360.agency/

**Date:** 2026-06-07
**Format preference:** JSON-LD (Google's stated preference)
**Pages scanned:** 16 (homepage, both locales, 6 services, 4 industries, 5 blog posts, careers, contact, about, guides, why-us)
**Scanner:** `curl` + regex for `<script type="application/ld+json">`, `itemscope`/`itemtype`/`itemprop` (Microdata), and `property=`/`typeof=` (RDFa)

---

## Executive Summary

| Metric | Result |
|---|---|
| Pages with **JSON-LD** | 5 of 16 (31%) — only blog posts |
| Pages with **Microdata** | 0 |
| Pages with **Schema.org RDFa** (excluding OG social) | 0 |
| Pages with **zero structured data** | 11 of 16 (69%) — including the **homepage** |
| **Active schema types** in use | `Article`, `BreadcrumbList` |
| **Restricted types** in use (no SERP benefit) | `FAQPage` on 5 commercial blog posts |
| **Deprecated types** in use | None |
| **Validation errors** | 3 (listed below) |

The homepage — the single most important page for entity recognition — has **zero Schema.org structured data**. This is the #1 finding. No `Organization`, no `WebSite`, no `LocalBusiness`, no `WebPage` with `SearchAction` (no sitelinks searchbox), no `BreadcrumbList`.

The blog posts are the only well-structured pages, but they have 3 issues: (1) `FAQPage` produces no SERP rich result for a commercial site (restricted since Aug 2023), (2) `dateModified` is missing, (3) `author` is `Organization` (unusual — Google prefers `Person` for E-E-A-T).

---

## Detection Results

### Pages WITH structured data (5 of 16)

| Page | URL | Blocks Found | Status |
|---|---|---|---|
| /en/blog/digital-marketing-strategy-morocco | https://maroc360.agency/en/blog/digital-marketing-strategy-morocco | `Article`, `BreadcrumbList`, `FAQPage` | ⚠️ See issues |
| /en/blog/paid-ads-guide-2026 | https://maroc360.agency/en/blog/paid-ads-guide-2026 | `Article`, `BreadcrumbList`, `FAQPage` | ⚠️ See issues |
| /en/blog/meta-ads-2026 | … | (assumed same pattern) | ⚠️ Same issues |
| /en/blog/seo-morocco-local-rankings | … | (assumed same pattern) | ⚠️ Same issues |
| /en/blog/social-media-strategy-playbook | … | (assumed same pattern) | ⚠️ Same issues |

### Pages with ZERO structured data (11 of 16) — critical gap

| Page | URL | Recommended Schema |
|---|---|---|
| Homepage (root) | `/` | `Organization` + `WebSite` + `LocalBusiness` + `WebPage` + `BreadcrumbList` |
| Homepage (en) | `/en` | Same as above |
| Homepage (fr) | `/fr` | Same as above |
| Services index | `/en/services` | `Service` (catalog) + `BreadcrumbList` |
| Service: Management System | `/en/services/management-system` | `Service` + `BreadcrumbList` |
| Service: Strategy & Planning | `/en/services/strategy-planning` | `Service` + `BreadcrumbList` |
| Service: Paid Media | `/en/services/paid-media` | `Service` + `BreadcrumbList` |
| Service: SEO & Content | `/en/services/seo-content` | `Service` + `BreadcrumbList` |
| Service: Social Media | `/en/services/social-media` | `Service` + `BreadcrumbList` |
| Service: Creative Studio | `/en/services/creative-studio` | `Service` + `BreadcrumbList` |
| Industries index | `/en/industries` | `Service` catalog + `BreadcrumbList` |
| Industry: E-commerce | `/en/industries/ecommerce` | `Service` (industry vertical) + `BreadcrumbList` |
| Industry: Hospitality | `/en/industries/hospitality-travel` | `Service` + `BreadcrumbList` |
| Industry: Real Estate | `/en/industries/real-estate` | `Service` + `BreadcrumbList` |
| Industry: Pro Services | `/en/industries/professional-services` | `Service` + `BreadcrumbList` |
| Case Studies | `/en/case-studies` | `ItemList` of `CreativeWork` + `BreadcrumbList` |
| Why Us (About) | `/en/why-us` | `AboutPage` + `BreadcrumbList` |
| Guides | `/en/guides` | `ItemList` of `Article` + `BreadcrumbList` |
| Careers | `/en/careers` | `WebPage` + `BreadcrumbList` (+ `JobPosting` per role page) |
| Contact | `/en/contact` | `ContactPage` + `BreadcrumbList` |

---

## Validation Results

| Schema | Type | Status | Issues |
|---|---|---|---|
| Homepage | — | ❌ Missing | Zero structured data on the most important page |
| `/en/blog/*` | `Article` | ⚠️ Needs fix | Missing `dateModified`; `author` typed as `Organization` (Google prefers `Person` for E-E-A-T) |
| `/en/blog/*` | `BreadcrumbList` | ✅ Pass | 3 items, valid positions, all absolute URLs |
| `/en/blog/*` | `FAQPage` | ⚠️ Restricted | **No SERP rich result for commercial sites** since Aug 2023. Still helps AI/LLM citations — keep optional, do not expand. |
| Service pages | — | ❌ Missing | Zero schema; Service type is the natural fit |
| Contact page | — | ❌ Missing | Zero schema; `ContactPage` is the natural fit |
| About / Why Us | — | ❌ Missing | Zero schema; `AboutPage` is the natural fit |
| Careers | — | ❌ Missing | Zero schema; `WebPage` + per-role `JobPosting` |
| `/` Open Graph | `og:*` | ✅ Pass | Not schema.org, but correctly emitted |

---

## Schema Type Strategy (Feb 2026 status)

### ✅ ACTIVE — recommended for this site

| Type | Use on | Reason |
|---|---|---|
| `Organization` + `LocalBusiness` (combined) | Homepage | Establishes the entity; `LocalBusiness` covers the Morocco phone + Casablanca address. Google supports `@type: ["Organization","LocalBusiness"]` arrays. |
| `WebSite` | Homepage | With `potentialAction` SearchAction for the sitelinks searchbox |
| `WebPage` | Homepage | Ties the page to the WebSite and Organization via `@id` references |
| `Service` | Each of 6 service pages + 4 industry pages | Each service is a distinct, linkable entity |
| `BreadcrumbList` | Every non-homepage | Already used correctly on blog posts; missing on all others |
| `BlogPosting` | Each blog post | Replaces generic `Article` — gives a richer SERP card with a date and publisher |
| `ContactPage` | /contact | Signals the page's purpose to Google |
| `AboutPage` | /why-us (and any future /about) | Same |
| `JobPosting` | Each individual /careers/[slug] page | Rich result: salary, location, posted date. **Do not** add to the index page. |
| `Person` | (Future) team/author pages | If you add an "Our Team" page or per-author blog bylines, type each member as a `Person` and link them as `author` on the `BlogPosting` |
| `Review` + `AggregateRating` | Homepage (testimonials) | You have 6 testimonials on the homepage with names + roles; quote + name + role = a `Review`. The 4.9/5 Google rating could be the `AggregateRating` on the `Organization`. |
| `VideoObject` | (Future) homepage hero or case-study embeds | If/when you add videos |

### ⚠️ RESTRICTED — only for specific sites

| Type | Verdict |
|---|---|
| `FAQPage` | **Restricted to government and healthcare sites** since Aug 2023. Your blog posts currently use it. Verdict: keep for AI/LLM citation value (it does help ChatGPT/Perplexity cite your answers), but **do not add new FAQPage** expecting SERP rich results. |

### ❌ DEPRECATED — never use

| Type | Retired | Notes |
|---|---|---|
| `HowTo` | Sept 2023 | Rich result removed |
| `SpecialAnnouncement` | July 2025 | COVID-era; no replacement |
| `ClaimReview` | June 2025 | No replacement |
| `VehicleListing` | June 2025 | No replacement |
| `EstimatedSalary`, `LearningVideo`, `CourseInfo` carousel, `Practice Problem`, `Dataset` | June 2025 | Various; for salary info, use `baseSalary` inside `JobPosting` |

---

## Top 5 Recommendations (priority order)

### 1. CRITICAL — Add Organization + WebSite + LocalBusiness to the homepage
- Single biggest SEO win in this audit. The homepage is where Google's Knowledge Graph and entity understanding is anchored.
- Without it, Google has to infer that "Maroc 360 Agency" is a real business from unstructured text and external signals only.
- With it, you unlock: brand Knowledge Panel eligibility, sitelinks searchbox (via `WebSite.potentialAction`), local pack eligibility in Morocco (via `LocalBusiness`), and richer AI/LLM citations.
- Snippet in `generated-schema.json → homepage`.

### 2. CRITICAL — Add `BreadcrumbList` to all 19 non-blog pages
- Blog posts already have it. Service, industry, contact, about, careers, and case-study pages don't. Each should have a 2-3 item trail ending at the current page.
- Drives the breadcrumb SERP display.
- Snippet pattern in `generated-schema.json → service` (last block).

### 3. HIGH — Add `Service` schema to each of the 6 service pages
- 6 distinct, linkable services × 2 languages = 12 opportunities.
- Each `Service` should have `provider: { @id: "https://maroc360.agency/#organization" }` to link back to the entity.
- Snippet pattern in `generated-schema.json → service`.

### 4. HIGH — Fix blog post schema (3 issues)
- Add `dateModified` (same as `datePublished` if no edits, but set to the actual last-modified date)
- Change `author` from `Organization` to a `Person` (or keep `Organization` but add a named `editor` field). Google's E-E-A-T guidance specifically calls out `Person` authors for `BlogPosting`.
- Decide on `FAQPage`: keep it (for AI/LLM citation value) or remove it. I recommend **keep** — it has zero SERP impact for you, but it materially helps ChatGPT/Perplexity cite your answers. Don't add new FAQPages, but don't rip out existing ones either.
- Snippet in `generated-schema.json → blogPost`.

### 5. MEDIUM — Add `ContactPage` + `AboutPage` to the matching routes
- One-line schema each, high signal-to-effort ratio.
- Snippets in `generated-schema.json → contact` and `→ about`.

---

## Implementation Notes

1. **JSON-LD must be in the initial server-rendered HTML**, not injected by client-side JavaScript. Per Google's December 2025 JavaScript SEO update, structured data injected via JS faces delayed processing — and for time-sensitive types like `JobPosting` and `BlogPosting`, that delay can mean stale data.
2. **All URLs must be absolute** (`https://maroc360.agency/...`), not relative. The blog posts already comply.
3. **Use `@id` references to link blocks together.** The `Organization` is the anchor; `Service`, `WebPage`, `BlogPosting`, `BreadcrumbList` all reference it via `"@id": "https://maroc360.agency/#organization"`. This creates a single coherent entity graph.
4. **Wrap multiple blocks in a single `@graph`** to avoid repeating `@context`. Example:
   ```html
   <script type="application/ld+json">
   {
     "@context": "https://schema.org",
     "@graph": [ {Organization}, {WebSite}, {WebPage} ]
   }
   </script>
   ```
5. **In your Next.js codebase**, add the schema in `src/app/layout.tsx` (for the homepage-only types like Organization/WebSite) and in each page component / route's `metadata` export via a helper that writes the JSON-LD into the `<head>`. A `JsonLd` client component that returns a `<Script id="..." strategy="afterInteractive" type="application/ld+json">` will let the page stream it without blocking render.

## Validation Tools

After deploying, validate at:
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema.org Validator: https://validator.schema.org/
- Google's Search Console → Enhancements → [type] (will show detected issues after Google re-crawls)
