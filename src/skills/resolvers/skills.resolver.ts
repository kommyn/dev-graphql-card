import { Resolver, Query, Args, Mutation, ID } from '@nestjs/graphql';
import { ParseUUIDPipe } from '@nestjs/common';

import { Skill } from '../models';
import { SkillsService } from '../services';
import { CreateSkillInput, UpdateSkillInput } from '../dto';

@Resolver(() => Skill)
export class SkillsResolver {
  constructor(private readonly skillsService: SkillsService) {}

  @Query(() => [Skill], { name: 'skills' })
  getSkills() {
    return this.skillsService.findAll();
  }

  @Query(() => Skill, { name: 'skill', nullable: true })
  getSkill(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.skillsService.findOne(id);
  }

  @Mutation(() => Skill, { name: 'createSkill' })
  createSkill(@Args('data') data: CreateSkillInput) {
    return this.skillsService.create(data);
  }

  @Mutation(() => Skill, { name: 'updateSkill' })
  updateSkill(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @Args('data') data: UpdateSkillInput,
  ) {
    return this.skillsService.update(id, data);
  }

  @Mutation(() => Skill, { name: 'deleteSkill' })
  deleteSkill(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.skillsService.delete(id);
  }
}
