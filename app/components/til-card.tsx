import { Link } from "@heroui/link"
import { Card, CardHeader } from "@heroui/card"
import { Chip } from "@heroui/chip"

interface TILCardProps {
  urlSlug: string;
  title: string;
  date: string;
  tags: string[];
}  

export function TILCard(props: TILCardProps) {
  if (!props.title || !props.urlSlug) {
    return null
  }

  return (
    <Card as={Link} className="col-span-12 sm:col-span-4" href={props.urlSlug}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <h3 className="text-white font-medium text-large">{props.title}</h3>
          <p className="text-white text-small">{props.date}</p>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          {props.tags.length > 0 ? (
            props.tags.map((tag) => (
              <Chip key={tag} color="primary" size="sm">{tag}</Chip>
            ))
          ) : null}
        </div>
      </CardHeader>
    </Card>
  )
}
