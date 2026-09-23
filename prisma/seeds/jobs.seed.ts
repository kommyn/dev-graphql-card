import { PrismaClient } from '../../src/generated/prisma/client';
import { requireSkillId, SkillIds } from './utils/skill-ids';
import data from './data/jobs.json';

export async function seedJobs(
  prisma: PrismaClient,
  profileId: string,
  skillIds: SkillIds,
) {
  for (const job of data) {
    const attributes = {
      name: job.name,
      jobTitle: job.jobTitle,
      dateStart: new Date(job.dateStart),
      dateEnd: job.dateEnd ? new Date(job.dateEnd) : null,
      achievements: job.achievements,
      profileId,
    };

    await prisma.job.upsert({
      where: { id: job.id },
      create: { id: job.id, ...attributes },
      update: attributes,
    });

    await prisma.skillsOnJobs.createMany({
      data: job.skills.map((name) => ({
        jobId: job.id,
        skillId: requireSkillId(skillIds, name),
      })),
      skipDuplicates: true,
    });
  }

  console.log(`jobs: ${data.length} upserted with their skills`);
}
