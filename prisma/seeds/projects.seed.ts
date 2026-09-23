import { PrismaClient } from '../../src/generated/prisma/client';
import data from './data/projects.json';

export async function seedProjects(prisma: PrismaClient, profileId: string) {
  for (const project of data) {
    const attributes = {
      name: project.name,
      link: project.link,
      achievements: project.achievements,
      profileId,
    };

    await prisma.project.upsert({
      where: { id: project.id },
      create: { id: project.id, ...attributes },
      update: attributes,
    });
  }

  console.log(`projects: ${data.length} upserted`);
}
