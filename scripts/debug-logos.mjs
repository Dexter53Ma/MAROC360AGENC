import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto("http://localhost:3000/en/get-started", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1500);

const strip = await page.locator("section.section-y").first();
const box = await strip.boundingBox();
console.log("Strip box:", box);

// Force all logos to load
await page.evaluate(() => {
  const imgs = document.querySelectorAll("section.section-y img");
  console.log("Found", imgs.length, "imgs");
  imgs.forEach((img, i) => {
    if (!img.complete || img.naturalWidth === 0) {
      console.log("Image", i, "src:", img.src, "loading:", img.loading);
    } else {
      console.log("Image", i, "OK", img.naturalWidth + "x" + img.naturalHeight);
    }
  });
});

// Scroll to logo strip and wait
await page.evaluate(() => {
  const strip = document.querySelector("section.section-y");
  if (strip) strip.scrollIntoView({ behavior: "instant", block: "center" });
});
await page.waitForTimeout(3000);
await strip.screenshot({ path: "docs/design-references/trustditto.com-get-started/logo-strip-detail.png" });

await browser.close();
console.log("Done");
