import { Module } from '@nestjs/common';

import { ProfilesModule } from './profiles/profiles.module';
import { SharedModule } from './shared/shared.module';
import { JobsModule } from './jobs/jobs.module';
import { ProjectsModule } from './projects/projects.module';
import { SkillsModule } from './skills/skills.module';

@Module({
  imports: [
    SharedModule,
    ProfilesModule,
    JobsModule,
    ProjectsModule,
    SkillsModule,
  ],
})
export class AppModule {}
