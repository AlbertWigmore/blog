import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

export type Post = {
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
    content?: string;
    urlSlug: string;
}

const postsDirectory = join(process.cwd(), "_posts");

function getPostSlugs(): string[] {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string): Post{
    if (!slug.endsWith(".mdx")) {
      slug = `${slug}.mdx`;
    }

    const fullPath = join(postsDirectory, `${slug}`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const urlPath = slug.replace(/\.mdx$/, "");
    const { data, content } = matter(fileContents);
  
    return { ...data, urlSlug: urlPath, content } as Post;
  }

export function getAllPosts(): Post[] {
    const slugs = getPostSlugs();
    const posts = slugs
      .map((slug) => getPostBySlug(slug))
      // sort posts by date in descending order
      .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
    return posts;
}
