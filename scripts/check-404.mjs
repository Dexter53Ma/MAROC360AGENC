import { chromium, devices } from "playwright";

const browser = await chromium.launch();
const context = await browser.newContext({ ...devices["iPhone 14"] });
const page = await context.newPage();

const responses = [];
page.on("response", (resp) => {
  responses.push({ status: resp.status(), url: resp.url() });
});

await page.goto("http://localhost:3000/en", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);

const failed = responses.filter((r) => r.status >= 400);
console.log(`Total: ${responses.length}, Failed: ${failed.length}`);
failed.forEach((r) => console.log(`  ${r.status} ${r.url}`));

await browser.close();
