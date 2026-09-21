import { Module } from '@nestjs/common';

import { ProfilesModule } from './profiles/profiles.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [SharedModule, ProfilesModule],
})
export class AppModule {}
