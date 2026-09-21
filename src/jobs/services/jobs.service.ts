import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateJobInput } from '../dto';

@Injectable()
export class JobsService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.job.findMany();
  }

  findOne(id: string) {
    return this.prismaService.job.findFirst({ where: { id } });
  }

  create(data: CreateJobInput) {
    return this.prismaService.job.create({
      data: {
        name: data.name,
        jobTitle: data.jobTitle,
        dateStart: data.dateStart,
        dateEnd: data.dateEnd,
        achievements: data.achievements,
        profile: { connect: { id: data.profileId } },
      },
    });
  }
}
