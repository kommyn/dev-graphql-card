import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { Job } from '../models';
import { JobsService } from '../services';
import { CreateJobInput } from '../dto';
import { Profile } from '../../profiles/models';
import { PrismaService } from '../../prisma/prisma.service';

@Resolver(() => Job)
export class JobsResolver {
  constructor(
    private readonly jobsService: JobsService,
    private readonly prismaService: PrismaService,
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

  // TODO: Solve N+1 issue
  @ResolveField(() => Profile)
  profile(@Parent() job: Job) {
    return this.prismaService.profile.findUnique({
      where: { id: job.profileId },
    });
  }
}
