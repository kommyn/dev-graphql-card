import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '../src/generated/prisma/client';
import { seedJobs, seedProfile, seedProjects, seedSkills } from './seeds';

const connectionString = process.env.DB_URL;

if (!connectionString) throw new Error('DB_URL is not set');

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function main() {
  // Skills first: the profile and the jobs link to them by name.
  const skillIds = await seedSkills(prisma);
  const profile = await seedProfile(prisma, skillIds);

  await seedJobs(prisma, profile.id, skillIds);
  await seedProjects(prisma, profile.id);
}

main()
  .then(() => console.log('seeding finished'))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
