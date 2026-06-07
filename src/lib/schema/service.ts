import { SCHEMA } from "./constants";
import { breadcrumbSchema } from "./breadcrumb";
import type { ServiceSchemaInput } from "./types";

export function serviceSchema(input: ServiceSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": input.id ?? `${input.url}#service`,
        name: input.name,
        description: input.description,
        url: input.url,
        serviceType: input.serviceType,
        category: input.category ?? "Digital Marketing",
        provider: { "@id": SCHEMA.organizationId },
        areaServed: SCHEMA.areaServed,
        inLanguage: input.inLanguage,
      },
    ],
  };
}

export function servicePageSchema(input: ServiceSchemaInput) {
  return serviceSchema(input);
}

export function serviceBreadcrumb(
  locale: "en" | "fr",
  homeLabel: string,
  servicesLabel: string,
  currentName: string,
  homePath: string,
  servicesPath: string,
  currentUrl: string,
) {
  return breadcrumbSchema([
    { name: homeLabel, item: homePath },
    { name: servicesLabel, item: servicesPath },
    { name: currentName, item: currentUrl },
  ]);
}
