"use client";

import { useState } from "react";
import Link from "next/link";
import { SearchInput } from "@/components/search-input";
import { cn } from "@/lib/utils";
import type { FilterTabsDict } from "@/lib/i18n/dict.types";
import type { Locale } from "@/lib/i18n/dict.types";

export function FilterTabs({
  activeLabel,
  dict,
  locale,
}: {
  activeLabel?: string;
  dict: FilterTabsDict;
  locale: Locale;
}) {
  const [active, setActive] = useState(activeLabel ?? dict.allLabel);
  const base = `/${locale}/blog`;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Link
          href={base}
          onClick={() => setActive(dict.allLabel)}
          className={cn(
            "press inline-flex items-center justify-center h-10 px-5 rounded-full text-sm font-medium",
            active === dict.allLabel
              ? "bg-text-primary text-surface-primary"
              : "bg-surface-tertiary text-text-primary hover:bg-surface-secondary"
          )}
        >
          {dict.allLabel}
        </Link>
        {dict.categories.map((cat) => {
          const isActive = active === cat.label;
          return (
            <Link
              key={cat.slug}
              href={`${base}/category/${cat.slug}`}
              onClick={() => setActive(cat.label)}
              className={cn(
                "press inline-flex items-center justify-center h-10 px-5 rounded-full text-sm font-medium",
                isActive
                  ? "bg-text-primary text-surface-primary"
                  : "bg-surface-tertiary text-text-primary hover:bg-surface-secondary"
              )}
            >
              {cat.label}
            </Link>
          );
        })}
      </div>

      <div className="flex w-full max-w-2xl items-center justify-end">
        <SearchInput placeholder={dict.searchPlaceholder} />
      </div>
    </div>
  );
}
