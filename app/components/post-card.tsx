import { Link } from "@heroui/link"
import { Card, CardHeader, CardFooter } from "@heroui/card"
import { Image } from "@heroui/image"
import { Chip } from "@heroui/chip"

interface PostCardProps {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  imageUrl: string;
  urlSlug: string;
}  

export function PostCard(props: PostCardProps): JSX.Element {
  return (
  <Card isPressable as={Link} className="col-span-12 sm:col-span-4 h-[300px]" href={props.urlSlug}>
    <CardHeader className="absolute z-10 top-1 flex-col !items-start">
      <h3 className="text-white font-medium text-large">{props.title}</h3>
      <p className="text-white/80 text-small">{props.date}</p>
    </CardHeader>
    <Image
      removeWrapper
      alt="Card background"
      className="z-0 w-full h-full object-cover"
      // TODO: add image to front matter
      src={props.imageUrl}
    />
    <CardFooter className="absolute bottom-0 z-10 justify-between">
      <div className="flex flex-wrap gap-2 mt-2">
        {props.tags.map((tag) => (
          <Chip key={tag} color="primary">
            {tag}
          </Chip>
        ))}
      </div>
    </CardFooter>
  </Card>
  )
}
