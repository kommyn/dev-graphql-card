import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { ProfileByIdLoader } from './loaders/profile-by-id.loader';
import { JobsByProfileIdLoader } from './loaders/jobs-by-profile-id.loader';
import { ProjectsByProfileIdLoader } from './loaders/projects-by-profile-id.loader';
import { SkillsByProfileId } from './loaders/skills-by-profile-id.loader';
import { SkillsByJobIdLoader } from './loaders/skills-by-job-id.loader';
import { AllProfileSkillsLoader } from './loaders/all-profile-skills.loader';

@Module({
  imports: [PrismaModule],
  providers: [
    ProfileByIdLoader,
    JobsByProfileIdLoader,
    ProjectsByProfileIdLoader,
    SkillsByProfileId,
    SkillsByJobIdLoader,
    AllProfileSkillsLoader,
  ],
  exports: [
    ProfileByIdLoader,
    JobsByProfileIdLoader,
    ProjectsByProfileIdLoader,
    SkillsByProfileId,
    SkillsByJobIdLoader,
    AllProfileSkillsLoader,
  ],
})
export class LoadersModule {}
