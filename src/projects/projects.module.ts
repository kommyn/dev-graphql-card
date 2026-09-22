import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { ProjectsService } from './services';
import { ProjectsRersolver } from './resolvers';

@Module({
  imports: [PrismaModule],
  providers: [ProjectsService, ProjectsRersolver],
})
export class ProjectsModule {}
