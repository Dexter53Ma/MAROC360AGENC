import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { SERVICES } from "@/lib/services";
import { INDUSTRIES } from "@/lib/industries";
import { getAllBlogSummaries } from "@/lib/blog/loader";

type StaticEntry = {
  readonly en: string;
  readonly fr?: string;
};

const STATIC_PATHS: ReadonlyArray<StaticEntry> = [
  { en: "/en", fr: "/fr" },
  { en: "/en/services", fr: "/fr/services" },
  { en: "/en/solutions/management-system", fr: "/fr/services/management-system" },
  { en: "/en/case-studies", fr: "/fr/case-studies" },
  { en: "/en/industries", fr: "/fr/industries" },
  { en: "/en/guides", fr: "/fr/guides" },
  { en: "/en/guides/2026-marketing-playbook", fr: "/fr/guides/2026-marketing-playbook" },
  { en: "/en/resources/blog", fr: "/fr/blog" },
  { en: "/en/careers", fr: "/fr/careers" },
  { en: "/en/contact", fr: "/fr/contact" },
  { en: "/en/manifesto", fr: "/fr/why-us" },
  { en: "/en/privacy", fr: "/fr/privacy" },
  { en: "/en/terms", fr: "/fr/terms" },
];

const CATEGORY_PATHS = [
  "strategy",
  "paid-media",
  "seo",
  "social",
  "branding",
  "content",
  "creator",
] as const;

function makeAlternates(enPath: string, frPath?: string) {
  return {
    en: `${siteConfig.url}${enPath}`,
    ...(frPath ? { fr: `${siteConfig.url}${frPath}` } : {}),
    "x-default": `${siteConfig.url}${enPath}`,
  };
}

function toEntry({ en, fr }: StaticEntry): MetadataRoute.Sitemap[number] {
  return {
    url: `${siteConfig.url}${en}`,
    alternates: { languages: makeAlternates(en, fr) },
  };
}

function toFrEntry({ en, fr }: StaticEntry): MetadataRoute.Sitemap[number] | null {
  if (!fr) return null;
  return {
    url: `${siteConfig.url}${fr}`,
    alternates: { languages: makeAlternates(en, fr) },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [enBlogPosts, frBlogPosts] = await Promise.all([
    getAllBlogSummaries("en"),
    getAllBlogSummaries("fr"),
  ]);

  const enStatic: MetadataRoute.Sitemap = STATIC_PATHS.map(toEntry);
  const frStatic: MetadataRoute.Sitemap = STATIC_PATHS
    .map(toFrEntry)
    .filter((e): e is MetadataRoute.Sitemap[number] => e !== null);

  const enServices: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${siteConfig.url}${s.href}`,
    alternates: { languages: makeAlternates(s.href, s.href.replace(/^\/en/, "/fr")) },
  }));
  const frServices: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${siteConfig.url}${s.href.replace(/^\/en/, "/fr")}`,
    alternates: { languages: makeAlternates(s.href, s.href.replace(/^\/en/, "/fr")) },
  }));

  const enIndustries: MetadataRoute.Sitemap = INDUSTRIES.map((i) => ({
    url: `${siteConfig.url}${i.href}`,
    alternates: { languages: makeAlternates(i.href, i.href.replace(/^\/en/, "/fr")) },
  }));
  const frIndustries: MetadataRoute.Sitemap = INDUSTRIES.map((i) => ({
    url: `${siteConfig.url}${i.href.replace(/^\/en/, "/fr")}`,
    alternates: { languages: makeAlternates(i.href, i.href.replace(/^\/en/, "/fr")) },
  }));

  const enCategories: MetadataRoute.Sitemap = CATEGORY_PATHS.map((slug) => ({
    url: `${siteConfig.url}/en/blog/category/${slug}`,
    alternates: {
      languages: makeAlternates(`/en/blog/category/${slug}`, `/fr/blog/category/${slug}`),
    },
  }));
  const frCategories: MetadataRoute.Sitemap = CATEGORY_PATHS.map((slug) => ({
    url: `${siteConfig.url}/fr/blog/category/${slug}`,
    alternates: {
      languages: makeAlternates(`/en/blog/category/${slug}`, `/fr/blog/category/${slug}`),
    },
  }));

  const enBlogEntries: MetadataRoute.Sitemap = enBlogPosts.map((p) => ({
    url: `${siteConfig.url}${p.href}`,
    lastModified: new Date(p.dateModified ?? p.datePublished),
    alternates: {
      languages: makeAlternates(`/en/blog/${p.slug}`, `/fr/blog/${p.slug}`),
    },
  }));
  const frBlogEntries: MetadataRoute.Sitemap = frBlogPosts.map((p) => ({
    url: `${siteConfig.url}${p.href}`,
    lastModified: new Date(p.dateModified ?? p.datePublished),
    alternates: {
      languages: makeAlternates(`/en/blog/${p.slug}`, `/fr/blog/${p.slug}`),
    },
  }));

  return [
    ...enStatic,
    ...frStatic,
    ...enServices,
    ...frServices,
    ...enIndustries,
    ...frIndustries,
    ...enCategories,
    ...frCategories,
    ...enBlogEntries,
    ...frBlogEntries,
  ];
}
