import Image from "next/image";
import Link from "next/link";
import { ChevronRight12 } from "@/components/icons";
import type { BlogPostSummary } from "@/lib/blog/types";
import type { BlogPostDict } from "@/lib/i18n/dict.types";

export function RelatedPosts({
  posts,
  dict,
  blogIndexHref = "/en/blog",
  title,
}: {
  posts: readonly BlogPostSummary[];
  dict: BlogPostDict;
  blogIndexHref?: string;
  title?: string;
}) {
  if (posts.length === 0) return null;

  const heading = title ?? dict.relatedPostsTitle;

  return (
    <section className="pt-12 md:pt-16" aria-labelledby="related-posts-title">
      <div className="flex items-end justify-between gap-4 mb-6 md:mb-8">
        <h2
          id="related-posts-title"
          className="heading-display text-2xl md:text-3xl text-text-primary"
        >
          {heading}
        </h2>
        <Link
          href={blogIndexHref}
          className="link-underline hidden md:inline-flex items-center gap-1 text-sm font-medium text-text-primary"
        >
          {dict.backToBlog}
          <ChevronRight12 aria-hidden />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.href}
            href={post.href}
            className="lift group flex flex-col rounded-3xl overflow-hidden bg-surface-tertiary"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <Image
                src={post.image}
                alt={post.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-2 p-5">
              <span className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                {post.category}
              </span>
              <h3 className="font-heading text-lg md:text-xl font-medium leading-snug line-clamp-2 text-text-primary">
                {post.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
