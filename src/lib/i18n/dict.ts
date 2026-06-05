import type { Dict, Locale, NavDict, FooterDict, CtaSectionDict, EmailSubscribeDict, ChatWidgetDict, BackToTopDict, BlogBreadcrumbsDict, BlogPostDict, FilterTabsDict, ContactDict, CareersDict, WhyUsDict, CaseStudiesDict, GuidesDict, IndustriesDict, ServicesDict, LegalDict, HomePageDict, MultiStepFormDict } from "./dict.types";

const navEN: NavDict = {
  groups: [
    {
      label: "Services",
      href: "/en/services",
      mega: {
        items: [
          { label: "Management system", href: "/en/services/management-system", description: "One workspace for every campaign, channel, and result.", iconKey: "grid" },
          { label: "Strategy & Planning", href: "/en/services/strategy-planning", description: "Roadmaps and playbooks tailored to your goals.", iconKey: "compass" },
          { label: "Paid Media", href: "/en/services/paid-media", description: "Profitable campaigns across Google, Meta, and TikTok.", iconKey: "target" },
          { label: "SEO & Content", href: "/en/services/seo-content", description: "Rank, attract, and convert with search-first content.", iconKey: "seo" },
          { label: "Social Media", href: "/en/services/social-media", description: "Build community and grow revenue on social.", iconKey: "users" },
          { label: "Creative Studio", href: "/en/services/creative-studio", description: "Branding, motion, and campaigns that earn attention.", iconKey: "sparkles" },
        ],
        featured: {
          eyebrow: "New",
          title: "2026 Marketing Playbook",
          description: "Our annual guide to growth in Morocco — strategy, channels, and budgets.",
          href: "/en/guides/2026-marketing-playbook",
          cta: "Read the playbook",
        },
      },
    },
    {
      label: "Blog",
      href: "/en/blog",
      mega: {
        items: [
          { label: "All articles", href: "/en/blog", description: "Every post, in one place.", iconKey: "list" },
          { label: "Strategy", href: "/en/blog/category/strategy", description: "Playbooks, frameworks, and CMO insights.", iconKey: "compass" },
          { label: "Paid Media", href: "/en/blog/category/paid-media", description: "Google, Meta, TikTok — what works in 2026.", iconKey: "target" },
          { label: "SEO", href: "/en/blog/category/seo", description: "Rank locally and beyond, in three languages.", iconKey: "seo" },
          { label: "Social Media", href: "/en/blog/category/social", description: "Voices, formats, and frequency that grow.", iconKey: "users" },
          { label: "Case Studies", href: "/en/case-studies", description: "Real campaigns, real numbers, real wins.", iconKey: "chart" },
        ],
        featured: {
          eyebrow: "Featured",
          title: "How to Build a Digital Marketing Strategy in Morocco",
          description: "Audience research, channel mix, KPIs, and budget — a 2026 playbook.",
          href: "/en/blog/digital-marketing-strategy-morocco",
          cta: "Read the article",
        },
      },
    },
    { label: "Why us", href: "/en/why-us", mega: { items: [], featured: { eyebrow: "", title: "", description: "", href: "", cta: "" } } },
    { label: "Careers", href: "/en/careers", mega: { items: [], featured: { eyebrow: "", title: "", description: "", href: "", cta: "" } } },
  ],
  ctaLogIn: "Choose your service",
  ctaContact: "Contact us",
  languageLabel: "Language",
  menuLabel: "Menu",
  toggleMenuLabel: "Toggle menu",
  toggleSubmenuAriaTemplate: "Toggle {label} submenu",
  languageSwitcherAria: "Language switcher",
  logoAria: "Maroc 360 Agency home",
};

const navFR: NavDict = {
  groups: [
    {
      label: "Services",
      href: "/fr/services",
      mega: {
        items: [
          { label: "Plateforme marketing", href: "/fr/services/management-system", description: "Un espace de travail pour chaque campagne, canal et résultat.", iconKey: "grid" },
          { label: "Stratégie & Planning", href: "/fr/services/strategy-planning", description: "Feuilles de route et playbooks adaptés à vos objectifs.", iconKey: "compass" },
          { label: "Publicité payante", href: "/fr/services/paid-media", description: "Campagnes rentables sur Google, Meta et TikTok.", iconKey: "target" },
          { label: "SEO & Contenu", href: "/fr/services/seo-content", description: "Positionnez-vous, attirez et convertissez avec du contenu orienté recherche.", iconKey: "seo" },
          { label: "Réseaux sociaux", href: "/fr/services/social-media", description: "Construisez une communauté et générez du chiffre d'affaires.", iconKey: "users" },
          { label: "Studio créatif", href: "/fr/services/creative-studio", description: "Branding, motion et campagnes qui retiennent l'attention.", iconKey: "sparkles" },
        ],
        featured: {
          eyebrow: "Nouveau",
          title: "Playbook Marketing 2026",
          description: "Notre guide annuel de croissance au Maroc — stratégie, canaux et budgets.",
          href: "/fr/guides/2026-marketing-playbook",
          cta: "Lire le playbook",
        },
      },
    },
    {
      label: "Blog",
      href: "/fr/blog",
      mega: {
        items: [
          { label: "Tous les articles", href: "/fr/blog", description: "Tous nos articles, au même endroit.", iconKey: "list" },
          { label: "Stratégie", href: "/fr/blog/category/strategy", description: "Playbooks, frameworks et retours d'expérience CMO.", iconKey: "compass" },
          { label: "Publicité payante", href: "/fr/blog/category/paid-media", description: "Google, Meta, TikTok — ce qui marche en 2026.", iconKey: "target" },
          { label: "SEO", href: "/fr/blog/category/seo", description: "Positionnez-vous localement et au-delà, en trois langues.", iconKey: "seo" },
          { label: "Réseaux sociaux", href: "/fr/blog/category/social", description: "Voix, formats et fréquence qui font grandir.", iconKey: "users" },
          { label: "Études de cas", href: "/fr/case-studies", description: "Campagnes réelles, chiffres réels, résultats réels.", iconKey: "chart" },
        ],
        featured: {
          eyebrow: "À la une",
          title: "Comment construire une stratégie de marketing digital au Maroc",
          description: "Recherche d'audience, mix de canaux, KPI et budget — un playbook 2026.",
          href: "/fr/blog/digital-marketing-strategy-morocco",
          cta: "Lire l'article",
        },
      },
    },
    { label: "Pourquoi nous", href: "/fr/why-us", mega: { items: [], featured: { eyebrow: "", title: "", description: "", href: "", cta: "" } } },
    { label: "Carrières", href: "/fr/careers", mega: { items: [], featured: { eyebrow: "", title: "", description: "", href: "", cta: "" } } },
  ],
  ctaLogIn: "Choisissez votre service",
  ctaContact: "Nous contacter",
  languageLabel: "Langue",
  menuLabel: "Menu",
  toggleMenuLabel: "Ouvrir le menu",
  toggleSubmenuAriaTemplate: "Ouvrir le sous-menu {label}",
  languageSwitcherAria: "Sélecteur de langue",
  logoAria: "Accueil Maroc 360 Agency",
};

const footerEN: FooterDict = {
  tagline: "Your 360° digital marketing partner in Morocco.",
  columns: [
    { title: "Services", links: [
      { label: "Marketing platform", href: "/en/services/management-system" },
      { label: "Strategy & Planning", href: "/en/services/strategy-planning" },
      { label: "Paid Media", href: "/en/services/paid-media" },
      { label: "SEO & Content", href: "/en/services/seo-content" },
      { label: "Social Media", href: "/en/services/social-media" },
      { label: "Creative Studio", href: "/en/services/creative-studio" },
    ]},
    { title: "Industries", links: [
      { label: "E-commerce", href: "/en/industries/ecommerce" },
      { label: "Hospitality & Travel", href: "/en/industries/hospitality-travel" },
      { label: "Real Estate", href: "/en/industries/real-estate" },
      { label: "Professional Services", href: "/en/industries/professional-services" },
    ]},
    { title: "Resources", links: [
      { label: "Blog", href: "/en/blog" },
      { label: "Case Studies", href: "/en/case-studies" },
      { label: "Guides", href: "/en/guides" },
      { label: "2026 Playbook", href: "/en/guides/2026-marketing-playbook" },
    ]},
    { title: "Company", links: [
      { label: "Why us", href: "/en/why-us" },
      { label: "Careers", href: "/en/careers" },
      { label: "Contact", href: "/en/contact" },
    ]},
  ],
  socialLabel: "Follow us",
  newsletterTitle: "Get the weekly brief",
  newsletterDescription: "One email a week. Practical, Morocco-specific marketing insights you can use on Monday.",
  legalLinks: [
    { label: "Privacy", href: "/en/privacy" },
    { label: "Terms", href: "/en/terms" },
  ],
  copyright: "© 2026 Maroc 360 Agency. All rights reserved.",
  backToTopLabel: "Back to top",
};

