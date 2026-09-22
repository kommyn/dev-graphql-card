import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { SkillsService } from './services';
import { SkillsResolver } from './resolvers';

@Module({
  imports: [PrismaModule],
  providers: [SkillsService, SkillsResolver],
})
export class SkillsModule {}
