import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { JobsService } from './services';
import { JobsResolver } from './resolvers';

@Module({
  imports: [PrismaModule],
  providers: [JobsService, JobsResolver],
})
export class JobsModule {}
