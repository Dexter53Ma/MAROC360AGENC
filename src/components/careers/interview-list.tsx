import type { CareersDict } from "@/lib/i18n/dict.types";

const colors = [
  "bg-[#FFE228]",
  "bg-[#59E25D]",
  "bg-[#3A93FF]",
  "bg-[#E261E5]",
  "bg-[#FFE228]",
  "bg-[#59E25D]",
];

export function InterviewList({ dict }: { dict: CareersDict }) {
  return (
    <section className="pt-16 pb-20 sm:pt-24 sm:pb-36">
      <div className="container-page">
        <h2 className="font-heading text-[2rem] sm:text-[40px] md:text-[48px] font-normal leading-[1.15] tracking-[-0.01em] text-text-primary text-center text-balance">
          {dict.interviewHeading}
        </h2>
        <p className="mt-5 sm:mt-6 text-base sm:text-[22px] leading-[1.5] sm:leading-[1.25] text-text-primary max-w-[48rem] mx-auto text-center">
          {dict.interviewSubheading}
        </p>

        <div className="mt-12 sm:mt-16">
          {dict.interviewSteps.map((step, i) => (
            <div
              key={step}
              className="flex items-center gap-3 sm:gap-4 px-2 sm:px-6 min-h-[64px] sm:min-h-[76px]"
            >
              <div
                className={`w-20 sm:w-32 md:w-52 h-5 sm:h-6 rounded-full flex-shrink-0 ${colors[i] ?? colors[0]}`}
                aria-hidden
              />
              <p className="text-sm sm:text-base text-text-primary">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
