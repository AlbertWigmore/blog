import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postName = "post";
const tilName = "til";
const postsDirectory = join(process.cwd(), `_${postName}`);
const tilDirectory = join(process.cwd(), `_${tilName}`);

export type PostType = {
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
    imageUrl?: string;
    published?: boolean;
    urlSlug: string;
    content?: string;
    nextSlug: string | null;
    prevSlug: string | null;
}

export type TILType = {
    title: string;
    date: string;
    tags: string[];
    published?: boolean;
    content?: string;
    urlSlug: string;
    nextSlug: string | null;
    prevSlug: string | null;
}

function getSlugs(type: string): string[] {
  if (type === postName) {
    return fs.readdirSync(postsDirectory);
  }
  if (type === tilName) {
    return fs.readdirSync(tilDirectory);
  }
  throw new Error(`Invalid type: ${type}, no corresponding directory` );
}

function getSlugContent(type: string, slug: string): { data: Record<string, unknown>; urlPath: string; content: string; published: boolean } {
  if (!slug.endsWith(".mdx")) {
    slug = `${slug}.mdx`;
  }

  const dir = type === postName ? postsDirectory : tilDirectory;
  const fullPath = join(dir, `${slug}`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  let urlPath = slug.replace(/\.mdx$/, "");
  urlPath = `${type}/` + urlPath;
  const { data, content } = matter(fileContents);
  const meta = data as Record<string, unknown>;
  const published = meta["published"] === undefined ? false : Boolean(meta["published"]);
  return { data: meta, urlPath, content, published };
}

function getNextPrevSlugs(type: string, slug: string): { nextSlug: string | null; prevSlug: string | null } {
  const slugs = getSlugs(type);
  const index = slugs.indexOf(`${slug}.mdx`);
  let nextSlug = index === 0 ? null : slugs[index - 1];
  let prevSlug = index === slugs.length - 1 ? null : slugs[index + 1];
  
  if (nextSlug) {
    nextSlug = `/${type}/${nextSlug.replace(/\.mdx$/, "")}`;
  }
  
  if (prevSlug) {
    prevSlug = `/${type}/${prevSlug.replace(/\.mdx$/, "")}`;
  }
  return { nextSlug, prevSlug };
}

export function getPostBySlug(slug: string): PostType {
  const { data, urlPath, content, published } = getSlugContent(postName, slug);
  const { nextSlug, prevSlug } = getNextPrevSlugs(postName, slug);
  const meta = data as Record<string, unknown>;
  const title = String(meta["title"] ?? "");
  const date = String(meta["date"] ?? "");
  const excerpt = String(meta["excerpt"] ?? "");
  const tags = (meta["tags"] as string[] | undefined) ?? [];
  const imageUrl = (meta["imageUrl"] as string | undefined) ?? undefined;
  return {
    title,
    date,
    excerpt,
    tags,
    imageUrl,
    published,
    urlSlug: urlPath,
    nextSlug: nextSlug,
    prevSlug: prevSlug,
    content,
  };
}

export function getTILBySlug(slug: string): TILType {
  const { data, urlPath, content, published } = getSlugContent(tilName, slug);
  const { nextSlug, prevSlug } = getNextPrevSlugs(tilName, slug);
  const meta = data as Record<string, unknown>;
  const title = String(meta["title"] ?? "");
  const date = String(meta["date"] ?? "");
  const tags = (meta["tags"] as string[] | undefined) ?? [];
  return {
    title,
    date,
    tags,
    published,
    urlSlug: urlPath,
    nextSlug: nextSlug,
    prevSlug: prevSlug,
    content,
  };
}

export function getAllPosts(): PostType[] {
    const slugs = getSlugs(postName);
    const posts = slugs
      .map((slug) => getPostBySlug(slug))
      .filter((post) => post.published)
      .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
    return posts;
}

export function getAllTILs(): TILType[] {
    const slugs = getSlugs(tilName);
    const tils = slugs
      .map((slug) => getTILBySlug(slug))
      .filter((til) => til.published)
      .sort((til1, til2) => (til1.date > til2.date ? -1 : 1));
    return tils;
}
