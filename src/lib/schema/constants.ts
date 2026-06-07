import { siteConfig } from "@/lib/site-config";

export const SCHEMA = {
  organizationId: `${siteConfig.url}/#organization`,
  websiteId: `${siteConfig.url}/#website`,
  logoUrl: `${siteConfig.url}${siteConfig.publisher.logo}`,
  ogImageUrl: siteConfig.ogImage,
  description: siteConfig.description,
  telephone: "+212-621-947493",
  email: siteConfig.contact.email,
  whatsapp: siteConfig.whatsapp.display,
  address: {
    streetAddress: "",
    addressLocality: "Casablanca",
    addressRegion: "Casablanca-Settat",
    postalCode: "",
    addressCountry: "MA",
  },
  geo: {
    latitude: 33.5731,
    longitude: -7.5898,
  },
  openingHours: {
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  areaServed: [
    { "@type": "Country", name: "Morocco" },
    { "@type": "AdministrativeArea", name: "MENA" },
    { "@type": "Country", name: "France" },
  ],
  sameAs: [
    siteConfig.social.linkedin,
    siteConfig.social.instagram,
    siteConfig.social.facebook,
  ],
  knowsAbout: [
    "Digital Marketing",
    "Search Engine Optimization",
    "Paid Media",
    "Social Media Marketing",
    "Content Strategy",
    "Brand Strategy",
    "Performance Marketing",
  ],
  foundingDate: "2024",
  priceRange: "$$",
  aggregateRating: {
    ratingValue: "4.9",
    reviewCount: "47",
    bestRating: "5",
    worstRating: "1",
  },
} as const;
