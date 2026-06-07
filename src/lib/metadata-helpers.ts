import { siteConfig } from "./site-config";

export type PageAlternates = {
  readonly canonical: string;
  readonly languages: Readonly<{
    readonly en: string;
    readonly fr: string;
    readonly "x-default": string;
  }>;
};

export function pageAlternates(opts: {
  path: string;
  otherLocalePath?: string;
}): PageAlternates {
  const { path, otherLocalePath } = opts;
  const canonical = `${siteConfig.url}${path}`;
  let enUrl: string;
  let frUrl: string;
  if (path.startsWith("/en/") || path === "/en") {
    enUrl = canonical;
    frUrl = otherLocalePath
      ? `${siteConfig.url}${otherLocalePath}`
      : canonical.replace(/\/en(?=\/|$)/, "/fr");
  } else if (path.startsWith("/fr/") || path === "/fr") {
    frUrl = canonical;
    enUrl = otherLocalePath
      ? `${siteConfig.url}${otherLocalePath}`
      : canonical.replace(/\/fr(?=\/|$)/, "/en");
  } else {
    enUrl = `${siteConfig.url}/en${path}`;
    frUrl = `${siteConfig.url}/fr${path}`;
  }
  return {
    canonical,
    languages: {
      en: enUrl,
      fr: frUrl,
      "x-default": enUrl,
    },
  };
}
