import Image from "next/image";

export function HomeIllustration() {
  return (
    <section className="section-y">
      <div className="container-page">
        <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-[3rem] border border-text-primary/15">
          <div className="relative aspect-[4/1] sm:aspect-[1440/360] w-full">
            <Image
              src="/images/home-illus/banner.avif"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 84rem"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
