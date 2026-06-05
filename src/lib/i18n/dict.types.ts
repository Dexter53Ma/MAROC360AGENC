export type Locale = "en" | "fr";

export interface NavItemDict {
  readonly label: string;
  readonly href: string;
  readonly description: string;
  readonly iconKey:
    | "grid"
    | "compass"
    | "target"
    | "seo"
    | "users"
    | "sparkles"
    | "list"
    | "chart"
    | "case"
    | "pen"
    | "book"
    | "building"
    | "code";
}

export interface FeaturedCardDict {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly href: string;
  readonly cta: string;
}

export interface NavGroupDict {
  readonly label: string;
  readonly href: string;
  readonly mega: {
    readonly items: readonly NavItemDict[];
    readonly featured: FeaturedCardDict;
  };
}

export interface NavDict {
  readonly groups: readonly NavGroupDict[];
  readonly ctaLogIn: string;
  readonly ctaContact: string;
  readonly languageLabel: string;
  readonly menuLabel: string;
  readonly toggleMenuLabel: string;
  readonly toggleSubmenuAriaTemplate: string;
  readonly languageSwitcherAria: string;
  readonly logoAria: string;
}

export interface FooterColumnDict {
  readonly title: string;
  readonly links: ReadonlyArray<{ readonly label: string; readonly href: string }>;
}

export interface FooterDict {
  readonly tagline: string;
  readonly columns: readonly FooterColumnDict[];
  readonly socialLabel: string;
  readonly newsletterTitle: string;
  readonly newsletterDescription: string;
  readonly legalLinks: ReadonlyArray<{ readonly label: string; readonly href: string }>;
  readonly copyright: string;
  readonly backToTopLabel: string;
}

export interface CtaSectionDict {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly ctaPrimary: string;
  readonly ctaSecondary: string;
  readonly formTitle: string;
  readonly formPlaceholder: string;
  readonly formButton: string;
  readonly formSuccess: string;
  readonly formError: string;
  readonly formInvalidEmail: string;
  readonly formConsent: string;
  readonly skipToContent: string;
}

export interface EmailSubscribeDict {
  readonly title: string;
  readonly placeholder: string;
  readonly button: string;
  readonly success: string;
  readonly error: string;
  readonly invalidEmail: string;
  readonly consent: string;
}

export interface ChatWidgetDict {
  readonly title: string;
  readonly subtitle: string;
  readonly placeholder: string;
  readonly send: string;
  readonly openLabel: string;
  readonly closeLabel: string;
  readonly poweredBy: string;
  readonly greeting: string;
  readonly quickPrompts: readonly string[];
  readonly fallbackMessage: string;
  readonly typingLabel: string;
  readonly errorMessage: string;
  readonly conversationLimitMessage: string;
}

export interface BackToTopDict {
  readonly label: string;
}

export interface BlogBreadcrumbsDict {
  readonly home: string;
  readonly blog: string;
  readonly caseStudies: string;
  readonly guides: string;
  readonly industries: string;
  readonly services: string;
}

export interface BlogPostDict {
  readonly publishedOn: string;
  readonly by: string;
  readonly minReadTemplate: string;
  readonly minReadShort: string;
  readonly shareLabel: string;
  readonly shareOnLinkedIn: string;
  readonly shareOnX: string;
  readonly shareOnFacebook: string;
  readonly copyLink: string;
  readonly linkCopied: string;
  readonly relatedPostsTitle: string;
  readonly faqTitle: string;
  readonly backToBlog: string;
  readonly exploreMore: string;
  readonly notFoundTitle: string;
  readonly notFoundDescription: string;
  readonly backHome: string;
  readonly ctaTitle: string;
  readonly ctaDescription: string;
  readonly ctaButton: string;
  readonly tableOfContents: string;
  readonly readArticle: string;
  readonly categoryPillLabel: string;
  readonly categoryNotFoundTitle: string;
  readonly categoryNotFoundDescription: string;
  readonly categoryBrowseAll: string;
  readonly categoryEmptyText: string;
  readonly categoryCountTemplate: string;
  readonly categoryMetaTemplate: string;
}

