import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { LoadersModule } from '../loaders/loaders.module';
import { JobsService } from './services';
import { JobsResolver, JobSkillsResolver } from './resolvers';

@Module({
  imports: [PrismaModule, LoadersModule],
  providers: [JobsService, JobsResolver, JobSkillsResolver],
})
export class JobsModule {}
