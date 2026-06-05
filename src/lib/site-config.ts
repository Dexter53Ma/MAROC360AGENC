export const siteConfig = {
  name: "Maroc 360",
  shortName: "Maroc 360",
  description:
    "Maroc 360 Agency is a full-service digital marketing agency based in Morocco. We help brands grow with strategy, creative, paid media, SEO, social, and content that delivers measurable results.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ??
    "https://maroc360.agency",
  ogImage:
    "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/682d8b77bec4f672c42ac4d5_open-graph.jpg",
  locale: "en" as const,
  localePrefix: "/en" as const,
  publisher: {
    name: "Maroc 360",
    logo: "/brand/maroc360-logo.png",
    type: "Organization" as const,
  },
  social: {
    linkedin: "https://www.linkedin.com/company/maroc360",
    instagram: "https://www.instagram.com/maroc360",
    facebook: "https://www.facebook.com/maroc360",
  },
  contact: {
    email: "Contact@maroc360.agency",
    emailHref: "mailto:Contact@maroc360.agency",
  },
  whatsapp: {
    raw: "+212621947493",
    href: "https://wa.me/212621947493",
    display: "+212 621 947 493",
    telHref: "tel:+212621947493",
  },
} as const;

export function buildWhatsAppUrl(message: string): string {
  return `${siteConfig.whatsapp.href}?text=${encodeURIComponent(message)}`;
}

export const blogConfig = {
  indexPaths: {
    en: "/en/blog" as const,
    fr: "/fr/blog" as const,
  },
  perPage: 12,
  wordsPerMinute: 200,
  relatedLimit: 3,
  categories: [
    "Strategy",
    "SEO",
    "Paid Media",
    "Social",
    "Branding",
    "Content",
    "Creator",
  ] as const,
} as const;

export type BlogCategory = (typeof blogConfig.categories)[number];

export function buildBlogUrl(slug: string, locale: "en" | "fr" = "en"): string {
  return `${blogConfig.indexPaths[locale]}/${slug}`;
}

export function absoluteUrl(path: string): string {
  if (!path) return siteConfig.url;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalised = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalised}`;
}
