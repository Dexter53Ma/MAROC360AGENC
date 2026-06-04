import Image from "next/image";
import Link from "next/link";
import { ChevronRight12 } from "@/components/icons";

export interface FeatureItem {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt?: string;
}

export function FeatureSection({
  feature,
  eager = false,
}: {
  feature: FeatureItem;
  eager?: boolean;
}) {
  return (
    <section className="section-y">
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center">
          <div className="flex flex-col gap-4 order-1 lg:order-1">
            <p className="eyebrow">{feature.eyebrow}</p>
            <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl text-balance">
              {feature.title}
            </h2>
            <p className="body-lg">{feature.description}</p>
            <Link
              href={feature.href}
              className="group inline-flex items-center gap-2 mt-2 self-start"
            >
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-text-primary/20 text-base font-medium hover:bg-surface-tertiary transition-colors">
                Learn More
                <ChevronRight12 className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>

          <div className="order-2 lg:order-2 w-full">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={feature.image}
                alt={feature.imageAlt ?? feature.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                priority={eager}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
