#!/usr/bin/env node
import { mkdir, writeFile, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const out = join(root, "public");

const assets = [
  // SEO
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/682d8b3688bd2099bac4628b_favicon.png", out: "seo/favicon.png" },
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/682d8b38c92588c26172148c_webclip.png", out: "seo/webclip.png" },
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/682d8b77bec4f672c42ac4d5_open-graph.jpg", out: "seo/og-image.jpg" },

  // Brand
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/682d8b77e73e672cfd2353a9_ditto-logo.svg", out: "brand/ditto-logo.svg" },
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/69a7fb7319962df0c9f5adbc_trustpilot-2.svg", out: "brand/trustpilot.svg" },

  // Frameworks (card icons)
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/682ed169cfc14d8e3135faa6_Csrd.avif", out: "icons/csrd.avif" },
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/682ed1c26a35724770ef7a90_Ecovadis.avif", out: "icons/ecovadis.avif" },
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/682ed1c27d430a77816d3240_Iso.avif", out: "icons/iso.avif" },
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/682ed1c2ab419262c58ece95_Cdp.avif", out: "icons/cdp.avif" },
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/682ee6e02bc0625d098f75f6_proprietary-methodology.svg", out: "icons/methodology.svg" },
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/682ee73125bd5f1a0649534f_Icon%201.svg", out: "icons/coach.svg" },
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/682ee731bb1e36ea15f9a2be_Icon%202.svg", out: "icons/training-partner.svg" },
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/682ee73169e8441ab81e63ec_Icon%205.svg", out: "icons/efrag.svg" },
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/682ee732f7973ba1851de513_Icon%206.svg", out: "icons/compliance-watch.svg" },

  // Hero
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/69d4a872ab9543da2eb2b3d1_ditto-frameworks-hero-p-1600.jpg", out: "images/hero/frameworks-hero.jpg" },

  // Home illustration
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/685005b22e3569e38d4c485a_ditto_better_businesses_illustration_1_narrow-p-1600.avif", out: "images/home-illus/banner.avif" },

  // Feature illustrations
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/682edf7009b9c94e92fe6873_10d2ad89fc937d48265e36de5d2cbddd_management-system-illus.avif", out: "images/features/management-system.avif" },
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/682ee0558f40d350a3c7eea6_questionnaire-automation-illus.avif", out: "images/features/questionnaire-automation.avif" },
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/682ee055de0944813d79bd87_ai-and-embedded-intelligence-illus.avif", out: "images/features/ai-embedded.avif" },
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/682ee05524a83de2f9bc8aaf_supplier-questionnaire-illus.avif", out: "images/features/supplier-engagement.avif" },

  // Pill illustration
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/682ee40e21f304d2370b1de0_happy-business-meeting-team-laughing.avif", out: "images/team/team-meeting.avif" },

  // Company logos (logo strip)
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6a042ff6dc23785842acb469_Logo%20Niedax%20black.png", out: "images/logos/niedax.png" },
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/699ecb20a76db01423b109bc_Logo%20Adenes%20black.png", out: "images/logos/adenes.png" },
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/692dca577999e73c8d98f71b_Logo%20Aico%20Black.avif", out: "images/logos/aico.avif" },
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/692dc8c9acf019fac90c1fbc_Logo-Groupe-MAURIN%201.avif", out: "images/logos/maurin.avif" },
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/692dccb1841dc81ef46dd7b7_FERCO-navigation-logo%201.avif", out: "images/logos/ferco.avif" },
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/692dc68c789cf9f20e6fd1ea_Superga%20Beauty.svg", out: "images/logos/superga.svg" },
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/692dcdc4414d8c1395cba442_LOGO_YESSS%201.avif", out: "images/logos/yesss.avif" },
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/692dcb6f63511d0a1940c6a5_Logo%20Stelliant%20black.avif", out: "images/logos/stelliant.avif" },
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/692dce8b800a697604569485_ECS%20group.avif", out: "images/logos/ecs.avif" },

  // Testimonials
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/68500d1dd54e8caaf4582513_image%20184.svg", out: "images/testimonials/logo-1.svg" },
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/68501082e841829eb6230fb4_sophie%20wardan.avif", out: "images/testimonials/avatar-1.avif" },
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/68500d53b42be2ab3bf0e940_image%20182.svg", out: "images/testimonials/logo-2.svg" },
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/685011fad75863ba0daabf4c_virginie%20caro.avif", out: "images/testimonials/avatar-2.avif" },
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/68500d59fd017a7053f397ff_image%20185.svg", out: "images/testimonials/logo-3.svg" },
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6850129d078bbc4227e6b0e2_laurence%20sauphanor.avif", out: "images/testimonials/avatar-3.avif" },
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/68500d2b7dbe6fa2c7a6bd4a_image%20186.svg", out: "images/testimonials/logo-4.svg" },
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6850177eb543d8315a1cd935_camille%20nironi.avif", out: "images/testimonials/avatar-4.avif" },
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/68500d5fd246b3f9f5a26b86_Group%2015404.svg", out: "images/testimonials/logo-5.svg" },
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/685013b3290c0b4c0a2d6c48_audrey%20evin.avif", out: "images/testimonials/avatar-5.avif" },
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/68500d004edf686e13b05bb7_image%20179.svg", out: "images/testimonials/logo-6.svg" },
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/68501722e9aa5c36757119f6_icon.svg", out: "images/testimonials/avatar-6.svg" },

  // Blog
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6a1850c71817ffd03370ffa3_new_better_businesses_illustration_10.png", out: "images/blog/post-1.png" },
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6a184a915f82cad90b79a145_ditto_better_world_illustration_6%20-%20Grande.jpeg", out: "images/blog/post-2.jpeg" },
  { url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56fce/6970ff9bf4ef80b4ce269d2b_ditto_better_businesses_illustration_7%20-%20Grande.jpeg", out: "images/blog/post-3.jpeg" },
];

const CONCURRENCY = 4;
const results = [];

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function download({ url, out: outPath }) {
  const dest = join(out, outPath);
  if (await exists(dest)) {
    results.push({ url, out: outPath, status: "cached" });
    return;
  }
  await mkdir(dirname(dest), { recursive: true });
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; CloneAssetBot/1.0)" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(dest, buf);
    results.push({ url, out: outPath, status: "ok", bytes: buf.length });
  } catch (err) {
    results.push({ url, out: outPath, status: "error", error: err.message });
  }
}

async function main() {
  console.log(`Downloading ${assets.length} assets to ${out} (concurrency ${CONCURRENCY})...`);
  let cursor = 0;
  async function worker() {
    while (cursor < assets.length) {
      const i = cursor++;
      await download(assets[i]);
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  const ok = results.filter((r) => r.status === "ok").length;
  const cached = results.filter((r) => r.status === "cached").length;
  const errors = results.filter((r) => r.status === "error");
  console.log(`\nDone. OK: ${ok}  Cached: ${cached}  Errors: ${errors.length}`);
  if (errors.length) {
    console.log("\nFailed downloads:");
    errors.forEach((e) => console.log(`  ${e.out}  ←  ${e.url}\n     ${e.error}`));
  }
}

main();
