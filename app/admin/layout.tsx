import Link from "next/link"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { UserButton } from "@clerk/nextjs"
import { LayoutDashboard, MessageSquare, FolderOpen } from "lucide-react"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = await auth()

  if (!userId) {
    redirect("/admin/sign-in")
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="flex">
        <aside className="w-64 min-h-screen bg-background border-l p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold">ניהול</h2>
            <UserButton afterSignOutUrl="/" />
          </div>
          <nav className="space-y-2">
            <Link 
              href="/admin" 
              className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg transition-colors"
            >
              <LayoutDashboard className="size-5" />
              דשבורד
            </Link>
            <Link 
              href="/admin/inquiries" 
              className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg transition-colors"
            >
              <MessageSquare className="size-5" />
              פניות
            </Link>
            <Link 
              href="/admin/projects" 
              className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg transition-colors"
            >
              <FolderOpen className="size-5" />
              פרויקטים
            </Link>
          </nav>
        </aside>
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}