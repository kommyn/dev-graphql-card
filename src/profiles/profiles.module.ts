import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { LoadersModule } from '../loaders/loaders.module';
import { ProfilesService } from './services';
import { ProfilesResolver } from './resolvers';

@Module({
  imports: [PrismaModule, LoadersModule],
  providers: [ProfilesService, ProfilesResolver],
})
export class ProfilesModule {}
