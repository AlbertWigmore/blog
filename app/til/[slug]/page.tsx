import { getTILBySlug } from '@/lib/content'
import markdownToHtml from "@/lib/markdown";
import { Content } from '@/app/components/content'


export default async function Page({params}: {params: Promise<{ slug: string }>}) {
  const { slug } = await params
  const til = getTILBySlug(slug)

  const content = await markdownToHtml(til.content || "");
  return Content({
    props: { title: til.title, date: til.date, nextSlug: til.nextSlug, prevSlug: til.prevSlug },
    content,
  })
}
