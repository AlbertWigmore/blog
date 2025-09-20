import { getAllPosts, getAllTILs } from "@/lib/content";
import { FC } from "react";
import { PostCard } from "@/app/components/post-card";
import { TILCard } from "@/app/components/til-card";
import { Image} from "@heroui/image";

const HomePage: FC = () => {
  const posts = getAllPosts();
  const tils = getAllTILs();

  return (

    <div className="flex flex-col">
      <div className="flex flex-row items-center">
        <Image
          isBlurred
          alt="Its my face"
          className="m-5"
          src="/profile.png"
          width={200}
        />
        <p className="text-center p-10">I&apos;m Albert, this is my personal blog where I write on various topics from hobbies to work.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Posts</h2>
          <div className="overflow-y-auto overflow-hidden h-full" style={{ height: "500px", scrollbarWidth: "none"}}>
            <ul className="space-y-4">
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
        </div>
        
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">TILs</h2>
          <div className="overflow-y-auto overflow-hidden h-full" style={{ height: "500px", scrollbarWidth: "none"}}>
            <ul className="space-y-4">
              {tils.map((til) => (
                <li key={til.urlSlug}>
                  <TILCard
                    title={til.title}
                    date={til.date}
                    tags={til.tags}
                    urlSlug={til.urlSlug}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return <HomePage />;
}