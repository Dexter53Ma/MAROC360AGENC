import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { getDict } from "@/lib/i18n/dict";
import { Footer } from "@/components/footer";
import { BlogHero } from "@/components/blog/blog-hero";
import { BlogArticle } from "@/components/blog/blog-article";
import { BlogBreadcrumbs } from "@/components/blog/blog-breadcrumbs";
import { RelatedPosts } from "@/components/blog/related-posts";
import { ShareButtons } from "@/components/blog/share-buttons";
import {
  getAllSlugs,
  getBlogPost,
  getRelatedPosts,
} from "@/lib/blog/loader";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

interface PageProps {
  readonly params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await getAllSlugs("en");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug, "en");
  if (!post) return {};

  const url = absoluteUrl(post.href);
  const imageUrl = post.image.startsWith("http")
    ? post.image
    : absoluteUrl(post.image);

  return {
    title: `${post.title} | ${siteConfig.name}`,
    description: post.description,
    alternates: {
      canonical: url,
      languages: {
        en: `${siteConfig.url}/en/blog/${slug}`,
        fr: `${siteConfig.url}/fr/blog/${slug}`,
        "x-default": `${siteConfig.url}/en/blog/${slug}`,
      },
    },
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: siteConfig.name,
      type: "article",
      publishedTime: post.datePublished,
      authors: [post.author],
      tags: [...post.tags],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug, "en");
  if (!post) notFound();

  const [related, allSlugs] = await Promise.all([
    getRelatedPosts(slug, "en", 3),
    getAllSlugs("en"),
  ]);
  void allSlugs;

  const dict = getDict("en");

  const canonicalUrl = absoluteUrl(post.href);
  const imageUrl = post.image.startsWith("http")
    ? post.image
    : absoluteUrl(post.image);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: [imageUrl],
    datePublished: post.datePublished,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.publisher.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(siteConfig.publisher.logo),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    articleSection: post.category,
    keywords: post.tags.join(", "),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/en"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: absoluteUrl("/en/blog"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: canonicalUrl,
      },
    ],
  };

  const faqSchema =
    post.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <Navbar dict={dict.nav} locale="en" multiStepForm={dict.multiStepForm} />

      <main id="main" tabIndex={-1}>
        <div className="container-page pt-2">
          <BlogBreadcrumbs
            items={[
              { label: "Home", href: "/en" },
              { label: "Blog", href: "/en/blog" },
              { label: post.category },
            ]}
          />
        </div>

        <article className="container-page pb-12">
          <BlogHero post={post} dict={dict.blogPost} />

          <div className="mx-auto max-w-3xl mt-10 mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <ShareButtons url={canonicalUrl} title={post.title} />
            <Link
              href="/en/blog"
              className="link-underline text-sm font-medium text-text-primary"
            >
              ← {dict.blogPost.backToBlog}
            </Link>
          </div>

          <BlogArticle post={post} dict={dict.blogPost} />
        </article>

        <section className="container-page pb-16 md:pb-24">
          <RelatedPosts posts={related} dict={dict.blogPost} blogIndexHref="/en/blog" />
        </section>
      </main>

      <Footer dict={dict.footer} locale="en" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      ) : null}
    </>
  );
}
