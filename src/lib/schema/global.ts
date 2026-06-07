import { SCHEMA } from "./constants";
import type { JsonLdNode } from "./types";

export const globalSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": SCHEMA.organizationId,
      name: "Maroc 360 Agency",
      alternateName: "Maroc 360",
      url: "https://maroc360.agency",
      logo: {
        "@type": "ImageObject",
        url: SCHEMA.logoUrl,
        width: 512,
        height: 512,
      },
      image: SCHEMA.ogImageUrl,
      description: SCHEMA.description,
      telephone: SCHEMA.telephone,
      email: SCHEMA.email,
      address: {
        "@type": "PostalAddress",
        addressCountry: SCHEMA.address.addressCountry,
        addressLocality: SCHEMA.address.addressLocality,
        addressRegion: SCHEMA.address.addressRegion,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: SCHEMA.geo.latitude,
        longitude: SCHEMA.geo.longitude,
      },
      areaServed: SCHEMA.areaServed,
      priceRange: SCHEMA.priceRange,
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: SCHEMA.openingHours.dayOfWeek,
        opens: SCHEMA.openingHours.opens,
        closes: SCHEMA.openingHours.closes,
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: SCHEMA.telephone,
          contactType: "sales",
          areaServed: ["MA", "FR", "MENA"],
          availableLanguage: ["English", "French", "Arabic"],
        },
        {
          "@type": "ContactPoint",
          telephone: SCHEMA.telephone,
          contactType: "customer support",
          areaServed: ["MA"],
          availableLanguage: ["English", "French", "Arabic"],
        },
      ],
      sameAs: SCHEMA.sameAs,
      foundingDate: SCHEMA.foundingDate,
      knowsAbout: SCHEMA.knowsAbout,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: SCHEMA.aggregateRating.ratingValue,
        reviewCount: SCHEMA.aggregateRating.reviewCount,
        bestRating: SCHEMA.aggregateRating.bestRating,
        worstRating: SCHEMA.aggregateRating.worstRating,
      },
    },
    {
      "@type": "WebSite",
      "@id": SCHEMA.websiteId,
      url: "https://maroc360.agency",
      name: "Maroc 360 Agency",
      inLanguage: ["en", "fr"],
      publisher: { "@id": SCHEMA.organizationId },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://maroc360.agency/en/blog?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
} satisfies JsonLdNode;
