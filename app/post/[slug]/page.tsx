import { getAllPosts, getPostBySlug } from '@/lib/content'
import markdownToHtml from "@/lib/markdown";
import { Content } from '@/app/components/content'

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.urlSlug.replace('/post/', ''),
  }));
}

export default async function Page({params}: {params: Promise<{ slug: string }>}) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  const content = await markdownToHtml(post.content || "");
  return (
    <Content
      content={content}
      props={{
        title: post.title,
        date: post.date,
        nextSlug: post.nextSlug,
        prevSlug: post.prevSlug,
      }}
    />
  );
}
