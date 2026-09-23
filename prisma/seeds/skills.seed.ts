import { PrismaClient } from '../../src/generated/prisma/client';
import { SkillIds } from './utils/skill-ids';
import data from './data/skills.json';

export async function seedSkills(prisma: PrismaClient): Promise<SkillIds> {
  const { count } = await prisma.skill.createMany({
    data,
    skipDuplicates: true,
  });

  const skills = await prisma.skill.findMany({
    select: { id: true, name: true },
  });

  console.log(
    `skills: ${count} created, ${data.length - count} already present`,
  );

  return new Map(skills.map((skill) => [skill.name, skill.id]));
}
