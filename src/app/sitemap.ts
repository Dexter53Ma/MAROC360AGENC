import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { SERVICES } from "@/lib/services";
import { INDUSTRIES } from "@/lib/industries";
import { getAllBlogSummaries } from "@/lib/blog/loader";

type StaticEntry = {
  readonly path: string;
  readonly priority: number;
  readonly changeFrequency: "weekly" | "monthly" | "yearly";
};

const STATIC_PATHS_EN: ReadonlyArray<StaticEntry> = [
  { path: "/en", priority: 1.0, changeFrequency: "weekly" },
  { path: "/en/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/en/services/management-system", priority: 0.9, changeFrequency: "monthly" },
  { path: "/en/case-studies", priority: 0.8, changeFrequency: "monthly" },
  { path: "/en/industries", priority: 0.8, changeFrequency: "monthly" },
  { path: "/en/guides", priority: 0.8, changeFrequency: "monthly" },
  { path: "/en/guides/2026-marketing-playbook", priority: 0.8, changeFrequency: "yearly" },
  { path: "/en/blog", priority: 0.9, changeFrequency: "weekly" },
  { path: "/en/careers", priority: 0.6, changeFrequency: "monthly" },
  { path: "/en/contact", priority: 0.7, changeFrequency: "yearly" },
  { path: "/en/why-us", priority: 0.6, changeFrequency: "yearly" },
  { path: "/en/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/en/terms", priority: 0.3, changeFrequency: "yearly" },
];

const STATIC_PATHS_FR: ReadonlyArray<StaticEntry> = [
  { path: "/fr", priority: 1.0, changeFrequency: "weekly" },
  { path: "/fr/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/fr/services/management-system", priority: 0.9, changeFrequency: "monthly" },
  { path: "/fr/case-studies", priority: 0.8, changeFrequency: "monthly" },
  { path: "/fr/industries", priority: 0.8, changeFrequency: "monthly" },
  { path: "/fr/guides", priority: 0.8, changeFrequency: "monthly" },
  { path: "/fr/guides/2026-marketing-playbook", priority: 0.8, changeFrequency: "yearly" },
  { path: "/fr/blog", priority: 0.9, changeFrequency: "weekly" },
  { path: "/fr/careers", priority: 0.6, changeFrequency: "monthly" },
  { path: "/fr/contact", priority: 0.7, changeFrequency: "yearly" },
  { path: "/fr/why-us", priority: 0.6, changeFrequency: "yearly" },
  { path: "/fr/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/fr/terms", priority: 0.3, changeFrequency: "yearly" },
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

function toEntry({
  path,
  priority,
  changeFrequency,
  lastModified,
}: {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
  lastModified: Date;
}): MetadataRoute.Sitemap[number] {
  return {
    url: `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  };
}

function makeAlternates(pathSuffix: string) {
  return {
    en: `${siteConfig.url}/en${pathSuffix}`,
    fr: `${siteConfig.url}/fr${pathSuffix}`,
    "x-default": `${siteConfig.url}/en${pathSuffix}`,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [enBlogPosts, frBlogPosts] = await Promise.all([
    getAllBlogSummaries("en"),
    getAllBlogSummaries("fr"),
  ]);

  const enStatic: MetadataRoute.Sitemap = STATIC_PATHS_EN.map((e) =>
    toEntry({ ...e, lastModified: now })
  );
  const frStatic: MetadataRoute.Sitemap = STATIC_PATHS_FR.map((e) =>
    toEntry({ ...e, lastModified: now })
  );

  const enServices: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${siteConfig.url}${s.href}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
    alternates: { languages: makeAlternates(s.href.replace(/^\/en/, "")) },
  }));
  const frServices: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${siteConfig.url}${s.href.replace(/^\/en/, "/fr")}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
    alternates: { languages: makeAlternates(s.href.replace(/^\/en/, "")) },
  }));

  const enIndustries: MetadataRoute.Sitemap = INDUSTRIES.map((i) => ({
    url: `${siteConfig.url}${i.href}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    alternates: { languages: makeAlternates(i.href.replace(/^\/en/, "")) },
  }));
  const frIndustries: MetadataRoute.Sitemap = INDUSTRIES.map((i) => ({
    url: `${siteConfig.url}${i.href.replace(/^\/en/, "/fr")}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    alternates: { languages: makeAlternates(i.href.replace(/^\/en/, "")) },
  }));

  const enCategories: MetadataRoute.Sitemap = CATEGORY_PATHS.map((slug) => ({
    url: `${siteConfig.url}/en/blog/category/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
    alternates: {
      languages: makeAlternates(`/blog/category/${slug}`),
    },
  }));
  const frCategories: MetadataRoute.Sitemap = CATEGORY_PATHS.map((slug) => ({
    url: `${siteConfig.url}/fr/blog/category/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
    alternates: {
      languages: makeAlternates(`/blog/category/${slug}`),
    },
  }));

  const enBlogEntries: MetadataRoute.Sitemap = enBlogPosts.map((p) => ({
    url: `${siteConfig.url}${p.href}`,
    lastModified: new Date(p.datePublished),
    changeFrequency: "monthly" as const,
    priority: 0.7,
    alternates: {
      languages: makeAlternates(`/blog/${p.slug}`),
    },
  }));
  const frBlogEntries: MetadataRoute.Sitemap = frBlogPosts.map((p) => ({
    url: `${siteConfig.url}${p.href}`,
    lastModified: new Date(p.datePublished),
    changeFrequency: "monthly" as const,
    priority: 0.7,
    alternates: {
      languages: makeAlternates(`/blog/${p.slug}`),
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
