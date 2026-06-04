import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";

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
  title: "Maroc 360 Agency | Your 360° digital marketing partner in Morocco",
  description:
    "Maroc 360 Agency is a full-service digital marketing agency based in Morocco. We help brands grow with strategy, creative, paid media, SEO, social, and content that delivers measurable results.",
  openGraph: {
    title: "Maroc 360 Agency | Your 360° digital marketing partner in Morocco",
    description:
      "Maroc 360 Agency is a full-service digital marketing agency based in Morocco. We help brands grow with strategy, creative, paid media, SEO, social, and content that delivers measurable results.",
    images: [
      {
        url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/682d8b77bec4f672c42ac4d5_open-graph.jpg",
        width: 1200,
        height: 630,
        alt: "Maroc 360 Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maroc 360 Agency | Your 360° digital marketing partner in Morocco",
    description:
      "Maroc 360 Agency is a full-service digital marketing agency based in Morocco. We help brands grow with strategy, creative, paid media, SEO, social, and content that delivers measurable results.",
  },
  icons: {
    icon: [
      {
        url: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/682d8b3688bd2099bac4628b_favicon.png",
        type: "image/png",
      },
    ],
    apple: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/682d8b38c92588c26172148c_webclip.png",
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
        {children}
      </body>
    </html>
  );
}
