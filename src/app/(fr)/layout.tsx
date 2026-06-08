import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import { RootBody } from "@/components/root-body";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Maroc 360 Agency | Votre partenaire marketing digital 360° au Maroc",
    template: "%s | Maroc 360 Agency",
  },
  description:
    "Maroc 360 est une agence de marketing digital 360° basée au Maroc. Nous accompagnons les marques sur la stratégie, le créatif, la publicité payante, le SEO, les réseaux sociaux et le contenu — avec des résultats mesurables.",
  openGraph: {
    siteName: "Maroc 360 Agency",
    locale: "fr_FR",
    type: "website",
    url: siteConfig.url,
    images: [
      {
        url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/682d8b77bec4f672c42ac4d5_open-graph.jpg",
        width: 1200,
        height: 630,
        alt: "Maroc 360 Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  verification: {
    google: "IviR5xHUEAuisvRXP-ruirwwlREDkvvD8mMwRYKgw9M",
  },
  icons: {
    icon: [
      {
        url: "/seo/favicon.png",
        type: "image/png",
      },
    ],
    apple: "/seo/webclip.png",
  },
};

export default function FrRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface-primary text-text-primary font-sans overflow-x-hidden">
        <RootBody locale="fr">{children}</RootBody>
      </body>
    </html>
  );
}
