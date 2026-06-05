import { chromium } from "playwright";
import { writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT = resolve(ROOT, "docs/research/trustditto.com-get-started");
const URL = "https://www.trustditto.com/en/get-started";

const PROPS = [
  "fontSize","fontWeight","fontFamily","lineHeight","letterSpacing","color",
  "textTransform","backgroundColor","background",
  "padding","paddingTop","paddingRight","paddingBottom","paddingLeft",
  "margin","marginTop","marginRight","marginBottom","marginLeft",
  "width","height","maxWidth","minWidth","minHeight",
  "display","flexDirection","justifyContent","alignItems","gap",
  "gridTemplateColumns",
  "borderRadius","border","borderTop","borderBottom","borderLeft","borderRight",
  "boxShadow","overflow",
  "position","top","right","bottom","left","zIndex",
  "opacity","transform","transition",
  "objectFit","mixBlendMode"
];

async function main() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(2000);

  // Extract the CTA illustration SVG
  const ctaSvg = await page.evaluate(() => {
    const wrap = document.querySelector(".cta_illus_embed");
    return wrap ? wrap.innerHTML : null;
  });
  await writeFile(resolve(OUT, "tree/cta-illus.svg"), ctaSvg || "");

  // Get the contact form section (full deep)
  const contact = await page.evaluate(({ props }) => {
    function w(el, d, m) {
      if (d > m) return null;
      const cs = getComputedStyle(el);
      const styles = {};
      for (const p of props) {
        const v = cs[p];
        if (v && v !== "none" && v !== "auto" && v !== "0px" && v !== "rgba(0, 0, 0, 0)" && v !== "normal") {
          styles[p] = v;
        }
      }
      return {
        tag: el.tagName.toLowerCase(),
        cls: (el.className?.toString() || "").split(" ").slice(0, 6).join(" "),
        text: el.children.length === 0 ? el.textContent?.trim().slice(0, 300) : null,
        rect: { w: el.getBoundingClientRect().width, h: el.getBoundingClientRect().height },
        styles,
        children: [...el.children].map((c) => w(c, d + 1, m)).filter(Boolean)
      };
    }
    const el = document.querySelector(".contact_section");
    return w(el, 0, 8);
  }, { props: PROPS });

  await writeFile(resolve(OUT, "tree/contact-deep.json"), JSON.stringify(contact, null, 2));

  // Get all the form field structure
  const form = await page.evaluate(() => {
    // Get form fields
    const fields = document.querySelectorAll(".hs-form-field");
    return [...fields].map((f) => ({
      label: f.querySelector("label")?.textContent?.trim() || null,
      type: f.querySelector("input,select,textarea")?.type || f.querySelector("input,select,textarea")?.tagName || null,
      name: f.querySelector("input,select,textarea")?.name || null,
      required: f.querySelector("input,select,textarea")?.required || false,
      placeholder: f.querySelector("input,textarea")?.placeholder || null
    }));
  });
  await writeFile(resolve(OUT, "tree/form-fields.json"), JSON.stringify(form, null, 2));

  // Get breadcrumbs
  const breadcrumbs = await page.evaluate(() => {
    const el = document.querySelector(".breadcrumbs_section");
    if (!el) return null;
    return {
      html: el.outerHTML.slice(0, 2000),
      text: el.textContent?.trim(),
      styles: (() => {
        const cs = getComputedStyle(el);
        return {
          background: cs.background,
          backgroundColor: cs.backgroundColor,
          padding: cs.padding,
          paddingTop: cs.paddingTop,
          paddingBottom: cs.paddingBottom
        };
      })()
    };
  });
  await writeFile(resolve(OUT, "tree/breadcrumbs.json"), JSON.stringify(breadcrumbs, null, 2));

  // Get logostrip styles
  const logostrip = await page.evaluate(({ props }) => {
    function w(el, d, m) {
      if (d > m) return null;
      const cs = getComputedStyle(el);
      const styles = {};
      for (const p of props) {
        const v = cs[p];
        if (v && v !== "none" && v !== "auto" && v !== "0px" && v !== "rgba(0, 0, 0, 0)" && v !== "normal") {
          styles[p] = v;
        }
      }
      return {
        tag: el.tagName.toLowerCase(),
        cls: (el.className?.toString() || "").split(" ").slice(0, 6).join(" "),
        text: el.children.length === 0 ? el.textContent?.trim().slice(0, 200) : null,
        rect: { w: el.getBoundingClientRect().width, h: el.getBoundingClientRect().height },
        styles,
        attrs: { href: el.href || null, src: el.src || null, alt: el.alt || null },
        children: [...el.children].map((c) => w(c, d + 1, m)).filter(Boolean)
      };
    }
    const el = document.querySelector(".logostrip_section");
    return w(el, 0, 6);
  }, { props: PROPS });

  await writeFile(resolve(OUT, "tree/logostrip-deep.json"), JSON.stringify(logostrip, null, 2));

  // Get cta section styles deep
  const cta = await page.evaluate(({ props }) => {
    function w(el, d, m) {
      if (d > m) return null;
      const cs = getComputedStyle(el);
      const styles = {};
      for (const p of props) {
        const v = cs[p];
        if (v && v !== "none" && v !== "auto" && v !== "0px" && v !== "rgba(0, 0, 0, 0)" && v !== "normal") {
          styles[p] = v;
        }
      }
      return {
        tag: el.tagName.toLowerCase(),
        cls: (el.className?.toString() || "").split(" ").slice(0, 6).join(" "),
        text: el.children.length === 0 ? el.textContent?.trim().slice(0, 200) : null,
        rect: { w: el.getBoundingClientRect().width, h: el.getBoundingClientRect().height },
        styles,
        children: [...el.children].map((c) => w(c, d + 1, m)).filter(Boolean)
      };
    }
    const el = document.querySelector(".cta_section");
    return w(el, 0, 8);
  }, { props: PROPS });

  await writeFile(resolve(OUT, "tree/cta-deep.json"), JSON.stringify(cta, null, 2));

  console.log("Deep extract v2 complete.");
  await browser.close();
}

main().catch((e) => { console.error(e); process.exit(1); });
