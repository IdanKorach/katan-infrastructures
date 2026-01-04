import { HardHat } from "lucide-react"
import Link from "next/link"
import { NavigationBar } from "./navigation-menu"

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 group shrink-0">
      <span className="text-xl font-bold whitespace-nowrap">
        קטן<span className="text-primary"> תשתיות</span>
      </span>      
      <div className="size-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
        <HardHat className="size-5 text-primary-foreground"/>
      </div>
    </Link>
  )
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b
    bg-background/95 backdrop-blur
    supports-backdrop-filter:bg-muted/20">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 flex-row-reverse 
        items-center justify-between gap-8">
          <Logo />
          <NavigationBar />
        </div>
      </div>
    </header>
  )
}