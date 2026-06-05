import { chromium, devices } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = "docs/design-references/mobile-audit";
mkdirSync(OUT, { recursive: true });

const pages = [
  { name: "home", path: "/" },
  { name: "contact", path: "/en/contact" },
  { name: "manifesto", path: "/en/manifesto" },
  { name: "careers", path: "/en/careers" },
  { name: "services", path: "/en/services" },
  { name: "solutions", path: "/en/solutions/management-system" },
  { name: "privacy", path: "/en/privacy" },
  { name: "terms", path: "/en/terms" },
];

const browser = await chromium.launch();
const context = await browser.newContext({
  ...devices["iPhone 14"],
  deviceScaleFactor: 2,
});
const page = await context.newPage();

let totalErrors = 0;
let totalWarnings = 0;

const errors = [];
const warnings = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
  if (msg.type() === "warning") warnings.push(msg.text());
});

for (const p of pages) {
  await page.goto(`http://localhost:3000${p.path}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);

  // Scroll the full page to trigger reveal animations
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let total = 0;
      const step = 200;
      const t = setInterval(() => {
        window.scrollBy(0, step);
        total += step;
        if (total >= document.body.scrollHeight) {
          clearInterval(t);
          window.scrollTo(0, 0);
          setTimeout(resolve, 300);
        }
      }, 30);
    });
  });
  await page.waitForTimeout(800);

  await page.screenshot({
    path: `${OUT}/${p.name}-top.png`,
    fullPage: false,
  });
  await page.screenshot({
    path: `${OUT}/${p.name}-full.png`,
    fullPage: true,
  });

  // Detect horizontal overflow
  const overflow = await page.evaluate(() => {
    const body = document.body;
    return {
      scrollWidth: body.scrollWidth,
      clientWidth: body.clientWidth,
      hasOverflow: body.scrollWidth > body.clientWidth + 1,
    };
  });
  console.log(
    `[${p.name}] scrollW=${overflow.scrollWidth} clientW=${overflow.clientWidth} overflow=${overflow.hasOverflow}`,
  );
  if (overflow.hasOverflow) totalWarnings++;
}

console.log(`\nPage errors: ${errors.length}`);
errors.forEach((e) => console.log("  - " + e));
console.log(`Console warnings: ${warnings.length}`);
warnings.slice(0, 5).forEach((w) => console.log("  ~ " + w));
console.log(`\nTotal overflow warnings: ${totalWarnings}`);

await browser.close();
process.exit(0);
