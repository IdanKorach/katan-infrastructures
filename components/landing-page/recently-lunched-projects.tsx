import SectionHeader from "@/components/common/section-header";
import { ArrowUpRightIcon, HammerIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProjectsCarousel from "@/components/projects/projects-carousel";

export default function RecentlyLunchedProjects() {
  return (
    <section className="py-20">
      <div className="wrapper">
        <div
          className="flex items-center
        justify-between mb-8"
        >
          <SectionHeader
            title="פרוייקטים אחרונים"
            icon={HammerIcon}
            description="הנה כמה מהפרוייקטים שהשקנו לאחרונה"
          />
          <Button variant="outline" asChild className="hidden sm:flex">
            <Link href="/explore">
              View All <ArrowUpRightIcon className="size-4" />
            </Link>
          </Button>
        </div>
        <div>
          <ProjectsCarousel />
        </div>
      </div>
    </section>
  );
}
