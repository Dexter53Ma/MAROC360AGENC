import type { Metadata } from "next";
import type { ViewTransition } from "react";
import { siteConfig } from "@/lib/site-config";
import { getDict } from "@/lib/i18n/dict";

export const metadata: Metadata = {
  title: {
    default: "Maroc 360 Agency | Votre partenaire marketing digital 360° au Maroc",
    template: "%s | Maroc 360 Agency",
  },
  description:
    "Maroc 360 est une agence de marketing digital 360° basée au Maroc. Nous accompagnons les marques sur la stratégie, le créatif, la publicité payante, le SEO, les réseaux sociaux et le contenu — avec des résultats mesurables.",
  alternates: {
    canonical: `${siteConfig.url}/fr`,
    languages: {
      en: `${siteConfig.url}/en`,
      fr: `${siteConfig.url}/fr`,
      "x-default": `${siteConfig.url}/en`,
    },
  },
  openGraph: {
    siteName: "Maroc 360 Agency",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/682d8b77bec4f672c42ac4d5_open-graph.jpg",
        width: 1200,
        height: 630,
        alt: "Maroc 360 Agency",
      },
    ],
  },
};

export default function FrLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
