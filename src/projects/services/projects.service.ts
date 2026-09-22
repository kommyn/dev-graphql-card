import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateProjectInput } from '../dto';

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
        profile: { connect: { id: data.profileId } },
      },
    });
  }
}
