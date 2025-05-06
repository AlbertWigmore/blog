import { getAllPosts } from "@/lib/posts";
import { FC } from "react";
import { PostCard  } from "@/app/components/post-card";

const HomePage: FC = () => {
  const posts = getAllPosts();

  return (
    <div>
      <p>A personal blog where I write on various topics from hobbies to work.</p>
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.urlSlug}>
            <PostCard
              title={post.title}
              date={post.date}
              excerpt={post.excerpt}
              tags={post.tags}
              urlSlug={post.urlSlug}
              imageUrl={post.imageUrl}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}


export default function Page() {
  return <HomePage />;
}