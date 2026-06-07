export interface JsonLdNode {
  readonly [key: string]: unknown;
}

export interface BreadcrumbItem {
  readonly name: string;
  readonly item: string;
}

export interface ServiceSchemaInput {
  readonly id?: string;
  readonly name: string;
  readonly description: string;
  readonly url: string;
  readonly serviceType: string;
  readonly inLanguage: "en" | "fr";
  readonly category?: string;
}

export interface WebPageSchemaInput {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly url: string;
  readonly inLanguage: "en" | "fr";
  readonly type?:
    | "WebPage"
    | "ContactPage"
    | "AboutPage"
    | "CollectionPage"
    | "ProfilePage";
}
