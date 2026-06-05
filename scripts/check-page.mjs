import { chromium, devices } from "playwright";

const browser = await chromium.launch();
const context = await browser.newContext({ ...devices["iPhone 14"] });
const page = await context.newPage();

await page.goto("http://localhost:3000/en", { waitUntil: "networkidle" });
await page.waitForTimeout(1000);

const info = await page.evaluate(() => ({
  title: document.title,
  url: window.location.href,
  h1: document.querySelector("h1")?.textContent,
  bodyLen: document.body.innerText.length,
}));
console.log(JSON.stringify(info, null, 2));

await browser.close();
