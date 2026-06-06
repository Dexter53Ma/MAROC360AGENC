import * as cheerio from "cheerio";

export type EffortLevel = "5min" | "30min" | "2h" | "1d" | "1w+";
export type ImpactLevel = "low" | "medium" | "high";

export interface FixRecipe {
  readonly summary: string;
  readonly effort: EffortLevel;
  readonly impact: ImpactLevel;
  readonly steps: readonly string[];
  readonly codeSnippet?: string;
  readonly docUrl?: string;
  readonly ctaService?: "Technical SEO" | "Performance" | "Content" | "Local SEO" | "Web Development";
  readonly ctaPitch?: string;
}

export type CheckStatus = "pass" | "warn" | "fail";

export interface CheckResult {
  readonly ruleId: string;
  readonly status: CheckStatus;
  readonly message: string;
  readonly weight: number;
  readonly fix?: FixRecipe;
}

export interface CategoryResult {
  readonly categoryId: string;
  readonly categoryName: string;
  readonly score: number;
  readonly passCount: number;
  readonly warnCount: number;
  readonly failCount: number;
  readonly results: readonly CheckResult[];
}

export interface AuditResult {
  readonly url: string;
  readonly overallScore: number;
  readonly crawledPages: number;
  readonly timestamp: string;
  readonly categoryResults: readonly CategoryResult[];
}

export interface AuditContext {
  readonly url: string;
  readonly finalUrl: string;
  readonly statusCode: number;
  readonly responseTimeMs: number;
  readonly contentLength: number;
  readonly contentEncoding: string | null;
  readonly cacheControl: string | null;
  readonly headers: Headers;
  readonly html: string;
  readonly $: ReturnType<typeof cheerio.load>;
}

export interface AuditCallbacks {
  readonly onCategoryStart?: (categoryId: string, categoryName: string) => void;
  readonly onCategoryComplete?: (categoryId: string, categoryName: string, result: CategoryResult) => void;
}

type Check = {
  readonly id: string;
  readonly weight: number;
  run: (ctx: AuditContext) => CheckResult;
};

type Category = {
  readonly id: string;
  readonly name: string;
  readonly checks: readonly Check[];
};

const USER_AGENT =
  "Mozilla/5.0 (compatible; Maroc360Audit/1.0; +https://maroc360.agency)";

const MAX_HTML_BYTES = 2_000_000;

function pass(id: string, weight: number, message: string, fix?: FixRecipe): CheckResult {
  return { ruleId: id, status: "pass", message, weight, fix };
}
function warn(id: string, weight: number, message: string, fix?: FixRecipe): CheckResult {
  return { ruleId: id, status: "warn", message, weight, fix };
}
function fail(id: string, weight: number, message: string, fix?: FixRecipe): CheckResult {
  return { ruleId: id, status: "fail", message, weight, fix };
}

const GENERIC_FIX: FixRecipe = {
  summary: "Review and address this issue",
  effort: "30min",
  impact: "medium",
  steps: [
    "Open the affected page in your browser",
    "Inspect the relevant element",
    "Apply the appropriate fix",
  ],
  ctaService: "Technical SEO",
  ctaPitch: "Our team can investigate and fix this for you.",
};

