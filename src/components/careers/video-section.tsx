import Image from "next/image";

export function VideoSection() {
  return (
    <section className="bg-surface-tertiary pt-16">
      <div className="container-page">
        <div className="rounded-2xl overflow-hidden">
          <Image
            src="https://cdn.prod.website-files.com/682d7fad3c89203197a56faa/6850610bde83d5cb6e3e8044_IMG_3632%20(1).avif"
            alt="The Maroc 360 team together outdoors"
            width={3815}
            height={2226}
            sizes="(max-width: 1344px) 100vw, 1344px"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}
