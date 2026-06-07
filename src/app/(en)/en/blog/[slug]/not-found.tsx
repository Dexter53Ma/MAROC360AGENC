import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { getDict } from "@/lib/i18n/dict";
import { Footer } from "@/components/footer";

export default function BlogPostNotFound() {
  return (
    <>
      <Navbar dict={getDict("en").nav} locale="en" multiStepForm={getDict("en").multiStepForm} />
      <main id="main" tabIndex={-1} className="container-page section-y text-center">
        <div className="mx-auto max-w-2xl flex flex-col items-center gap-6">
          <span className="inline-flex w-fit items-center rounded-full bg-text-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-surface-primary">
            404
          </span>
          <h1 className="heading-display text-3xl md:text-5xl text-text-primary">
            We couldn&apos;t find that article
          </h1>
          <p className="body-lg text-text-secondary max-w-xl">
            The article you&apos;re looking for might have been moved, renamed, or never existed. Browse our latest resources below.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Link
              href="/en/blog"
              className="press inline-flex items-center justify-center gap-2 rounded-full bg-text-primary px-5 py-3 text-sm font-semibold text-surface-primary"
            >
              Browse all articles
            </Link>
            <Link
              href="/en/contact"
              className="press inline-flex items-center justify-center gap-2 rounded-full border border-text-primary/20 bg-surface-tertiary px-5 py-3 text-sm font-semibold text-text-primary"
            >
              Contact us
            </Link>
          </div>
        </div>
      </main>
      <Footer dict={getDict("en").footer} locale="en" />
    </>
  );
}
