import { getAllPosts } from "@/lib/posts";
import { FC } from "react";

const HomePage: FC = () => {
  const posts = getAllPosts();

  return (
    <div>
      <h1>AstroBertie&apos;s Blog</h1>
      <p>A personal blog where I write on various topics from hobbies to work.</p>

      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.urlSlug}>
            <a href={`/post/${post.urlSlug}`}>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default function Page() {
  return <HomePage />;
}