const footerFR: FooterDict = {
  tagline: "Votre partenaire marketing digital 360° au Maroc.",
  columns: [
    { title: "Services", links: [
      { label: "Plateforme marketing", href: "/fr/services/management-system" },
      { label: "Stratégie & Planning", href: "/fr/services/strategy-planning" },
      { label: "Publicité payante", href: "/fr/services/paid-media" },
      { label: "SEO & Contenu", href: "/fr/services/seo-content" },
      { label: "Réseaux sociaux", href: "/fr/services/social-media" },
      { label: "Studio créatif", href: "/fr/services/creative-studio" },
    ]},
    { title: "Secteurs", links: [
      { label: "E-commerce", href: "/fr/industries/ecommerce" },
      { label: "Hôtellerie & Voyage", href: "/fr/industries/hospitality-travel" },
      { label: "Immobilier", href: "/fr/industries/real-estate" },
      { label: "Services professionnels", href: "/fr/industries/professional-services" },
    ]},
    { title: "Ressources", links: [
      { label: "Blog", href: "/fr/blog" },
      { label: "Études de cas", href: "/fr/case-studies" },
      { label: "Guides", href: "/fr/guides" },
      { label: "Playbook 2026", href: "/fr/guides/2026-marketing-playbook" },
    ]},
    { title: "À propos", links: [
      { label: "Pourquoi nous", href: "/fr/why-us" },
      { label: "Carrières", href: "/fr/careers" },
      { label: "Contact", href: "/fr/contact" },
    ]},
  ],
  socialLabel: "Suivez-nous",
  newsletterTitle: "Recevez la brief hebdo",
  newsletterDescription: "Un email par semaine. Des insights marketing concrets et adaptés au Maroc, à utiliser dès le lundi.",
  legalLinks: [
    { label: "Confidentialité", href: "/fr/privacy" },
    { label: "Conditions", href: "/fr/terms" },
  ],
  copyright: "© 2026 Maroc 360 Agency. Tous droits réservés.",
  backToTopLabel: "Retour en haut",
};

const ctaSectionEN: CtaSectionDict = {
  eyebrow: "Let's build something",
  title: "Ready to grow with intention?",
  description: "Tell us about your goals. We'll come back within one business day with a clear, opinionated plan for how we'd help you get there.",
  ctaPrimary: "Book a 30-min intro",
  ctaSecondary: "See our work",
  formTitle: "Run a free SEO audit",
  formPlaceholder: "your-website.com",
  formButton: "Run audit",
  formSuccess: "Audit sent. Check your inbox in a few minutes.",
  formError: "Something went wrong. Please try again.",
  formInvalidEmail: "Please enter a valid URL (e.g. yourbrand.com).",
  formConsent: "By submitting, you agree to our privacy policy.",
  skipToContent: "Skip to content",
};

const ctaSectionFR: CtaSectionDict = {
  eyebrow: "Construisons ensemble",
  title: "Prêt à grandir avec intention ?",
  description: "Parlez-nous de vos objectifs. Nous revenons vers vous sous un jour ouvré avec un plan clair et tranché pour vous aider à y arriver.",
  ctaPrimary: "Réserver 30 min",
  ctaSecondary: "Voir nos réalisations",
  formTitle: "Audit SEO gratuit",
  formPlaceholder: "votre-site.com",
  formButton: "Lancer l'audit",
  formSuccess: "Audit envoyé. Consultez votre boîte mail dans quelques minutes.",
  formError: "Une erreur est survenue. Veuillez réessayer.",
  formInvalidEmail: "Veuillez entrer une URL valide (ex. votre-marque.com).",
  formConsent: "En soumettant, vous acceptez notre politique de confidentialité.",
  skipToContent: "Aller au contenu",
};

const emailSubscribeEN: EmailSubscribeDict = {
  title: "Get the weekly brief",
  placeholder: "you@company.com",
  button: "Subscribe",
  success: "Thanks! Check your inbox to confirm.",
  error: "Something went wrong. Please try again.",
  invalidEmail: "Please enter a valid email address.",
  consent: "By subscribing, you agree to our privacy policy.",
};

const emailSubscribeFR: EmailSubscribeDict = {
  title: "La brief hebdomadaire",
  placeholder: "vous@entreprise.com",
  button: "S'abonner",
  success: "Merci ! Consultez votre boîte mail pour confirmer.",
  error: "Une erreur est survenue. Veuillez réessayer.",
  invalidEmail: "Veuillez entrer une adresse email valide.",
  consent: "En vous abonnant, vous acceptez notre politique de confidentialité.",
};

const chatWidgetEN: ChatWidgetDict = {
  title: "Maroc 360 Assistant",
  subtitle: "Ask anything about our services, work, or Morocco marketing.",
  placeholder: "Type your question…",
  send: "Send",
  openLabel: "Open chat",
  closeLabel: "Close chat",
  poweredBy: "Powered by Maroc 360 knowledge base",
  greeting: "Hi 👋 I'm the Maroc 360 assistant. Ask me about our services, case studies, or anything about marketing in Morocco.",
  quickPrompts: [
    "What services do you offer?",
    "How do you price a project?",
    "Do you work with e-commerce brands?",
  ],
  fallbackMessage: "I'm not sure I have a great answer for that. Try asking about our services, case studies, or industries. Or reach out at Contact@maroc360.agency.",
  typingLabel: "Maroc 360 is typing…",
  errorMessage: "Sorry, something went wrong. Please try again.",
  conversationLimitMessage: "We've reached the conversation limit. Please reach out at Contact@maroc360.agency for more.",
};

const chatWidgetFR: ChatWidgetDict = {
  title: "Assistant Maroc 360",
  subtitle: "Posez vos questions sur nos services, nos références ou le marketing au Maroc.",
  placeholder: "Tapez votre question…",
  send: "Envoyer",
  openLabel: "Ouvrir le chat",
  closeLabel: "Fermer le chat",
  poweredBy: "Propulsé par la base de connaissances Maroc 360",
  greeting: "Bonjour 👋 Je suis l'assistant Maroc 360. Posez-moi vos questions sur nos services, nos études de cas ou le marketing au Maroc.",
  quickPrompts: [
    "Quels services proposez-vous ?",
    "Comment tarifez-vous un projet ?",
    "Travaillez-vous avec des marques e-commerce ?",
  ],
  fallbackMessage: "Je ne suis pas sûr d'avoir une bonne réponse. Essayez de demander nos services, études de cas ou secteurs. Ou contactez-nous à Contact@maroc360.agency.",
  typingLabel: "Maroc 360 est en train d'écrire…",
  errorMessage: "Désolé, une erreur est survenue. Veuillez réessayer.",
  conversationLimitMessage: "Nous avons atteint la limite de la conversation. Contactez-nous à Contact@maroc360.agency pour aller plus loin.",
};

const backToTopEN: BackToTopDict = { label: "Back to top" };
const backToTopFR: BackToTopDict = { label: "Retour en haut" };

const blogBreadcrumbsEN: BlogBreadcrumbsDict = {
  home: "Home", blog: "Blog", caseStudies: "Case studies", guides: "Guides", industries: "Industries", services: "Services",
};
const blogBreadcrumbsFR: BlogBreadcrumbsDict = {
  home: "Accueil", blog: "Blog", caseStudies: "Études de cas", guides: "Guides", industries: "Secteurs", services: "Services",
};

const blogPostEN: BlogPostDict = {
  publishedOn: "Published on",
  by: "by",
  minReadTemplate: "{n} min read",
  minReadShort: "min",
  shareLabel: "Share this article",
  shareOnLinkedIn: "Share on LinkedIn",
  shareOnX: "Share on X",
  shareOnFacebook: "Share on Facebook",
  copyLink: "Copy link",
  linkCopied: "Link copied!",
  relatedPostsTitle: "Related articles",
  faqTitle: "Frequently asked questions",
  backToBlog: "Back to all articles",
  exploreMore: "Explore more",
  notFoundTitle: "Article not found",
  notFoundDescription: "The article you're looking for doesn't exist or has been moved.",
  backHome: "Back to home",
  ctaTitle: "Want this kind of growth for your brand?",
  ctaDescription: "We work with ambitious Moroccan brands on strategy, paid media, SEO, content, social, and creative. Tell us about your goals.",
  ctaButton: "Book a 30-min intro",
  tableOfContents: "In this article",
  readArticle: "Read article",
  categoryPillLabel: "Category",
  categoryNotFoundTitle: "Category not found",
  categoryNotFoundDescription: "The category you're looking for doesn't exist or has been moved.",
  categoryBrowseAll: "Browse all articles",
  categoryEmptyText: "No articles in this category yet.",
  categoryCountTemplate: "{n} {items} on {label} from the Maroc 360 team.",
  categoryMetaTemplate: "{n} {items} on {label} from the Maroc 360 team — frameworks, playbooks, and practical guides for marketers in Morocco.",
};

const blogPostFR: BlogPostDict = {
  publishedOn: "Publié le",
  by: "par",
  minReadTemplate: "{n} min de lecture",
  minReadShort: "min",
  shareLabel: "Partager cet article",
  shareOnLinkedIn: "Partager sur LinkedIn",
  shareOnX: "Partager sur X",
  shareOnFacebook: "Partager sur Facebook",
  copyLink: "Copier le lien",
  linkCopied: "Lien copié !",
  relatedPostsTitle: "Articles liés",
  faqTitle: "Questions fréquentes",
  backToBlog: "Retour aux articles",
  exploreMore: "En savoir plus",
  notFoundTitle: "Article introuvable",
  notFoundDescription: "L'article que vous cherchez n'existe pas ou a été déplacé.",
  backHome: "Retour à l'accueil",
  ctaTitle: "Vous voulez ce type de croissance pour votre marque ?",
  ctaDescription: "Nous accompagnons des marques marocaines ambitieuses sur la stratégie, la publicité payante, le SEO, le contenu, les réseaux sociaux et le créatif. Parlez-nous de vos objectifs.",
  ctaButton: "Réserver 30 min",
  tableOfContents: "Dans cet article",
  readArticle: "Lire l'article",
  categoryPillLabel: "Catégorie",
  categoryNotFoundTitle: "Catégorie introuvable",
  categoryNotFoundDescription: "La catégorie que vous cherchez n'existe pas ou a été déplacée.",
  categoryBrowseAll: "Parcourir tous les articles",
  categoryEmptyText: "Aucun article dans cette catégorie pour l'instant.",
  categoryCountTemplate: "{n} {items} sur {label} par l'équipe Maroc 360.",
  categoryMetaTemplate: "{n} {items} sur {label} par l'équipe Maroc 360 — cadres, playbooks et guides pratiques pour les marketeurs au Maroc.",
};

