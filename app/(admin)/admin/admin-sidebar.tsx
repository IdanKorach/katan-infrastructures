"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import { LayoutDashboard, MessageSquare, FolderOpen } from "lucide-react";
import Link from "next/link";

export default function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" side="right" {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-between p-2">
          <h2 className="text-xl font-bold">ניהול</h2>
          <UserButton afterSignOutUrl="/" />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/admin">
                <LayoutDashboard className="size-5" />
                <span>דשבורד</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/admin/inquiries">
                <MessageSquare className="size-5" />
                <span>פניות</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/admin/projects">
                <FolderOpen className="size-5" />
                <span>פרויקטים</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        {/* Optional: Add footer content here */}
      </SidebarFooter>
    </Sidebar>
  );
}