import type { ReactNode } from "react";

export type LegalSection = {
  title: string;
  content: ReactNode;
};

type LegalPageProps = {
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
  updatedLabel?: string;
};

export function LegalPage({
  title,
  intro,
  updated,
  sections,
  updatedLabel = "Last updated",
}: LegalPageProps) {
  return (
    <section className="section-y">
      <div className="container-page">
        <div className="max-w-3xl mx-auto">
          <header className="mb-10 md:mb-12">
            <h1 className="heading-display text-[2.25rem] sm:text-4xl md:text-5xl lg:text-6xl mb-6 text-balance">
              {title}
            </h1>
            <p className="body-lg mb-4">{intro}</p>
            <p className="text-sm text-text-secondary">
              {updatedLabel}: {updated}
            </p>
          </header>

          <div className="flex flex-col gap-8 md:gap-10">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 text-balance">
                  {section.title}
                </h2>
                <div className="text-[0.9375rem] sm:text-base text-text-secondary leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_li]:mb-2 [&_a]:underline [&_a]:hover:text-text-primary">
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