const filterTabsEN: FilterTabsDict = {
  filterLabel: "Filter by category",
  allLabel: "All",
  viewAll: "View all",
  searchPlaceholder: "Search articles…",
  categories: [
    { slug: "strategy", label: "Strategy" },
    { slug: "paid-media", label: "Paid Media" },
    { slug: "seo", label: "SEO" },
    { slug: "social", label: "Social" },
    { slug: "branding", label: "Branding" },
  ],
};

const filterTabsFR: FilterTabsDict = {
  filterLabel: "Filtrer par catégorie",
  allLabel: "Tout",
  viewAll: "Tout voir",
  searchPlaceholder: "Rechercher des articles…",
  categories: [
    { slug: "strategy", label: "Stratégie" },
    { slug: "paid-media", label: "Publicité payante" },
    { slug: "seo", label: "SEO" },
    { slug: "social", label: "Réseaux sociaux" },
    { slug: "branding", label: "Branding" },
  ],
};

const contactEN: ContactDict = {
  title: "Let's talk growth",
  description: "Tell us about your brand, your goals, and the problems you're trying to solve. We'll come back within one business day with a clear next step.",
  nameLabel: "Your name",
  emailLabel: "Work email",
  companyLabel: "Company / brand",
  messageLabel: "What can we help with?",
  submitButton: "Send message",
  successTitle: "Thanks — message received",
  successMessage: "We'll be in touch within one business day. In the meantime, feel free to explore our work.",
  errorMessage: "Something went wrong. Please try again or email us at Contact@maroc360.agency.",
  orEmail: "Or email us directly",
  orCall: "Or call us",
  responseTime: "We respond within 1 business day",
  required: "Required",
  consentLabel: "I agree to be contacted about my inquiry",
  subjectLabel: "What can we help with?",
  subjectOptions: ["Strategy & planning", "Paid media", "SEO & content", "Social media", "Creative & branding", "Marketing platform", "Other"],
  budgetLabel: "Monthly budget",
  budgetOptions: ["< 20 000 MAD", "20 000 – 50 000 MAD", "50 000 – 150 000 MAD", "150 000 MAD +", "Not sure yet"],
  heroTitle: "Get in touch",
  heroDescription: "Tell us about your project. We typically reply within 24 hours.",
  trustpilotLabel: "on Trustpilot",
  whatsappLabel: "WhatsApp",
  whyTitle: "Why teams reach out:",
  features: [
    "Free 30-min strategy call",
    "Tailored proposal within 48h",
    "No long-term contracts",
    "Dedicated account manager",
  ],
  formFirstNameLabel: "First name",
  formFirstNamePlaceholder: "John",
  formLastNameLabel: "Last name",
  formLastNamePlaceholder: "Doe",
  formEmailLabel: "Email",
  formEmailPlaceholder: "john@acme.com",
  formPhoneLabel: "Phone number",
  formPhonePlaceholder: "+212 6 12 34 56 78",
  formCompanyLabel: "Company name",
  formCompanyPlaceholder: "Acme",
  formTopicsLabel: "Which services are you interested in?",
  formTopics: ["Strategy", "Paid Media", "SEO", "Content", "Social Media", "Other"],
    formSubmit: "Send via WhatsApp",
    formSubmitLoading: "Sending.",
    formThanks: "Opening WhatsApp!",
  formConsent: "By submitting this form you agree to our privacy policy. We'll only use your details to follow up about your enquiry.",
  numbersTitle: "Our impact",
  stats: [
    { value: "150+", body: "brands served across Morocco, France, and the wider MENA region" },
    { value: "12M+", body: "in paid media spend managed for our clients" },
    { value: "+3.2x", body: "average return on ad spend for our clients" },
  ],
  ctaTitle: "Ready to grow? Maroc 360.",
  ctaDescription: "Let's build a marketing engine that compounds — strategy, media, and content working as one.",
  ctaButton: "Get in touch",
  logoStripHeading: "Join 150+ brands growing with Maroc 360",
};

const contactFR: ContactDict = {
  title: "Parlons croissance",
  description: "Parlez-nous de votre marque, de vos objectifs et des problèmes que vous cherchez à résoudre. Nous revenons vers vous sous un jour ouvré avec une prochaine étape claire.",
  nameLabel: "Votre nom",
  emailLabel: "Email professionnel",
  companyLabel: "Entreprise / marque",
  messageLabel: "Comment pouvons-nous aider ?",
  submitButton: "Envoyer le message",
  successTitle: "Merci — message reçu",
  successMessage: "Nous reviendrons vers vous sous un jour ouvré. En attendant, n'hésitez pas à explorer nos réalisations.",
  errorMessage: "Une erreur est survenue. Veuillez réessayer ou nous écrire à Contact@maroc360.agency.",
  orEmail: "Ou écrivez-nous directement",
  orCall: "Ou appelez-nous",
  responseTime: "Nous répondons sous 1 jour ouvré",
  required: "Requis",
  consentLabel: "J'accepte d'être contacté(e) au sujet de ma demande",
  subjectLabel: "Comment pouvons-nous aider ?",
  subjectOptions: ["Stratégie & planning", "Publicité payante", "SEO & contenu", "Réseaux sociaux", "Créatif & branding", "Plateforme marketing", "Autre"],
  budgetLabel: "Budget mensuel",
  budgetOptions: ["< 20 000 MAD", "20 000 – 50 000 MAD", "50 000 – 150 000 MAD", "150 000 MAD +", "Pas encore défini"],
  heroTitle: "Contactez-nous",
  heroDescription: "Parlez-nous de votre projet. Nous répondons généralement sous 24 heures.",
  trustpilotLabel: "sur Trustpilot",
  whatsappLabel: "WhatsApp",
  whyTitle: "Pourquoi les équipes nous contactent :",
  features: [
    "Appel stratégique gratuit de 30 min",
    "Proposition sur-mesure sous 48h",
    "Pas d'engagement long terme",
    "Chef de projet dédié",
  ],
  formFirstNameLabel: "Prénom",
  formFirstNamePlaceholder: "Jean",
  formLastNameLabel: "Nom",
  formLastNamePlaceholder: "Dupont",
  formEmailLabel: "Email",
  formEmailPlaceholder: "jean@entreprise.com",
  formPhoneLabel: "Numéro de téléphone",
  formPhonePlaceholder: "+212 6 12 34 56 78",
  formCompanyLabel: "Nom de l'entreprise",
  formCompanyPlaceholder: "Entreprise",
  formTopicsLabel: "Quels services vous intéressent ?",
  formTopics: ["Stratégie", "Publicité payante", "SEO", "Contenu", "Réseaux sociaux", "Autre"],
    formSubmit: "Envoyer via WhatsApp",
    formSubmitLoading: "Envoi.",
    formThanks: "Ouverture de WhatsApp !",
  formConsent: "En soumettant ce formulaire, vous acceptez notre politique de confidentialité. Nous utiliserons vos coordonnées uniquement pour revenir vers vous au sujet de votre demande.",
  numbersTitle: "Notre impact",
  stats: [
    { value: "150+", body: "marques accompagnées au Maroc, en France et dans la région MENA" },
    { value: "12M+", body: "de budgets publicitaires gérés pour nos clients" },
    { value: "+3.2x", body: "de retour sur dépenses publicitaires moyen pour nos clients" },
  ],
  ctaTitle: "Prêt à grandir ? Maroc 360.",
  ctaDescription: "Construisons un moteur marketing qui compound — stratégie, média et contenu travaillant main dans la main.",
  ctaButton: "Nous contacter",
  logoStripHeading: "Rejoignez 150+ marques qui grandissent avec Maroc 360",
};

const careersEN: CareersDict = {
  title: "Great brands aren't built alone",
  description: "Join a senior, tight-knit team of strategists, creatives, and media specialists. We work with ambitious Moroccan brands and ship work that moves business.",
  openPositions: "Open positions",
  noOpenings: "No openings right now — but we're always interested in hearing from great people. Send us a note.",
  lifeAtMaroc360: "Life at Maroc 360",
  valuesLabel: "Our values",
  applyCta: "Apply",
  benefits: "Benefits",
  location: "Location",
  type: "Type",
  department: "Department",
  shareRole: "Share this role",
  contactRecruiting: "Get in touch with recruiting",
  perksTitle: "Why join us",
  cultureTitle: "Our culture",
  heroHeading: "Great brands\naren't built alone",
  heroSubheading:
    "That's the idea at the heart of Maroc 360. We're a team of strategists, creators, and media buyers who love helping brands grow, and that starts with our people.",
  heroCta: "See open roles",
  teamsHeading: "Many teams, one vision",
  teamsSubheading:
    "Marketing moves fast—that's exactly what makes this work so exciting. Each team at Maroc 360 plays a unique and interconnected role in growing our clients' brands.",
  teamsCta: "Apply",
  previousSlide: "Previous team",
  nextSlide: "Next team",
  goToTeamTemplate: "Go to team {n}",
  valuesHeading: "Our values make us",
  values: [
    {
      title: "We have no ego",
      body: "This is a team sport. We lead with humility and put each other first.",
    },
    {
      title: "We own it",
      body: "We roll up our sleeves and do what it takes. Think it, do it, own it.",
    },
    {
      title: "We have impact",
      body: "Our customers are our number one priority. We keep our eyes on the prize, always.",
    },
    {
      title: "We are relentless",
      body: "Never sit still. We are obsessed with what's next and what's possible, always looking forward.",
    },
  ],
  interviewHeading: "Interviewing at Maroc 360",
  interviewSubheading:
    "We aim to be as transparent and respectful as we can with our hiring practices. Regardless of role, the process typically takes 2-3 weeks from first call to final offer.",
  interviewSteps: [
    "Introductory call with HR",
    "Hiring manager interview",
    "Take home case study",
    "On site interviews (4-5 across teams)",
    "Reference call",
    "Offer",
  ],
  breadcrumbsLabel: "Careers",
  careersHref: "/en/careers",
  contactHref: "/en/contact",
};

