import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { Profile } from '../models';
import { ChangeProfileSkillInput } from '../dto';
import { ProfilesService } from '../services';

@Resolver()
export class ProfileSkillsResolver {
  constructor(private readonly profilesService: ProfilesService) {}

  @Mutation(() => Profile, { name: 'addSkillToProfile' })
  addSkillToProfile(
    @Args('data') { profileId, skillId }: ChangeProfileSkillInput,
  ) {
    return this.profilesService.addSkillToProfile(profileId, skillId);
  }

  @Mutation(() => Profile, { name: 'removeSkillFromProfile' })
  removeSkillFromProfile(
    @Args('data') { profileId, skillId }: ChangeProfileSkillInput,
  ) {
    return this.profilesService.removeSkillFromProfile(profileId, skillId);
  }
}
