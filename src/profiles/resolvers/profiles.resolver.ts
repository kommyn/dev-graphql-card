import { Resolver, Query } from '@nestjs/graphql';

import { ProfilesService } from '../services';
import { Profile } from '../models';

@Resolver(() => Profile)
export class ProfilesResolver {
  constructor(private readonly profilesService: ProfilesService) {}

  @Query(() => [Profile], { name: 'profiles' })
  findAll() {
    return this.profilesService.findAll();
  }
}
