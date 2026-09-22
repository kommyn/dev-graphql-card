import {
  Resolver,
  Query,
  Args,
  Mutation,
  ResolveField,
  Parent,
  Context,
  ID,
} from '@nestjs/graphql';
import { ParseUUIDPipe } from '@nestjs/common';

import { Project } from '../models';
import { ProjectsService } from '../services';
import { ProfileByIdLoader } from '../../loaders';
import { CreateProjectInput, UpdateProjectInput } from '../dto';
import { Profile } from '../../profiles/models';

@Resolver(() => Project)
export class ProjectsRersolver {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly profileByIdLoader: ProfileByIdLoader,
  ) {}

  @Query(() => [Project], { name: 'projects' })
  getProjects() {
    return this.projectsService.findAll();
  }

  @Query(() => Project, { name: 'project', nullable: true })
  getProject(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.projectsService.findOne(id);
  }

  @Mutation(() => Project, { name: 'createProject' })
  createProject(@Args('data') data: CreateProjectInput) {
    return this.projectsService.create(data);
  }

  @Mutation(() => Project, { name: 'updateProject' })
  updateProject(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @Args('data') data: UpdateProjectInput,
  ) {
    return this.projectsService.update(id, data);
  }

  @Mutation(() => Project, { name: 'deleteProject' })
  deleteProject(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.projectsService.delete(id);
  }

  @ResolveField(() => Profile)
  profile(@Parent() project: Project, @Context() ctx: object) {
    return this.profileByIdLoader.load(ctx, project.profileId);
  }
}
