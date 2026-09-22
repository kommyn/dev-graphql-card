import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ParseUUIDPipe } from '@nestjs/common';

import { Skill } from '../models';
import { SkillsService } from '../services';
import { CreateSkillInput } from '../dto';

@Resolver(() => Skill)
export class SkillsResolver {
  constructor(private readonly skillsService: SkillsService) {}

  @Query(() => [Skill], { name: 'skills' })
  getSkills() {
    return this.skillsService.findAll();
  }

  @Query(() => Skill, { name: 'skill' })
  getSkill(@Args('id', ParseUUIDPipe) id: string) {
    return this.skillsService.findOne(id);
  }

  @Mutation(() => Skill, { name: 'createSkill' })
  createSkill(@Args('data') data: CreateSkillInput) {
    return this.skillsService.create(data);
  }

  @Mutation(() => Skill, { name: 'deleteSkill' })
  deleteSkill(@Args('id', ParseUUIDPipe) id: string) {
    return this.skillsService.delete(id);
  }
}
