import type { BlogPostFull } from "@/lib/blog/types";
import type { BlogPostDict } from "@/lib/i18n/dict.types";

export function BlogArticle({
  post,
  dict,
}: {
  post: BlogPostFull;
  dict: BlogPostDict;
}) {
  return (
    <article
      className="blog-article mx-auto max-w-3xl"
      itemScope
      itemType="https://schema.org/Article"
    >
      <meta itemProp="datePublished" content={post.datePublished} />
      <meta itemProp="author" content={post.author} />

      <div
        className="blog-prose"
        dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
      />

      {post.faqs.length > 0 ? (
        <section
          className="mt-12 md:mt-16"
          itemScope
          itemType="https://schema.org/FAQPage"
        >
          <h2 className="heading-display text-2xl md:text-3xl text-text-primary mb-6">
            {dict.faqTitle}
          </h2>
          <div className="flex flex-col gap-4">
            {post.faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-text-primary/10 bg-surface-tertiary px-5 py-4"
              >
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 text-base md:text-lg font-semibold text-text-primary">
                  <span>{faq.question}</span>
                  <span
                    aria-hidden
                    className="grid size-7 place-items-center rounded-full bg-text-primary text-surface-primary text-sm transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-text-secondary leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
