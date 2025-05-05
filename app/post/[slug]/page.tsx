'use client'

// TODO: Function to get all MDX files in the blog directory with front matter interface
// TOOD: add basic component to display a single blog post

// https://nextjs.org/docs/app/guides/mdx#using-dynamic-imports

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { default: Post } = await import(`@/_posts/${slug}.mdx`)
  return <Post />
}
 