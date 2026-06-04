"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

interface FrameworkCard {
  title: string;
  description: string;
  icon: string;
  href: string;
}

const frameworks: FrameworkCard[] = [
  {
    title: "SEO",
    description:
      "Rank higher on Google and drive qualified organic traffic to your site, month after month",
    icon: "/icons/csrd.avif",
    href: "/en/solutions/management-system",
  },
  {
    title: "Paid Ads",
    description:
      "High-ROI campaigns on Google, Meta, and TikTok—planned, launched, and optimized by senior media buyers",
    icon: "/icons/ecovadis.avif",
    href: "/en/solutions/management-system",
  },
  {
    title: "Social Media",
    description:
      "Scroll-stopping content, daily community management, and a clear brand voice across every platform",
    icon: "/icons/iso.avif",
    href: "/en/solutions/management-system",
  },
  {
    title: "Branding",
    description:
      "Brand strategy, identity, and design systems built to stand out in Morocco and scale across MENA",
    icon: "/icons/cdp.avif",
    href: "/en/solutions/management-system",
  },
];

export function FrameworksCarousel() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: false },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  return (
    <section className="section-y overflow-hidden">
      <div className="container-page">
        <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl max-w-xl mb-10">
          Grow 4× faster with the right channel mix
        </h2>
      </div>

      <div className="embla" ref={emblaRef}>
        <div className="embla__container pl-6 md:pl-10 lg:pl-[calc((100vw-84rem)/2+2.5rem)]">
          {frameworks.map((card) => (
            <div key={card.title} className="embla__slide">
              <a
                href={card.href}
                className="group block bg-surface-tertiary rounded-3xl p-6 sm:p-8 h-full transition-transform hover:-translate-y-1"
              >
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 mb-5 sm:mb-6">
                  <Image
                    src={card.icon}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl font-heading font-medium mb-2">
                  <strong>{card.title}</strong>
                </h3>
                <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                  {card.description}
                </p>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
