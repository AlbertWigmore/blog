import { Button } from "@heroui/button";
import { GithubIcon, LinkedInIcon } from "@/app/components/icons";
import { Link } from "@heroui/link";
import { Image } from "@heroui/image";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/AlbertWigmore",
    Icon: GithubIcon,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/albert-wigmore-a705ab9b/",
    Icon: LinkedInIcon,
  },
];

export default function Page() {
  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto pt-4 pb-10">
      <h1 className="text-3xl font-bold">About Me</h1>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="shrink-0">
          <Image
            isBlurred
            alt="Albert Wigmore"
            src="/profile.webp"
            width={200}
            height={200}
            className="rounded-md object-cover aspect-square"
          />
        </div>

        <div className="flex flex-col gap-2 flex-1">
          <p className="text-lg leading-relaxed text-default-700">
            Hi, I&apos;m Albert — a software engineer who enjoys building things and tinkering with new tools.
            This blog is where I share posts on hobbies and work, plus short TIL (today I learned) notes. Thanks for stopping by!
          </p>

          <div className="flex flex-col gap-2">
            <ul className="flex flex-row gap-3">
              {socialLinks.map(({ name, href, Icon }) => (
                <Link
                  key={name}
                  as={Button}
                  isIconOnly
                  href={href}
                  variant="bordered"
                  radius="full"
                  size="lg"
                  className="w-12 h-12 p-0 text-inherit hover:bg-background/50 transition-colors duration-150"
                >
                  <Icon className="text-default-500 w-5 h-5" aria-label={name} />
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
