import Image from "next/image";
import Link from "next/link";
import { ChevronRight12 } from "@/components/icons";

interface BlogPost {
  title: string;
  thumbnail: string;
  thumbnailAlt: string;
  href: string;
  category?: string;
}

const posts: BlogPost[] = [
  {
    title: "ESG: Definition, Criteria and Challenges",
    thumbnail: "/images/blog/post-1.png",
    thumbnailAlt: "Infographic showing the three ESG pillars: Environment, Social, Governance",
    href: "/en/resources/blog/esg-definition-criteria-challenges",
    category: "ESG",
  },
  {
    title: "CSR: A Clear Definition and Scope",
    thumbnail: "/images/blog/post-2.jpeg",
    thumbnailAlt: "Definition and scope of corporate social responsibility in business",
    href: "/en/resources/blog/csr-definition-scope",
    category: "CSR",
  },
  {
    title: "How to integrate CSR into your strategy",
    thumbnail: "/images/blog/post-3.jpeg",
    thumbnailAlt: "Illustration of a company integrating corporate social responsibility into its strategy",
    href: "/en/resources/blog/csr-integration-strategy",
    category: "Strategy",
  },
];

export function BlogPreview() {
  return (
    <section className="section-y">
      <div className="container-page">
        <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl max-w-2xl mb-10">
          Learn more about Ditto &amp; AI-powered CSR compliance
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.href}
              href={post.href}
              className="group flex flex-col gap-4 rounded-3xl overflow-hidden bg-surface-tertiary transition-transform hover:-translate-y-1"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={post.thumbnail}
                  alt={post.thumbnailAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="px-6 pb-6 flex flex-col gap-3">
                {post.category && (
                  <span className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                    {post.category}
                  </span>
                )}
                <h3 className="font-heading text-xl md:text-2xl font-medium leading-snug line-clamp-2">
                  {post.title}
                </h3>
                <span className="inline-flex items-center gap-1 text-sm font-medium mt-2">
                  Read article
                  <ChevronRight12 className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
