"use client";

import { useEffect, useRef, useState } from "react";
import { SearchIcon, X } from "@/components/icons";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  className?: string;
  autoFocus?: boolean;
}

export function SearchInput({
  placeholder = "Search articles…",
  onSearch,
  className,
  autoFocus = true,
}: SearchInputProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open && autoFocus) inputRef.current?.focus();
  }, [open, autoFocus]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setValue("");
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(value);
  };

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "flex items-center gap-2 transition-all duration-300",
        open ? "w-full max-w-md" : "w-10",
        className
      )}
    >
      {open && (
        <form onSubmit={handleSubmit} className="flex-1">
          <div className="input-focus search-expand flex items-center gap-2 rounded-full border border-text-primary/10 bg-surface-tertiary px-4 h-10">
            <SearchIcon className="h-4 w-4 shrink-0 text-text-secondary" />
            <input
              ref={inputRef}
              type="search"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={() => {
                if (!value) setOpen(false);
              }}
              placeholder={placeholder}
              aria-label="Search"
              className="min-w-0 flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-tertiary outline-none"
            />
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setValue("");
              }}
              aria-label="Close search"
              className="shrink-0 rounded-full p-1 text-text-secondary transition-colors hover:bg-surface-secondary hover:text-text-primary"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </form>
      )}

      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open search"
          className="press inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface-tertiary text-text-primary transition-colors hover:bg-surface-secondary"
        >
          <SearchIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
