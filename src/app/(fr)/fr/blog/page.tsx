import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { getDict } from "@/lib/i18n/dict";
import { Footer } from "@/components/footer";
import { FeaturedPost } from "@/components/blog/featured-post";
import { FilterTabs } from "@/components/blog/filter-tabs";
import { PostsGrid } from "@/components/blog/posts-grid";
import { SubscribeInline } from "@/components/blog/subscribe-inline";
import { getAllBlogPosts } from "@/lib/blog/loader";
import type { BlogPost } from "@/types/blog";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl } from "@/lib/site-config";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { pageAlternates } from "@/lib/metadata-helpers";

export const metadata = {
  title: "Ressources & Blog | Maroc 360 Agency",
  description:
    "Conseils pratiques en marketing digital — guides, playbooks et études de cas sur le SEO, la publicité payante, les réseaux sociaux et le branding par l'équipe Maroc 360.",
  alternates: pageAlternates({ path: "/fr/blog" }),
};

function toCardSummary(post: {
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  category: string;
  featured: boolean;
  datePublished: string;
  datePublishedLabel: string;
  readingTimeMinutes: number;
  href: string;
}): BlogPost {
  return {
    title: post.title,
    description: post.description,
    image: post.image,
    imageAlt: post.imageAlt,
    href: post.href,
    category: post.category,
    featured: post.featured,
  };
}

export default async function BlogPageFR() {
  const all = await getAllBlogPosts("fr");
  const posts = all.map(toCardSummary);
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = featured ? posts.filter((p) => p.href !== featured.href) : posts;

  const dict = getDict("fr");
  const homeLabel = "Accueil";

  const url = absoluteUrl("/fr/blog");
  const schema = webPageSchema({
    id: `${url}#webpage`,
    name: metadata.title as string,
    description: metadata.description as string,
    url,
    inLanguage: "fr",
    type: "CollectionPage",
  });
  const crumbs = breadcrumbSchema([
    { name: "Accueil", item: absoluteUrl("/fr") },
    { name: "Ressources & Blog", item: url },
  ]);

  return (
    <>
      <Navbar dict={dict.nav} locale="fr" multiStepForm={dict.multiStepForm} />

      <main>
        <div className="container-page pt-8">
          <nav aria-label="Fil d'Ariane" className="py-8">
            <ol className="flex items-center gap-2 text-sm text-text-secondary">
              <li>
                <Link
                  href="/fr"
                  className="hover:text-text-primary transition-colors"
                >
                  {homeLabel}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-text-primary">Blog</li>
            </ol>
          </nav>
        </div>

        <section className="pb-12">
          <div className="container-page flex flex-col items-center text-center gap-8">
            <h1 className="heading-display text-3xl md:text-4xl lg:text-5xl">
              Ressources &amp; Blog
            </h1>
            <FilterTabs dict={dict.filterTabs} locale="fr" />
          </div>
        </section>

        <section className="pb-12 md:pb-16">
          <div className="container-page">
            {featured ? (
              <FeaturedPost post={featured} dict={dict.blogPost} />
            ) : null}
          </div>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="container-page">
            <PostsGrid posts={rest} dict={dict.blogPost} />
          </div>
        </section>

        <section>
          <div className="container-page">
            <SubscribeInline dict={dict.blogPost} />
          </div>
        </section>
      </main>

      <Footer dict={dict.footer} locale="fr" />
      <JsonLd data={schema} />
      <JsonLd data={crumbs} />
    </>
  );
}
