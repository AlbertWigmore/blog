import { getAllPosts, getAllTILs } from "@/lib/content";
import { PostCard } from "@/app/components/post-card";
import { TILCard } from "@/app/components/til-card";

export default function Page() {
  const posts = getAllPosts();
  const tils = getAllTILs();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Posts</h2>
          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <PostCard
                key={post.urlSlug}
                title={post.title}
                date={post.date}
                imageUrl={post.imageUrl}
                urlSlug={post.urlSlug}
                tags={post.tags}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">TILs</h2>
          <div className="flex flex-col gap-4">
            {tils.map((til) => (
              <TILCard
                key={til.urlSlug}
                title={til.title}
                date={til.date}
                tags={til.tags}
                urlSlug={til.urlSlug}
              />
            ))}
          </div>
        </div>
    </div>
  );
}