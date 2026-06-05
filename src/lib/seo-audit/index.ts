import * as cheerio from "cheerio";

export type CheckStatus = "pass" | "warn" | "fail";

export interface CheckResult {
  readonly ruleId: string;
  readonly status: CheckStatus;
  readonly message: string;
  readonly weight: number;
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

function pass(id: string, weight: number, message: string): CheckResult {
  return { ruleId: id, status: "pass", message, weight };
}
function warn(id: string, weight: number, message: string): CheckResult {
  return { ruleId: id, status: "warn", message, weight };
}
function fail(id: string, weight: number, message: string): CheckResult {
  return { ruleId: id, status: "fail", message, weight };
}

const coreChecks: Check[] = [
  {
    id: "title-present",
    weight: 20,
    run: (ctx) => {
      const t = ctx.$("head > title").first().text().trim();
      if (!t) return fail("title-present", 20, "Page is missing a <title> tag.");
      return pass("title-present", 20, "Page has a <title> tag.");
    },
  },
  {
    id: "title-length",
    weight: 15,
    run: (ctx) => {
      const t = ctx.$("head > title").first().text().trim();
      if (!t) return warn("title-length", 15, "Add a <title> to control search snippets.");
      if (t.length < 30)
        return warn(
          "title-length",
          15,
          `Title is only ${t.length} characters — aim for 30–60 for best search snippets.`,
        );
      if (t.length > 65)
        return warn(
          "title-length",
          15,
          `Title is ${t.length} characters — Google typically truncates after 60.`,
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
        return fail("meta-description", 15, "Missing meta description — search engines will auto-generate one.");
      if (d.length < 70)
        return warn(
          "meta-description",
          15,
          `Meta description is only ${d.length} characters — aim for 70–160.`,
        );
      if (d.length > 160)
        return warn(
          "meta-description",
          15,
          `Meta description is ${d.length} characters — Google typically truncates after 160.`,
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
      if (n === 0) return fail("h1-count", 15, "Page has no <h1> heading.");
      if (n > 1)
        return warn(
          "h1-count",
          15,
          `Page has ${n} <h1> headings — use exactly one for a clear page topic.`,
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
        return warn("html-lang", 10, "Missing <html lang> attribute — hurts accessibility and SEO.");
      return pass("html-lang", 10, `Document language is set to "${lang}".`);
    },
  },
  {
    id: "canonical",
    weight: 15,
    run: (ctx) => {
      const c = ctx.$('head > link[rel="canonical"]').attr("href")?.trim();
      if (!c)
        return warn("canonical", 15, "Missing canonical link — risk of duplicate content.");
      return pass("canonical", 15, "Canonical link is declared.");
    },
  },
  {
    id: "viewport",
    weight: 10,
    run: (ctx) => {
      const v = ctx.$('head > meta[name="viewport"]').attr("content")?.trim();
      if (!v)
        return fail("viewport", 10, "Missing viewport meta — page is not mobile-friendly.");
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
        return warn("response-time", 25, `Server responded in ${ms}ms — aim for under 1.5s.`);
      return fail("response-time", 25, `Server responded in ${ms}ms — too slow for good UX.`);
    },
  },
  {
    id: "html-size",
    weight: 20,
    run: (ctx) => {
      const kb = Math.round(ctx.contentLength / 1024);
      if (kb < 100) return pass("html-size", 20, `HTML payload is ${kb} KB.`);
      if (kb < 300)
        return warn("html-size", 20, `HTML payload is ${kb} KB — consider trimming or lazy-loading.`);
      return fail("html-size", 20, `HTML payload is ${kb} KB — too large for fast paint.`);
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
      return fail("https", 30, "Page is served over plain HTTP — switch to HTTPS.");
    },
  },
  {
    id: "x-frame-options",
    weight: 15,
    run: (ctx) => {
      const v = ctx.headers.get("x-frame-options") ?? ctx.headers.get("content-security-policy") ?? "";
      if (/deny|sameorigin/i.test(ctx.headers.get("x-frame-options") ?? "") || /frame-ancestors/i.test(v))
        return pass("x-frame-options", 15, "Clickjacking protection is configured.");
      return warn("x-frame-options", 15, "No X-Frame-Options or CSP frame-ancestors — add one to prevent clickjacking.");
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
      if (internal === 0) return fail("internal-links", 25, "No internal links found — site has no discoverable structure.");
      if (internal < 3)
        return warn("internal-links", 25, `Only ${internal} internal link(s) — add more to help crawlers.`);
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
        return warn("alt-coverage", 30, `${pct}% of images (${n - withAlt} missing) have alt text.`);
      return fail("alt-coverage", 30, `Only ${pct}% of images have alt text (${n - withAlt} missing).`);
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
        return warn("dimensions", 20, `${imgs.length - withDims} image(s) missing width/height — add them to prevent layout shift.`);
      return fail("dimensions", 20, `Most images (${imgs.length - withDims}) lack width/height attributes.`);
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
        return warn("word-count", 30, `Page has ${words} words — aim for 300+ for better rankings.`);
      return fail("word-count", 30, `Page has only ${words} words — too thin for SEO.`);
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
        return warn("open-graph", 20, `Open Graph is partial — missing ${missing.join(", ")}.`);
      return fail("open-graph", 20, `Open Graph is missing key tags: ${missing.join(", ")}.`);
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
        return fail("robots-directive", 20, "Page is marked noindex — it will not appear in search.");
      if (/nofollow/.test(robots))
        return warn("robots-directive", 20, "Page is marked nofollow — links won't pass authority.");
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
        return warn("jsonld-present", 35, "No JSON-LD structured data — add Organization or WebPage schema.");
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
      return warn("jsonld-present", 35, `Found ${scripts.length} JSON-LD script(s) but none parsed correctly.`);
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
      return warn("doctype", 15, "Missing <!doctype html> — page may render in quirks mode.");
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
      return warn("favicon", 20, "No <link rel='icon'> — browsers will request /favicon.ico and get a 404.");
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
    const results = category.checks.map((c) => c.run(ctx));
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
