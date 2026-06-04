interface Step {
  bgClass: string;
  text: string;
}

const steps: Step[] = [
  { bgClass: "bg-[#FFE228]", text: "Introductory call with HR" },
  { bgClass: "bg-[#59E25D]", text: "Hiring manager interview" },
  { bgClass: "bg-[#3A93FF]", text: "Take home case study" },
  { bgClass: "bg-[#E261E5]", text: "On site interviews (4-5 across teams)" },
  { bgClass: "bg-[#FFE228]", text: "Reference call" },
  { bgClass: "bg-[#59E25D]", text: "Offer" },
];

export function InterviewList() {
  return (
    <section className="pt-24 pb-36">
      <div className="container-page">
        <h2 className="font-heading text-[40px] md:text-[48px] font-normal leading-[1.15] tracking-[-0.01em] text-text-primary text-center text-balance">
          Interviewing at Maroc 360
        </h2>
        <p className="mt-6 text-[22px] leading-[1.25] text-text-primary max-w-[48rem] mx-auto text-center">
          We aim to be as transparent and respectful as we can with our hiring practices. Regardless of role, the process typically takes 2-3 weeks from first call to final offer.
        </p>

        <div className="mt-16">
          {steps.map((step) => (
            <div
              key={step.text}
              className="flex items-center gap-3 px-6 min-h-[76px]"
            >
              <div
                className={`w-32 md:w-52 h-6 rounded-full flex-shrink-0 ${step.bgClass}`}
                aria-hidden
              />
              <p className="text-base text-text-primary">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
