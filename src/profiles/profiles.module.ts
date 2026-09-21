import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { ProfilesService } from './services';
import { ProfilesResolver } from './resolvers';

@Module({
  imports: [PrismaModule],
  providers: [ProfilesService, ProfilesResolver],
})
export class ProfilesModule {}