const FIX_RECIPES: Record<string, FixRecipe> = {
  "title-present": {
    summary: "Add a unique <title> tag to control how your page appears in search",
    effort: "5min",
    impact: "high",
    steps: [
      "Open the page source or your framework's metadata config",
      "Add a unique <title> inside <head> that mirrors the page topic",
      "In Next.js App Router: add `title: '...'` to the `metadata` export",
    ],
    codeSnippet: `// Next.js App Router
export const metadata = {
  title: "Maroc 360 Agency | 360° digital marketing",
};`,
    docUrl: "https://developers.google.com/search/docs/appearance/title-link",
    ctaService: "Technical SEO",
    ctaPitch: "We rewrite title tags across your site in a single sprint.",
  },
  "title-length": {
    summary: "Reshape your title to land in the 30–60 character sweet spot",
    effort: "5min",
    impact: "high",
    steps: [
      "Open your page's metadata config (e.g. Next.js `metadata.title`)",
      "Aim for 30–60 characters and lead with the keyword",
      "Use a template for the brand suffix, override per page when needed",
    ],
    codeSnippet: `// Next.js App Router
export const metadata = {
  title: {
    default: "Maroc 360 Agency | 360° digital marketing",
    template: "%s | Maroc 360",
  },
};`,
    docUrl: "https://developers.google.com/search/docs/appearance/title-link",
    ctaService: "Content",
    ctaPitch: "We tune every title tag for click-through and length.",
  },
  "meta-description": {
    summary: "Add a 70–160 character meta description to control your snippet",
    effort: "5min",
    impact: "high",
    steps: [
      "Open the page's metadata config",
      "Write a 70–160 character description that matches search intent",
      "Add it as `description: '...'` in the `metadata` export",
    ],
    codeSnippet: `// Next.js App Router
export const metadata = {
  description:
    "Maroc 360 helps Moroccan brands grow with SEO, paid media and creative. Book a free audit.",
};`,
    docUrl: "https://developers.google.com/search/docs/appearance/snippet",
    ctaService: "Content",
    ctaPitch: "We rewrite meta descriptions sitewide in one pass.",
  },
  "h1-count": {
    summary: "Use exactly one <h1> per page so the topic is unambiguous",
    effort: "5min",
    impact: "high",
    steps: [
      "Inspect the page in DevTools and count <h1> tags",
      "Pick the main page title as the single <h1>",
      "Demote the rest to <h2> or below",
    ],
    codeSnippet: `// app/about/page.tsx
export default function AboutPage() {
  return (
    <>
      <h1>About Maroc 360</h1>
      <h2>Our story</h2>
      <h2>Our team</h2>
    </>
  );
}`,
    docUrl: "https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements",
    ctaService: "Content",
    ctaPitch: "We audit heading hierarchy across every template.",
  },
  canonical: {
    summary: "Declare a canonical URL to prevent duplicate-content cannibalization",
    effort: "5min",
    impact: "high",
    steps: [
      "Open the page's metadata config",
      "Decide the canonical URL (usually the preferred absolute URL)",
      "Add `alternates.canonical` to the `metadata` export",
    ],
    codeSnippet: `// Next.js App Router
export const metadata = {
  alternates: {
    canonical: "https://maroc360.agency/en/services/seo",
  },
};`,
    docUrl: "https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls",
    ctaService: "Technical SEO",
    ctaPitch: "We fix canonical and hreflang architecture in under a sprint.",
  },
  viewport: {
    summary: "Add the viewport meta tag or the page is not mobile-friendly",
    effort: "5min",
    impact: "high",
    steps: [
      "Open your root layout or HTML <head>",
      "Add `width=device-width, initial-scale=1` viewport meta",
      "In Next.js App Router this is added automatically — verify in the rendered HTML",
    ],
    codeSnippet: `// app/layout.tsx
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};`,
    docUrl: "https://developer.mozilla.org/docs/Web/HTML/Viewport_meta_tag",
    ctaService: "Web Development",
    ctaPitch: "We ship a mobile-friendly audit in one afternoon.",
  },
  "html-lang": {
    summary: "Set the document language to improve accessibility and localized search",
    effort: "5min",
    impact: "medium",
    steps: [
      "Open the root <html> tag in your layout",
      "Add `lang=\"en\"` (or `fr`, `ar`, etc.)",
      "In Next.js, pass `lang` to the <html> element in `app/layout.tsx`",
    ],
    codeSnippet: `// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`,
    docUrl: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/lang",
    ctaService: "Technical SEO",
    ctaPitch: "We align lang, hreflang and content for multilingual sites.",
  },
  "response-time": {
    summary: "Get server response under 1.5s with a CDN, caching and server tuning",
    effort: "1d",
    impact: "high",
    steps: [
      "Measure TTFB with Vercel Analytics or Lighthouse",
      "Put a CDN in front (Vercel Edge, Cloudflare) and enable HTTP caching",
      "Move dynamic logic to streaming and cache what you can at the edge",
    ],
    codeSnippet: `// next.config.js
module.exports = {
  experimental: {
    staleTimes: { dynamic: 30, static: 180 },
  },
};`,
    docUrl: "https://web.dev/articles/ttfb",
    ctaService: "Performance",
    ctaPitch: "We cut TTFB by 60% with edge caching and ISR.",
  },
  "html-size": {
    summary: "Trim the HTML payload under 100 KB to speed up first paint",
    effort: "1d",
    impact: "medium",
    steps: [
      "Run a Lighthouse audit and check the DOM size section",
      "Move heavy widgets below the fold and lazy-load them",
      "Use RSC streaming and reduce inline JSON in the initial document",
    ],
    codeSnippet: `// app/page.tsx
import dynamic from "next/dynamic";
const HeavyWidget = dynamic(() => import("./heavy-widget"), {
  ssr: false,
});`,
    docUrl: "https://web.dev/articles/dom-size",
    ctaService: "Performance",
    ctaPitch: "We shrink HTML payloads by 50% on average.",
  },
  https: {
    summary: "Migrate to HTTPS — a ranking signal and a hard requirement for modern features",
    effort: "1d",
    impact: "high",
    steps: [
      "Provision a free certificate via Let's Encrypt or your hosting provider",
      "Redirect all `http://` requests to `https://` (301) at the edge",
      "Add the Strict-Transport-Security header and update internal links",
    ],
    codeSnippet: `// next.config.js — redirects
module.exports = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "header", key: "x-forwarded-proto", value: "http" }],
        destination: "https://maroc360.agency/:path*",
        permanent: true,
      },
    ];
  },
};`,
    docUrl: "https://web.dev/articles/why-https-matters",
    ctaService: "Web Development",
    ctaPitch: "We handle the full HTTPS migration in 48 hours.",
  },
  "x-frame-options": {
    summary: "Block clickjacking with X-Frame-Options or CSP frame-ancestors",
    effort: "30min",
    impact: "medium",
    steps: [
      "Open your edge config (Vercel `vercel.json`, Next middleware, or CDN)",
      "Add `X-Frame-Options: SAMEORIGIN` or a CSP `frame-ancestors 'none'` directive",
      "Verify with a securityheaders.com scan",
    ],
    codeSnippet: `// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
    ];
  },
};`,
    docUrl: "https://developer.mozilla.org/docs/Web/HTTP/Headers/X-Frame-Options",
    ctaService: "Technical SEO",
    ctaPitch: "We harden security headers and ship a clean securityheaders.com report.",
  },
  "internal-links": {
    summary: "Add internal links between related pages so crawlers can find your content",
    effort: "1d",
    impact: "high",
    steps: [
      "Audit your top 10 pages and list the related content for each",
      "Add 3–5 contextual in-body links per page using descriptive anchor text",
      "Update the footer and breadcrumbs with category-level links",
    ],
    codeSnippet: `// app/blog/[slug]/page.tsx
import Link from "next/link";
export default function Post({ related }) {
  return (
    <p>
      Read our guide on <Link href="/blog/seo-audit">{related.title}</Link>.
    </p>
  );
}`,
    docUrl: "https://developers.google.com/search/docs/crawling-indexing/links-crawlable",
    ctaService: "Content",
    ctaPitch: "We rebuild your internal-link graph for crawlability and topic clusters.",
  },
  "alt-coverage": {
    summary: "Add alt text to every <img> for accessibility and image search",
    effort: "30min",
    impact: "high",
    steps: [
      "Run a Lighthouse audit and list all images without alt",
      "Add `alt=\"...\"` describing the image; use `alt=\"\"` for decorative images",
      "In Next.js, set `alt` on every `<Image>` and `<img>`",
    ],
    codeSnippet: `// app/page.tsx
import Image from "next/image";
<Image
  src="/hero.avif"
  alt="Maroc 360 team in Casablanca office"
  width={1200}
  height={600}
/>`,
    docUrl: "https://web.dev/articles/alt-text",
    ctaService: "Web Development",
    ctaPitch: "We backfill alt text across your entire media library.",
  },
  dimensions: {
    summary: "Declare width and height on images to prevent layout shift (CLS)",
    effort: "30min",
    impact: "medium",
    steps: [
      "Audit your images and find those missing width/height",
      "Add explicit pixel values (or `style={{ width: '100%', height: 'auto' }}`)",
      "In Next.js, `<Image>` infers dimensions automatically — verify the rendered HTML",
    ],
    codeSnippet: `// app/page.tsx
<Image
  src="/hero.avif"
  alt="Maroc 360 team"
  width={1200}
  height={600}
  priority
/>`,
    docUrl: "https://web.dev/articles/cls",
    ctaService: "Web Development",
    ctaPitch: "We fix CLS issues across templates in one sprint.",
  },
  "word-count": {
    summary: "Expand thin content to 300+ words to give Google enough to rank",
    effort: "2h",
    impact: "medium",
    steps: [
      "Audit the page and identify thin sections under 100 words",
      "Outline 4–6 sections answering the search intent",
      "Write 300+ words with internal links, a FAQ and a clear CTA",
    ],
    codeSnippet: `// app/blog/[slug]/page.tsx — structure
export default function Post() {
  return (
    <article>
      <h1>...</h1>
      <p>Lead paragraph with the main answer.</p>
      <h2>Why it matters</h2>
      <h2>How to do it</h2>
      <h2>FAQ</h2>
      <p><Link href="/contact">Talk to our team</Link></p>
    </article>
  );
}`,
    docUrl: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content",
    ctaService: "Content",
    ctaPitch: "We rewrite thin pages into ranking-grade long-form content.",
  },
  "open-graph": {
    summary: "Add Open Graph tags so shared links render rich previews",
    effort: "30min",
    impact: "medium",
    steps: [
      "Open the page's metadata config",
      "Set `openGraph: { title, description, url, siteName, images, type }`",
      "Validate with the Facebook Sharing Debugger",
    ],
    codeSnippet: `// Next.js App Router
export const metadata = {
  openGraph: {
    title: "Maroc 360 | 360° digital marketing",
    description: "SEO, paid media and creative for Moroccan brands.",
    url: "https://maroc360.agency/en",
    siteName: "Maroc 360",
    images: [{ url: "/og.avif", width: 1200, height: 630 }],
    type: "website",
  },
};`,
    docUrl: "https://ogp.me/",
    ctaService: "Content",
    ctaPitch: "We ship a complete OG and Twitter Card kit across your site.",
  },
  "jsonld-present": {
    summary: "Add JSON-LD structured data so Google can build rich results",
    effort: "2h",
    impact: "high",
    steps: [
      "Pick the most relevant schema (Organization, WebPage, Product, Article)",
      "Build the JSON-LD with Google's Structured Data Markup Helper",
      "In Next.js, drop it into a `script` tag with `type=\"application/ld+json\"`",
    ],
    codeSnippet: `// app/layout.tsx
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Maroc 360",
  url: "https://maroc360.agency",
  logo: "https://maroc360.agency/logo.avif",
};
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
/>`,
    docUrl: "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data",
    ctaService: "Technical SEO",
    ctaPitch: "We build the schema.org layer that unlocks rich results.",
  },
  "robots-directive": {
    summary: "Review the meta robots tag — noindex hides the page from search",
    effort: "5min",
    impact: "high",
    steps: [
      "View source and find the `<meta name=\"robots\">` tag",
      "Remove `noindex` and `nofollow` if the page should be indexable",
      "In Next.js, override with `robots: { index: true, follow: true }` in metadata",
    ],
    codeSnippet: `// Next.js App Router
export const metadata = {
  robots: { index: true, follow: true },
};`,
    docUrl: "https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag",
    ctaService: "Technical SEO",
    ctaPitch: "We audit robots directives across every URL in your sitemap.",
  },
  doctype: {
    summary: "Add <!DOCTYPE html> so the page doesn't render in quirks mode",
    effort: "5min",
    impact: "low",
    steps: [
      "Open the HTML template (or your framework's root document)",
      "Add `<!DOCTYPE html>` as the first line",
      "In Next.js App Router the doctype is included automatically — verify the response",
    ],
    codeSnippet: `<!DOCTYPE html>
<html lang="en">
  <head>...</head>
</html>`,
    docUrl: "https://developer.mozilla.org/docs/Web/HTML/Quirks_Mode_and_Standards_Mode",
    ctaService: "Web Development",
    ctaPitch: "We fix template and DOCTYPE issues during a full code review.",
  },
  favicon: {
    summary: "Add a favicon to silence 404s and brand the browser tab",
    effort: "5min",
    impact: "low",
    steps: [
      "Export a 32×32 PNG and an SVG version of your logo",
      "Place them under `/public/`",
      "In Next.js App Router, drop `icon.png` in `app/` — it's served automatically",
    ],
    codeSnippet: `// app/layout.tsx — App Router auto-uses these
// /app/icon.png
// /app/apple-icon.png
export const metadata = {
  icons: { icon: "/favicon.ico" },
};`,
    docUrl: "https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons",
    ctaService: "Web Development",
    ctaPitch: "We ship a full favicon + web manifest + OG image kit.",
  },
};