export interface FilterTabsDict {
  readonly filterLabel: string;
  readonly allLabel: string;
  readonly viewAll: string;
  readonly searchPlaceholder: string;
  readonly categories: ReadonlyArray<{ readonly slug: string; readonly label: string }>;
}

export interface ContactDict {
  readonly title: string;
  readonly description: string;
  readonly nameLabel: string;
  readonly emailLabel: string;
  readonly companyLabel: string;
  readonly messageLabel: string;
  readonly submitButton: string;
  readonly successTitle: string;
  readonly successMessage: string;
  readonly errorMessage: string;
  readonly orEmail: string;
  readonly orCall: string;
  readonly responseTime: string;
  readonly required: string;
  readonly consentLabel: string;
  readonly subjectLabel: string;
  readonly subjectOptions: readonly string[];
  readonly budgetLabel: string;
  readonly budgetOptions: readonly string[];
  readonly heroTitle: string;
  readonly heroDescription: string;
  readonly trustpilotLabel: string;
  readonly whatsappLabel: string;
  readonly whyTitle: string;
  readonly features: readonly string[];
  readonly formFirstNameLabel: string;
  readonly formFirstNamePlaceholder: string;
  readonly formLastNameLabel: string;
  readonly formLastNamePlaceholder: string;
  readonly formEmailLabel: string;
  readonly formEmailPlaceholder: string;
  readonly formPhoneLabel: string;
  readonly formPhonePlaceholder: string;
  readonly formCompanyLabel: string;
  readonly formCompanyPlaceholder: string;
  readonly formTopicsLabel: string;
  readonly formTopics: readonly string[];
  readonly formSubmitLoading: string;
  readonly formSubmit: string;
  readonly formThanks: string;
  readonly formConsent: string;
  readonly numbersTitle: string;
  readonly stats: ReadonlyArray<{ readonly value: string; readonly body: string }>;
  readonly ctaTitle: string;
  readonly ctaDescription: string;
  readonly ctaButton: string;
  readonly logoStripHeading: string;
}

export interface CareersDict {
  readonly title: string;
  readonly description: string;
  readonly openPositions: string;
  readonly noOpenings: string;
  readonly lifeAtMaroc360: string;
  readonly valuesLabel: string;
  readonly applyCta: string;
  readonly benefits: string;
  readonly location: string;
  readonly type: string;
  readonly department: string;
  readonly shareRole: string;
  readonly contactRecruiting: string;
  readonly perksTitle: string;
  readonly cultureTitle: string;
  readonly heroHeading: string;
  readonly heroSubheading: string;
  readonly heroCta: string;
  readonly teamsHeading: string;
  readonly teamsSubheading: string;
  readonly teamsCta: string;
  readonly previousSlide: string;
  readonly nextSlide: string;
  readonly goToTeamTemplate: string;
  readonly valuesHeading: string;
  readonly values: ReadonlyArray<{ readonly title: string; readonly body: string }>;
  readonly interviewHeading: string;
  readonly interviewSubheading: string;
  readonly interviewSteps: readonly string[];
  readonly breadcrumbsLabel: string;
  readonly careersHref: string;
  readonly contactHref: string;
}

export interface WhyUsDict {
  readonly title: string;
  readonly subtitle: string;
  readonly commitmentsTitle: string;
  readonly valuesTitle: string;
  readonly numbersTitle: string;
  readonly manifestoTitle: string;
  readonly manifestoBody: string;
  readonly ctaTitle: string;
  readonly ctaDescription: string;
  readonly ctaButton: string;
  readonly heroHeading: string;
  readonly heroBody: string;
  readonly beliefsHeading: string;
  readonly beliefs: ReadonlyArray<{
    readonly title: string;
    readonly body: string;
    readonly image?: string;
    readonly imageAlt?: string;
    readonly reverse?: boolean;
  }>;
  readonly copilotsTitle: string;
  readonly copilotsBody: string;
  readonly copilotsCta: string;
  readonly commitmentsHeading: string;
  readonly commitments: ReadonlyArray<{
    readonly badge: string;
    readonly badgeAlt: string;
    readonly title: string;
    readonly body: string;
  }>;
  readonly previousCommitment: string;
  readonly nextCommitment: string;
  readonly investorsHeading: string;
  readonly investorsSubheading: string;
  readonly previousInvestor: string;
  readonly nextInvestor: string;
  readonly getStartedTitle: string;
  readonly getStartedBody: string;
  readonly getStartedCta: string;
  readonly careersLinkLabel: string;
  readonly careersHref: string;
  readonly contactHref: string;
}

