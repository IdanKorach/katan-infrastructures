import 'dotenv/config';
import { projectsTable } from '@/db/schema';
import { sampleProjects } from '@/db/data';
import { drizzle } from 'drizzle-orm/neon-http';

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  console.log("Seeding database with sample projects...");

  await db.delete(projectsTable);
  console.log("Cleared existing projects.");
  
  for (const project of sampleProjects) {
    await db.insert(projectsTable).values({
      title: project.title,
      description: project.description,
      location: project.location,
      serviceType: project.serviceType,
      imageUrl: project.imageUrl,
    });
    console.log(`Inserted project: ${project.title}`);
  }

  console.log("Database seeding completed.");
}

main()
  .catch((error) => {
    console.error("Error during database seeding:", error);
    process.exit(1);
  })
  .finally(() => {
    console.log("Seeding script finished.");
    process.exit(0);
  });