const careersFR: CareersDict = {
  title: "Les grandes marques ne se construisent pas seules",
  description: "Rejoignez une équipe senior et resserrée de stratèges, créatifs et spécialistes média. Nous accompagnons des marques marocaines ambitieuses et livrons du travail qui fait bouger les choses.",
  openPositions: "Postes ouverts",
  noOpenings: "Pas de poste ouvert pour l'instant — mais nous sommes toujours intéressés par des profils intéressants. Écrivez-nous.",
  lifeAtMaroc360: "La vie chez Maroc 360",
  valuesLabel: "Nos valeurs",
  applyCta: "Postuler",
  benefits: "Avantages",
  location: "Lieu",
  type: "Type",
  department: "Département",
  shareRole: "Partager ce poste",
  contactRecruiting: "Contacter le recrutement",
  perksTitle: "Pourquoi nous rejoindre",
  cultureTitle: "Notre culture",
  heroHeading: "Les grandes marques\nne se construisent pas seules",
  heroSubheading:
    "C'est l'idée au cœur de Maroc 360. Nous sommes une équipe de stratèges, créatifs et média buyers passionnés par la croissance des marques — et cela commence par nos équipes.",
  heroCta: "Voir les postes ouverts",
  teamsHeading: "Plusieurs équipes, une vision",
  teamsSubheading:
    "Le marketing bouge vite — c'est justement ce qui rend ce métier si excitant. Chaque équipe chez Maroc 360 joue un rôle unique et interdépendant dans la croissance des marques de nos clients.",
  teamsCta: "Postuler",
  previousSlide: "Équipe précédente",
  nextSlide: "Équipe suivante",
  goToTeamTemplate: "Aller à l'équipe {n}",
  valuesHeading: "Nos valeurs nous définissent",
  values: [
    {
      title: "Pas d'ego",
      body: "C'est un sport d'équipe. Nous faisons preuve d'humilité et nous mettons les autres en premier.",
    },
    {
      title: "On prend ses responsabilités",
      body: "On retrousse ses manches et on fait le nécessaire. Imaginer, faire, assumer.",
    },
    {
      title: "On crée de l'impact",
      body: "Nos clients sont notre priorité numéro un. Gardons toujours le cap sur l'objectif.",
    },
    {
      title: "On ne s'arrête jamais",
      body: "Jamais figés. Obsédés par la suite et par ce qui est possible, toujours tournés vers l'avenir.",
    },
  ],
  interviewHeading: "Le process d'entretien chez Maroc 360",
  interviewSubheading:
    "Nous voulons être aussi transparents et respectueux que possible dans nos pratiques de recrutement. Quel que soit le poste, le process prend généralement 2 à 3 semaines entre le premier appel et l'offre finale.",
  interviewSteps: [
    "Appel d'introduction avec les RH",
    "Entretien avec le manager recruteur",
    "Étude de cas à réaliser chez soi",
    "Entretiens sur site (4-5 à travers les équipes)",
    "Vérification des références",
    "Offre",
  ],
  breadcrumbsLabel: "Carrières",
  careersHref: "/fr/careers",
  contactHref: "/fr/contact",
};

const whyUsEN: WhyUsDict = {
  title: "Why Maroc 360",
  subtitle: "We're a senior team that has worked in-house, at the biggest agencies, and on the brands we love. Here's how we work — and what we believe.",
  commitmentsTitle: "Our commitments",
  valuesTitle: "What we believe",
  numbersTitle: "By the numbers",
  manifestoTitle: "Our manifesto",
  manifestoBody: "Marketing is a craft. It deserves senior attention, clear thinking, and the kind of partnership where someone actually picks up the phone. We're building the agency we wished existed when we were clients.",
  ctaTitle: "Let's work together",
  ctaDescription: "If this sounds like the kind of partner you're looking for, we'd love to hear from you.",
  ctaButton: "Get in touch",
  heroHeading:
    "We're here to help Moroccan brands grow and shine, together",
  heroBody:
    "Every post you publish, every campaign you launch, every customer you win—it's all part of your story. But building a brand that grows in Morocco? It takes more than ads. We built Maroc 360 to change that.",
  beliefsHeading: "What we believe",
  beliefs: [
    {
      title: "Great partnerships build great brands",
      body: "A good partner can help you grow faster, work smarter, and reach audiences you could never have reached alone. That's the kind of partner we aim to be—for our clients and everyone they work with.",
      image:
        "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6835af9a9762f62378e46c0e_manifesto-illus-1.avif",
      imageAlt:
        "Illustration of professionals collaborating in a colorful creative studio",
      reverse: false,
    },
    {
      title: "We see marketing as a craft, not a gamble",
      body: "At Maroc 360, we treat marketing as a craft—built on research, sharpened by creative, and proven by results. The brands that win are the ones that take both seriously.",
      image:
        "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6835af9a177815a656ca465b_manifesto-illus-2.avif",
      imageAlt:
        "Illustration of a vibrant Moroccan city with modern branding and digital media",
      reverse: true,
    },
    {
      title: "When Moroccan brands win, we all win",
      body: "We believe that building a strong, modern brand is one of the surest ways to future-proof a Moroccan business. It's a win for the founders, their teams, and the country we all call home.",
      reverse: true,
    },
  ],
  copilotsTitle: "We're all builders on this journey",
  copilotsBody:
    "Great marketing comes from great people. If you want to help shape how Morocco's brands grow, we'd love to hear from you.",
  copilotsCta: "Explore open roles",
  commitmentsHeading:
    "We're committed to growing Morocco's brands on the global stage",
  commitments: [
    {
      badge: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/69f0c6a9c34efe096f2f8b03_Design%20sans%20titre.svg",
      badgeAlt: "Google Premier Partner",
      title: "Google Premier Partner",
      body: "We're recognized by Google for the volume and quality of campaigns we run for brands across Morocco and the MENA region.",
    },
    {
      badge: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6835b8162524789eed7a6de2_UN.avif",
      badgeAlt: "Meta Business Partner",
      title: "Meta Business Partner",
      body: "Our media team is certified by Meta to run performance campaigns on Facebook and Instagram at scale.",
    },
    {
      badge: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6835b6d9cd5c42b2d099f74c_Efrag.avif",
      badgeAlt: "TikTok Marketing Partner",
      title: "TikTok Marketing Partner",
      body: "We help brands win on TikTok with creative, buying, and measurement that match the speed of the platform.",
    },
  ],
  previousCommitment: "Previous commitment",
  nextCommitment: "Next commitment",
  investorsHeading: "Backed by great partners",
  investorsSubheading:
    "Partnership is in our DNA and we're proud to work with many of the best.",
  previousInvestor: "Previous investor",
  nextInvestor: "Next investor",
  getStartedTitle: "Ready to grow? Maroc 360.",
  getStartedBody:
    "Let's build a marketing engine that turns your brand into a market leader in Morocco and beyond.",
  getStartedCta: "Get Started",
  careersLinkLabel: "Careers",
  careersHref: "/en/careers",
  contactHref: "/en/contact",
};

