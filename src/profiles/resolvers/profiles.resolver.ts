import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { ProfilesService } from '../services';
import { Profile } from '../models';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProfileInput } from '../dto';
import { Job } from 'src/jobs/models';
import { Project } from 'src/projects/models';

@Resolver(() => Profile)
export class ProfilesResolver {
  constructor(
    private readonly profilesService: ProfilesService,
    private readonly prismaService: PrismaService,
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

  // TODO: Solve N+1 issue
  @ResolveField(() => [Job])
  jobs(@Parent() profile: Profile) {
    return this.prismaService.job.findMany({
      where: { profile: { id: profile.id } },
    });
  }

  // TODO: Solve N+1 issue
  @ResolveField(() => [Project])
  projects(@Parent() profile: Profile) {
    return this.prismaService.project.findMany({
      where: { profile: { id: profile.id } },
    });
  }
}
