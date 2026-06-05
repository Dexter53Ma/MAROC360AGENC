"use client";

import { useState, useEffect, useRef, type ComponentType, type SVGProps } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LinkButton } from "@/components/button";
import { ChevronDown16, ArrowRight } from "@/components/icons";
import { MultiStepFormTrigger } from "@/components/multi-step-form";
import type { MultiStepFormDict, NavDict, NavItemDict } from "@/lib/i18n/dict.types";

type IconProps = SVGProps<SVGSVGElement>;
type IconComponent = ComponentType<IconProps>;

const GridIcon = (p: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...p}>
    <rect x="2.5" y="2.5" width="6" height="6" rx="1.25" stroke="currentColor" strokeWidth="1.4" />
    <rect x="11.5" y="2.5" width="6" height="6" rx="1.25" stroke="currentColor" strokeWidth="1.4" />
    <rect x="2.5" y="11.5" width="6" height="6" rx="1.25" stroke="currentColor" strokeWidth="1.4" />
    <rect x="11.5" y="11.5" width="6" height="6" rx="1.25" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);
const CompassIcon = (p: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...p}>
    <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M13 7L10.5 10.5L7 13L9.5 9.5L13 7Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
);
const TargetIcon = (p: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...p}>
    <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="10" cy="10" r="1.25" fill="currentColor" />
  </svg>
);
const SeoIcon = (p: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...p}>
    <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
const UsersIcon = (p: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...p}>
    <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="1.4" />
    <path d="M2 17C2 14.2386 4.23858 12 7 12C9.76142 12 12 14.2386 12 17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="14" cy="8" r="2.25" stroke="currentColor" strokeWidth="1.4" />
    <path d="M13 12.5C15.5 12.5 18 14 18 16.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);
const SparklesIcon = (p: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...p}>
    <path d="M10 2.5L11.5 7L16 8.5L11.5 10L10 14.5L8.5 10L4 8.5L8.5 7L10 2.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M16 13.5L16.75 15.25L18.5 16L16.75 16.75L16 18.5L15.25 16.75L13.5 16L15.25 15.25L16 13.5Z" fill="currentColor" />
  </svg>
);
const ListIcon = (p: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...p}>
    <path d="M3 5H17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M3 10H17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M3 15H12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);
const ChartIcon = (p: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...p}>
    <path d="M3 17H17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <rect x="5" y="10" width="2.5" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.4" />
    <rect x="9.5" y="6" width="2.5" height="9" rx="0.5" stroke="currentColor" strokeWidth="1.4" />
    <rect x="14" y="3" width="2.5" height="12" rx="0.5" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

const ICONS: Record<NavItemDict["iconKey"], IconComponent> = {
  grid: GridIcon,
  compass: CompassIcon,
  target: TargetIcon,
  seo: SeoIcon,
  users: UsersIcon,
  sparkles: SparklesIcon,
  list: ListIcon,
  chart: ChartIcon,
  case: ChartIcon,
  pen: CompassIcon,
  book: ListIcon,
  building: GridIcon,
  code: SeoIcon,
};

function LanguageSwitcher({
  className,
  locale,
}: {
  className?: string;
  locale: "en" | "fr";
}) {
  const pathname = usePathname();
  const currentLocale: "en" | "fr" = pathname?.startsWith("/fr") ? "fr" : "en";
  const basePath = pathname?.replace(/^\/(en|fr)/, "") || "";

  const localeHref = (target: "en" | "fr") => `/${target}${basePath}`;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border border-border-strong/15 bg-surface-tertiary p-0.5 text-sm font-semibold",
        className
      )}
      role="group"
      aria-label="Language switcher"
    >
      <Link
        href={localeHref("en")}
        aria-current={currentLocale === "en" ? "true" : undefined}
        className={cn(
          "h-8 px-3 inline-flex items-center justify-center rounded-full transition-colors duration-200",
          currentLocale === "en"
            ? "bg-text-primary text-surface-primary shadow-sm"
            : "text-text-secondary hover:text-text-primary"
        )}
      >
        EN
      </Link>
      <Link
        href={localeHref("fr")}
        aria-current={currentLocale === "fr" ? "true" : undefined}
        className={cn(
          "h-8 px-3 inline-flex items-center justify-center rounded-full transition-colors duration-200",
          currentLocale === "fr"
            ? "bg-text-primary text-surface-primary shadow-sm"
            : "text-text-secondary hover:text-text-primary"
        )}
      >
        FR
      </Link>
    </div>
  );
}

