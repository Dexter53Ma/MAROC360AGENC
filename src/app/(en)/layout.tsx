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
  title: "Maroc 360 Agency | 360° digital marketing in Morocco",
  description:
    "Full-service digital marketing agency in Morocco. Strategy, paid media, SEO, social, and content that drives measurable growth.",
  openGraph: {
    siteName: "Maroc 360 Agency",
    locale: "en_US",
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

export default function EnRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface-primary text-text-primary font-sans overflow-x-hidden">
        <RootBody locale="en">{children}</RootBody>
      </body>
    </html>
  );
}
