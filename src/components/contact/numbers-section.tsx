import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import type { ContactDict } from "@/lib/i18n/dict.types";

interface StatCard {
  value: string;
  body: string;
  variant: "yellow" | "blue" | "green";
}

const DEFAULT_STATS: ReadonlyArray<StatCard> = [
  {
    value: "150+",
    body: "brands served across Morocco, France, and the wider MENA region",
    variant: "yellow",
  },
  {
    value: "12M+",
    body: "in paid media spend managed for our clients",
    variant: "blue",
  },
  {
    value: "+3.2x",
    body: "average return on ad spend for our clients",
    variant: "green",
  },
];

const variantStyles: Record<StatCard["variant"], string> = {
  yellow: "bg-brand-yellow rounded-[40px] md:rounded-[80px] py-12 px-8 md:px-16",
  blue: "bg-brand-blue rounded-[40px] md:rounded-full py-12 px-8 md:px-16 md:-mx-12",
  green: "bg-brand-green rounded-[40px] md:rounded-[80px] py-12 px-8 md:px-16",
};

type ContactNumbersSectionProps = {
  dict?: Pick<ContactDict, "numbersTitle" | "stats">;
};

export function ContactNumbersSection({ dict }: ContactNumbersSectionProps = {}) {
  const title = dict?.numbersTitle ?? "Our impact";
  const stats: StatCard[] = dict?.stats
    ? dict.stats.map((s, i) => ({
        value: s.value,
        body: s.body,
        variant: (DEFAULT_STATS[i]?.variant ?? "yellow") as StatCard["variant"],
      }))
    : [...DEFAULT_STATS];

  return (
    <section className="bg-surface-primary relative">
      <div className="container-page py-16 md:py-24">
        <Reveal>
          <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl text-center max-w-2xl mx-auto text-balance">
            {title}
          </h2>
        </Reveal>

        <div className="mt-12 md:mt-16">
          <Reveal variant="stagger">
            <div className="flex flex-col md:flex-row md:items-stretch md:justify-center gap-0">
              {stats.map((s) => (
                <div
                  key={s.value}
                  className={cn(
                    "flex flex-col items-center justify-center text-center gap-4",
                    "mix-blend-multiply",
                    variantStyles[s.variant]
                  )}
                >
                  <p className="font-heading font-normal text-[3.5rem] sm:text-[5rem] md:text-[5.5rem] leading-[1.05] tracking-[-0.01em] text-text-primary">
                    {s.value}
                  </p>
                  <p className="text-base md:text-[1.375rem] leading-snug text-text-primary max-w-[28rem]">
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
