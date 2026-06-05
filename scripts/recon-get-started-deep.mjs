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

  const deep = await page.evaluate(({ selectors, props }) => {
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
        rect: el.getBoundingClientRect(),
        styles,
        attrs: { href: el.href || null, src: el.src || null, alt: el.alt || null },
        children: [...el.children].map((c) => w(c, d + 1, m)).filter(Boolean)
      };
    }
    const out = {};
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (el) out[sel] = w(el, 0, 8);
      else out[sel] = null;
    }
    return out;
  }, { selectors: [".numbers_section", ".cta_section"], props: PROPS });

  await writeFile(resolve(OUT, "tree/numbers-cta-deep.json"), JSON.stringify(deep, null, 2));
  console.log("Deep extract complete.");
  await browser.close();
}

main().catch((e) => { console.error(e); process.exit(1); });
