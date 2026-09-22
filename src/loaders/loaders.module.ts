import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { ProfileByIdLoader } from './profile-by-id.loader';
import { JobsByProfileIdLoader } from './jobs-by-profile-id.loader';
import { ProjectsByProfileIdLoader } from './projects-by-profile-id.loader';

@Module({
  imports: [PrismaModule],
  providers: [
    ProfileByIdLoader,
    JobsByProfileIdLoader,
    ProjectsByProfileIdLoader,
  ],
  exports: [
    ProfileByIdLoader,
    JobsByProfileIdLoader,
    ProjectsByProfileIdLoader,
  ],
})
export class LoadersModule {}