const whyUsFR: WhyUsDict = {
  title: "Pourquoi Maroc 360",
  subtitle: "Nous sommes une équipe senior qui a travaillé en interne, dans les plus grandes agences et sur les marques que nous aimons. Voici comment nous travaillons — et ce en quoi nous croyons.",
  commitmentsTitle: "Nos engagements",
  valuesTitle: "Ce en quoi nous croyons",
  numbersTitle: "En chiffres",
  manifestoTitle: "Notre manifeste",
  manifestoBody: "Le marketing est un métier. Il mérite une attention senior, une réflexion claire et le type de partenariat où quelqu'un décroche vraiment le téléphone. Nous construisons l'agence que nous aurions aimé trouver quand nous étions clients.",
  ctaTitle: "Travaillons ensemble",
  ctaDescription: "Si cela ressemble au partenaire que vous cherchez, nous serions ravis d'en discuter.",
  ctaButton: "Nous contacter",
  heroHeading:
    "Nous sommes là pour aider les marques marocaines à grandir et à briller, ensemble",
  heroBody:
    "Chaque post que vous publiez, chaque campagne que vous lancez, chaque client que vous gagnez — tout cela fait partie de votre histoire. Mais construire une marque qui grandit au Maroc ? Il faut plus que des publicités. Nous avons créé Maroc 360 pour changer ça.",
  beliefsHeading: "Nos convictions",
  beliefs: [
    {
      title: "Les grands partenariats construisent les grandes marques",
      body: "Un bon partenaire peut vous aider à grandir plus vite, à travailler plus malin et à toucher des audiences que vous n'auriez pas pu atteindre seul. C'est le type de partenaire que nous cherchons à être pour nos clients et tous ceux avec qui ils travaillent.",
      image:
        "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6835af9a9762f62378e46c0e_manifesto-illus-1.avif",
      imageAlt:
        "Illustration de professionnels collaborant dans un studio créatif coloré",
      reverse: false,
    },
    {
      title: "Nous voyons le marketing comme un métier, pas comme un pari",
      body: "Chez Maroc 360, nous traitons le marketing comme un métier — construit sur la recherche, affûté par le créatif, et prouvé par les résultats. Les marques qui gagnent sont celles qui prennent les deux au sérieux.",
      image:
        "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6835af9a177815a656ca465b_manifesto-illus-2.avif",
      imageAlt:
        "Illustration d'une ville marocaine vibrante avec branding moderne et médias digitaux",
      reverse: true,
    },
    {
      title: "Quand les marques marocaines gagnent, nous gagnons tous",
      body: "Nous croyons que construire une marque forte et moderne est l'une des façons les plus sûres de pérenniser une entreprise marocaine. C'est une victoire pour les fondateurs, leurs équipes et le pays que nous appelons tous chez nous.",
      reverse: true,
    },
  ],
  copilotsTitle: "Nous sommes tous bâtisseurs de ce voyage",
  copilotsBody:
    "Le grand marketing vient des grandes personnes. Si vous voulez aider à façonner la croissance des marques marocaines, nous serions ravis d'en discuter.",
  copilotsCta: "Voir les postes ouverts",
  commitmentsHeading:
    "Engagés pour faire grandir les marques marocaines sur la scène internationale",
  commitments: [
    {
      badge: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/69f0c6a9c34efe096f2f8b03_Design%20sans%20titre.svg",
      badgeAlt: "Google Premier Partner",
      title: "Google Premier Partner",
      body: "Nous sommes reconnus par Google pour le volume et la qualité des campagnes que nous menons pour les marques au Maroc et dans la région MENA.",
    },
    {
      badge: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6835b8162524789eed7a6de2_UN.avif",
      badgeAlt: "Meta Business Partner",
      title: "Meta Business Partner",
      body: "Notre équipe média est certifiée par Meta pour piloter des campagnes à la performance sur Facebook et Instagram à grande échelle.",
    },
    {
      badge: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6835b6d9cd5c42b2d099f74c_Efrag.avif",
      badgeAlt: "TikTok Marketing Partner",
      title: "TikTok Marketing Partner",
      body: "Nous aidons les marques à gagner sur TikTok avec du créatif, de l'achat média et de la mesure au rythme de la plateforme.",
    },
  ],
  previousCommitment: "Engagement précédent",
  nextCommitment: "Engagement suivant",
  investorsHeading: "Soutenus par de grands partenaires",
  investorsSubheading:
    "Le partenariat est dans notre ADN et nous sommes fiers de travailler avec certains des meilleurs.",
  previousInvestor: "Investisseur précédent",
  nextInvestor: "Investisseur suivant",
  getStartedTitle: "Prêt à grandir ? Maroc 360.",
  getStartedBody:
    "Construisons ensemble un moteur marketing qui fait de votre marque un leader sur son marché au Maroc et au-delà.",
  getStartedCta: "Démarrer",
  careersLinkLabel: "Carrières",
  careersHref: "/fr/careers",
  contactHref: "/fr/contact",
};

const caseStudiesEN: CaseStudiesDict = {
  title: "Case studies",
  subtitle: "Real campaigns, real numbers, real wins. A look at how we've helped Moroccan brands grow.",
  challengeLabel: "The challenge",
  approachLabel: "Our approach",
  resultsLabel: "The results",
  testimonialLabel: "In their words",
  ctaTitle: "Ready to be our next case study?",
  ctaDescription: "Tell us about your goals. We'll come back within one business day with a plan.",
};

const caseStudiesFR: CaseStudiesDict = {
  title: "Études de cas",
  subtitle: "Campagnes réelles, chiffres réels, résultats réels. Un aperçu de la façon dont nous avons aidé des marques marocaines à grandir.",
  challengeLabel: "Le défi",
  approachLabel: "Notre approche",
  resultsLabel: "Les résultats",
  testimonialLabel: "En leurs mots",
  ctaTitle: "Prêt à être notre prochaine étude de cas ?",
  ctaDescription: "Parlez-nous de vos objectifs. Nous revenons vers vous sous un jour ouvré avec un plan.",
};

const guidesEN: GuidesDict = {
  title: "Guides & playbooks",
  subtitle: "In-depth, Morocco-specific guides on the channels, tactics, and benchmarks that move business.",
  downloadCta: "Download the playbook",
  downloadTitle: "Get the full 2026 playbook",
  downloadDescription: "The 6-section deep dive, in a beautifully designed PDF you can share with your team.",
  downloadButton: "Request the deck",
  relatedArticles: "Related articles",
  minReadTemplate: "{n} min read",
};

const guidesFR: GuidesDict = {
  title: "Guides & playbooks",
  subtitle: "Des guides approfondis et adaptés au Maroc sur les canaux, tactiques et benchmarks qui font bouger les choses.",
  downloadCta: "Télécharger le playbook",
  downloadTitle: "Recevez le playbook 2026 complet",
  downloadDescription: "Les 6 sections complètes, dans un PDF design que vous pouvez partager avec votre équipe.",
  downloadButton: "Demander le document",
  relatedArticles: "Articles liés",
  minReadTemplate: "{n} min de lecture",
};

const industriesEN: IndustriesDict = {
  title: "Industries we serve",
  subtitle: "We work across the categories that matter in Morocco — each with its own playbook, benchmarks, and senior team.",
  learnMore: "Learn more",
  caseStudyTeaserLabel: "Case study",
  relatedCaseStudies: "Related case studies",
};

const industriesFR: IndustriesDict = {
  title: "Secteurs que nous servons",
  subtitle: "Nous travaillons sur les catégories qui comptent au Maroc — chacune avec son propre playbook, ses benchmarks et son équipe senior.",
  learnMore: "En savoir plus",
  caseStudyTeaserLabel: "Étude de cas",
  relatedCaseStudies: "Études de cas liées",
};

const servicesEN: ServicesDict = {
  title: "Our services",
  subtitle: "Strategy, paid media, SEO, content, social, and creative — delivered by a senior team that's done it for the brands you know.",
  learnMore: "Learn more",
  relatedServices: "Related services",
  whyDifferent: "Why we're different",
  ourProcess: "Our process",
  customersHeading: "Hear it from our clients",
  customersSubheading:
    "Brands of all sizes choose Maroc 360 for our creativity, our discipline, and the measurable growth we deliver.",
  testimonialAriaTemplate: "Go to testimonial {n}",
};

const servicesFR: ServicesDict = {
  title: "Nos services",
  subtitle: "Stratégie, publicité payante, SEO, contenu, réseaux sociaux et créatif — délivrés par une équipe senior qui l'a fait pour les marques que vous connaissez.",
  learnMore: "En savoir plus",
  relatedServices: "Services liés",
  whyDifferent: "Pourquoi nous sommes différents",
  ourProcess: "Notre processus",
  customersHeading: "Ce qu'en disent nos clients",
  customersSubheading:
    "Des marques de toutes tailles choisissent Maroc 360 pour notre créativité, notre discipline et la croissance mesurable que nous générons.",
  testimonialAriaTemplate: "Aller au témoignage {n}",
};

const legalEN: LegalDict = {
  lastUpdated: "Last updated",
  contactTitle: "Questions? Get in touch",
  contactDescription: "For any questions about this policy, email",
  backToHome: "Back to home",
};

const homeSeoAuditFormEN: HomePageDict["hero"]["seoAuditForm"] = {
  inputLabel: "Your website URL",
  placeholder: "Enter your website",
  idleButton: "Get SEO Audit",
  loadingButton: "Auditing…",
  doneButton: "Done",
  errorFallback: "Something went wrong. Please try again.",
  loadingHint:
    "Running 8 SEO categories across 251 rules. This usually takes 10–30 seconds…",
  topIssuesHeading: "Top issues to fix",
  noIssues: "No issues found. Your site is in great shape.",
  footerCategories: "8 categories",
  footerPoweredBy: "Powered by SEOmator (251 rules)",
  auditedPagesTemplate: "Audited {n} page · {date}",
  gradeGood: "Excellent",
  gradeOk: "Good",
  gradeWarn: "Needs work",
  gradeBad: "Critical",
  auditAnotherSiteLabel: "Audit another site",
  severityFailLabel: "fail",
  severityWarnLabel: "warning",
};

