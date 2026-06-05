"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { BackToTopDict } from "@/lib/i18n/dict.types";

const SHOW_AFTER = 600;

export function BackToTop({ dict }: { dict: BackToTopDict }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label={dict.label}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "md:hidden fixed bottom-4 left-4 z-[99] grid place-items-center",
        "size-11 rounded-full bg-surface-tertiary border border-text-primary/15 text-text-primary shadow-md",
        "transition-all duration-200 active:scale-95 pb-safe pl-safe",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-2 pointer-events-none",
      )}
    >
      <ArrowRight className="size-4 -rotate-90" aria-hidden />
    </button>
  );
}
