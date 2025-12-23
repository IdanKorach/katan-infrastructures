import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { getRecentlyLunchedProjects } from "@/lib/projects/project-select"

export default async function ProjectsCarousel() {
  const projects = await getRecentlyLunchedProjects();
  
  return (
    <div dir="ltr">
      <Carousel className="w-full max-w-4xl">
        <CarouselContent>
          {projects.map((project) => (
            <CarouselItem key={project.id}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col items-center justify-center h-100 relative">
                    <Image 
                      src={project.imageUrl} 
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
                      <h3 className="font-semibold">{project.title}</h3>
                      <p className="text-sm">{project.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}