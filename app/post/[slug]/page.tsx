import { getPostBySlug } from '@/lib/posts'
import markdownToHtml from "@/lib/markdown";
// TODO: Function to get all MDX files in the blog directory with front matter interface
// TOOD: add basic component to display a single blog post

// https://nextjs.org/docs/app/guides/mdx#using-dynamic-imports

// Create a post component to display a single blog post with props for title, date, content, and tags
function Post({ props, content }: { props: { title: string, date: string }, content: string }) {
  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.date}</p>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

export default async function Page({params}: {params: Promise<{ slug: string }>}) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  const content = await markdownToHtml(post.content || "");
  return Post({
    props: { title: post.title, date: post.date },
    content,
  })
}
 