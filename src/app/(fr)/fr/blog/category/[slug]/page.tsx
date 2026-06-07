import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { getDict } from "@/lib/i18n/dict";
import { Footer } from "@/components/footer";
import { CtaSection } from "@/components/cta-section";
import { getAllBlogPosts, getAllBlogSummaries } from "@/lib/blog/loader";
import { BlogBreadcrumbs } from "@/components/blog/blog-breadcrumbs";
import { SubscribeInline } from "@/components/blog/subscribe-inline";
import { PostCard } from "@/components/blog/post-card";
import { siteConfig } from "@/lib/site-config";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl } from "@/lib/site-config";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { pageAlternates } from "@/lib/metadata-helpers";

interface PageProps {
  readonly params: Promise<{ slug: string }>;
}

const CATEGORY_SLUGS = [
  "strategy",
  "paid-media",
  "seo",
  "social",
  "branding",
  "content",
  "creator",
] as const;

type CategorySlug = (typeof CATEGORY_SLUGS)[number];

function normaliseCategory(input: string): CategorySlug | null {
  const slug = input.toLowerCase().trim();
  if ((CATEGORY_SLUGS as readonly string[]).includes(slug)) {
    return slug as CategorySlug;
  }
  return null;
}

const CATEGORY_LABELS: Record<CategorySlug, string> = {
  strategy: "Stratégie",
  "paid-media": "Publicité payante",
  seo: "SEO",
  social: "Réseaux sociaux",
  branding: "Branding",
  content: "Contenu",
  creator: "Créateurs",
};

function labelFor(cat: CategorySlug): string {
  return CATEGORY_LABELS[cat];
}

export function generateStaticParams() {
  return CATEGORY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cat = normaliseCategory(slug);
  if (!cat) return {};
  const label = labelFor(cat);
  const all = await getAllBlogSummaries("fr");
  const postCount = all.filter((p) => p.category.toLowerCase() === cat).length;
  const items = postCount === 1 ? "article" : "articles";
  const description = `${postCount} ${items} sur ${label.toLowerCase()} par l'équipe Maroc 360 — cadres, playbooks et guides pratiques pour les marketeurs au Maroc.`;
  return {
    title: `${label} – Blog | ${siteConfig.name}`,
    description,
    alternates: pageAlternates({
      path: `/fr/blog/category/${cat}`,
      otherLocalePath: `/en/blog/category/${cat}`,
    }),
  };
}

export default async function BlogCategoryPageFR({ params }: PageProps) {
  const { slug } = await params;
  const cat = normaliseCategory(slug);
  const dict = getDict("fr");
  if (!cat) {
    return (
      <>
        <Navbar dict={dict.nav} locale="fr" multiStepForm={dict.multiStepForm} />
        <main
          id="main"
          tabIndex={-1}
          className="container-page section-y text-center"
        >
          <h1 className="heading-display text-3xl md:text-5xl">
            {dict.blogPost.categoryNotFoundTitle}
          </h1>
          <p className="body-lg mt-4">
            <Link
              href="/fr/blog"
              className="link-underline font-semibold"
            >
              ← {dict.blogPost.categoryBrowseAll}
            </Link>
          </p>
        </main>
        <Footer dict={dict.footer} locale="fr" />
      </>
    );
  }

  const label = labelFor(cat);
  const all = await getAllBlogPosts("fr");
  const posts = all
    .filter((p) => p.category.toLowerCase() === cat)
    .map((p) => ({
      title: p.title,
      description: p.description,
      image: p.image,
      imageAlt: p.imageAlt,
      href: p.href,
      category: p.category,
    }));

  const pageUrl = absoluteUrl(`/fr/blog/category/${cat}`);
  const schema = webPageSchema({
    id: `${pageUrl}#webpage`,
    name: `${label} – Blog | ${siteConfig.name}`,
    description: `${posts.length} ${posts.length === 1 ? "article" : "articles"} sur ${label.toLowerCase()} par l'équipe Maroc 360.`,
    url: pageUrl,
    inLanguage: "fr",
    type: "CollectionPage",
  });
  const crumbs = breadcrumbSchema([
    { name: "Accueil", item: absoluteUrl("/fr") },
    { name: "Blog", item: absoluteUrl("/fr/blog") },
    { name: label, item: pageUrl },
  ]);

  return (
    <>
      <Navbar dict={dict.nav} locale="fr" multiStepForm={dict.multiStepForm} />
      <main id="main" tabIndex={-1}>
        <div className="container-page">
          <BlogBreadcrumbs
            items={[
              { label: "Accueil", href: "/fr" },
              { label: "Blog", href: "/fr/blog" },
              { label },
            ]}
          />
        </div>

        <section className="pb-8 md:pb-12">
          <div className="container-page flex flex-col items-center text-center gap-4">
            <span className="inline-flex w-fit items-center rounded-full bg-text-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-surface-primary">
              {dict.blogPost.categoryPillLabel}
            </span>
            <h1 className="heading-display text-3xl md:text-4xl lg:text-5xl">
              {label}
            </h1>
            <p className="body-lg max-w-2xl">
              {dict.blogPost.categoryCountTemplate
                .replace("{n}", String(posts.length))
                .replace("{items}", posts.length === 1 ? "article" : "articles")
                .replace("{label}", label.toLowerCase())}
            </p>
          </div>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="container-page">
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <PostCard
                    key={post.href}
                    post={post}
                    dict={dict.blogPost}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-text-secondary">
                  {dict.blogPost.categoryEmptyText}{" "}
                  <Link
                    href="/fr/blog"
                    className="link-underline font-semibold text-text-primary"
                  >
                    {dict.blogPost.categoryBrowseAll}
                  </Link>
                </p>
              </div>
            )}
          </div>
        </section>

        <section>
          <div className="container-page">
            <SubscribeInline dict={dict.blogPost} />
          </div>
        </section>

        <CtaSection dict={dict} />
      </main>
      <Footer dict={dict.footer} locale="fr" />
      <JsonLd data={schema} />
      <JsonLd data={crumbs} />
    </>
  );
}
