import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql';

import { Job } from '../models';
import { JobsService } from '../services';
import { CreateJobInput } from '../dto';
import { ProfileByIdLoader } from '../../loaders';
import { Profile } from '../../profiles/models';

@Resolver(() => Job)
export class JobsResolver {
  constructor(
    private readonly jobsService: JobsService,
    private readonly profileByIdLoader: ProfileByIdLoader,
  ) {}

  @Query(() => [Job], { name: 'jobs' })
  findAll() {
    return this.jobsService.findAll();
  }

  @Query(() => Job, { name: 'job', nullable: true })
  find(@Args('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Mutation(() => Job, { name: 'createJob' })
  addJob(@Args('data') data: CreateJobInput) {
    return this.jobsService.create(data);
  }

  @ResolveField(() => Profile)
  profile(@Parent() job: Job, @Context() ctx: object) {
    return this.profileByIdLoader.load(ctx, job.profileId);
  }
}
