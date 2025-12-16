import { HardHat, InfoIcon } from "lucide-react"
import Link from "next/link"
import { NavigationMenuDemo } from "./navigation-menu"

const Logo = () => {
  return (
    <Link href="/" className="flex  
    items-center gap-2 group">
      <span className="text-xl font-bold">
        קטן<span className="text-primary"> תשתיות</span>
      </span>      
      <div className="size-8 rounded-lg bg-primary flex
      items-center justify-center">
        <HardHat className="size-5 
        text-primary-foreground"/>
      </div>
    </Link>

  )
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b
    bg-background/95 backdrop-blur
    supports-backdrop-filter:bg-muted/20">
      <div className="wrapper px-12">
        <div className="flex h-16 flex-row-reverse 
        items-center justify-between">
          <Logo />
          <NavigationMenuDemo />
        </div>
      </div>
    </header>
  )
}