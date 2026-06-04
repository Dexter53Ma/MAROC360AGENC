import Image from "next/image";

export function PillIllustration() {
  return (
    <section className="section-y overflow-hidden">
      <div className="container-page">
        <div className="relative w-full overflow-hidden rounded-[2.5rem] sm:rounded-[10rem] lg:rounded-[24rem] border border-text-primary/15 aspect-[69.5/39] sm:aspect-[16/9] lg:aspect-[69.5/39]">
          <Image
            src="/images/team/team-meeting.avif"
            alt="A group of professionals smiling and laughing during a casual business meeting near a window, with a bald man in glasses at the center of the image."
            fill
            sizes="(max-width: 768px) 100vw, 84rem"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
