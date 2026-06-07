import { SCHEMA } from "./constants";
import { absoluteUrl } from "@/lib/site-config";
import type { JsonLdNode } from "./types";

export interface BlogPostingInput {
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly imageAlt?: string;
  readonly datePublished: string;
  readonly dateModified?: string;
  readonly inLanguage: "en" | "fr";
  readonly authorName: string;
  readonly category?: string;
  readonly keywords?: string;
  readonly wordCount?: number;
  readonly timeRequired?: string;
  readonly url: string;
}

export function blogPostingSchema(input: BlogPostingInput): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    image: [input.image],
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    inLanguage: input.inLanguage,
    author: {
      "@type": "Organization",
      name: input.authorName,
      url: "https://maroc360.agency",
    },
    publisher: {
      "@type": "Organization",
      "@id": SCHEMA.organizationId,
      name: "Maroc 360 Agency",
      logo: {
        "@type": "ImageObject",
        url: SCHEMA.logoUrl,
        width: 512,
        height: 512,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": input.url,
    },
    articleSection: input.category,
    keywords: input.keywords,
    wordCount: input.wordCount,
    timeRequired: input.timeRequired,
  };
}

export function faqSchema(
  faqs: ReadonlyArray<{ readonly question: string; readonly answer: string }>,
): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export { absoluteUrl };
