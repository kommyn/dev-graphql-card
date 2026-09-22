import {
  Resolver,
  Query,
  Args,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { Project } from '../models';
import { ProjectsService } from '../services';
import { CreateProjectInput } from '../dto';
import { Profile } from '../../profiles/models';
import { PrismaService } from '../../prisma/prisma.service';

@Resolver(() => Project)
export class ProjectsRersolver {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly prismaService: PrismaService,
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

  // TODO: Solve N+1 issue
  @ResolveField(() => Profile)
  profile(@Parent() project: Project) {
    return this.prismaService.profile.findUnique({
      where: { id: project.profileId },
    });
  }
}
