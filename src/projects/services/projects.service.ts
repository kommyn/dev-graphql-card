import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateProjectInput, UpdateProjectInput } from '../dto';
import { GraphQLError } from 'graphql/error';

@Injectable()
export class ProjectsService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.project.findMany();
  }

  findOne(id: string) {
    return this.prismaService.project.findUnique({ where: { id } });
  }

  create(data: CreateProjectInput) {
    return this.prismaService.project.create({
      data: {
        name: data.name,
        link: data.link,
        achievements: data.achievements,
        profile: { connect: { id: data.profileId } },
      },
    });
  }

  async update(id: string, data: UpdateProjectInput) {
    const existingProject = await this.prismaService.project.findUnique({
      where: { id },
    });
    if (!existingProject)
      throw new GraphQLError('Project not found', {
        extensions: { code: 'NOT_FOUND' },
      });

    if (!Object.keys(data).length) return existingProject;

    return this.prismaService.project.update({
      where: { id },
      data: {
        name: data.name,
        link: data.link,
        achievements: data.achievements,
      },
    });
  }

  delete(id: string) {
    return this.prismaService.project.delete({ where: { id } });
  }
}
