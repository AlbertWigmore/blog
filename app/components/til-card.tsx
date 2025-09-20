import { Link } from "@heroui/link"
import { Card, CardHeader } from "@heroui/card"
import { Chip } from "@heroui/chip"

interface TILCardProps {
  title: string;
  date: string;
  tags: string[];
  urlSlug: string;
}  

export function TILCard(props: TILCardProps): JSX.Element {
  return (
  <Card isPressable as={Link} className="col-span-12 sm:col-span-4" href={props.urlSlug}>
    <CardHeader className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <h3 className="text-white font-medium text-large">{props.title}</h3>
        <p className="text-white text-small">{props.date}</p>
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        {props.tags.map((tag) => (
          <Chip key={tag} color="primary">
            {tag}
          </Chip>
        ))}
      </div>
    </CardHeader>
  </Card>
  )
}
