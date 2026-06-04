export interface FrameworkCard {
  readonly title: string;
  readonly description: string;
  readonly icon: string;
  readonly href: string;
}

export interface CompanyLogo {
  readonly name: string;
  readonly logo: string;
  readonly href: string;
  readonly caseStudy?: boolean;
}

export interface FeatureItem {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly href: string;
  readonly image: string;
  readonly imageAlt?: string;
  readonly reverse: boolean;
}

export interface ExpertiseCard {
  readonly title: string;
  readonly description: string;
  readonly icon: string;
}

export interface Testimonial {
  readonly quote: string;
  readonly name: string;
  readonly role: string;
  readonly avatar: string;
  readonly companyLogo: string;
}

export interface BlogPost {
  readonly title: string;
  readonly thumbnail: string;
  readonly thumbnailAlt: string;
  readonly href: string;
}

export interface NavGroup {
  readonly label: string;
  readonly items: ReadonlyArray<{ readonly label: string; readonly href: string }>;
}

export interface FooterColumn {
  readonly title: string;
  readonly links: ReadonlyArray<{ readonly label: string; readonly href: string }>;
}
