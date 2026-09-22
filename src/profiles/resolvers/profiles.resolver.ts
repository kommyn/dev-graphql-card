import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql';

import { ProfilesService } from '../services';
import { Profile } from '../models';
import {
  JobsByProfileIdLoader,
  ProjectsByProfileIdLoader,
} from '../../loaders';
import { CreateProfileInput } from '../dto';
import { Job } from '../../jobs/models';
import { Project } from '../../projects/models';

@Resolver(() => Profile)
export class ProfilesResolver {
  constructor(
    private readonly profilesService: ProfilesService,
    private readonly jobsByProfileIdLoader: JobsByProfileIdLoader,
    private readonly projectsByProfileIdLoader: ProjectsByProfileIdLoader,
  ) {}

  @Query(() => [Profile], { name: 'profiles' })
  findAll() {
    return this.profilesService.findAll();
  }

  @Query(() => Profile, { name: 'profile', nullable: true })
  find(@Args('id') id: string) {
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
}
