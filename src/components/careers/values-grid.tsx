interface Value {
  bgClass: string;
  radiusClass: string;
  title: string;
  body: string;
}

const values: Value[] = [
  {
    bgClass: "bg-[#E261E5]",
    radiusClass: "rounded-[80px]",
    title: "We have no ego",
    body: "This is a team sport. We lead with humility and put each other first.",
  },
  {
    bgClass: "bg-[#FFE228]",
    radiusClass: "rounded-[1000px]",
    title: "We own it",
    body: "We roll up our sleeves and do what it takes. Think it, do it, own it.",
  },
  {
    bgClass: "bg-[#59E25D]",
    radiusClass: "rounded-[88px]",
    title: "We have impact",
    body: "Our customers are our number one priority. We keep our eyes on the prize, always.",
  },
  {
    bgClass: "bg-[#3A93FF]",
    radiusClass: "rounded-[240px]",
    title: "We are relentless",
    body: "Never sit still. We are obsessed with what's next and what's possible, always looking forward.",
  },
];

export function ValuesGrid() {
  return (
    <section className="bg-surface-tertiary pb-36">
      <div className="container-page pt-24">
        <h2 className="font-heading text-[40px] md:text-[48px] font-normal leading-[1.15] tracking-[-0.01em] text-text-primary text-center text-balance">
          Our values make us
        </h2>
      </div>

      <div className="mx-[calc(50%-50vw)] w-screen mt-16">
        <div className="flex flex-col md:flex-row md:flex-nowrap">
          {values.map((value, i) => (
            <div
              key={value.title}
              className={`flex-1 min-w-[16rem] min-h-[272px] mix-blend-multiply text-text-primary px-9 py-16 flex flex-col ${value.bgClass} ${value.radiusClass} md:min-w-0 ${
                i === 0
                  ? "md:ml-[max(2.5rem,calc(50vw-42rem))]"
                  : "md:-ml-6"
              }`}
            >
              <h3 className="font-heading text-[32px] font-normal leading-[1.2] tracking-[-0.01em]">
                {value.title}
              </h3>
              <p className="mt-3 text-[22px] leading-[1.25] max-w-[15rem]">
                {value.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
