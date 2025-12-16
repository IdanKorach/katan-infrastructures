import SectionHeader from '@/components/common/section-header';
import { ArrowUpRightIcon, StarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ServiceCard from '@/components/services/service-card';

const featuredServices = [
  {
    id: 1,
    name: "service 1",
    description: "This is service 1",
    tags: ["Tag1", "Tag2"],
    isFeatured: true,
  },
  {
    id: 2,
    name: "service 2",
    description: "This is service 2",
    tags: ["Tag3", "Tag4"],
    isFeatured: false,
  },
];

export default function FeaturedServices() {
  return (
    <section className="py-20 bg-muted/20">
      <div className="wrapper">
        <div className="flex items-center
        justify-between mb-8">
          <SectionHeader
            title="שירותים מובילים"
            icon={StarIcon}
            description="תחומי ההתמחות העיקריים שלנו"
          />
          <Button variant="outline" asChild
          className="hidden sm:flex">
            <Link href="/explore">
              View All <ArrowUpRightIcon 
              className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="grid-wrapper">
          {featuredServices.map((service) => (
            <ServiceCard key={service.id} service=
              {service} />
          ))}
        </div>
      </div>
    </section>
  );
}