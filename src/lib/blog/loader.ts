import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { blogConfig, buildBlogUrl } from "@/lib/site-config";
import type {
  BlogFaq,
  BlogFrontmatter,
  BlogPostFull,
  BlogPostSummary,
} from "./types";

export type BlogLocale = "en" | "fr";

function contentDirFor(locale: BlogLocale): string {
  return path.join(process.cwd(), "content", "blog", locale);
}

const FRONTMATTER_KEYS: ReadonlySet<keyof BlogFrontmatter> = new Set([
  "title",
  "description",
  "image",
  "imageAlt",
  "category",
  "featured",
  "datePublished",
  "author",
  "authorRole",
  "tags",
]);

function slugFromFilename(filename: string): string {
  return filename.replace(/\.md$/, "");
}

function readingTimeMinutesFromText(text: string): {
  minutes: number;
  words: number;
} {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / blogConfig.wordsPerMinute));
  return { minutes, words };
}

function formatPublishDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function extractFaqsAndBody(html: string): {
  bodyHtml: string;
  faqs: BlogFaq[];
} {
  const faqRegex =
    /<h2[^>]*>\s*(?:FAQ(?:s)?|Frequently Asked Questions|FAQs?|Foire aux questions)\s*<\/h2>([\s\S]*?)(?=<h2|$)/i;
  const match = html.match(faqRegex);

  if (!match) {
    return { bodyHtml: html.trim(), faqs: [] };
  }

  const faqBlock = match[1] ?? "";
  const before = html.slice(0, match.index ?? 0).trim();
  const after = html
    .slice((match.index ?? 0) + match[0].length)
    .trim();

  const questionRegex = /<h3[^>]*>(.*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/gi;
  const faqs: BlogFaq[] = [];
  let q: RegExpExecArray | null;
  while ((q = questionRegex.exec(faqBlock)) !== null) {
    const question = stripHtml(q[1] ?? "").trim();
    const answer = stripHtml(q[2] ?? "").trim();
    if (question && answer) faqs.push({ question, answer });
  }

  const bodyParts: string[] = [];
  if (before) bodyParts.push(before);
  if (after) bodyParts.push(after);
  return { bodyHtml: bodyParts.join("\n").trim(), faqs };
}

function stripHtml(input: string): string {
  return input
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function assertFrontmatter(
  data: Record<string, unknown>,
  slug: string,
  locale: BlogLocale,
): BlogFrontmatter {
  for (const key of ["title", "description", "image", "imageAlt", "category", "datePublished", "author", "authorRole"] as const) {
    if (typeof data[key] !== "string" || data[key] === "") {
      throw new Error(
        `Blog post [${locale}] "${slug}" is missing required frontmatter field "${key}"`,
      );
    }
  }
  const tags = Array.isArray(data.tags) ? data.tags.filter((t): t is string => typeof t === "string") : [];
  return {
    title: data.title as string,
    description: data.description as string,
    image: data.image as string,
    imageAlt: data.imageAlt as string,
    category: data.category as string,
    featured: Boolean(data.featured),
    datePublished: data.datePublished as string,
    author: data.author as string,
    authorRole: data.authorRole as string,
    tags,
  };
}

async function readPostFile(
  slug: string,
  locale: BlogLocale,
): Promise<BlogPostFull> {
  const filePath = path.join(contentDirFor(locale), `${slug}.md`);
  const raw = await fs.readFile(filePath, "utf-8");
  const parsed = matter(raw);

  const frontmatter = assertFrontmatter(
    parsed.data as Record<string, unknown>,
    slug,
    locale,
  );

  for (const key of Object.keys(parsed.data)) {
    if (!FRONTMATTER_KEYS.has(key as keyof BlogFrontmatter)) {
      console.warn(
        `[blog] Unknown frontmatter key "${key}" in ${locale}/${slug}.md (allowed: ${[...FRONTMATTER_KEYS].join(", ")})`,
      );
    }
  }

  const rendered = marked.parse(parsed.content, {
    gfm: true,
    breaks: false,
    async: false,
  });

  const { bodyHtml, faqs } = extractFaqsAndBody(rendered);
  const { minutes, words } = readingTimeMinutesFromText(parsed.content);

  return {
    slug,
    locale,
    href: buildBlogUrl(slug, locale),
    title: frontmatter.title,
    description: frontmatter.description,
    image: frontmatter.image,
    imageAlt: frontmatter.imageAlt,
    category: frontmatter.category,
    featured: frontmatter.featured ?? false,
    datePublished: frontmatter.datePublished,
    datePublishedLabel: formatPublishDate(frontmatter.datePublished),
    author: frontmatter.author,
    authorRole: frontmatter.authorRole,
    tags: frontmatter.tags,
    readingTimeMinutes: minutes,
    wordCount: words,
    bodyHtml,
    faqs,
  };
}

const cache = new Map<BlogLocale, BlogPostFull[]>();

async function loadAllPostsUncached(locale: BlogLocale): Promise<BlogPostFull[]> {
  const dir = contentDirFor(locale);
  if (!(await fs.stat(dir).catch(() => null))) {
    return [];
  }
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const slugs = entries
    .filter((e) => e.isFile() && e.name.endsWith(".md"))
    .map((e) => slugFromFilename(e.name))
    .sort();

  const posts = await Promise.all(slugs.map((slug) => readPostFile(slug, locale)));

  posts.sort(
    (a, b) =>
      new Date(b.datePublished).getTime() -
      new Date(a.datePublished).getTime(),
  );

  return posts;
}

export async function getAllBlogPosts(locale: BlogLocale = "en"): Promise<BlogPostFull[]> {
  if (!cache.has(locale)) {
    cache.set(locale, await loadAllPostsUncached(locale));
  }
  return cache.get(locale) ?? [];
}

export async function getAllBlogSummaries(locale: BlogLocale = "en"): Promise<BlogPostSummary[]> {
  const posts = await getAllBlogPosts(locale);
  return posts.map((p) => toSummary(p));
}

export async function getAllSlugs(locale: BlogLocale = "en"): Promise<string[]> {
  const posts = await getAllBlogPosts(locale);
  return posts.map((p) => p.slug);
}

export async function getBlogPost(
  slug: string,
  locale: BlogLocale = "en",
): Promise<BlogPostFull | null> {
  const posts = await getAllBlogPosts(locale);
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getRelatedPosts(
  slug: string,
  locale: BlogLocale = "en",
  limit: number = blogConfig.relatedLimit,
): Promise<BlogPostSummary[]> {
  const posts = await getAllBlogPosts(locale);
  const current = posts.find((p) => p.slug === slug);
  if (!current) return [];

  const sameCategory = posts.filter(
    (p) => p.slug !== slug && p.category === current.category,
  );
  const others = posts.filter(
    (p) =>
      p.slug !== slug &&
      p.category !== current.category,
  );

  return [...sameCategory, ...others]
    .slice(0, limit)
    .map(toSummary);
}

export async function getFeaturedPost(locale: BlogLocale = "en"): Promise<BlogPostSummary | null> {
  const posts = await getAllBlogPosts(locale);
  const featured = posts.find((p) => p.featured) ?? posts[0];
  return featured ? toSummary(featured) : null;
}

function toSummary(post: BlogPostFull): BlogPostSummary {
  return {
    slug: post.slug,
    locale: post.locale,
    title: post.title,
    description: post.description,
    image: post.image,
    imageAlt: post.imageAlt,
    category: post.category,
    featured: post.featured,
    datePublished: post.datePublished,
    datePublishedLabel: post.datePublishedLabel,
    readingTimeMinutes: post.readingTimeMinutes,
    href: post.href,
  };
}
