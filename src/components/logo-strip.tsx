import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Logo {
  name: string;
  src: string;
  href: string;
  caseStudy?: boolean;
}

const logos: Logo[] = [
  { name: "Niedax", src: "/images/logos/niedax.png", href: "#", caseStudy: true },
  { name: "Adenes", src: "/images/logos/adenes.png", href: "#", caseStudy: true },
  { name: "Aico Ltd", src: "/images/logos/aico.avif", href: "#" },
  { name: "Émile Maurin", src: "/images/logos/maurin.avif", href: "#" },
  { name: "FERCO", src: "/images/logos/ferco.avif", href: "#" },
  { name: "Superga Beauty", src: "/images/logos/superga.svg", href: "#" },
  { name: "YESSS", src: "/images/logos/yesss.avif", href: "#" },
  { name: "Stelliant", src: "/images/logos/stelliant.avif", href: "#" },
  { name: "ECS Group", src: "/images/logos/ecs.avif", href: "#" },
];

export function LogoStrip() {
  return (
    <section className="section-y">
      <div className="container-page">
        <h2 className="heading-display text-2xl md:text-3xl text-center max-w-2xl mx-auto mb-10">
          Join 500+ companies managing their compliance with Ditto
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-12 gap-y-8 items-center justify-items-center">
          {logos.map((logo) => (
            <Link
              key={logo.name}
              href={logo.href}
              className={cn(
                "group flex flex-col items-center gap-2 transition-opacity hover:opacity-80",
                "grayscale"
              )}
            >
              <div className="relative h-12 w-full max-w-[8rem] flex items-center justify-center">
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
                  Case study
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
