import { SCHEMA } from "./constants";
import { breadcrumbSchema } from "./breadcrumb";
import type { WebPageSchemaInput } from "./types";

export function webPageSchema(input: WebPageSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": input.type ?? "WebPage",
        "@id": input.id,
        url: input.url,
        name: input.name,
        description: input.description,
        inLanguage: input.inLanguage,
        isPartOf: { "@id": SCHEMA.websiteId },
        about: { "@id": SCHEMA.organizationId },
      },
    ],
  };
}

export function webPageBreadcrumb(
  homeLabel: string,
  homePath: string,
  currentName: string,
  currentUrl: string,
  parentName?: string,
  parentPath?: string,
) {
  const items =
    parentName && parentPath
      ? [
          { name: homeLabel, item: homePath },
          { name: parentName, item: parentPath },
          { name: currentName, item: currentUrl },
        ]
      : [
          { name: homeLabel, item: homePath },
          { name: currentName, item: currentUrl },
        ];
  return breadcrumbSchema(items);
}
