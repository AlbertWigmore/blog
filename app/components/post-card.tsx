import { Link } from "@heroui/link"
import { Card, CardHeader, CardFooter } from "@heroui/card"
import { Image } from "@heroui/image"
import { Chip } from "@heroui/chip"

interface PostCardProps {
  urlSlug: string;
  title: string;
  date: string;
  imageUrl: string;
  tags: string[];
  published?: boolean;
}  

export function PostCard(props: PostCardProps) {
  if (!props.title || !props.urlSlug || !props.imageUrl) {
    return null
  }

  return (
    <Card as={Link} className="col-span-12 sm:col-span-4 h-[250px]" href={props.urlSlug}>
      <CardHeader className="absolute z-10 top-1 flex-col !items-start">
        <h3 className="text-white font-medium text-large">{props.title}</h3>
        <p className="text-white/80 text-small">{props.date}</p>
      </CardHeader>
      <Image
        removeWrapper={true}
        width="100%"
        height="100%"
        alt="Card background"
        style={{ objectFit: "cover", zIndex: 0 }}
        src={props.imageUrl}
      />
      <CardFooter>
        {props.tags.length > 0 ? (
          <div className="flex flex-wrap gap-2 mt-2">
            {props.tags.map((tag) => (
              <Chip key={tag} color="primary" size="sm">{tag}</Chip>
            ))}
          </div>
        ) : null}
      </CardFooter>
    </Card>
  )
}
