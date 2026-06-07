import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { getDict } from "@/lib/i18n/dict";
import { Footer } from "@/components/footer";

export default function BlogPostNotFoundFR() {
  const dict = getDict("fr");
  return (
    <>
      <Navbar dict={dict.nav} locale="fr" multiStepForm={dict.multiStepForm} />
      <main
        id="main"
        tabIndex={-1}
        className="container-page section-y text-center"
      >
        <span className="inline-flex w-fit mx-auto items-center rounded-full bg-text-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-surface-primary">
          404
        </span>
        <h1 className="heading-display text-3xl md:text-5xl mt-6">
          {dict.blogPost.notFoundTitle}
        </h1>
        <p className="body-lg mt-4 max-w-xl mx-auto">
          {dict.blogPost.notFoundDescription}
        </p>
        <p className="mt-8">
          <Link
            href="/fr/blog"
            className="link-underline font-semibold text-text-primary"
          >
            ← {dict.blogPost.backToBlog}
          </Link>
        </p>
      </main>
      <Footer dict={dict.footer} locale="fr" />
    </>
  );
}
