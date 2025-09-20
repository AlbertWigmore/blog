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
    imageUrl: string;
    urlSlug: string;
    content?: string;
    nextSlug: string | null;
    prevSlug: string | null;
}

export type TILType = {
    title: string;
    date: string;
    tags: string[];
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

// Disabled due to type returned by matter
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getSlugContent(type: string, slug: string): { data: { [key: string]: any; }; urlPath: string; content: string } {
  if (!slug.endsWith(".mdx")) {
    slug = `${slug}.mdx`;
  }

  const dir = type === postName ? postsDirectory : tilDirectory;
  const fullPath = join(dir, `${slug}`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  let urlPath = slug.replace(/\.mdx$/, "");
  urlPath = `${type}/` + urlPath;
  const { data, content } = matter(fileContents);
  return { data, urlPath, content };
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
  const { data, urlPath, content } = getSlugContent(postName, slug);
  const { nextSlug, prevSlug } = getNextPrevSlugs(postName, slug);
  return {
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    tags: data.tags,
    imageUrl: data.imageUrl,
    urlSlug: urlPath,
    nextSlug: nextSlug,
    prevSlug: prevSlug,
    content,
  };
}

export function getTILBySlug(slug: string): TILType {
  const { data, urlPath, content } = getSlugContent(tilName, slug);
  const { nextSlug, prevSlug } = getNextPrevSlugs(tilName, slug);
  return {
    title: data.title,
    date: data.date,
    tags: data.tags,
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
      .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
    return posts;
}

export function getAllTILs(): TILType[] {
    const slugs = getSlugs(tilName);
    const tils = slugs
      .map((slug) => getTILBySlug(slug))
      .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
    return tils;
}
