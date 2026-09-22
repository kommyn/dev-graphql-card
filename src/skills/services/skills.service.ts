import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateSkillInput } from '../dto';

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

  delete(id: string) {
    console.log('id: ', id);
    return this.prismaService.skill.delete({ where: { id } });
  }
}
