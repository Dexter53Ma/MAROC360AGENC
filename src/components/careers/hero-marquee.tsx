import Image from "next/image";
import { LinkButton } from "@/components/button";
import type { CareersDict } from "@/lib/i18n/dict.types";

const slides = [
  {
    src: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6835be3b96b3778a0240361d_careers-pic-1.avif",
    width: 532,
    height: 426,
  },
  {
    src: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6835be3bdf9d66cbce6004ba_careers-pic-2.avif",
    width: 532,
    height: 532,
  },
  {
    src: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6835be3b9246f2b838b95d92_careers-pic-3.avif",
    width: 532,
    height: 426,
  },
  {
    src: "https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6835be3b583cc387c26aca5c_careers-pic-4.avif",
    width: 532,
    height: 532,
  },
];

function renderHeading(heading: string) {
  const parts = heading.split("\n");
  return parts.map((p, i) => (
    <span key={i}>
      {p}
      {i < parts.length - 1 ? <br /> : null}
    </span>
  ));
}

export function HeroMarquee({ dict }: { dict: CareersDict }) {
  return (
    <section className="bg-[#FFE228] overflow-hidden">
      <div className="mx-auto max-w-[55rem] px-6 md:px-10 pt-12 sm:pt-16 pb-10 sm:pb-12 text-center">
        <h1 className="font-heading text-[2.25rem] sm:text-[40px] md:text-[64px] font-normal leading-[1.1] tracking-[-0.01em] text-text-primary text-balance">
          {renderHeading(dict.heroHeading)}
        </h1>
        <p className="mt-5 sm:mt-6 text-base sm:text-[22px] leading-[1.25] sm:leading-[1.25] text-text-primary max-w-[36rem] mx-auto">
          {dict.heroSubheading}
        </p>
        <div className="mt-5 sm:mt-6">
          <LinkButton href={dict.contactHref} variant="primary" size="md">
            {dict.heroCta}
          </LinkButton>
        </div>
      </div>

      <div className="relative w-screen left-1/2 -translate-x-1/2 pb-16 group">
        <div className="flex w-max animate-marquee">
          {[...slides, ...slides].map((slide, i) => (
            <div
              key={`${slide.src}-${i}`}
              className="w-[80vw] md:w-[532px] flex-shrink-0 mr-4 md:mr-12 aspect-[4/3] md:aspect-auto"
            >
              <Image
                src={slide.src}
                alt=""
                width={slide.width}
                height={slide.height}
                className="w-full h-full md:h-auto object-cover rounded-3xl"
                sizes="(max-width: 768px) 80vw, 532px"
                priority={i < 4}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