const homeEN: HomePageDict = {
  hero: {
    heading: "Your 360° digital marketing partner in Morocco",
    subheading:
      "From the first brief to the last click, Maroc 360 helps Moroccan brands grow online with strategy, creative, and paid media that actually performs.",
    rating: "4.9/5 on Google Reviews",
    contactLink: "/en/contact",
    seoAuditForm: homeSeoAuditFormEN,
  },
  logoStrip: {
    heading: "Trusted by 100+ brands across Morocco and beyond",
    caseStudyLabel: "Case study",
  },
  frameworks: {
    heading: "Grow 4× faster with the right channel mix",
    cards: [
      {
        title: "SEO",
        description:
          "Rank higher on Google and drive qualified organic traffic to your site, month after month",
        icon: "/icons/csrd.avif",
        href: "/en/services/management-system",
      },
      {
        title: "Paid Ads",
        description:
          "High-ROI campaigns on Google, Meta, and TikTok—planned, launched, and optimized by senior media buyers",
        icon: "/icons/ecovadis.avif",
        href: "/en/services/management-system",
      },
      {
        title: "Social Media",
        description:
          "Scroll-stopping content, daily community management, and a clear brand voice across every platform",
        icon: "/icons/iso.avif",
        href: "/en/services/management-system",
      },
      {
        title: "Branding",
        description:
          "Brand strategy, identity, and design systems built to stand out in Morocco and scale across MENA",
        icon: "/icons/cdp.avif",
        href: "/en/services/management-system",
      },
    ],
  },
  intro: {
    heading: "Strategy, creative, and media buying, all under one roof",
    body: "Maroc 360 brings strategy, creative production, and performance media together so your brand grows faster—with less guesswork, fewer agencies to manage, and every result measured end-to-end.",
  },
  features: [
    {
      eyebrow: "Marketing platform",
      title: "One workspace for every campaign, channel, and result",
      description:
        "Maroc 360 is the single source of truth for your marketing. Briefs, assets, KPIs, and reports all live in one place, so your team spends less time chasing files and more time shipping work that grows the brand.",
      href: "/en/services/management-system",
      image: "/images/features/management-system.avif",
      imageAlt: "Marketing platform illustration",
    },
    {
      eyebrow: "Performance reporting",
      title: "Reports your CMO actually wants to read",
      description:
        "Maroc 360 pulls data from every channel and turns it into clean, weekly performance reports. Spend less time in spreadsheets and more time making decisions that move the needle.",
      href: "/en/services/management-system",
      image: "/images/features/questionnaire-automation.avif",
      imageAlt: "Performance reporting illustration",
    },
    {
      eyebrow: "AI-assisted creative",
      title: "Brief, generate, and iterate in hours, not weeks",
      description:
        "Our strategists and creative leads use AI to draft concepts, audience angles, and copy faster—so you get more tested ideas, sharper messaging, and campaigns that launch sooner.",
      href: "/en/services/management-system",
      image: "/images/features/ai-embedded.avif",
      imageAlt: "AI-assisted creative illustration",
    },
    {
      eyebrow: "Creator partnerships",
      title: "Tap into Morocco's top creators and media partners",
      description:
        "Your brand is shaped by the partners you choose. We connect you with vetted influencers, publishers, and media partners across Morocco and the MENA region to extend your reach authentically.",
      href: "/en/services/management-system",
      image: "/images/features/supplier-engagement.avif",
      imageAlt: "Creator partnerships illustration",
    },
  ],
  expertise: {
    heading: "Creative talent meets data-driven results",
    body: "Maroc 360 pairs a senior in-house team with sharp creative and a culture of measurement, so every campaign we ship is built to perform—and we can prove it.",
    buttonLabel: "Get Started",
    previousSlide: "Previous slide",
    nextSlide: "Next slide",
    cards: [
      {
        title: "Proprietary methodology",
        description:
          "Our 360° playbook is built in-house and refined on every brand we ship for",
        icon: "/icons/methodology.svg",
      },
      {
        title: "Dedicated strategist",
        description:
          "A senior strategist is assigned to your account to plan, steer, and grow every channel",
        icon: "/icons/coach.svg",
      },
      {
        title: "Google & Meta certified",
        description:
          "Our media team is certified by Google, Meta, and TikTok to run paid campaigns at scale",
        icon: "/icons/training-partner.svg",
      },
      {
        title: "Trusted by leading brands",
        description:
          "We partner with Morocco's most ambitious companies across e-commerce, hospitality, and services",
        icon: "/icons/efrag.svg",
      },
      {
        title: "Always-on optimization",
        description:
          "We monitor campaigns daily and reallocate budget in real time to maximize your ROI",
        icon: "/icons/compliance-watch.svg",
      },
    ],
  },
  testimonials: {
    heading: "What our clients say",
    body: "Brands of all sizes choose Maroc 360 for our creativity, our discipline, and the measurable growth we deliver.",
    readMore: "Read More",
    previousSlide: "Previous testimonial",
    nextSlide: "Next testimonial",
    cards: [
      {
        quote:
          "Maroc 360 turned our online presence around. In six months, our qualified leads grew 3× and our cost per lead dropped by half.",
        name: "Sophie Wardan",
        role: "Marketing Director",
        avatar: "/images/testimonials/avatar-1.avif",
        companyLogo: "/images/testimonials/logo-1.svg",
      },
      {
        quote:
          "The team rebuilt our brand, our site, and our paid media from scratch. We finally feel like a modern Moroccan brand.",
        name: "Virginie Caro",
        role: "Head of Growth",
        avatar: "/images/testimonials/avatar-2.avif",
        companyLogo: "/images/testimonials/logo-2.svg",
      },
      {
        quote:
          "Their strategist aligned 12 different teams on the same campaign calendar. Maroc 360 paid for itself in two months.",
        name: "Laurence Sauphanor",
        role: "Chief Marketing Officer",
        avatar: "/images/testimonials/avatar-3.avif",
        companyLogo: "/images/testimonials/logo-3.svg",
      },
      {
        quote:
          "We finally have one team running all our performance marketing. Briefs that took weeks now take days, and the numbers are up.",
        name: "Camille Nironi",
        role: "Brand Director",
        avatar: "/images/testimonials/avatar-4.avif",
        companyLogo: "/images/testimonials/logo-4.svg",
      },
      {
        quote:
          "The creative output is sharp, the media buying is sharp, and reporting is clear. Exactly the partner we needed in Morocco.",
        name: "Audrey Evin",
        role: "E-commerce Lead",
        avatar: "/images/testimonials/avatar-5.avif",
        companyLogo: "/images/testimonials/logo-5.svg",
      },
      {
        quote:
          "They launched our creator program across MENA in four weeks. Influencer revenue is now a real line in our P&L.",
        name: "Anonymous",
        role: "Partnerships Manager",
        avatar: "/images/testimonials/avatar-6.svg",
        companyLogo: "/images/testimonials/logo-6.svg",
      },
    ],
  },
  blogPreview: {
    heading: "Marketing insights, playbooks, and trend reports",
    readArticle: "Read article",
    posts: [
      {
        title: "How to Build a Digital Marketing Strategy in Morocco",
        thumbnail: "/images/blog/post-1.png",
        thumbnailAlt:
          "Illustration of a digital marketing strategy mapped across channels and KPIs",
        href: "/en/blog/digital-marketing-strategy-morocco",
        category: "Strategy",
      },
      {
        title: "The Complete Guide to Paid Ads in 2026",
        thumbnail: "/images/blog/post-2.jpeg",
        thumbnailAlt: "Visual guide to running paid ads on Google, Meta, and TikTok in 2026",
        href: "/en/blog/paid-ads-guide-2026",
        category: "Paid Media",
      },
      {
        title: "Social Media Trends Reshaping Morocco",
        thumbnail: "/images/blog/post-3.jpeg",
        thumbnailAlt:
          "Illustration of social media content trends influencing brands in Morocco",
        href: "/en/blog/social-media-strends-morocco",
        category: "Social",
      },
    ],
  },
  learnMore: "Learn More",
};

const legalFR: LegalDict = {
  lastUpdated: "Dernière mise à jour",
  contactTitle: "Des questions sur cette politique ?",
  contactDescription: "Contactez-nous à Contact@maroc360.agency — nous serons ravis de clarifier quoi que ce soit.",
  backToHome: "Retour à l'accueil",
};

const homeSeoAuditFormFR: HomePageDict["hero"]["seoAuditForm"] = {
  inputLabel: "URL de votre site",
  placeholder: "Saisissez votre site",
  idleButton: "Lancer l'audit SEO",
  loadingButton: "Audit en cours…",
  doneButton: "Terminé",
  errorFallback: "Une erreur est survenue. Veuillez réessayer.",
  loadingHint:
    "Analyse de 8 catégories SEO sur 251 règles. Comptez 10 à 30 secondes…",
  topIssuesHeading: "Problèmes prioritaires à corriger",
  noIssues: "Aucun problème détecté. Votre site est en bonne santé.",
  footerCategories: "8 catégories",
  footerPoweredBy: "Propulsé par SEOmator (251 règles)",
  auditedPagesTemplate: "{n} page auditée · {date}",
  gradeGood: "Excellent",
  gradeOk: "Bon",
  gradeWarn: "À améliorer",
  gradeBad: "Critique",
  auditAnotherSiteLabel: "Auditer un autre site",
  severityFailLabel: "échec",
  severityWarnLabel: "avertissement",
};

