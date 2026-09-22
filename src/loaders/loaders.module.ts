import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { ProfileByIdLoader } from './profile-by-id.loader';
import { JobsByProfileIdLoader } from './jobs-by-profile-id.loader';
import { ProjectsByProfileIdLoader } from './projects-by-profile-id.loader';
import { SkillsByProfileId } from './skills-by-profile-id.loader';
import { SkillsByJobIdLoader } from './skills-by-job-id.loader';
import { AllProfileSkillsLoader } from './all-profile-skills.loader';

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
