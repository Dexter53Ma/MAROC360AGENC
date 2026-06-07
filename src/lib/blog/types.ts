export interface BlogFrontmatter {
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly category: string;
  readonly featured?: boolean;
  readonly datePublished: string;
  readonly dateModified?: string;
  readonly author: string;
  readonly authorRole: string;
  readonly tags: readonly string[];
}

export interface BlogFaq {
  readonly question: string;
  readonly answer: string;
}

export interface BlogPostFull {
  readonly slug: string;
  readonly locale: "en" | "fr";
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly category: string;
  readonly featured: boolean;
  readonly datePublished: string;
  readonly datePublishedLabel: string;
  readonly dateModified: string;
  readonly author: string;
  readonly authorRole: string;
  readonly tags: readonly string[];
  readonly readingTimeMinutes: number;
  readonly wordCount: number;
  readonly bodyHtml: string;
  readonly faqs: readonly BlogFaq[];
  readonly href: string;
}

export interface BlogPostSummary {
  readonly slug: string;
  readonly locale: "en" | "fr";
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly category: string;
  readonly featured: boolean;
  readonly datePublished: string;
  readonly datePublishedLabel: string;
  readonly dateModified: string;
  readonly readingTimeMinutes: number;
  readonly href: string;
}