const homeFR: HomePageDict = {
  hero: {
    heading: "Votre partenaire marketing digital 360° au Maroc",
    subheading:
      "Du premier brief au dernier clic, Maroc 360 accompagne les marques marocaines dans leur croissance en ligne avec stratégie, créatif et publicité payante qui performent vraiment.",
    rating: "4,9/5 sur Google Avis",
    contactLink: "/fr/contact",
    seoAuditForm: homeSeoAuditFormFR,
  },
  logoStrip: {
    heading: "Choisis par plus de 100 marques au Maroc et à l'international",
    caseStudyLabel: "Étude de cas",
  },
  frameworks: {
    heading: "Grandissez 4× plus vite avec le bon mix de canaux",
    cards: [
      {
        title: "SEO",
        description:
          "Positionnez-vous en tête de Google et générez un trafic organique qualifié mois après mois",
        icon: "/icons/csrd.avif",
        href: "/fr/services/management-system",
      },
      {
        title: "Publicité payante",
        description:
          "Campagnes à fort ROI sur Google, Meta et TikTok — planifiées, lancées et optimisées par des média buyers seniors",
        icon: "/icons/ecovadis.avif",
        href: "/fr/services/management-system",
      },
      {
        title: "Réseaux sociaux",
        description:
          "Contenus qui captent l'attention, community management quotidien et une voix de marque claire sur chaque plateforme",
        icon: "/icons/iso.avif",
        href: "/fr/services/management-system",
      },
      {
        title: "Branding",
        description:
          "Stratégie de marque, identité et design systems pensés pour sortir du lot au Maroc et scaler sur la région MENA",
        icon: "/icons/cdp.avif",
        href: "/fr/services/management-system",
      },
    ],
  },
  intro: {
    heading: "Stratégie, créatif et media buying sous le même toit",
    body: "Maroc 360 réunit stratégie, production créative et média à la performance pour faire grandir votre marque plus vite — moins d'incertitude, moins d'agences à coordonner, et chaque résultat mesuré de bout en bout.",
  },
  features: [
    {
      eyebrow: "Plateforme marketing",
      title: "Un espace de travail pour chaque campagne, canal et résultat",
      description:
        "Maroc 360 est la source de vérité unique pour votre marketing. Briefs, assets, KPI et rapports vivent au même endroit, pour que votre équipe perde moins de temps à courir après les fichiers et consacre plus d'énergie à produire du travail qui fait grandir la marque.",
      href: "/fr/services/management-system",
      image: "/images/features/management-system.avif",
      imageAlt: "Illustration de la plateforme marketing",
    },
    {
      eyebrow: "Reporting de performance",
      title: "Des rapports que votre CMO a vraiment envie de lire",
      description:
        "Maroc 360 centralise les données de tous vos canaux et les transforme en rapports de performance hebdomadaires clairs. Moins de tableurs, plus de décisions qui font bouger les choses.",
      href: "/fr/services/management-system",
      image: "/images/features/questionnaire-automation.avif",
      imageAlt: "Illustration du reporting de performance",
    },
    {
      eyebrow: "Créatif assisté par IA",
      title: "Briefer, générer et itérer en heures, pas en semaines",
      description:
        "Nos stratèges et directeurs créatifs s'appuient sur l'IA pour produire concepts, angles d'audience et copies plus vite — plus d'idées testées, des messages plus incisifs, des campagnes lancées plus tôt.",
      href: "/fr/services/management-system",
      image: "/images/features/ai-embedded.avif",
      imageAlt: "Illustration du créatif assisté par IA",
    },
    {
      eyebrow: "Partenariats créateurs",
      title: "Activez les meilleurs créateurs et médias partenaires du Maroc",
      description:
        "Votre marque se construit aussi par les partenaires que vous choisissez. Nous vous connectons à des influenceurs, éditeurs et médias partenaires vérifiés au Maroc et dans la région MENA, pour étendre votre portée de manière authentique.",
      href: "/fr/services/management-system",
      image: "/images/features/supplier-engagement.avif",
      imageAlt: "Illustration des partenariats créateurs",
    },
  ],
  expertise: {
    heading: "Le talent créatif au service des résultats data-driven",
    body: "Maroc 360 associe une équipe senior interne, un créatif affûté et une culture de la mesure — chaque campagne que nous livrons est conçue pour performer, et nous pouvons le prouver.",
    buttonLabel: "Démarrer",
    previousSlide: "Diapositive précédente",
    nextSlide: "Diapositive suivante",
    cards: [
      {
        title: "Méthodologie propriétaire",
        description:
          "Notre playbook 360° est conçu en interne et affiné sur chaque marque que nous accompagnons",
        icon: "/icons/methodology.svg",
      },
      {
        title: "Stratège dédié",
        description:
          "Un stratège senior est assigné à votre compte pour planifier, piloter et faire grandir chaque canal",
        icon: "/icons/coach.svg",
      },
      {
        title: "Certifié Google & Meta",
        description:
          "Notre équipe média est certifiée Google, Meta et TikTok pour opérer des campagnes payantes à grande échelle",
        icon: "/icons/training-partner.svg",
      },
      {
        title: "Choisis par les marques leaders",
        description:
          "Nous travaillons avec les entreprises les plus ambitieuses du Maroc dans l'e-commerce, l'hôtellerie et les services",
        icon: "/icons/efrag.svg",
      },
      {
        title: "Optimisation continue",
        description:
          "Nous monitorons les campagnes au quotidien et réallouons les budgets en temps réel pour maximiser votre ROI",
        icon: "/icons/compliance-watch.svg",
      },
    ],
  },
  testimonials: {
    heading: "Ce que nos clients disent",
    body: "Des marques de toutes tailles choisissent Maroc 360 pour notre créativité, notre discipline et la croissance mesurable que nous générons.",
    readMore: "Lire plus",
    previousSlide: "Témoignage précédent",
    nextSlide: "Témoignage suivant",
    cards: [
      {
        quote:
          "Maroc 360 a transformé notre présence en ligne. En six mois, nos leads qualifiés ont triplé et notre coût par lead a été divisé par deux.",
        name: "Sophie Wardan",
        role: "Directrice marketing",
        avatar: "/images/testimonials/avatar-1.avif",
        companyLogo: "/images/testimonials/logo-1.svg",
      },
      {
        quote:
          "L'équipe a reconstruit notre marque, notre site et notre média à la performance de zéro. Nous nous sentons enfin une marque marocaine moderne.",
        name: "Virginie Caro",
        role: "Head of Growth",
        avatar: "/images/testimonials/avatar-2.avif",
        companyLogo: "/images/testimonials/logo-2.svg",
      },
      {
        quote:
          "Leur stratège a aligné 12 équipes différentes sur le même calendrier de campagne. Maroc 360 s'est rentabilisé en deux mois.",
        name: "Laurence Sauphanor",
        role: "Directrice marketing",
        avatar: "/images/testimonials/avatar-3.avif",
        companyLogo: "/images/testimonials/logo-3.svg",
      },
      {
        quote:
          "Nous avons enfin une seule équipe qui pilote toute notre performance. Les briefs qui prenaient des semaines sont bouclés en quelques jours, et les chiffres sont en hausse.",
        name: "Camille Nironi",
        role: "Directrice de marque",
        avatar: "/images/testimonials/avatar-4.avif",
        companyLogo: "/images/testimonials/logo-4.svg",
      },
      {
        quote:
          "Le créatif est affûté, le media buying est affûté, le reporting est clair. Exactement le partenaire dont nous avions besoin au Maroc.",
        name: "Audrey Evin",
        role: "Responsable e-commerce",
        avatar: "/images/testimonials/avatar-5.avif",
        companyLogo: "/images/testimonials/logo-5.svg",
      },
      {
        quote:
          "Ils ont lancé notre programme créateurs sur toute la région MENA en quatre semaines. Le revenu influenceur est désormais une vraie ligne dans notre P&L.",
        name: "Anonyme",
        role: "Partnerships Manager",
        avatar: "/images/testimonials/avatar-6.svg",
        companyLogo: "/images/testimonials/logo-6.svg",
      },
    ],
  },
  blogPreview: {
    heading: "Insights marketing, playbooks et rapports de tendances",
    readArticle: "Lire l'article",
    posts: [
      {
        title: "Comment construire une stratégie de marketing digital au Maroc",
        thumbnail: "/images/blog/post-1.png",
        thumbnailAlt:
          "Illustration d'une stratégie de marketing digital mappée à travers les canaux et KPI",
        href: "/fr/blog/digital-marketing-strategy-morocco",
        category: "Stratégie",
      },
      {
        title: "Le guide complet de la publicité payante en 2026",
        thumbnail: "/images/blog/post-2.jpeg",
        thumbnailAlt:
          "Guide visuel pour lancer des campagnes payantes sur Google, Meta et TikTok en 2026",
        href: "/fr/blog/paid-ads-guide-2026",
        category: "Publicité payante",
      },
      {
        title: "Les tendances social media qui redessinent le Maroc",
        thumbnail: "/images/blog/post-3.jpeg",
        thumbnailAlt:
          "Illustration des tendances de contenu sur les réseaux sociaux qui influencent les marques au Maroc",
        href: "/fr/blog/social-media-strategy-playbook",
        category: "Réseaux sociaux",
      },
    ],
  },
  learnMore: "En savoir plus",
};

