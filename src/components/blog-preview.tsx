import Image from "next/image";
import Link from "next/link";
import { ChevronRight12 } from "@/components/icons";
import type { HomePageDict } from "@/lib/i18n/dict.types";

export function BlogPreview({ dict }: { dict: HomePageDict["blogPreview"] }) {
  return (
    <section className="section-y">
      <div className="container-page">
        <h2 className="heading-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl max-w-2xl mb-8 sm:mb-10 text-balance">
          {dict.heading}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dict.posts.map((post) => (
            <Link
              key={post.href}
              href={post.href}
              className="group flex flex-col gap-4 rounded-3xl overflow-hidden bg-surface-tertiary transition-transform hover:-translate-y-1"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={post.thumbnail}
                  alt={post.thumbnailAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="px-6 pb-6 flex flex-col gap-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  {post.category}
                </span>
                <h3 className="font-heading text-xl md:text-2xl font-medium leading-snug line-clamp-2">
                  {post.title}
                </h3>
                <span className="inline-flex items-center gap-1 text-sm font-medium mt-2">
                  {dict.readArticle}
                  <ChevronRight12 className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
