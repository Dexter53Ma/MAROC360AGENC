import Link from "next/link";

export function Breadcrumbs() {
  return (
    <section className="bg-[#FFE228]">
      <div className="container-page">
        <div className="py-4">
          <Link
            href="/en/careers"
            className="text-sm text-text-primary no-underline"
          >
            Careers
          </Link>
        </div>
      </div>
    </section>
  );
}
