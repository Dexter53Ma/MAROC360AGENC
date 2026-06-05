import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT = resolve(ROOT, "docs/design-references/trustditto.com-get-started");
const URL = "http://localhost:3000/en/get-started";

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });
const captures = [
  { name: "clone-desktop", width: 1440, height: 900 },
  { name: "clone-tablet", width: 768, height: 1024 },
  { name: "clone-mobile", width: 390, height: 844 }
];

for (const cap of captures) {
  const ctx = await browser.newContext({
    viewport: { width: cap.width, height: cap.height }
  });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => console.error("PAGE ERROR:", e.message));
  page.on("console", (m) => {
    if (m.type() === "error") console.error("CONSOLE ERROR:", m.text());
  });
  await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(2000);

  // Scroll the entire page slowly to trigger lazy image loads
  await page.evaluate(async () => {
    const total = document.body.scrollHeight;
    const step = 200;
    for (let y = 0; y <= total + window.innerHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    // Wait for all images to be fully loaded (with generous timeout)
    const imgs = [...document.querySelectorAll("img")];
    await Promise.all(imgs.map((img) => {
      if (img.complete && img.naturalWidth > 0) return Promise.resolve();
      return new Promise((resolve) => {
        img.addEventListener("load", resolve, { once: true });
        img.addEventListener("error", resolve, { once: true });
        setTimeout(resolve, 5000);
      });
    }));
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 800));
  });
  await page.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(1500);

  await page.screenshot({
    path: resolve(OUT, `${cap.name}.png`),
    fullPage: true
  });
  console.log(`Captured ${cap.name} (${cap.width}x${cap.height})`);
  await ctx.close();
}

await browser.close();
console.log("Clone screenshots saved.");
