"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, ChevronDown } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Desktop Navigation
export function NavigationBar() {
  return (
    <>
      {/* Desktop Menu - hidden on mobile */}
      <NavigationMenu className="hidden lg:flex">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/contact-us">צור קשר</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/gallery">גלרייה</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/equipment-rental">ציוד למכירה והשכרה</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>שירותים</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[280px] gap-2 p-4 text-right">
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/infrastructure"
                      className="block p-2 hover:bg-muted rounded-md"
                    >
                      ביצוע עבודות כבישים, ביוב, ניקוז ומים
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/equipment-rental"
                      className="block p-2 hover:bg-muted rounded-md"
                    >
                      השכרת ומכירת ציוד דיפון לחפירות בעומק
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/trench-shoring"
                      className="block p-2 hover:bg-muted rounded-md"
                    >
                      עבודות שיגומים
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/groundwater"
                      className="block p-2 hover:bg-muted rounded-md"
                    >
                      עבודות במי תהום
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/about">אודות</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Mobile Menu */}
      <MobileNav />
    </>
  );
}

// Mobile Navigation
function MobileNav() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // lg breakpoint
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="lg:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="size-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px] p-0">
        <SheetTitle className="sr-only">תפריט ניווט</SheetTitle>
        <div dir="rtl" className="h-full">
          <nav className="flex flex-col pt-12">
            <Link
              dir="rtl"
              href="/about"
              onClick={closeMenu}
              className="flex items-center px-6 py-3 text-sm font-medium hover:bg-accent transition-colors"
            >
              אודות
            </Link>

            {/* Services Collapsible */}
            <Collapsible open={servicesOpen} onOpenChange={setServicesOpen}>
              <CollapsibleTrigger className="flex items-center gap-2 w-full px-6 py-3 text-sm font-medium hover:bg-accent transition-colors">
                <ChevronDown
                  className={`size-4 transition-transform duration-200 ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
                />
                שירותים
              </CollapsibleTrigger>
              <CollapsibleContent className="bg-muted/50">
                <div className="flex flex-col">
                  <Link
                    href="/infrastructure"
                    onClick={closeMenu}
                    className="px-8 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  >
                    ביצוע עבודות כבישים, ביוב, ניקוז ומים
                  </Link>
                  <Link
                    href="/equipment-rental"
                    onClick={closeMenu}
                    className="px-8 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  >
                    השכרת ומכירת ציוד דיפון לחפירות בעומק
                  </Link>
                  <Link
                    href="/trench-shoring"
                    onClick={closeMenu}
                    className="px-8 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  >
                    עבודות שיגומים
                  </Link>
                  <Link
                    href="/groundwater"
                    onClick={closeMenu}
                    className="px-8 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  >
                    עבודות במי תהום
                  </Link>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Link
              href="/equipment-rental"
              onClick={closeMenu}
              className="flex items-center px-6 py-3 text-sm font-medium hover:bg-accent transition-colors"
            >
              ציוד למכירה והשכרה
            </Link>
            <Link
              href="/gallery"
              onClick={closeMenu}
              className="flex items-center px-6 py-3 text-sm font-medium hover:bg-accent transition-colors"
            >
              גלרייה
            </Link>
            <Link
              href="/contact-us"
              onClick={closeMenu}
              className="flex items-center px-6 py-3 text-sm font-medium hover:bg-accent transition-colors"
            >
              צור קשר
            </Link>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
