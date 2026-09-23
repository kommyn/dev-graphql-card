import { PrismaClient } from '../../src/generated/prisma/client';
import { requireSkillId, SkillIds } from './utils/skill-ids';
import data from './data/profile.json';

export const PROFILE_ID = data.id;

export async function seedProfile(prisma: PrismaClient, skillIds: SkillIds) {
  const attributes = {
    name: data.name,
    description: data.description,
    links: data.links,
  };

  const profile = await prisma.profile.upsert({
    where: { id: data.id },
    create: { id: data.id, ...attributes },
    update: attributes,
  });

  const { count } = await prisma.skillsOnProfile.createMany({
    data: data.skills.map((name) => ({
      profileId: profile.id,
      skillId: requireSkillId(skillIds, name),
    })),
    skipDuplicates: true,
  });

  console.log(`profile: ${profile.name}, ${count} skills linked`);

  return profile;
}
