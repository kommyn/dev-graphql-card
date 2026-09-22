import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { Job } from '../models';
import { ChangeJobSkillInput } from '../dto';
import { JobsService } from '../services';

@Resolver()
export class JobSkillsResolver {
  constructor(private readonly jobsService: JobsService) {}

  @Mutation(() => Job, { name: 'addSkillToJob' })
  addSkillToJob(@Args('data') { jobId, skillId }: ChangeJobSkillInput) {
    return this.jobsService.addSkillToJob(jobId, skillId);
  }

  @Mutation(() => Job, { name: 'removeSkillFromJob' })
  removeSkillFromJob(@Args('data') { jobId, skillId }: ChangeJobSkillInput) {
    return this.jobsService.removeSkillFromJob(jobId, skillId);
  }
}
