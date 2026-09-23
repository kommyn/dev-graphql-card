import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql/error';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateJobInput, UpdateJobInput } from '../dto';

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
    const skillNames = data.skills
      ? [...new Set(data.skills.map((name) => name.trim()).filter(Boolean))]
      : null;

    return this.prismaService.job.create({
      data: {
        name: data.name,
        jobTitle: data.jobTitle,
        dateStart: data.dateStart,
        dateEnd: data.dateEnd,
        achievements: data.achievements,
        profile: { connect: { id: data.profileId } },
        ...(skillNames && {
          skills: {
            create: skillNames.map((name) => ({
              skill: {
                connectOrCreate: {
                  where: { name },
                  create: { name },
                },
              },
            })),
          },
        }),
      },
    });
  }

  async update(id: string, data: UpdateJobInput) {
    const existingJob = await this.prismaService.job.findUnique({
      where: { id },
    });
    if (!existingJob)
      throw new GraphQLError('Job not found', {
        extensions: { code: 'NOT_FOUND' },
      });

    if (!Object.keys(data).length) return existingJob;

    if (data.dateEnd && data.dateEnd < existingJob.dateStart) {
      throw new GraphQLError(
        "End date of the job cannot be lesser than it's start date'",
        { extensions: { code: 'BAD_USER_INPUT' } },
      );
    }

    const { skills, ...jobData } = data;

    const skillNames = skills
      ? [...new Set(skills.map((name) => name.trim()).filter(Boolean))]
      : null;

    return this.prismaService.$transaction(async (tx) => {
      if (skillNames)
        await tx.skillsOnJobs.deleteMany({ where: { jobId: id } });

      return tx.job.update({
        where: { id },
        data: {
          ...jobData,
          ...(skillNames && {
            skills: {
              create: skillNames.map((name) => ({
                skill: {
                  connectOrCreate: {
                    where: { name },
                    create: { name },
                  },
                },
              })),
            },
          }),
        },
      });
    });
  }

  delete(id: string) {
    return this.prismaService.job.delete({ where: { id } });
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
