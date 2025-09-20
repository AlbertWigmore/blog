import { Button } from '@heroui/button';
import { BackwardIcon, ForwardIcon } from '@heroicons/react/24/solid';
import { Link } from '@heroui/link'

export function Content({ props, content }: { props: { title: string, date: string, nextSlug: string | null, prevSlug: string | null }, content: string }): JSX.Element {
    return (
      <div>
        <h1>{props.title}</h1>
        <p>{props.date}</p>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <div className="flex justify-between">
          {props.prevSlug && (
            <Link href={props.prevSlug}>
              <Button variant="solid" startContent={<BackwardIcon />}>
                Prev
              </Button>
            </Link>
          )}
          {props.nextSlug && (
            <Link href={props.nextSlug}>
              <Button variant="solid" endContent={<ForwardIcon />}>
                Next
              </Button>
            </Link>
          )}
        </div>
      </div>
    )
  }