export interface WhyUsDict {
  readonly title: string;
  readonly subtitle: string;
  readonly commitmentsTitle: string;
  readonly valuesTitle: string;
  readonly numbersTitle: string;
  readonly manifestoTitle: string;
  readonly manifestoBody: string;
  readonly ctaTitle: string;
  readonly ctaDescription: string;
  readonly ctaButton: string;
}

export interface CaseStudiesDict {
  readonly title: string;
  readonly subtitle: string;
  readonly challengeLabel: string;
  readonly approachLabel: string;
  readonly resultsLabel: string;
  readonly testimonialLabel: string;
  readonly ctaTitle: string;
  readonly ctaDescription: string;
}

export interface GuidesDict {
  readonly title: string;
  readonly subtitle: string;
  readonly downloadCta: string;
  readonly downloadTitle: string;
  readonly downloadDescription: string;
  readonly downloadButton: string;
  readonly relatedArticles: string;
  readonly minReadTemplate: string;
}

export interface IndustriesDict {
  readonly title: string;
  readonly subtitle: string;
  readonly learnMore: string;
  readonly caseStudyTeaserLabel: string;
  readonly relatedCaseStudies: string;
}

export interface ServicesDict {
  readonly title: string;
  readonly subtitle: string;
  readonly learnMore: string;
  readonly relatedServices: string;
  readonly whyDifferent: string;
  readonly ourProcess: string;
  readonly customersHeading: string;
  readonly customersSubheading: string;
  readonly testimonialAriaTemplate: string;
}

export interface LegalDict {
  readonly lastUpdated: string;
  readonly contactTitle: string;
  readonly contactDescription: string;
  readonly backToHome: string;
}

export interface CommonDict {
  readonly locale: Locale;
  readonly htmlLang: string;
  readonly skipToContent: string;
  readonly languageSwitcher: string;
  readonly errorBoundaryTitle: string;
  readonly errorBoundaryDescription: string;
  readonly errorBoundaryCta: string;
}

export interface Dict {
  readonly locale: Locale;
  readonly htmlLang: string;
  readonly nav: NavDict;
  readonly footer: FooterDict;
  readonly ctaSection: CtaSectionDict;
  readonly emailSubscribe: EmailSubscribeDict;
  readonly chatWidget: ChatWidgetDict;
  readonly backToTop: BackToTopDict;
  readonly blogBreadcrumbs: BlogBreadcrumbsDict;
  readonly blogPost: BlogPostDict;
  readonly filterTabs: FilterTabsDict;
  readonly contact: ContactDict;
  readonly careers: CareersDict;
  readonly whyUs: WhyUsDict;
  readonly caseStudies: CaseStudiesDict;
  readonly guides: GuidesDict;
  readonly industries: IndustriesDict;
  readonly services: ServicesDict;
  readonly legal: LegalDict;
  readonly home: HomePageDict;
  readonly multiStepForm: MultiStepFormDict;
}

export interface HomeFeatureItem {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly href: string;
  readonly image: string;
  readonly imageAlt: string;
}

export interface HomeFrameworkCard {
  readonly title: string;
  readonly description: string;
  readonly icon: string;
  readonly href: string;
}

export interface HomeExpertiseCard {
  readonly title: string;
  readonly description: string;
  readonly icon: string;
}

export interface HomeTestimonial {
  readonly quote: string;
  readonly name: string;
  readonly role: string;
  readonly avatar: string;
  readonly companyLogo: string;
}

export interface HomeBlogPreviewPost {
  readonly title: string;
  readonly thumbnail: string;
  readonly thumbnailAlt: string;
  readonly href: string;
  readonly category: string;
}

