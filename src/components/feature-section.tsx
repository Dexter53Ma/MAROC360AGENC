import Image from "next/image";
import Link from "next/link";
import { ChevronRight12 } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import type { HomeFeatureItem } from "@/lib/i18n/dict.types";

export function FeatureSection({
  feature,
  learnMoreLabel,
  eager = false,
}: {
  feature: HomeFeatureItem;
  learnMoreLabel: string;
  eager?: boolean;
}) {
  return (
    <section className="section-y">
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center">
          <Reveal className="flex flex-col gap-3 sm:gap-4 order-1 lg:order-1">
            <p className="eyebrow">{feature.eyebrow}</p>
            <h2 className="heading-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-balance">
              {feature.title}
            </h2>
            <p className="body-lg">{feature.description}</p>
            <Link
              href={feature.href}
              className="group inline-flex items-center gap-2 mt-2 self-start"
            >
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-text-primary/20 text-base font-medium hover:bg-surface-tertiary transition-colors">
                {learnMoreLabel}
                <ChevronRight12 className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Reveal>

          <Reveal variant="scale" className="order-2 lg:order-2 w-full">
            <div className="lift relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
              <Image
                src={feature.image}
                alt={feature.imageAlt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                priority={eager}
                className="object-contain"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
