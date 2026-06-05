import Link from "next/link";
import type { CareersDict } from "@/lib/i18n/dict.types";

export function Breadcrumbs({ dict }: { dict: CareersDict }) {
  return (
    <section className="bg-[#FFE228]">
      <div className="container-page">
        <div className="py-4">
          <Link
            href={dict.careersHref}
            className="text-sm text-text-primary no-underline"
          >
            {dict.breadcrumbsLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
