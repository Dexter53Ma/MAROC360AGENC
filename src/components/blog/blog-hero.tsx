import { Clock12, Calendar12 } from "@/components/icons";
import type { BlogPostFull } from "@/lib/blog/types";
import type { BlogPostDict } from "@/lib/i18n/dict.types";

export function BlogHero({
  post,
  dict,
}: {
  post: BlogPostFull;
  dict: BlogPostDict;
}) {
  const minRead = dict.minReadTemplate.replace("{n}", String(post.readingTimeMinutes));
  return (
    <header className="pb-8 md:pb-12">
      <div className="flex flex-col gap-4 md:gap-6 max-w-4xl">
        <span className="inline-flex w-fit items-center rounded-full bg-text-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-surface-primary">
          {post.category}
        </span>
        <h1 className="heading-display text-3xl md:text-5xl lg:text-6xl text-text-primary">
          {post.title}
        </h1>
        <p className="body-lg max-w-3xl text-text-secondary">
          {post.description}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-text-secondary">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-yellow font-heading text-sm font-semibold text-text-primary">
              {post.author
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-text-primary">
                {post.author}
              </span>
              <span className="text-xs text-text-secondary">
                {post.authorRole}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar12 className="size-3.5" aria-hidden />
            <time dateTime={post.datePublished}>{post.datePublishedLabel}</time>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock12 className="size-3.5" aria-hidden />
            <span>{minRead}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