export interface HomeSeoAuditFormDict {
  readonly inputLabel: string;
  readonly placeholder: string;
  readonly idleButton: string;
  readonly loadingButton: string;
  readonly doneButton: string;
  readonly errorFallback: string;
  readonly loadingHint: string;
  readonly topIssuesHeading: string;
  readonly noIssues: string;
  readonly footerCategories: string;
  readonly footerPoweredBy: string;
  readonly auditedPagesTemplate: string;
  readonly gradeGood: string;
  readonly gradeOk: string;
  readonly gradeWarn: string;
  readonly gradeBad: string;
  readonly auditAnotherSiteLabel: string;
  readonly severityFailLabel: string;
  readonly severityWarnLabel: string;
}

export interface MultiStepFormServiceOption {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: string;
}

export interface MultiStepFormBudgetOption {
  readonly id: string;
  readonly label: string;
  readonly description: string;
}

export interface MultiStepFormGoalOption {
  readonly id: string;
  readonly label: string;
}

export interface MultiStepFormDict {
  readonly triggerLabel: string;
  readonly title: string;
  readonly subtitle: string;
  readonly stepIndicatorTemplate: string;
  readonly stepLabelTemplate: string;
  readonly back: string;
  readonly next: string;
  readonly send: string;
  readonly closeAria: string;
  readonly summaryTitle: string;
  readonly summaryIntro: string;
  readonly summaryServiceLabel: string;
  readonly summaryBudgetLabel: string;
  readonly summaryGoalsLabel: string;
  readonly summaryContactLabel: string;
  readonly summaryMessageLabel: string;
  readonly summaryNotSelected: string;
  readonly summaryGoalsSeparator: string;
  readonly fields: {
    readonly firstName: string;
    readonly firstNamePlaceholder: string;
    readonly lastName: string;
    readonly lastNamePlaceholder: string;
    readonly email: string;
    readonly emailPlaceholder: string;
    readonly phone: string;
    readonly phonePlaceholder: string;
    readonly company: string;
    readonly companyPlaceholder: string;
    readonly message: string;
    readonly messagePlaceholder: string;
  };
  readonly consent: string;
  readonly whatsappPrefix: string;
  readonly servicesTitle: string;
  readonly servicesSubtitle: string;
  readonly services: readonly MultiStepFormServiceOption[];
  readonly budgetTitle: string;
  readonly budgetSubtitle: string;
  readonly budgets: readonly MultiStepFormBudgetOption[];
  readonly goalsTitle: string;
  readonly goalsSubtitle: string;
  readonly goals: readonly MultiStepFormGoalOption[];
  readonly contactTitle: string;
  readonly contactSubtitle: string;
  readonly successTitle: string;
  readonly successBody: string;
  readonly validationRequired: string;
  readonly validationEmail: string;
  readonly validationPhone: string;
}

export interface HomePageDict {
  readonly hero: {
    readonly heading: string;
    readonly subheading: string;
    readonly rating: string;
    readonly contactLink: string;
    readonly seoAuditForm: HomeSeoAuditFormDict;
  };
  readonly logoStrip: {
    readonly heading: string;
    readonly caseStudyLabel: string;
  };
  readonly frameworks: {
    readonly heading: string;
    readonly cards: readonly HomeFrameworkCard[];
  };
  readonly intro: {
    readonly heading: string;
    readonly body: string;
  };
  readonly features: readonly HomeFeatureItem[];
  readonly expertise: {
    readonly heading: string;
    readonly body: string;
    readonly buttonLabel: string;
    readonly previousSlide: string;
    readonly nextSlide: string;
    readonly cards: readonly HomeExpertiseCard[];
  };
  readonly testimonials: {
    readonly heading: string;
    readonly body: string;
    readonly readMore: string;
    readonly previousSlide: string;
    readonly nextSlide: string;
    readonly cards: readonly HomeTestimonial[];
  };
  readonly blogPreview: {
    readonly heading: string;
    readonly readArticle: string;
    readonly posts: readonly HomeBlogPreviewPost[];
  };
  readonly learnMore: string;
}
