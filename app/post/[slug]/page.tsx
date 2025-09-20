import { getPostBySlug } from '@/lib/content'
import markdownToHtml from "@/lib/markdown";
import { Content } from '@/app/components/content'

export default async function Page({params}: {params: Promise<{ slug: string }>}) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  const content = await markdownToHtml(post.content || "");
  return Content({
    props: { title: post.title, date: post.date, nextSlug: post.nextSlug, prevSlug: post.prevSlug },
    content,
  })
}
 