const coreChecks: Check[] = [
  {
    id: "title-present",
    weight: 20,
    run: (ctx) => {
      const t = ctx.$("head > title").first().text().trim();
      if (!t) return fail("title-present", 20, "Page is missing a <title> tag.", FIX_RECIPES["title-present"]);
      return pass("title-present", 20, "Page has a <title> tag.");
    },
  },
  {
    id: "title-length",
    weight: 15,
    run: (ctx) => {
      const t = ctx.$("head > title").first().text().trim();
      if (!t)
        return warn("title-length", 15, "Add a <title> to control search snippets.", FIX_RECIPES["title-length"]);
      if (t.length < 30)
        return warn(
          "title-length",
          15,
          `Title is only ${t.length} characters — aim for 30–60 for best search snippets.`,
          FIX_RECIPES["title-length"],
        );
      if (t.length > 65)
        return warn(
          "title-length",
          15,
          `Title is ${t.length} characters — Google typically truncates after 60.`,
          FIX_RECIPES["title-length"],
        );
      return pass("title-length", 15, `Title length is ${t.length} characters (sweet spot).`);
    },
  },
  {
    id: "meta-description",
    weight: 15,
    run: (ctx) => {
      const d = ctx.$('head > meta[name="description"]').attr("content")?.trim() ?? "";
      if (!d)
        return fail(
          "meta-description",
          15,
          "Missing meta description — search engines will auto-generate one.",
          FIX_RECIPES["meta-description"],
        );
      if (d.length < 70)
        return warn(
          "meta-description",
          15,
          `Meta description is only ${d.length} characters — aim for 70–160.`,
          FIX_RECIPES["meta-description"],
        );
      if (d.length > 160)
        return warn(
          "meta-description",
          15,
          `Meta description is ${d.length} characters — Google typically truncates after 160.`,
          FIX_RECIPES["meta-description"],
        );
      return pass("meta-description", 15, `Meta description length is ${d.length} characters.`);
    },
  },
  {
    id: "h1-count",
    weight: 15,
    run: (ctx) => {
      const h1s = ctx.$("h1");
      const n = h1s.length;
      if (n === 0) return fail("h1-count", 15, "Page has no <h1> heading.", FIX_RECIPES["h1-count"]);
      if (n > 1)
        return warn(
          "h1-count",
          15,
          `Page has ${n} <h1> headings — use exactly one for a clear page topic.`,
          FIX_RECIPES["h1-count"],
        );
      return pass("h1-count", 15, "Page has exactly one <h1> heading.");
    },
  },
  {
    id: "html-lang",
    weight: 10,
    run: (ctx) => {
      const lang = ctx.$("html").attr("lang")?.trim();
      if (!lang)
        return warn(
          "html-lang",
          10,
          "Missing <html lang> attribute — hurts accessibility and SEO.",
          FIX_RECIPES["html-lang"],
        );
      return pass("html-lang", 10, `Document language is set to "${lang}".`);
    },
  },
  {
    id: "canonical",
    weight: 15,
    run: (ctx) => {
      const c = ctx.$('head > link[rel="canonical"]').attr("href")?.trim();
      if (!c)
        return warn("canonical", 15, "Missing canonical link — risk of duplicate content.", FIX_RECIPES["canonical"]);
      return pass("canonical", 15, "Canonical link is declared.");
    },
  },
  {
    id: "viewport",
    weight: 10,
    run: (ctx) => {
      const v = ctx.$('head > meta[name="viewport"]').attr("content")?.trim();
      if (!v)
        return fail("viewport", 10, "Missing viewport meta — page is not mobile-friendly.", FIX_RECIPES["viewport"]);
      return pass("viewport", 10, "Viewport meta is declared.");
    },
  },
];

