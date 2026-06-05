import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT = resolve(ROOT, "docs/research/trustditto.com-get-started");
const IMG = resolve(ROOT, "docs/design-references/trustditto.com-get-started");
const URL = "https://www.trustditto.com/en/get-started";

const PROPS = [
  "fontSize","fontWeight","fontFamily","lineHeight","letterSpacing","color",
  "textTransform","textDecoration","backgroundColor","background",
  "padding","paddingTop","paddingRight","paddingBottom","paddingLeft",
  "margin","marginTop","marginRight","marginBottom","marginLeft",
  "width","height","maxWidth","minWidth","maxHeight","minHeight",
  "display","flexDirection","justifyContent","alignItems","gap",
  "gridTemplateColumns","gridTemplateRows",
  "borderRadius","border","borderTop","borderBottom","borderLeft","borderRight",
  "boxShadow","overflow","overflowX","overflowY",
  "position","top","right","bottom","left","zIndex",
  "opacity","transform","transition","cursor",
  "objectFit","objectPosition","mixBlendMode","filter","backdropFilter"
];

function extractStyles(el) {
  const cs = getComputedStyle(el);
  const out = {};
  for (const p of PROPS) {
    const v = cs[p];
    if (v && v !== "none" && v !== "normal" && v !== "auto" && v !== "0px" && v !== "rgba(0, 0, 0, 0)") {
      out[p] = v;
    }
  }
  return out;
}

function walk(el, depth = 0, max = 5) {
  if (depth > max) return null;
  const children = [...el.children];
  return {
    tag: el.tagName.toLowerCase(),
    classes: (el.className?.toString() || "").split(" ").slice(0, 6).join(" "),
    text:
      el.childNodes.length === 1 && el.childNodes[0].nodeType === 3
        ? el.childNodes[0].textContent.trim().slice(0, 200)
        : null,
    styles: extractStyles(el),
    images:
      el.tagName === "IMG"
        ? {
            src: el.src,
            currentSrc: el.currentSrc,
            alt: el.alt,
            naturalWidth: el.naturalWidth,
            naturalHeight: el.naturalHeight
          }
        : null,
    childCount: children.length,
    children: children.slice(0, 30).map((c) => walk(c, depth + 1, max)).filter(Boolean)
  };
}

