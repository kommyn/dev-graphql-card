import { Module } from '@nestjs/common';

import { ProfilesModule } from './profiles/profiles.module';
import { SharedModule } from './shared/shared.module';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [SharedModule, ProfilesModule, JobsModule],
})
export class AppModule {}
