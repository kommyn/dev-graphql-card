import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql';
import { ParseUUIDPipe } from '@nestjs/common';

import { ProfilesService } from '../services';
import { Profile } from '../models';
import {
  JobsByProfileIdLoader,
  ProjectsByProfileIdLoader,
  SkillsByProfileId,
  AllProfileSkillsLoader,
} from '../../loaders';
import { CreateProfileInput } from '../dto';
import { Job } from '../../jobs/models';
import { Project } from '../../projects/models';
import { Skill } from 'src/skills/models';

@Resolver(() => Profile)
export class ProfilesResolver {
  constructor(
    private readonly profilesService: ProfilesService,
    private readonly jobsByProfileIdLoader: JobsByProfileIdLoader,
    private readonly projectsByProfileIdLoader: ProjectsByProfileIdLoader,
    private readonly skillsByProfileId: SkillsByProfileId,
    private readonly allProfileSkillsLoader: AllProfileSkillsLoader,
  ) {}

  @Query(() => [Profile], { name: 'profiles' })
  findAll() {
    return this.profilesService.findAll();
  }

  @Query(() => Profile, { name: 'profile', nullable: true })
  find(@Args('id', ParseUUIDPipe) id: string) {
    return this.profilesService.findOne(id);
  }

  @Mutation(() => Profile, { name: 'createProfile' })
  createProfile(@Args('data') data: CreateProfileInput) {
    return this.profilesService.create(data);
  }

  @ResolveField(() => [Job])
  jobs(@Parent() profile: Profile, @Context() ctx: object) {
    return this.jobsByProfileIdLoader.load(ctx, profile.id);
  }

  @ResolveField(() => [Project])
  projects(@Parent() profile: Profile, @Context() ctx: object) {
    return this.projectsByProfileIdLoader.load(ctx, profile.id);
  }

  @ResolveField(() => [Skill])
  skills(@Parent() profile: Profile, @Context() ctx: object) {
    return this.skillsByProfileId.load(ctx, profile.id);
  }

  @ResolveField(() => [Skill])
  async allSkills(@Parent() profile: Profile, @Context() ctx: object) {
    return this.allProfileSkillsLoader.load(ctx, profile.id);
  }
}
