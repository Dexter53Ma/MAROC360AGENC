import type { HomePageDict } from "@/lib/i18n/dict.types";

export function IntroSection({ dict }: { dict: HomePageDict["intro"] }) {
  return (
    <section className="section-y">
      <div className="container-page">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="heading-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-5 sm:mb-6 text-balance">
            {dict.heading}
          </h2>
          <p className="body-lg">{dict.body}</p>
        </div>
      </div>
    </section>
  );
}
