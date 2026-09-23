import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateProfileInput, UpdateProfileInput } from '../dto';
import { GraphQLError } from 'graphql/error';

@Injectable()
export class ProfilesService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.profile.findMany();
  }

  findOne(id: string) {
    return this.prismaService.profile.findUnique({
      where: { id },
    });
  }

  create(data: CreateProfileInput) {
    const skillNames = data.skills
      ? [...new Set(data.skills.map((name) => name.trim()).filter(Boolean))]
      : null;

    return this.prismaService.profile.create({
      data: {
        name: data.name,
        description: data.description,
        links: data.links || [],
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

  async update(id: string, data: UpdateProfileInput) {
    const existingProfile = await this.prismaService.profile.findUnique({
      where: { id },
    });
    if (!existingProfile)
      throw new GraphQLError('Profile not found', {
        extensions: { code: 'NOT_FOUND' },
      });

    if (!Object.keys(data).length) return existingProfile;

    const skillNames = data.skills
      ? [...new Set(data.skills.map((name) => name.trim()).filter(Boolean))]
      : null;

    return this.prismaService.$transaction(async (tx) => {
      if (skillNames) {
        await tx.skillsOnProfile.deleteMany({ where: { profileId: id } });
      }

      return tx.profile.update({
        where: { id },
        data: {
          name: data.name,
          description: data.description,
          links: data.links || [],
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
    return this.prismaService.profile.delete({ where: { id } });
  }

  async addSkillToProfile(profileId: string, skillId: string) {
    const existingProfile = await this.prismaService.profile.findUnique({
      where: { id: profileId },
    });
    if (!existingProfile)
      throw new GraphQLError('Profile does not exists', {
        extensions: { code: 'NOT_FOUND' },
      });

    const existingSkill = await this.prismaService.skill.findUnique({
      where: { id: skillId },
    });
    if (!existingSkill)
      throw new GraphQLError('Skill does not exists', {
        extensions: { code: 'NOT_FOUND' },
      });

    return this.prismaService.profile.update({
      data: {
        skills: {
          create: {
            skill: {
              connect: { id: skillId },
            },
          },
        },
      },
      where: {
        id: profileId,
      },
    });
  }

  async removeSkillFromProfile(profileId: string, skillId: string) {
    const result = await this.prismaService.skillsOnProfile.delete({
      where: { skillId_profileId: { profileId, skillId } },
      include: { profile: true },
    });

    return result.profile;
  }
}
