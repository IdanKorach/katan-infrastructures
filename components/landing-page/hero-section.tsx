import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Presentation, RocketIcon, SquareDashedMousePointer, SmilePlus } from 'lucide-react';
import Link from 'next/link';
import StatsCard from './stats-card';

const LiveBadge = () => {
  return <Badge
    variant="outline"
    className="px-4 py-2 mb-8 text-sm
        backdrop-blur-sm"
  >
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute 
            inline-flex h-full w-full rounded-full 
            bg-primary opacity-75"/>
      <span className="relative inline-flex 
            rounded-full h-2 w-2 bg-primary"/>
    </span>
    <span className="text-muted-foreground">
      מוכנים לאתגר הבא שלנו
    </span>
  </Badge>
}

const statsData = [
  {
    icon: RocketIcon,
    value: "500+",
    label: "פרוייקטים הושלמו",
  },
  {
    icon: SmilePlus,
    value: "300+",
    label: "לקוחות מרוצים",
    hasBorder: true,
  },
  {
    icon: SquareDashedMousePointer,
    value: "40+",
    label: "שנות ניסיון",
  }
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden
    bg-linear-to-b">
      <div className="wrapper">
        <div className="flex flex-col items-center
        justify-center lg:py-24 py-12 text-center">
          <LiveBadge />
          <h1 className="text-3xl sm:text-4xl
          lg:text-6xl font-bold tracking-tight mb-6
          max-w-5xl">
            המומחים לביצוע עבודות תשתיות בעומקים ובשאיבת מי תהום
          </h1>
          <p className="text-lg sm:text-xl
          text-muted-foreground mb-10 max-w-2xl
          leading-relaxed">
            בחברת קטן תשתיות אנחנו מתמחים בעבודות בעומק האדמה שדורשות ידע, נסיון וטכנולוגיה מתקדמת.
            עם צוות מקצועי ומנוסה, אנו מבצעים מגוון עבודות תשתיות כולל חפירות, הקמת מערכות ניקוז, ושאיבת מי תהום בצורה בטוחה ויעילה.
            אצלנו בקטן תשתיות, הבטיחות והאיכות הם בראש סדר העדיפויות שלנו, ואנו מחויבים לספק פתרונות מותאמים אישית לכל פרויקט
          </p>
          <div className="flex flex-col sm:flex-row
          gap-4 mb-16">
            <Button asChild size="lg"
              className="text-base px-8 shadow-lg">
              <Link href="/contact-us">
                <SquareDashedMousePointer className="size-5" />
                להזמנת עבודה ויצירת קשר
              </Link>
            </Button>
            <Button asChild size="lg"
              className="text-base px-8 shadow-lg"
              variant="secondary">
              <Link href="/gallery">
                לגלריית הפרוייקטים
                <Presentation className="size-5" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1
          sm:grid-cols-3 gap-8 sm:gap-12 max-w-2xl
          w-full">
            {statsData.map((stat) => (
              <StatsCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}