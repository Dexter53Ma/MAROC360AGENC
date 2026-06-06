import Image from "next/image";
import Link from "next/link";
import { ChevronRight12 } from "@/components/icons";
import type { BlogPost } from "@/types/blog";
import type { BlogPostDict } from "@/lib/i18n/dict.types";

export function PostCard({
  post,
  dict,
}: {
  post: BlogPost;
  dict: BlogPostDict;
}) {
  return (
    <Link
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
      <div className="flex flex-col gap-3 px-6 pb-6 pt-4">
        <span className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
          {post.category}
        </span>
        <h3 className="font-heading text-xl md:text-2xl font-medium leading-snug line-clamp-2 text-text-primary">
          {post.title}
        </h3>
        <p className="text-sm text-text-secondary line-clamp-3">
          {post.description}
        </p>
        <span className="inline-flex items-center gap-1 text-sm font-medium mt-1 text-text-primary">
          {dict.exploreMore.replace("{title}", post.title)}
          <ChevronRight12 className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
