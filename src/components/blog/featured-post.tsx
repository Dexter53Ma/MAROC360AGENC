import Image from "next/image";
import Link from "next/link";
import { ChevronRight12 } from "@/components/icons";
import type { BlogPost } from "@/types/blog";
import type { BlogPostDict } from "@/lib/i18n/dict.types";

export function FeaturedPost({
  post,
  dict,
}: {
  post: BlogPost;
  dict: BlogPostDict;
}) {
  return (
    <Link
      href={post.href}
      className="lift group grid md:grid-cols-2 gap-6 md:gap-10 rounded-3xl bg-[#FFE228] p-6 md:p-10"
    >
      <div className="flex flex-col justify-center gap-3 md:max-w-[50%]">
        <h2 className="heading-display text-3xl md:text-4xl text-text-primary">
          {post.title}
        </h2>
        <p className="text-base text-text-primary line-clamp-3">
          {post.description}
        </p>
        <span className="inline-flex items-center gap-1 text-sm font-medium mt-2 text-text-primary">
          {dict.readArticle}
          <ChevronRight12 className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>

      <div className="relative aspect-[4/3] md:aspect-[16/10] w-full overflow-hidden rounded-2xl">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </Link>
  );
}
