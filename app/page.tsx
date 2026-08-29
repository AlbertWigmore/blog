import { getAllPosts, getAllTILs } from "@/lib/content";
import { PostCard } from "@/app/components/post-card";
import { TILCard } from "@/app/components/til-card";
import { Image } from "@heroui/image";

export default function Page() {
  const posts = getAllPosts();
  const tils = getAllTILs();

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center">
        <Image
          isBlurred
          alt="Its my face"
          className="m-5"
          src="/profile.webp"
          width={200}
          height={200}
        />
        <p className="text-center p-10">I&apos;m Albert, this is my personal blog where I write on various topics from hobbies to work.</p>
      </div>

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
    </div>
  );
}
