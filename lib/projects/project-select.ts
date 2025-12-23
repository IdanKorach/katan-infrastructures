import { db } from "@/db";
import { projectsTable } from "@/db/schema";

export async function getRecentlyLunchedProjects() {

    const projectsData = await db.select().from
    (projectsTable);

    return projectsData;
}