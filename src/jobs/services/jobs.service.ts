import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql/error';

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

  async addSkillToJob(jobId: string, skillId: string) {
    const existingJob = await this.prismaService.job.findUnique({
      where: { id: jobId },
    });
    if (!existingJob)
      throw new GraphQLError('Job does not found', {
        extensions: { code: 'NOT_FOUND' },
      });

    const existingSkill = await this.prismaService.skill.findUnique({
      where: { id: skillId },
    });
    if (!existingSkill)
      throw new GraphQLError('Skill does not found', {
        extensions: { code: 'NOT_FOUND' },
      });

    return this.prismaService.job.update({
      data: {
        skills: {
          create: {
            skill: {
              connect: {
                id: skillId,
              },
            },
          },
        },
      },
      where: {
        id: jobId,
      },
    });
  }

  async removeSkillFromJob(jobId: string, skillId: string) {
    const result = await this.prismaService.skillsOnJobs.delete({
      where: { skillId_jobId: { jobId, skillId } },
      include: { job: true },
    });

    return result.job;
  }
}