const multiStepFormEN: MultiStepFormDict = {
  triggerLabel: "Choose your service",
  title: "Let's build something great together",
  subtitle: "A few quick questions and we'll open WhatsApp with your brief ready to send.",
  stepIndicatorTemplate: "Step {current} of {total}",
  stepLabelTemplate: "Step {n}",
  back: "Back",
  next: "Next",
  send: "Send via WhatsApp",
  closeAria: "Close form",
  summaryTitle: "Here's your brief",
  summaryIntro: "Review the details below. Tap send and we'll open WhatsApp with everything formatted for our team.",
  summaryServiceLabel: "Service",
  summaryBudgetLabel: "Budget",
  summaryGoalsLabel: "Goals",
  summaryContactLabel: "Contact",
  summaryMessageLabel: "Message",
  summaryNotSelected: "Not selected",
  summaryGoalsSeparator: ", ",
  fields: {
    firstName: "First name",
    firstNamePlaceholder: "John",
    lastName: "Last name",
    lastNamePlaceholder: "Doe",
    email: "Email",
    emailPlaceholder: "john@acme.com",
    phone: "Phone",
    phonePlaceholder: "+212 6 12 34 56 78",
    company: "Company",
    companyPlaceholder: "Acme",
    message: "Tell us about your project",
    messagePlaceholder: "Goals, timeline, anything we should know...",
  },
  consent: "By submitting you agree to our privacy policy. We'll only use your details to follow up on your enquiry.",
  whatsappPrefix: "Hi Maroc 360, I'd like to talk about a project:",
  servicesTitle: "Which service are you interested in?",
  servicesSubtitle: "Pick the one that fits best - you can change it later.",
  services: [
    {
      id: "strategy",
      title: "Strategy & Planning",
      description: "Research-backed roadmaps tailored to your goals in Morocco.",
      icon: "compass",
    },
    {
      id: "paid-media",
      title: "Paid Media",
      description: "Google, Meta, TikTok ads that drive qualified leads and sales.",
      icon: "target",
    },
    {
      id: "seo",
      title: "SEO & Content",
      description: "Rank, attract, and convert in French, Arabic, and English.",
      icon: "search",
    },
    {
      id: "social",
      title: "Social Media",
      description: "Build community and grow audiences on the platforms that matter.",
      icon: "users",
    },
    {
      id: "creative",
      title: "Creative Studio",
      description: "Branding, motion, and campaigns that earn attention.",
      icon: "sparkles",
    },
    {
      id: "management",
      title: "Management System",
      description: "One workspace for every campaign, asset, KPI, and report.",
      icon: "grid",
    },
  ],
  budgetTitle: "What's your monthly budget?",
  budgetSubtitle: "A ballpark is fine - we'll scope properly on the call.",
  budgets: [
    { id: "lt10", label: "Under 10K MAD", description: "Test campaigns, single channel" },
    { id: "10to30", label: "10K - 30K MAD", description: "Multi-channel growth" },
    { id: "30to80", label: "30K - 80K MAD", description: "Full-funnel scale" },
    { id: "80plus", label: "80K+ MAD", description: "Enterprise programmes" },
    { id: "unsure", label: "Not sure yet", description: "Let's figure it out together" },
  ],
  goalsTitle: "What are you trying to achieve?",
  goalsSubtitle: "Pick all that apply.",
  goals: [
    { id: "leads", label: "Generate leads" },
    { id: "sales", label: "Drive online sales" },
    { id: "awareness", label: "Build brand awareness" },
    { id: "traffic", label: "Increase website traffic" },
    { id: "engagement", label: "Grow social engagement" },
    { id: "retention", label: "Retain existing customers" },
    { id: "launch", label: "Launch a new product" },
  ],
  contactTitle: "How can we reach you?",
  contactSubtitle: "We'll use this to follow up and open WhatsApp at the end.",
  successTitle: "Opening WhatsApp...",
  successBody: "If WhatsApp didn't open automatically, copy your message from the summary.",
  validationRequired: "This field is required",
  validationEmail: "Please enter a valid email",
  validationPhone: "Please enter a valid phone number",
};

const multiStepFormFR: MultiStepFormDict = {
  triggerLabel: "Choisissez votre service",
  title: "Construisons quelque chose de grand ensemble",
  subtitle: "Quelques questions rapides et nous ouvrons WhatsApp avec votre brief prêt à envoyer.",
  stepIndicatorTemplate: "Étape {current} sur {total}",
  stepLabelTemplate: "Étape {n}",
  back: "Retour",
  next: "Suivant",
  send: "Envoyer via WhatsApp",
  closeAria: "Fermer le formulaire",
  summaryTitle: "Voici votre brief",
  summaryIntro: "Vérifiez les détails ci-dessous. Appuyez sur envoyer et nous ouvrirons WhatsApp avec tout formaté pour notre équipe.",
  summaryServiceLabel: "Service",
  summaryBudgetLabel: "Budget",
  summaryGoalsLabel: "Objectifs",
  summaryContactLabel: "Contact",
  summaryMessageLabel: "Message",
  summaryNotSelected: "Non sélectionné",
  summaryGoalsSeparator: ", ",
  fields: {
    firstName: "Prénom",
    firstNamePlaceholder: "Jean",
    lastName: "Nom",
    lastNamePlaceholder: "Dupont",
    email: "Email",
    emailPlaceholder: "jean@acme.com",
    phone: "Téléphone",
    phonePlaceholder: "+212 6 12 34 56 78",
    company: "Entreprise",
    companyPlaceholder: "Acme",
    message: "Parlez-nous de votre projet",
    messagePlaceholder: "Objectifs, délais, tout ce que nous devons savoir...",
  },
  consent: "En soumettant ce formulaire, vous acceptez notre politique de confidentialité. Nous utiliserons vos coordonnées uniquement pour répondre à votre demande.",
  whatsappPrefix: "Bonjour Maroc 360, j'aimerais discuter d'un projet :",
  servicesTitle: "Quel service vous intéresse ?",
  servicesSubtitle: "Choisissez celui qui vous convient le mieux - vous pourrez le modifier plus tard.",
  services: [
    {
      id: "strategy",
      title: "Stratégie & Planning",
      description: "Feuilles de route basées sur la recherche, adaptées à vos objectifs au Maroc.",
      icon: "compass",
    },
    {
      id: "paid-media",
      title: "Paid Media",
      description: "Google, Meta, TikTok : des campagnes qui génèrent des leads qualifiés et des ventes.",
      icon: "target",
    },
    {
      id: "seo",
      title: "SEO & Contenu",
      description: "Positionnez, attirez et convertissez en français, arabe et anglais.",
      icon: "search",
    },
    {
      id: "social",
      title: "Social Media",
      description: "Construisez une communauté et développez vos audiences sur les bonnes plateformes.",
      icon: "users",
    },
    {
      id: "creative",
      title: "Studio Créatif",
      description: "Branding, motion et campagnes qui captent l'attention.",
      icon: "sparkles",
    },
    {
      id: "management",
      title: "Outil de gestion",
      description: "Un espace unique pour chaque campagne, asset, KPI et rapport.",
      icon: "grid",
    },
  ],
  budgetTitle: "Quel est votre budget mensuel ?",
  budgetSubtitle: "Une fourchette suffit - nous cadrerons proprement lors de l'appel.",
  budgets: [
    { id: "lt10", label: "Moins de 10K MAD", description: "Campagnes de test, un canal" },
    { id: "10to30", label: "10K - 30K MAD", description: "Croissance multi-canal" },
    { id: "30to80", label: "30K - 80K MAD", description: "Scale full-funnel" },
    { id: "80plus", label: "80K+ MAD", description: "Programmes entreprise" },
    { id: "unsure", label: "Pas encore sûr", description: "On le définit ensemble" },
  ],
  goalsTitle: "Quels sont vos objectifs ?",
  goalsSubtitle: "Cochez tout ce qui s'applique.",
  goals: [
    { id: "leads", label: "Générer des leads" },
    { id: "sales", label: "Booster les ventes en ligne" },
    { id: "awareness", label: "Développer la notoriété" },
    { id: "traffic", label: "Augmenter le trafic du site" },
    { id: "engagement", label: "Développer l'engagement social" },
    { id: "retention", label: "Fidéliser les clients existants" },
    { id: "launch", label: "Lancer un nouveau produit" },
  ],
  contactTitle: "Comment vous joindre ?",
  contactSubtitle: "Nous utiliserons ces informations pour vous recontacter et ouvrir WhatsApp à la fin.",
  successTitle: "Ouverture de WhatsApp...",
  successBody: "Si WhatsApp ne s'est pas ouvert automatiquement, copiez votre message depuis le récapitulatif.",
  validationRequired: "Ce champ est obligatoire",
  validationEmail: "Veuillez saisir un email valide",
  validationPhone: "Veuillez saisir un numéro de téléphone valide",
};

const en: Dict = {
  locale: "en",
  htmlLang: "en",
  nav: navEN,
  footer: footerEN,
  ctaSection: ctaSectionEN,
  emailSubscribe: emailSubscribeEN,
  chatWidget: chatWidgetEN,
  backToTop: backToTopEN,
  blogBreadcrumbs: blogBreadcrumbsEN,
  blogPost: blogPostEN,
  filterTabs: filterTabsEN,
  contact: contactEN,
  careers: careersEN,
  whyUs: whyUsEN,
  caseStudies: caseStudiesEN,
  guides: guidesEN,
  industries: industriesEN,
  services: servicesEN,
  legal: legalEN,
  home: homeEN,
  multiStepForm: multiStepFormEN,
};

const fr: Dict = {
  locale: "fr",
  htmlLang: "fr",
  nav: navFR,
  footer: footerFR,
  ctaSection: ctaSectionFR,
  emailSubscribe: emailSubscribeFR,
  chatWidget: chatWidgetFR,
  backToTop: backToTopFR,
  blogBreadcrumbs: blogBreadcrumbsFR,
  blogPost: blogPostFR,
  filterTabs: filterTabsFR,
  contact: contactFR,
  careers: careersFR,
  whyUs: whyUsFR,
  caseStudies: caseStudiesFR,
  guides: guidesFR,
  industries: industriesFR,
  services: servicesFR,
  legal: legalFR,
  home: homeFR,
  multiStepForm: multiStepFormFR,
};

const dicts: Record<Locale, Dict> = { en, fr };

export function getDict(locale: Locale = "en"): Dict {
  return dicts[locale] ?? en;
}
