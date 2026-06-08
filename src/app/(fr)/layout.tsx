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
    locale: "fr_MA",
    type: "website",
    url: `${siteConfig.url}/fr`,
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
    site: "@maroc360",
    creator: "@maroc360",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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

export function Head() {
  return (
    <>
      <link rel="preconnect" href="https://cdn.prod.website-files.com" />
      <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      <link rel="llms" href="/llms.txt" />
      <link rel="alternate" href="/llms.txt" type="text/plain" title="llms.txt" />
    </>
  );
}

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