function MegaMenuPanel({
  group,
  onMouseEnter,
  onMouseLeave,
  dict,
}: {
  group: { label: string; mega: { items: readonly NavItemDict[]; featured: { eyebrow: string; title: string; description: string; href: string; cta: string } } };
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  dict: NavDict;
}) {
  if (!group.mega || group.mega.items.length === 0) return null;
  const { items, featured } = group.mega;
  if (!featured.cta) return null;

  return (
    <div
      className="hidden lg:block absolute inset-x-0 top-full z-50"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="bg-surface-tertiary border-t border-b border-border-strong/10 shadow-[0_24px_60px_-20px_rgba(19,14,48,0.18)] animate-mega-in">
        <div className="container-page py-10">
          <div className="grid grid-cols-12 gap-8 lg:gap-12">
            <div className="col-span-12 lg:col-span-8">
              <div className="text-xs font-semibold tracking-widest uppercase text-text-secondary mb-4">
                {group.label}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {items.map((item) => {
                  const Icon = ICONS[item.iconKey] ?? CompassIcon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="group flex gap-4 p-4 rounded-2xl hover:bg-surface-primary transition-colors duration-200"
                    >
                      <div className="shrink-0 w-10 h-10 rounded-xl bg-surface-primary border border-border-strong/10 flex items-center justify-center text-text-primary group-hover:border-text-primary/30 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-base font-semibold text-text-primary flex items-center gap-1.5">
                          <span>{item.label}</span>
                          <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-70 group-hover:translate-x-0 transition-all duration-200" />
                        </div>
                        <div className="text-sm text-text-secondary mt-0.5 leading-snug">
                          {item.description}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="col-span-12 lg:col-span-4">
              <Link
                href={featured.href}
                className="group relative flex flex-col justify-between h-full p-6 rounded-3xl bg-surface-primary border border-border-strong/10 overflow-hidden hover:border-text-primary/30 transition-colors duration-200"
              >
                <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-brand-yellow/50 blur-2xl pointer-events-none" aria-hidden />
                <div className="absolute -left-8 -bottom-8 w-32 h-32 rounded-full bg-brand-green/40 blur-2xl pointer-events-none" aria-hidden />
                <div className="relative">
                  <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-text-primary text-surface-primary text-[10px] font-bold tracking-widest uppercase mb-3">
                    {featured.eyebrow}
                  </div>
                  <div className="heading-display text-2xl text-text-primary mb-2 leading-tight">
                    {featured.title}
                  </div>
                  <div className="text-sm text-text-secondary mb-6 leading-snug">
                    {featured.description}
                  </div>
                </div>
                <div className="relative flex items-center gap-1.5 text-sm font-semibold text-text-primary">
                  <span>{featured.cta}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DesktopNavItem({
  group,
  isOpen,
  onEnter,
  onLeave,
  onToggle,
  isActive,
  dict,
}: {
  group: { label: string; href: string; mega?: { items: readonly NavItemDict[]; featured: { eyebrow: string; title: string; description: string; href: string; cta: string } } };
  isOpen: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onToggle: () => void;
  isActive: boolean;
  dict: NavDict;
}) {
  const hasMega = !!group.mega && group.mega.items.length > 0;

  return (
    <div
      className="relative"
      onMouseEnter={hasMega ? onEnter : undefined}
      onMouseLeave={hasMega ? onLeave : undefined}
    >
      {hasMega ? (
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className={cn(
            "flex items-center gap-1 px-3 h-10 text-base font-semibold rounded-full transition-colors duration-200",
            isActive || isOpen
              ? "bg-surface-tertiary text-text-primary"
              : "text-text-primary hover:bg-surface-tertiary"
          )}
        >
          {group.label}
          <ChevronDown16 className={cn("transition-transform duration-200 opacity-70", isOpen && "rotate-180")} />
        </button>
      ) : (
        <Link
          href={group.href}
          className={cn(
            "flex items-center px-3 h-10 text-base font-semibold rounded-full transition-colors duration-200",
            isActive ? "bg-surface-tertiary text-text-primary" : "text-text-primary hover:bg-surface-tertiary"
          )}
        >
          {group.label}
        </Link>
      )}
    </div>
  );
}

function MobileNavItem({
  group,
  dict,
}: {
  group: { label: string; href: string; mega?: { items: readonly NavItemDict[]; featured: { eyebrow: string; title: string; description: string; href: string; cta: string } } };
  dict: NavDict;
}) {
  const [open, setOpen] = useState(false);
  const hasMega = !!group.mega && group.mega.items.length > 0;

  if (!hasMega) {
    return (
      <Link href={group.href} className="block py-4 min-h-[48px] text-xl font-heading border-b border-text-primary/10 active:bg-surface-tertiary">
        {group.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-text-primary/10">
      <div className="flex items-center justify-between gap-2 -mx-2">
        <Link href={group.href} className="block py-4 px-2 min-h-[48px] text-xl font-heading flex-1 active:bg-surface-tertiary rounded-lg">
          {group.label}
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={dict.toggleSubmenuAriaTemplate.replace("{label}", group.label)}
          className="w-12 h-12 flex items-center justify-center rounded-lg hover:bg-surface-tertiary active:bg-surface-secondary"
        >
          <ChevronDown16 className={cn("transition-transform duration-200 w-5 h-5", open && "rotate-180")} />
        </button>
      </div>
      {open && (
        <ul className="pb-4 flex flex-col gap-1">
          {group.mega!.items.map((item) => {
            const Icon = ICONS[item.iconKey] ?? CompassIcon;
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 min-h-[44px] py-2.5 px-3 rounded-xl text-base text-text-secondary hover:bg-surface-tertiary active:bg-surface-secondary transition-colors"
                >
                  <Icon className="w-4 h-4 opacity-70 shrink-0" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export function Navbar({
  dict,
  locale,
  multiStepForm,
}: {
  dict: NavDict;
  locale: "en" | "fr";
  multiStepForm: MultiStepFormDict;
}) {
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpenMega(null);
    setMobileOpen(false);
  }

  const isItemActive = (href?: string) =>
    !!href && !!pathname && (pathname === href || pathname.startsWith(href + "/"));

  const handleEnter = (label: string) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenMega(label);
  };

  const handleLeave = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMega(null), 120);
  };

  const activeGroup = dict.groups.find((g) => g.label === openMega && g.mega.items.length > 0);

  const homeHref = locale === "fr" ? "/fr" : "/en";
  const contactHref = locale === "fr" ? "/fr/contact" : "/en/contact";

  return (
    <header
      className={cn(
        "sticky top-0 z-[1000] relative transition-shadow duration-300",
        scrolled ? "shadow-[0_1px_0_0_rgba(19,14,48,0.08),0_8px_24px_-12px_rgba(19,14,48,0.12)]" : ""
      )}
    >
      <div className="bg-surface-primary">
        <div className="container-page">
          <div className="h-20 flex items-center justify-between gap-6">
            <Link href={homeHref} className="flex items-center" aria-label={dict.logoAria}>
              <div className="relative h-20 w-[160px] sm:h-24 sm:w-[190px]">
                <Image
                  src="/brand/maroc360-logo.png"
                  alt="Maroc 360 Agency"
                  width={533}
                  height={433}
                  priority
                  className="absolute inset-0 w-full h-full object-contain object-bottom-left"
                />
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {dict.groups.map((group) => (
                <DesktopNavItem
                  key={group.label}
                  group={group}
                  isOpen={openMega === group.label}
                  isActive={isItemActive(group.href)}
                  onEnter={() => handleEnter(group.label)}
                  onLeave={handleLeave}
                  onToggle={() => setOpenMega(openMega === group.label ? null : group.label)}
                  dict={dict}
                />
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <LanguageSwitcher locale={locale} />
              <MultiStepFormTrigger
                label={dict.ctaLogIn}
                dict={multiStepForm}
                variant="secondary"
                size="md"
                className="text-text-primary"
              />
              <LinkButton href={contactHref} variant="primary" size="md">
                {dict.ctaContact}
              </LinkButton>
            </div>

            <button
              type="button"
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-tertiary"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={dict.toggleMenuLabel}
              aria-expanded={mobileOpen}
            >
              <div className="relative w-5 h-4">
                <span className={cn("absolute left-0 right-0 h-0.5 bg-text-primary rounded-full transition-transform duration-300", mobileOpen ? "top-1.5 rotate-45" : "top-0")} />
                <span className={cn("absolute left-0 right-0 top-1.5 h-0.5 bg-text-primary rounded-full transition-opacity duration-200", mobileOpen && "opacity-0")} />
                <span className={cn("absolute left-0 right-0 h-0.5 bg-text-primary rounded-full transition-transform duration-300", mobileOpen ? "top-1.5 -rotate-45" : "top-3")} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 bottom-0 z-40 bg-surface-primary overflow-y-auto pb-safe">
          <nav className="container-page py-6 flex flex-col gap-1">
            <div className="flex items-center justify-between pb-2 mb-2">
              <span className="text-sm font-semibold uppercase tracking-widest text-text-secondary">
                {dict.menuLabel}
              </span>
            </div>
            {dict.groups.map((group) => (
              <MobileNavItem key={group.label} group={group} dict={dict} />
            ))}
            <div className="mt-8 pt-6 border-t border-text-primary/10 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-text-secondary">{dict.languageLabel}</span>
                <LanguageSwitcher locale={locale} />
              </div>
              <MultiStepFormTrigger
                label={dict.ctaLogIn}
                dict={multiStepForm}
                variant="secondary"
                size="md"
                fullWidth
              />
              <LinkButton href={contactHref} variant="primary" size="md" className="w-full">
                {dict.ctaContact}
              </LinkButton>
            </div>
          </nav>
        </div>
      )}

      {activeGroup && (
        <MegaMenuPanel group={activeGroup} onMouseEnter={() => handleEnter(activeGroup.label)} onMouseLeave={handleLeave} dict={dict} />
      )}
    </header>
  );
}
