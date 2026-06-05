import Link from "next/link";

export interface BlogBreadcrumbItem {
  readonly label: string;
  readonly href?: string;
}

export function BlogBreadcrumbs({
  items,
}: {
  items: readonly BlogBreadcrumbItem[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="py-6 md:py-8">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-text-secondary">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={`${item.label}-${idx}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={
                    isLast ? "text-text-primary" : undefined
                  }
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast ? (
                <span aria-hidden className="text-text-tertiary">
                  /
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
