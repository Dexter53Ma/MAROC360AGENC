export interface BlogPost {
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly href: string;
  readonly category: string;
  readonly featured?: boolean;
}