const performanceChecks: Check[] = [
  {
    id: "response-time",
    weight: 25,
    run: (ctx) => {
      const ms = ctx.responseTimeMs;
      if (ms < 1500) return pass("response-time", 25, `Server responded in ${ms}ms.`);
      if (ms < 3000)
        return warn(
          "response-time",
          25,
          `Server responded in ${ms}ms — aim for under 1.5s.`,
          FIX_RECIPES["response-time"],
        );
      return fail(
        "response-time",
        25,
        `Server responded in ${ms}ms — too slow for good UX.`,
        FIX_RECIPES["response-time"],
      );
    },
  },
  {
    id: "html-size",
    weight: 20,
    run: (ctx) => {
      const kb = Math.round(ctx.contentLength / 1024);
      if (kb < 100) return pass("html-size", 20, `HTML payload is ${kb} KB.`);
      if (kb < 300)
        return warn(
          "html-size",
          20,
          `HTML payload is ${kb} KB — consider trimming or lazy-loading.`,
          FIX_RECIPES["html-size"],
        );
      return fail("html-size", 20, `HTML payload is ${kb} KB — too large for fast paint.`, FIX_RECIPES["html-size"]);
    },
  },
  {
    id: "compression",
    weight: 20,
    run: (ctx) => {
      const enc = ctx.contentEncoding?.toLowerCase() ?? "";
      if (enc.includes("gzip") || enc.includes("br") || enc.includes("zstd")) {
        return pass("compression", 20, `Response is compressed with ${enc}.`);
      }
      return warn("compression", 20, "Response is not compressed — enable gzip or Brotli.");
    },
  },
  {
    id: "cache-headers",
    weight: 15,
    run: (ctx) => {
      const cc = ctx.cacheControl;
      if (!cc) return warn("cache-headers", 15, "No Cache-Control header — caching is left to the browser.");
      if (/no-store/i.test(cc))
        return warn("cache-headers", 15, "Cache-Control is no-store — fine for dynamic pages but blocks CDN caching.");
      return pass("cache-headers", 15, `Cache-Control is "${cc}".`);
    },
  },
  {
    id: "render-blocking",
    weight: 20,
    run: (ctx) => {
      const blocking = ctx.$('head script[src]:not([async]):not([defer]):not([type="module"])').length;
      if (blocking === 0)
        return pass("render-blocking", 20, "No render-blocking external scripts in <head>.");
      if (blocking <= 2)
        return warn("render-blocking", 20, `${blocking} render-blocking script(s) in <head> — add async or defer.`);
      return fail("render-blocking", 20, `${blocking} render-blocking scripts in <head> — defer or inline them.`);
    },
  },
];

