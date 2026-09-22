import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { LoadersModule } from '../loaders/loaders.module';
import { ProjectsService } from './services';
import { ProjectsRersolver } from './resolvers';

@Module({
  imports: [PrismaModule, LoadersModule],
  providers: [ProjectsService, ProjectsRersolver],
})
export class ProjectsModule {}
