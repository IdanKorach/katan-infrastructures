"use client"

import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex-wrap">
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/contact-us">צור קשר</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/gallery">גלרייה</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/equipment-rental">ציוד למכירה והשכרה</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger>שירותים</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4 text-right">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/infrastructure">ביצוע עבודות כבישים, ביוב, ניקוז ומים</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/equipment-rental">השכרת ומכירת ציוד דיפון לחפירות בעומק</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/trench-shoring">עבודות שיגומים</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/groundwater">עבודות במי תהום</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/about">אודות</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
