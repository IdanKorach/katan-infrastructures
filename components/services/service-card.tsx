import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarIcon } from "lucide-react";

interface Service {
  id: number;
  name: string;
  description: string;
  tags: string[];
  isFeatured: boolean;
}

export default function ServiceCard({ service }: {
  service: Service
}) {
  return (
    <Link href={`/services/${service.id}`}>
      <Card className="group card-hover
      hover:bg-primary-foreground/10 border-solid
      border-gray-400 min-h-[180px]">
        <CardHeader className="flex-1">
          <div className="items-center gap-4">
            <div className="flex items-center justify-between gap-4">
              <CardTitle className="inline text-lg
              group-hover:text-primary
              transition-colors">
                {service.name}
              </CardTitle>
              {service.isFeatured && (
                <Badge className="gap-2 bg-primary
                text-primary-foreground">
                  <StarIcon className="size-3
                  fill-current" />
                  מומלץ
                </Badge>
              )}
            </div>
            <CardDescription>{service.description}
            </CardDescription>
          </div>
        </CardHeader>
        <CardFooter>
          <div className="flex items-center gap-2">
            {service.tags.map((tag) => (
              <Badge variant="secondary" key={tag}>
                {tag}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
