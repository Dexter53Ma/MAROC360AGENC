"use client";

import { useState } from "react";
import { PostCard } from "@/components/blog/post-card";
import { Button } from "@/components/button";
import type { BlogPost } from "@/types/blog";
import type { BlogPostDict } from "@/lib/i18n/dict.types";

const PAGE_SIZE = 6;

export function PostsGrid({
  posts,
  dict,
}: {
  posts: ReadonlyArray<BlogPost>;
  dict: BlogPostDict;
}) {
  const [visibleCount, setVisibleCount] = useState(9);
  const visible = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {visible.map((post) => (
          <PostCard key={post.href} post={post} dict={dict} />
        ))}
      </div>

      {hasMore && (
        <Button
          type="button"
          variant="secondary"
          size="md"
          onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
          className="mt-12 bg-[#FFE228] hover:bg-[#efd624] border-[#FFE228] hover:border-[#efd624] text-text-primary"
        >
          Load more
        </Button>
      )}
    </div>
  );
}