const securityChecks: Check[] = [
  {
    id: "https",
    weight: 30,
    run: (ctx) => {
      if (ctx.finalUrl.startsWith("https://")) return pass("https", 30, "Page is served over HTTPS.");
      return fail("https", 30, "Page is served over plain HTTP — switch to HTTPS.", FIX_RECIPES["https"]);
    },
  },
  {
    id: "x-frame-options",
    weight: 15,
    run: (ctx) => {
      const v = ctx.headers.get("x-frame-options") ?? ctx.headers.get("content-security-policy") ?? "";
      if (/deny|sameorigin/i.test(ctx.headers.get("x-frame-options") ?? "") || /frame-ancestors/i.test(v))
        return pass("x-frame-options", 15, "Clickjacking protection is configured.");
      return warn(
        "x-frame-options",
        15,
        "No X-Frame-Options or CSP frame-ancestors — add one to prevent clickjacking.",
        FIX_RECIPES["x-frame-options"],
      );
    },
  },
  {
    id: "x-content-type-options",
    weight: 15,
    run: (ctx) => {
      if ((ctx.headers.get("x-content-type-options") ?? "").toLowerCase() === "nosniff")
        return pass("x-content-type-options", 15, "X-Content-Type-Options: nosniff is set.");
      return warn("x-content-type-options", 15, "Missing X-Content-Type-Options: nosniff.");
    },
  },
  {
    id: "hsts",
    weight: 15,
    run: (ctx) => {
      const h = ctx.headers.get("strict-transport-security") ?? "";
      if (h && /max-age=\d{6,}/.test(h))
        return pass("hsts", 15, "Strict-Transport-Security header is set with a long max-age.");
      return warn("hsts", 15, "Missing or weak Strict-Transport-Security header.");
    },
  },
  {
    id: "referrer-policy",
    weight: 10,
    run: (ctx) => {
      if (ctx.headers.get("referrer-policy"))
        return pass("referrer-policy", 10, `Referrer-Policy is "${ctx.headers.get("referrer-policy")}".`);
      return warn("referrer-policy", 10, "Missing Referrer-Policy header.");
    },
  },
  {
    id: "mixed-content",
    weight: 15,
    run: (ctx) => {
      if (!ctx.finalUrl.startsWith("https://")) return pass("mixed-content", 15, "N/A on plain HTTP.");
      const httpAssets = ctx.$("[src], [href]").filter((_, el) => {
        const attr = (el.attribs.src ?? el.attribs.href ?? "").trim();
        return attr.startsWith("http://") && !attr.startsWith("http://localhost");
      }).length;
      if (httpAssets === 0)
        return pass("mixed-content", 15, "No mixed-content (HTTP) assets found on the HTTPS page.");
      return fail("mixed-content", 15, `Found ${httpAssets} HTTP asset(s) on an HTTPS page — block or upgrade them.`);
    },
  },
];

const linksChecks: Check[] = [
  {
    id: "internal-links",
    weight: 25,
    run: (ctx) => {
      const origin = (() => {
        try {
          return new URL(ctx.finalUrl).origin;
        } catch {
          return "";
        }
      })();
      const internal = ctx.$("a[href]")
        .map((_, el) => ctx.$(el).attr("href") ?? "")
        .get()
        .filter((h) => {
          if (!h || h.startsWith("#") || h.startsWith("mailto:") || h.startsWith("tel:") || h.startsWith("javascript:"))
            return false;
          try {
            return new URL(h, ctx.finalUrl).origin === origin;
          } catch {
            return false;
          }
        }).length;
      if (internal === 0)
        return fail(
          "internal-links",
          25,
          "No internal links found — site has no discoverable structure.",
          FIX_RECIPES["internal-links"],
        );
      if (internal < 3)
        return warn(
          "internal-links",
          25,
          `Only ${internal} internal link(s) — add more to help crawlers.`,
          FIX_RECIPES["internal-links"],
        );
      return pass("internal-links", 25, `Found ${internal} internal links.`);
    },
  },
  {
    id: "external-links",
    weight: 15,
    run: (ctx) => {
      const origin = (() => {
        try {
          return new URL(ctx.finalUrl).origin;
        } catch {
          return "";
        }
      })();
      const external = ctx.$("a[href]")
        .map((_, el) => ctx.$(el).attr("href") ?? "")
        .get()
        .filter((h) => {
          if (!h || h.startsWith("#") || h.startsWith("mailto:") || h.startsWith("tel:") || h.startsWith("javascript:"))
            return false;
          try {
            const u = new URL(h, ctx.finalUrl);
            return u.origin !== origin && u.protocol.startsWith("http");
          } catch {
            return false;
          }
        }).length;
      if (external > 150)
        return warn("external-links", 15, `${external} external links — review for relevance.`);
      return pass("external-links", 15, `Found ${external} external links.`);
    },
  },
  {
    id: "generic-anchors",
    weight: 20,
    run: (ctx) => {
      const generic = new Set(["click here", "read more", "learn more", "here", "more", "link"]);
      const bad = ctx.$("a[href]")
        .map((_, el) => (ctx.$(el).text() ?? "").trim().toLowerCase())
        .get()
        .filter((t) => generic.has(t.replace(/[.!?]+$/, ""))).length;
      if (bad === 0) return pass("generic-anchors", 20, "Anchor texts look descriptive.");
      if (bad <= 3)
        return warn("generic-anchors", 20, `${bad} generic anchor text(s) (e.g. "click here") — use descriptive phrases.`);
      return fail("generic-anchors", 20, `${bad} generic anchor texts — rewrite for accessibility and SEO.`);
    },
  },
  {
    id: "no-empty-href",
    weight: 15,
    run: (ctx) => {
      const empty = ctx.$('a[href=""], a:not([href])').length;
      if (empty === 0) return pass("no-empty-href", 15, "No empty-href anchors.");
      return fail("no-empty-href", 15, `Found ${empty} empty-href anchor(s).`);
    },
  },
  {
    id: "nofollow-internal",
    weight: 25,
    run: (ctx) => {
      const origin = (() => {
        try {
          return new URL(ctx.finalUrl).origin;
        } catch {
          return "";
        }
      })();
      const nofollowInternal = ctx.$("a[rel*='nofollow'][href]")
        .map((_, el) => ctx.$(el).attr("href") ?? "")
        .get()
        .filter((h) => {
          try {
            return new URL(h, ctx.finalUrl).origin === origin;
          } catch {
            return false;
          }
        }).length;
      if (nofollowInternal === 0)
        return pass("nofollow-internal", 25, "Internal links are not marked nofollow.");
      return warn("nofollow-internal", 25, `${nofollowInternal} internal link(s) marked nofollow — usually unnecessary.`);
    },
  },
];

