import Image from "next/image";
import { cn } from "@/lib/utils";

export interface FeatureBlockProps {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  reverse?: boolean;
  eager?: boolean;
}

export function FeatureBlock({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  reverse = false,
  eager = false,
}: FeatureBlockProps) {
  return (
    <section className="section-y">
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
          <div
            className={cn(
              "flex flex-col gap-3 order-1",
              reverse ? "lg:order-2" : "lg:order-1"
            )}
          >
            <p className="inline-flex items-center gap-2 text-sm font-medium text-text-primary">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full bg-text-primary"
                aria-hidden
              />
              {eyebrow}
            </p>
            <h3 className="font-heading text-2xl md:text-3xl text-balance">
              {title}
            </h3>
            <p className="text-text-secondary text-base leading-relaxed max-w-md">
              {description}
            </p>
          </div>

          <div
            className={cn(
              "order-2 w-full",
              reverse ? "lg:order-1" : "lg:order-2"
            )}
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={image}
                alt={imageAlt ?? title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
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
