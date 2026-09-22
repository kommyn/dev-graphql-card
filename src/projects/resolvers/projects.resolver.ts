import {
  Resolver,
  Query,
  Args,
  Mutation,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql';

import { Project } from '../models';
import { ProjectsService } from '../services';
import { ProfileByIdLoader } from '../../loaders';
import { CreateProjectInput } from '../dto';
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
  getProject(@Args('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Mutation(() => Project, { name: 'createProject' })
  createProject(@Args('data') data: CreateProjectInput) {
    return this.projectsService.create(data);
  }

  @ResolveField(() => Profile)
  profile(@Parent() project: Project, @Context() ctx: object) {
    return this.profileByIdLoader.load(ctx, project.profileId);
  }
}
