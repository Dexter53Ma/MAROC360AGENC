import { chromium, devices } from "playwright";

const browser = await chromium.launch();
const context = await browser.newContext({ ...devices["iPhone 14"] });
const page = await context.newPage();

await page.goto(`http://localhost:3000/en/contact?nocache=${Date.now()}`, {
  waitUntil: "networkidle",
});
await page.waitForTimeout(1500);

const info = await page.evaluate(() => {
  const form = document.querySelector("form[data-form-id='contact']");
  return {
    hasForm: !!form,
    bodyLen: document.body.innerText.length,
    h1: document.querySelector("h1")?.textContent,
    h2s: Array.from(document.querySelectorAll("h2")).map((h) => h.textContent),
  };
});
console.log(JSON.stringify(info, null, 2));

await page.screenshot({
  path: "docs/design-references/mobile-audit/contact-fresh-full.png",
  fullPage: true,
});
await browser.close();
