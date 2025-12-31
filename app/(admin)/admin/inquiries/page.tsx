import { db } from "@/db"
import { inquiriesTable } from "@/db/schema"
import { desc } from "drizzle-orm"
import { InquiriesTable } from "./inquiries-table"

export default async function InquiriesPage() {
  const inquiries = await db
    .select()
    .from(inquiriesTable)
    .orderBy(desc(inquiriesTable.createdAt))

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">פניות</h1>
      <InquiriesTable data={inquiries} />
    </div>
  )
}