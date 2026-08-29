import { Button } from "@heroui/button";
import { GithubIcon, LinkedInIcon } from "@/app/components/icons";

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
    <div className="flex flex-col gap-6 max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold">About Me</h1>

      <p className="text-lg leading-relaxed text-default-700">
        Hi, I&apos;m Albert — a software engineer who enjoys building things and tinkering with new tools.
        This blog is where I share posts on hobbies and work, plus short TIL (today I learned) notes. Thanks for stopping by!
      </p>

      <div className="flex flex-col gap-3">
        <ul className="flex flex-row gap-4">
          {socialLinks.map(({ name, href, Icon }) => (
              <Button
                as="a"
                isExternal
                href={href}
                isIconOnly
                aria-label={name}
                variant="bordered"
                radius="full"
                size="lg"
                className="w-12 h-12 min-w-0 p-0"
              >
              <Icon className="w-5 h-5" />
              </Button>
          ))}
        </ul>
      </div>
    </div>
  );
}
