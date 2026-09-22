import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Context,
  ID,
} from '@nestjs/graphql';
import { ParseUUIDPipe } from '@nestjs/common';

import { Job } from '../models';
import { JobsService } from '../services';
import { CreateJobInput, UpdateJobInput } from '../dto';
import { ProfileByIdLoader, SkillsByJobIdLoader } from '../../loaders';
import { Skill } from '../../skills/models';
import { Profile } from '../../profiles/models';

@Resolver(() => Job)
export class JobsResolver {
  constructor(
    private readonly jobsService: JobsService,
    private readonly profileByIdLoader: ProfileByIdLoader,
    private readonly skillsByJobIdLoader: SkillsByJobIdLoader,
  ) {}

  @Query(() => [Job], { name: 'jobs' })
  findAll() {
    return this.jobsService.findAll();
  }

  @Query(() => Job, { name: 'job', nullable: true })
  find(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.jobsService.findOne(id);
  }

  @Mutation(() => Job, { name: 'createJob' })
  addJob(@Args('data') data: CreateJobInput) {
    return this.jobsService.create(data);
  }

  @Mutation(() => Job, { name: 'updateJob' })
  updateJob(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @Args('data') data: UpdateJobInput,
  ) {
    return this.jobsService.update(id, data);
  }

  @Mutation(() => Job, { name: 'deleteJob' })
  deleteJob(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.jobsService.delete(id);
  }

  @ResolveField(() => Profile)
  profile(@Parent() job: Job, @Context() ctx: object) {
    return this.profileByIdLoader.load(ctx, job.profileId);
  }

  @ResolveField(() => [Skill])
  skills(@Parent() job: Job, @Context() ctx: object) {
    return this.skillsByJobIdLoader.load(ctx, job.id);
  }
}
