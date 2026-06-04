"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown16, Globe20, ChevronRight12 } from "@/components/icons";
import { LinkButton } from "@/components/button";
import { cn } from "@/lib/utils";

interface DropdownItem {
  label: string;
  href: string;
  description?: string;
}

interface NavItem {
  label: string;
  href?: string;
  items?: DropdownItem[];
}

const navItems: NavItem[] = [
  {
    label: "Solutions",
    items: [
      { label: "Management system", href: "/en/solutions/management-system" },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "Blog", href: "/en/resources/blog" },
    ],
  },
  { label: "Manifesto", href: "/en/manifesto" },
  { label: "Careers", href: "/en/careers" },
];

function DesktopNavItem({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const hasItems = !!item.items?.length;

  return (
    <div
      className="relative"
      onMouseEnter={() => hasItems && setOpen(true)}
      onMouseLeave={() => hasItems && setOpen(false)}
    >
      {hasItems ? (
        <button
          type="button"
          className="flex items-center gap-1 text-base font-semibold text-text-primary hover:opacity-70 transition-opacity"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          {item.label}
          <ChevronDown16 className={cn("transition-transform", open && "rotate-180")} />
        </button>
      ) : (
        <Link
          href={item.href!}
          className="text-base font-semibold text-text-primary hover:opacity-70 transition-opacity"
        >
          {item.label}
        </Link>
      )}

      {hasItems && open && (
        <div className="absolute left-0 top-full pt-2 z-50">
          <div className="bg-surface-primary border border-border-strong rounded-b-3xl shadow-lg overflow-hidden min-w-56">
            <ul className="py-2">
              {item.items!.map((sub) => (
                <li key={sub.href}>
                  <Link
                    href={sub.href}
                    className="flex items-center gap-2 px-5 py-3 text-base text-text-primary hover:bg-surface-tertiary transition-colors"
                  >
                    <span>{sub.label}</span>
                    <ChevronRight12 className="opacity-50" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        className="flex items-center gap-1.5 p-1.5 rounded-full hover:bg-surface-tertiary transition-colors"
        aria-label="Switch language"
      >
        <Globe20 className="text-text-primary" />
      </button>
      {open && (
        <div className="absolute right-0 top-full pt-1 z-50">
          <div className="bg-surface-tertiary border border-border-strong rounded-2xl shadow-lg overflow-hidden min-w-32">
            <Link
              href="/en"
              className="block px-4 py-2 text-sm font-medium hover:bg-surface-secondary"
            >
              English
            </Link>
            <Link
              href="/fr"
              className="block px-4 py-2 text-sm font-medium hover:bg-surface-secondary"
            >
              Français
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-[1000] bg-surface-primary">
      <div className="container-page">
        <div className="h-20 flex items-center justify-between gap-6">
          <Link href="/en" className="flex items-center" aria-label="Maroc 360 Agency home">
            <Image
              src="/brand/maroc360-logo.png"
              alt="Maroc 360 Agency"
              width={120}
              height={32}
              priority
              className="h-8 w-auto"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => (
              <DesktopNavItem key={item.label} item={item} />
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <LanguageSwitcher />
            <LinkButton
              href="https://cloud.trustditto.com/o"
              variant="secondary"
              size="md"
              className="text-text-primary"
            >
              Log in
            </LinkButton>
            <LinkButton href="/en/get-started" variant="primary" size="md">
              Get Started
            </LinkButton>
          </div>

          <button
            type="button"
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-tertiary"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <div className="relative w-5 h-4">
              <span
                className={cn(
                  "absolute left-0 right-0 h-0.5 bg-text-primary rounded-full transition-transform duration-400",
                  mobileOpen ? "top-1.5 rotate-45" : "top-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 right-0 top-1.5 h-0.5 bg-text-primary rounded-full transition-opacity duration-300",
                  mobileOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 right-0 h-0.5 bg-text-primary rounded-full transition-transform duration-400",
                  mobileOpen ? "top-1.5 -rotate-45" : "top-3"
                )}
              />
            </div>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 bottom-0 z-40 bg-surface-primary overflow-y-auto">
          <nav className="container-page py-6 flex flex-col gap-1">
            {navItems.map((item) => (
              <MobileNavItem key={item.label} item={item} />
            ))}
            <div className="mt-6 pt-6 border-t border-text-primary/10 flex items-center gap-4">
              <span className="text-sm text-text-secondary">Language:</span>
              <Link
                href="/en"
                className="text-base font-medium hover:opacity-70 transition-opacity"
              >
                EN
              </Link>
              <Link
                href="/fr"
                className="text-base font-medium text-text-secondary hover:opacity-70 transition-opacity"
              >
                FR
              </Link>
            </div>
            <div className="mt-4 flex flex-col gap-3">
              <LinkButton
                href="https://cloud.trustditto.com/o"
                variant="secondary"
                size="md"
                className="w-full"
              >
                Log in
              </LinkButton>
              <LinkButton href="/en/get-started" variant="primary" size="md" className="w-full">
                Get Started
              </LinkButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function MobileNavItem({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const hasItems = !!item.items?.length;

  if (!hasItems) {
    return (
      <Link
        href={item.href!}
        className="block py-3 text-2xl font-heading border-b border-text-primary/10"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-text-primary/10">
      <button
        type="button"
        className="w-full flex items-center justify-between py-3 text-2xl font-heading"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {item.label}
        <ChevronDown16
          className={cn("transition-transform w-5 h-5", open && "rotate-180")}
        />
      </button>
      {open && (
        <ul className="pb-3 pl-4 flex flex-col gap-2">
          {item.items!.map((sub) => (
            <li key={sub.href}>
              <Link
                href={sub.href}
                className="flex items-center gap-2 py-1.5 text-base text-text-secondary"
              >
                {sub.label}
                <ChevronRight12 />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
