import Image from "next/image";
import { cn } from "@/lib/utils";

export interface BeliefItem {
  title: string;
  body: string;
  image?: string;
  imageAlt?: string;
  reverse?: boolean;
}

export function BeliefBlock({
  title,
  body,
  image,
  imageAlt,
  reverse = false,
}: BeliefItem) {
  const hasImage = Boolean(image);

  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
      {hasImage && (
        <div
          className={cn(
            "relative w-full max-w-md mx-auto lg:mx-0",
            reverse ? "lg:order-2" : "lg:order-1"
          )}
        >
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl">
            <Image
              src={image!}
              alt={imageAlt ?? title}
              fill
              sizes="(max-width: 1024px) 100vw, 28rem"
              className="object-cover"
            />
          </div>
        </div>
      )}

      <div
        className={cn(
          "flex flex-col gap-3 max-w-md",
          hasImage
            ? reverse
              ? "lg:order-1"
              : "lg:order-2"
            : "lg:col-start-1 lg:ml-[20%]"
        )}
      >
        <h3 className="heading-display text-xl sm:text-2xl md:text-3xl text-balance">
          {title}
        </h3>
        <p className="text-base text-text-secondary leading-relaxed">{body}</p>
      </div>
    </div>
  );
}
