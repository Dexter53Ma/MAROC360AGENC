"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "All", href: "/en/resources" },
  { label: "Blog", href: "/en/resources/blog" },
  { label: "News", href: "/en/resources/news" },
  { label: "Guide", href: "/en/resources/guides" },
];

export function FilterTabs() {
  const [active, setActive] = useState("Blog");
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {tabs.map((tab) => {
          const isActive = active === tab.label;
          return (
            <Link
              key={tab.label}
              href={tab.href}
              onClick={() => setActive(tab.label)}
              className={cn(
                "inline-flex items-center justify-center h-10 px-5 rounded-full text-sm font-medium transition-colors",
                isActive
                  ? "bg-text-primary text-surface-primary"
                  : "bg-surface-tertiary text-text-primary hover:bg-surface-secondary"
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-3 w-full max-w-2xl">
        {searchOpen && (
          <input
            type="search"
            placeholder="Search articles…"
            aria-label="Search articles"
            autoFocus
            onBlur={() => setSearchOpen(false)}
            className="flex-1 h-10 px-5 rounded-full bg-surface-tertiary border border-text-primary/10 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-text-primary/30"
          />
        )}
        <button
          type="button"
          onClick={() => setSearchOpen((v) => !v)}
          aria-label="Search"
          className="ml-auto inline-flex items-center justify-center h-10 w-10 rounded-full bg-surface-tertiary text-text-primary hover:bg-surface-secondary transition-colors"
        >
          <Search className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
