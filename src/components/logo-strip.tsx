import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { HomePageDict } from "@/lib/i18n/dict.types";

interface Logo {
  name: string;
  src: string;
  href: string;
  caseStudy?: boolean;
}

const logos: Logo[] = [
  { name: "Niedax", src: "/images/logos/niedax.png", href: "/en/blog", caseStudy: true },
  { name: "Adenes", src: "/images/logos/adenes.png", href: "/en/blog", caseStudy: true },
  { name: "Aico Ltd", src: "/images/logos/aico.avif", href: "/en/blog" },
  { name: "Émile Maurin", src: "/images/logos/maurin.avif", href: "/en/blog" },
  { name: "FERCO", src: "/images/logos/ferco.avif", href: "/en/blog" },
  { name: "Superga Beauty", src: "/images/logos/superga.svg", href: "/en/blog" },
  { name: "YESSS", src: "/images/logos/yesss.avif", href: "/en/blog" },
  { name: "Stelliant", src: "/images/logos/stelliant.avif", href: "/en/blog" },
  { name: "ECS Group", src: "/images/logos/ecs.avif", href: "/en/blog" },
];

interface LogoStripProps {
  dict: HomePageDict["logoStrip"];
  baseBlogHref: string;
}

export function LogoStrip({ dict, baseBlogHref }: LogoStripProps) {
  return (
    <section className="section-y">
      <div className="container-page">
        <h2 className="heading-display text-xl sm:text-2xl md:text-3xl text-center max-w-2xl mx-auto mb-10 text-balance px-2">
          {dict.heading}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-x-6 sm:gap-x-12 gap-y-8 items-center justify-items-center">
          {logos.map((logo) => (
            <Link
              key={logo.name}
              href={baseBlogHref}
              className={cn(
                "group flex w-full max-w-[8rem] flex-col items-center gap-2 transition-opacity hover:opacity-80",
                "grayscale"
              )}
            >
              <div className="relative h-12 w-full flex items-center justify-center">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  sizes="8rem"
                  className="object-contain"
                />
              </div>
              {logo.caseStudy && (
                <span className="text-xs text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
                  {dict.caseStudyLabel}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
