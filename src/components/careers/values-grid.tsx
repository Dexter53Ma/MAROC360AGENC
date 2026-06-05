import type { CareersDict } from "@/lib/i18n/dict.types";

interface Value {
  bgClass: string;
  radiusClass: string;
  title: string;
  body: string;
}

const styles = [
  { bgClass: "bg-[#E261E5]", radiusClass: "rounded-[2rem] md:rounded-[80px]" },
  { bgClass: "bg-[#FFE228]", radiusClass: "rounded-[2rem] md:rounded-[1000px]" },
  { bgClass: "bg-[#59E25D]", radiusClass: "rounded-[2rem] md:rounded-[88px]" },
  { bgClass: "bg-[#3A93FF]", radiusClass: "rounded-[2rem] md:rounded-[240px]" },
];

export function ValuesGrid({ dict }: { dict: CareersDict }) {
  return (
    <section className="bg-surface-tertiary pb-20 sm:pb-36">
      <div className="container-page pt-16 sm:pt-24">
        <h2 className="font-heading text-[2rem] sm:text-[40px] md:text-[48px] font-normal leading-[1.15] tracking-[-0.01em] text-text-primary text-center text-balance">
          {dict.valuesHeading}
        </h2>
      </div>

      <div className="mt-12 sm:mt-16 md:mx-[calc(50%-50vw)] md:w-screen">
        <div className="flex flex-col md:flex-row md:flex-nowrap">
          {dict.values.map((value, i) => {
            const s = styles[i] ?? styles[0]!;
            const v: Value = { ...s, title: value.title, body: value.body };
            return (
              <div
                key={v.title}
                className={`flex-1 md:min-w-[16rem] min-h-[200px] sm:min-h-[272px] mix-blend-multiply text-text-primary px-7 sm:px-9 py-12 sm:py-16 flex flex-col ${v.bgClass} ${v.radiusClass} md:min-w-0 ${
                  i === 0
                    ? "md:ml-[max(2.5rem,calc(50vw-42rem))]"
                    : "md:-ml-6"
                }`}
              >
                <h3 className="font-heading text-2xl sm:text-[32px] font-normal leading-[1.2] tracking-[-0.01em]">
                  {v.title}
                </h3>
                <p className="mt-3 text-base sm:text-[22px] leading-[1.5] sm:leading-[1.25] max-w-[15rem]">
                  {v.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
