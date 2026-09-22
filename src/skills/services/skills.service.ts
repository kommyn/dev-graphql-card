import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateSkillInput, UpdateSkillInput } from '../dto';
import { GraphQLError } from 'graphql/error';

@Injectable()
export class SkillsService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.skill.findMany();
  }

  findOne(id: string) {
    return this.prismaService.skill.findUnique({ where: { id } });
  }

  create(data: CreateSkillInput) {
    return this.prismaService.skill.create({
      data: {
        name: data.name,
      },
    });
  }

  async update(id: string, data: UpdateSkillInput) {
    const existingSkill = await this.prismaService.skill.findUnique({
      where: { id },
    });
    if (!existingSkill)
      throw new GraphQLError('Skill does not exists', {
        extensions: { code: 'NOT_FOUND' },
      });

    if (!Object.keys(data).length) return existingSkill;

    return this.prismaService.skill.update({
      where: { id },
      data: {
        name: data.name,
      },
    });
  }

  delete(id: string) {
    console.log('id: ', id);
    return this.prismaService.skill.delete({ where: { id } });
  }
}
