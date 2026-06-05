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

export const metadata = {
  title: "Resources & Blog | Maroc 360 Agency",
  description:
    "Practical digital marketing insights — guides, playbooks, and case studies on SEO, paid media, social, and branding from the Maroc 360 team.",
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

export default async function BlogPage() {
  const all = await getAllBlogPosts("en");
  const posts = all.map(toCardSummary);
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = featured ? posts.filter((p) => p.href !== featured.href) : posts;

  const dict = getDict("en");

  return (
    <>
      <Navbar dict={dict.nav} locale="en" multiStepForm={dict.multiStepForm} />

      <main>
        <div className="container-page pt-8">
          <nav aria-label="Breadcrumb" className="py-8">
            <ol className="flex items-center gap-2 text-sm text-text-secondary">
              <li>
                <Link
                  href="/en"
                  className="hover:text-text-primary transition-colors"
                >
                  Home
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
              Resources &amp; Blog
            </h1>
            <FilterTabs dict={dict.filterTabs} locale="en" />
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

      <Footer dict={dict.footer} locale="en" />
    </>
  );
}