const imagesChecks: Check[] = [
  {
    id: "alt-coverage",
    weight: 30,
    run: (ctx) => {
      const imgs = ctx.$("img");
      const n = imgs.length;
      if (n === 0) return warn("alt-coverage", 30, "No <img> tags on the page.");
      let withAlt = 0;
      imgs.each((_, el) => {
        if ((ctx.$(el).attr("alt") ?? "").trim().length > 0) withAlt += 1;
      });
      const pct = Math.round((withAlt / n) * 100);
      if (pct === 100) return pass("alt-coverage", 30, `All ${n} image(s) have alt text.`);
      if (pct >= 90)
        return warn(
          "alt-coverage",
          30,
          `${pct}% of images (${n - withAlt} missing) have alt text.`,
          FIX_RECIPES["alt-coverage"],
        );
      return fail(
        "alt-coverage",
        30,
        `Only ${pct}% of images have alt text (${n - withAlt} missing).`,
        FIX_RECIPES["alt-coverage"],
      );
    },
  },
  {
    id: "dimensions",
    weight: 20,
    run: (ctx) => {
      const imgs = ctx.$("img");
      if (imgs.length === 0) return warn("dimensions", 20, "No <img> tags to check.");
      let withDims = 0;
      imgs.each((_, el) => {
        if (ctx.$(el).attr("width") && ctx.$(el).attr("height")) withDims += 1;
      });
      if (withDims === imgs.length)
        return pass("dimensions", 20, "All images declare width and height (good for CLS).");
      if (withDims >= imgs.length / 2)
        return warn(
          "dimensions",
          20,
          `${imgs.length - withDims} image(s) missing width/height — add them to prevent layout shift.`,
          FIX_RECIPES["dimensions"],
        );
      return fail(
        "dimensions",
        20,
        `Most images (${imgs.length - withDims}) lack width/height attributes.`,
        FIX_RECIPES["dimensions"],
      );
    },
  },
  {
    id: "modern-formats",
    weight: 20,
    run: (ctx) => {
      const imgs = ctx.$("img").map((_, el) => ctx.$(el).attr("src") ?? "").get();
      if (imgs.length === 0) return warn("modern-formats", 20, "No <img> tags to check.");
      const modern = imgs.filter((s) => /\.(webp|avif)(\?|$|#)/i.test(s) || /\/format\/(webp|avif)/i.test(s)).length;
      if (modern === imgs.length)
        return pass("modern-formats", 20, "All images use modern formats (WebP/AVIF).");
      if (modern > 0)
        return warn("modern-formats", 20, `${modern} of ${imgs.length} images use modern formats — convert the rest.`);
      return warn("modern-formats", 20, "No images use WebP or AVIF — large savings available.");
    },
  },
  {
    id: "lazy-loading",
    weight: 15,
    run: (ctx) => {
      const imgs = ctx.$("img");
      if (imgs.length <= 2) return pass("lazy-loading", 15, "Few images — lazy-loading is not critical.");
      const lazy = imgs.filter((_, el) => (ctx.$(el).attr("loading") ?? "").toLowerCase() === "lazy").length;
      if (lazy === 0)
        return warn("lazy-loading", 15, "No images use loading='lazy' — add it to off-screen images.");
      return pass("lazy-loading", 15, `${lazy} of ${imgs.length} images are lazy-loaded.`);
    },
  },
  {
    id: "no-broken-images",
    weight: 15,
    run: (ctx) => {
      const empty = ctx.$("img[src=''], img:not([src])").length;
      if (empty === 0) return pass("no-broken-images", 15, "No empty src on <img> tags.");
      return fail("no-broken-images", 15, `Found ${empty} <img> tag(s) with empty src.`);
    },
  },
];

const contentChecks: Check[] = [
  {
    id: "word-count",
    weight: 30,
    run: (ctx) => {
      const mainText = ctx.$("main").text() || ctx.$("body").text();
      const words = (mainText.match(/\b[\wÀ-ſ'-]+\b/g) ?? []).length;
      if (words >= 300) return pass("word-count", 30, `Page has ${words} words.`);
      if (words >= 150)
        return warn(
          "word-count",
          30,
          `Page has ${words} words — aim for 300+ for better rankings.`,
          FIX_RECIPES["word-count"],
        );
      return fail("word-count", 30, `Page has only ${words} words — too thin for SEO.`, FIX_RECIPES["word-count"]);
    },
  },
  {
    id: "has-paragraphs",
    weight: 15,
    run: (ctx) => {
      const p = ctx.$("p").filter((_, el) => (ctx.$(el).text() ?? "").trim().length > 40).length;
      if (p >= 3) return pass("has-paragraphs", 15, `Found ${p} substantive paragraphs.`);
      if (p >= 1) return warn("has-paragraphs", 15, "Only a few paragraphs — add more body copy.");
      return fail("has-paragraphs", 15, "No substantive paragraphs detected.");
    },
  },
  {
    id: "open-graph",
    weight: 20,
    run: (ctx) => {
      const og = (name: string) =>
        ctx.$(`head > meta[property='og:${name}']`).attr("content")?.trim() ?? "";
      const haveTitle = !!og("title");
      const haveDesc = !!og("description");
      const haveImage = !!og("image");
      const haveType = !!og("type");
      const haveUrl = !!og("url");
      const score = [haveTitle, haveDesc, haveImage, haveType, haveUrl].filter(Boolean).length;
      if (score === 5) return pass("open-graph", 20, "Open Graph tags (og:title, og:description, og:image, og:type, og:url) are set.");
      const missing = [
        !haveTitle && "og:title",
        !haveDesc && "og:description",
        !haveImage && "og:image",
        !haveType && "og:type",
        !haveUrl && "og:url",
      ].filter(Boolean) as string[];
      if (score >= 3)
        return warn("open-graph", 20, `Open Graph is partial — missing ${missing.join(", ")}.`, FIX_RECIPES["open-graph"]);
      return fail("open-graph", 20, `Open Graph is missing key tags: ${missing.join(", ")}.`, FIX_RECIPES["open-graph"]);
    },
  },
  {
    id: "twitter-card",
    weight: 15,
    run: (ctx) => {
      const card = ctx.$("head > meta[name='twitter:card']").attr("content")?.trim() ?? "";
      if (card) return pass("twitter-card", 15, `Twitter card is set to "${card}".`);
      return warn("twitter-card", 15, "Missing twitter:card meta — adds rich previews when shared on X/Twitter.");
    },
  },
  {
    id: "robots-directive",
    weight: 20,
    run: (ctx) => {
      const robots = (ctx.$("head > meta[name='robots']").attr("content") ?? "").toLowerCase();
      if (!robots) return pass("robots-directive", 20, "No meta robots directive — page is indexable by default.");
      if (/noindex/.test(robots))
        return fail(
          "robots-directive",
          20,
          "Page is marked noindex — it will not appear in search.",
          FIX_RECIPES["robots-directive"],
        );
      if (/nofollow/.test(robots))
        return warn(
          "robots-directive",
          20,
          "Page is marked nofollow — links won't pass authority.",
          FIX_RECIPES["robots-directive"],
        );
      return pass("robots-directive", 20, `Robots directive is "${robots}".`);
    },
  },
];

const schemaChecks: Check[] = [
  {
    id: "jsonld-present",
    weight: 35,
    run: (ctx) => {
      const scripts = ctx.$('head > script[type="application/ld+json"]');
      if (scripts.length === 0)
        return warn(
          "jsonld-present",
          35,
          "No JSON-LD structured data — add Organization or WebPage schema.",
          FIX_RECIPES["jsonld-present"],
        );
      let valid = 0;
      scripts.each((_, el) => {
        try {
          const txt = ctx.$(el).contents().text() ?? "";
          const parsed = JSON.parse(txt) as { "@type"?: unknown };
          if (parsed && (parsed["@type"] || Array.isArray(parsed)))
            valid += 1;
        } catch {
          // ignore parse errors
        }
      });
      if (valid > 0) return pass("jsonld-present", 35, `Found ${valid} valid JSON-LD block(s).`);
      return warn(
        "jsonld-present",
        35,
        `Found ${scripts.length} JSON-LD script(s) but none parsed correctly.`,
        FIX_RECIPES["jsonld-present"],
      );
    },
  },
  {
    id: "organization-schema",
    weight: 25,
    run: (ctx) => {
      const scripts = ctx.$('head > script[type="application/ld+json"]').toArray();
      for (const el of scripts) {
        try {
          const txt = ctx.$(el).children().text() ?? ctx.$(el).html() ?? "";
          const parsed = JSON.parse(txt) as { "@type"?: string | string[] };
          const t = parsed["@type"];
          if (t === "Organization" || (Array.isArray(t) && t.includes("Organization")))
            return pass("organization-schema", 25, "Organization schema is present.");
        } catch {
          // ignore
        }
      }
      return warn("organization-schema", 25, "No Organization schema — adds brand knowledge to search engines.");
    },
  },
  {
    id: "microdata",
    weight: 20,
    run: (ctx) => {
      const items = ctx.$("[itemscope]").length;
      if (items === 0) return warn("microdata", 20, "No microdata — JSON-LD is recommended instead.");
      return pass("microdata", 20, `Found ${items} microdata item(s).`);
    },
  },
  {
    id: "opengraph-as-schema",
    weight: 20,
    run: (ctx) => {
      const ogImage = ctx.$("head > meta[property='og:image']").attr("content")?.trim() ?? "";
      const ldHasImage = (() => {
        const scripts = ctx.$('head > script[type="application/ld+json"]').toArray();
        for (const el of scripts) {
          try {
            const txt = ctx.$(el).html() ?? "";
            if (/"image"\s*:/.test(txt)) return true;
          } catch {
            // ignore
          }
        }
        return false;
      })();
      if (ogImage || ldHasImage)
        return pass("opengraph-as-schema", 20, "Image metadata is declared (Open Graph or JSON-LD).");
      return warn("opengraph-as-schema", 20, "No image metadata in Open Graph or JSON-LD — search results will lack rich previews.");
    },
  },
];

const technicalChecks: Check[] = [
  {
    id: "status-code",
    weight: 30,
    run: (ctx) => {
      if (ctx.statusCode === 200) return pass("status-code", 30, "Server returned HTTP 200.");
      if (ctx.statusCode === 301 || ctx.statusCode === 308)
        return pass("status-code", 30, `Server returned HTTP ${ctx.statusCode} (permanent redirect).`);
      if (ctx.statusCode >= 300 && ctx.statusCode < 400)
        return warn("status-code", 30, `Server returned HTTP ${ctx.statusCode} (redirect).`);
      if (ctx.statusCode === 404) return fail("status-code", 30, "Server returned HTTP 404 — page not found.");
      if (ctx.statusCode === 403) return fail("status-code", 30, "Server returned HTTP 403 — access denied.");
      return fail("status-code", 30, `Server returned HTTP ${ctx.statusCode}.`);
    },
  },
  {
    id: "doctype",
    weight: 15,
    run: (ctx) => {
      const has = /<!doctype html>/i.test(ctx.html.slice(0, 200));
      if (has) return pass("doctype", 15, "Document has an HTML5 doctype.");
      return warn("doctype", 15, "Missing <!doctype html> — page may render in quirks mode.", FIX_RECIPES["doctype"]);
    },
  },
  {
    id: "html-size-bonus",
    weight: 15,
    run: (ctx) => {
      if (ctx.contentLength < 50_000)
        return pass("html-size-bonus", 15, `DOM payload is small (${Math.round(ctx.contentLength / 1024)} KB).`);
      return warn("html-size-bonus", 15, "DOM payload is heavy — consider code-splitting or SSR streaming.");
    },
  },
  {
    id: "duplicate-meta",
    weight: 20,
    run: (ctx) => {
      const titles = ctx.$("head > title").length;
      const descs = ctx.$('head > meta[name="description"]').length;
      const dupes: string[] = [];
      if (titles > 1) dupes.push(`${titles} <title> tags`);
      if (descs > 1) dupes.push(`${descs} meta descriptions`);
      if (dupes.length === 0) return pass("duplicate-meta", 20, "No duplicate meta tags.");
      return warn("duplicate-meta", 20, `Found ${dupes.join(" and ")} — keep exactly one of each.`);
    },
  },
  {
    id: "favicon",
    weight: 20,
    run: (ctx) => {
      const has =
        ctx.$('head > link[rel="icon"]').length > 0 ||
        ctx.$('head > link[rel="shortcut icon"]').length > 0;
      if (has) return pass("favicon", 20, "Favicon is declared.");
      return warn("favicon", 20, "No <link rel='icon'> — browsers will request /favicon.ico and get a 404.", FIX_RECIPES["favicon"]);
    },
  },
];

export const CATEGORIES: readonly Category[] = [
  { id: "core", name: "Core SEO", checks: coreChecks },
  { id: "perf", name: "Performance", checks: performanceChecks },
  { id: "security", name: "Security", checks: securityChecks },
  { id: "links", name: "Links", checks: linksChecks },
  { id: "images", name: "Images", checks: imagesChecks },
  { id: "content", name: "Content", checks: contentChecks },
  { id: "schema", name: "Structured Data", checks: schemaChecks },
  { id: "technical", name: "Technical", checks: technicalChecks },
];

function computeCategoryScore(results: readonly CheckResult[]): number {
  const total = results.reduce((sum, r) => sum + r.weight, 0);
  if (total === 0) return 0;
  const earned = results.reduce((sum, r) => {
    if (r.status === "pass") return sum + r.weight;
    if (r.status === "warn") return sum + r.weight * 0.5;
    return sum;
  }, 0);
  return Math.round((earned / total) * 100);
}

export class AuditError extends Error {
  constructor(
    message: string,
    public readonly code:
      | "INVALID_URL"
      | "FETCH_FAILED"
      | "HTTP_ERROR"
      | "PAYLOAD_TOO_LARGE"
      | "TIMEOUT",
  ) {
    super(message);
    this.name = "AuditError";
  }
}

export async function runAudit(
  url: string,
  callbacks: AuditCallbacks = {},
  fetchImpl: typeof fetch = fetch,
): Promise<AuditResult> {
  const start = Date.now();
  let response: Response;
  try {
    response = await fetchImpl(url, {
      headers: { "User-Agent": USER_AGENT, Accept: "text/html,application/xhtml+xml" },
      redirect: "follow",
      signal: AbortSignal.timeout(15_000),
    });
  } catch (err) {
    const code =
      err instanceof Error && err.name === "TimeoutError" ? "TIMEOUT" : "FETCH_FAILED";
    const msg =
      err instanceof Error && err.name === "TimeoutError"
        ? "The site took too long to respond (over 15s)."
        : "We couldn't reach that site. Check the URL or your network.";
    throw new AuditError(msg, code);
  }

  if (!response.ok && (response.status < 300 || response.status >= 400)) {
    throw new AuditError(
      `The site returned HTTP ${response.status}.`,
      "HTTP_ERROR",
    );
  }

  const contentEncoding = response.headers.get("content-encoding");
  const contentLengthHeader = response.headers.get("content-length");
  const html = await response.text();
  if (html.length > MAX_HTML_BYTES) {
    throw new AuditError(
      "The page is too large to audit (over 2 MB of HTML).",
      "PAYLOAD_TOO_LARGE",
    );
  }

  const $ = cheerio.load(html);
  const ctx: AuditContext = {
    url,
    finalUrl: response.url || url,
    statusCode: response.status,
    responseTimeMs: Date.now() - start,
    contentLength: contentLengthHeader ? Number(contentLengthHeader) || html.length : html.length,
    contentEncoding,
    cacheControl: response.headers.get("cache-control"),
    headers: response.headers,
    html,
    $,
  };

  const categoryResults: CategoryResult[] = [];
  for (const category of CATEGORIES) {
    callbacks.onCategoryStart?.(category.id, category.name);
    const results = category.checks.map((c) => {
      const r = c.run(ctx);
      if (r.fix) return r;
      if (r.status === "pass") return r;
      return { ...r, fix: GENERIC_FIX };
    });
    const score = computeCategoryScore(results);
    const result: CategoryResult = {
      categoryId: category.id,
      categoryName: category.name,
      score,
      passCount: results.filter((r) => r.status === "pass").length,
      warnCount: results.filter((r) => r.status === "warn").length,
      failCount: results.filter((r) => r.status === "fail").length,
      results,
    };
    categoryResults.push(result);
    callbacks.onCategoryComplete?.(category.id, category.name, result);
  }

  const overallScore = Math.round(
    categoryResults.reduce((sum, c) => sum + c.score, 0) / categoryResults.length,
  );

  return {
    url: ctx.finalUrl,
    overallScore,
    crawledPages: 1,
    timestamp: new Date().toISOString(),
    categoryResults,
  };
}
