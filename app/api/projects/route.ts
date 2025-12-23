// export async function GET() {
//   try {
//     const { db } = await import('@/db')
//     const { projectsTable } = await import('@/db/schema')
    
//     const projects = await db.select().from(projectsTable)
//     return Response.json(projects)
//   } catch (error) {
//     console.error('API Error:', error)
//     return Response.json({ error: String(error) }, { status: 500 })
//   }
// }