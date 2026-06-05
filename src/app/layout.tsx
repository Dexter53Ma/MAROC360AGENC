import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import { ViewTransition } from "react";
import "./globals.css";
import { ChatWidget } from "@/components/chat/chat-widget";
import { BackToTop } from "@/components/back-to-top";
import {
  MultiStepFormModal,
  MultiStepFormProvider,
} from "@/components/multi-step-form";
import { siteConfig } from "@/lib/site-config";
import { getDict } from "@/lib/i18n/dict";

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
  title: "Maroc 360 Agency | Your 360° digital marketing partner in Morocco",
  description:
    "Maroc 360 Agency is a full-service digital marketing agency based in Morocco. We help brands grow with strategy, creative, paid media, SEO, social, and content that delivers measurable results.",
  openGraph: {
    siteName: "Maroc 360 Agency",
    locale: "en_US",
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
  twitter: {
    card: "summary_large_image",
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

export default function RootLayout({
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
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[1100] focus:px-4 focus:py-2 focus:rounded-full focus:bg-text-primary focus:text-surface-primary focus:text-sm focus:font-semibold"
        >
          Skip to content
        </a>
        <MultiStepFormProvider>
          <ViewTransition>{children}</ViewTransition>
          <BackToTop dict={getDict("en").backToTop} />
          <ChatWidget />
          <MultiStepFormModal fallbackDict={getDict("en").multiStepForm} />
        </MultiStepFormProvider>
      </body>
    </html>
  );
}