async function main() {
  await mkdir(OUT, { recursive: true });
  await mkdir(IMG, { recursive: true });

  const browser = await chromium.launch({ headless: true });

  const captures = [
    { name: "desktop", width: 1440, height: 900 },
    { name: "tablet", width: 768, height: 1024 },
    { name: "mobile", width: 390, height: 844 }
  ];

  const report = { url: URL, captures: [], selectors: [], assets: {}, page: {} };

  for (const cap of captures) {
    const ctx = await browser.newContext({
      viewport: { width: cap.width, height: cap.height },
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    });
    const page = await ctx.newPage();
    page.on("console", () => {});
    page.on("pageerror", () => {});
    await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(1500);

    const screenshotPath = resolve(IMG, `${cap.name}-fullpage.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });

    const viewportPath = resolve(IMG, `${cap.name}-viewport.png`);
    await page.screenshot({ path: viewportPath, fullPage: false });

    if (cap.name === "desktop") {
      report.page = await page.evaluate(() => ({
        title: document.title,
        description:
          document.querySelector('meta[name="description"]')?.content || null,
        ogTitle: document.querySelector('meta[property="og:title"]')?.content || null,
        ogDescription: document.querySelector('meta[property="og:description"]')?.content || null,
        ogImage: document.querySelector('meta[property="og:image"]')?.content || null,
        canonical: document.querySelector('link[rel="canonical"]')?.href || null,
        htmlClasses: document.documentElement.className,
        bodyClasses: document.body.className,
        favicons: [...document.querySelectorAll('link[rel*="icon"]')].map((l) => ({
          rel: l.rel,
          href: l.href,
          sizes: l.sizes?.toString() || null
        })),
        sectionSelectors: [
          ".breadcrumbs_section",
          ".contact_section",
          ".logostrip_section",
          "section.logostrip_section",
          "section.footer_section",
          ".footer_section"
        ]
      }));

      const selectors = [
        ".breadcrumbs_section",
        ".contact_section",
        ".contact_content_wrapper",
        ".contact_content",
        ".contact_features_list",
        ".contact_features_item",
        ".socialproof_item",
        ".contact_form_wrapper",
        ".contact_form",
        ".logostrip_section",
        ".logostrip_list",
        ".logostrip_item",
        ".footer_section",
        "h1.heading-size-4rem",
        "h3.heading-size-2rem",
        ".heading-size-1x375rem",
        "section"
      ];

      for (const sel of selectors) {
        const data = await page.evaluate(
          ({ sel, props }) => {
            const els = [...document.querySelectorAll(sel)];
            return els.map((el) => {
              const cs = getComputedStyle(el);
              const styles = {};
              for (const p of props) {
                const v = cs[p];
                if (
                  v &&
                  v !== "none" &&
                  v !== "normal" &&
                  v !== "auto" &&
                  v !== "0px" &&
                  v !== "rgba(0, 0, 0, 0)"
                )
                  styles[p] = v;
              }
              return {
                selector: sel,
                tag: el.tagName.toLowerCase(),
                classes: el.className?.toString().split(" ").slice(0, 8).join(" "),
                text:
                  el.children.length === 0
                    ? el.textContent?.trim().slice(0, 300)
                    : null,
                rect: el.getBoundingClientRect(),
                styles,
                images:
                  el.tagName === "IMG"
                    ? {
                        src: el.src,
                        currentSrc: el.currentSrc,
                        alt: el.alt,
                        naturalWidth: el.naturalWidth,
                        naturalHeight: el.naturalHeight
                      }
                    : null,
                childCount: el.children.length
              };
            });
          },
          { sel, props: PROPS }
        );
        report.selectors.push({ selector: sel, count: data.length, samples: data });
      }

      const assets = await page.evaluate(() => {
        const out = { images: [], videos: [], svgs: [], bgImages: [] };
        document.querySelectorAll("img").forEach((img) => {
          out.images.push({
            src: img.src || img.currentSrc,
            alt: img.alt,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
            classes: img.className?.toString().split(" ").slice(0, 4).join(" ")
          });
        });
        document.querySelectorAll("video source, video").forEach((v) => {
          out.videos.push({
            src: v.src || v.querySelector?.("source")?.src,
            poster: v.poster,
            autoplay: v.autoplay,
            loop: v.loop
          });
        });
        out.svgs.push(document.querySelectorAll("svg").length);
        document.querySelectorAll("*").forEach((el) => {
          const bg = getComputedStyle(el).backgroundImage;
          if (bg && bg !== "none") {
            out.bgImages.push({
              url: bg,
              element: el.tagName + "." + (el.className?.toString().split(" ")[0] || "")
            });
          }
        });
        return out;
      });
      report.assets = assets;

      await mkdir(resolve(OUT, "tree"), { recursive: true });
      const tree = await page.evaluate(() => {
        const root = document.querySelector(".page-wrapper") || document.body;
        function w(el, d) {
          if (d > 6) return null;
          return {
            tag: el.tagName.toLowerCase(),
            cls: (el.className?.toString() || "").split(" ").slice(0, 5).join(" "),
            text:
              el.children.length === 0 ? el.textContent?.trim().slice(0, 120) : null,
            children: [...el.children].map((c) => w(c, d + 1)).filter(Boolean)
          };
        }
        return w(root, 0);
      });
      await writeFile(resolve(OUT, "tree/dom.json"), JSON.stringify(tree, null, 2));

      const sectionsData = await page.evaluate(() => {
        const out = [];
        document.querySelectorAll("section, .contact_section, .breadcrumbs_section, .logostrip_section, .footer_section").forEach((el) => {
          out.push(walk(el, 0, 4));
        });
        function walk(e, d, m) {
          if (d > m) return null;
          const cs = getComputedStyle(e);
          const styles = {};
          [
            "fontSize","fontWeight","lineHeight","letterSpacing","color",
            "backgroundColor","background",
            "padding","paddingTop","paddingBottom","paddingLeft","paddingRight",
            "margin","marginTop","marginBottom",
            "display","flexDirection","justifyContent","alignItems","gap",
            "gridTemplateColumns",
            "borderRadius","borderTop","borderBottom",
            "boxShadow","position","top","left","right","bottom","zIndex",
            "maxWidth","minHeight","width"
          ].forEach((p) => {
            const v = cs[p];
            if (v && v !== "none" && v !== "auto" && v !== "0px" && v !== "rgba(0, 0, 0, 0)") styles[p] = v;
          });
          return {
            tag: e.tagName.toLowerCase(),
            cls: (e.className?.toString() || "").split(" ").slice(0, 6).join(" "),
            text: e.children.length === 0 ? e.textContent?.trim().slice(0, 200) : null,
            rect: e.getBoundingClientRect(),
            styles,
            children: [...e.children].map((c) => walk(c, d + 1, m)).filter(Boolean)
          };
        }
        return out;
      });
      await writeFile(resolve(OUT, "tree/sections.json"), JSON.stringify(sectionsData, null, 2));
    }

    if (cap.name === "mobile") {
      const mobileScreenshot = resolve(IMG, `mobile-bottom.png`);
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(800);
      await page.screenshot({ path: mobileScreenshot, fullPage: false });
    }

    report.captures.push({
      name: cap.name,
      width: cap.width,
      height: cap.height,
      screenshot: screenshotPath.replace(ROOT + "\\", "").replace(/\\/g, "/")
    });

    await ctx.close();
  }

  await browser.close();
  await writeFile(resolve(OUT, "recon.json"), JSON.stringify(report, null, 2));
  console.log("Recon complete.");
  console.log("Captures:", report.captures.map((c) => c.name).join(", "));
  console.log("Selectors scanned:", report.selectors.length);
  console.log("Images found:", report.assets.images?.length);
  console.log("SVGs found:", report.assets.svgs?.[0]);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
