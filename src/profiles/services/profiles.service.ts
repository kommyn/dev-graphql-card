import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateProfileInput } from '../dto';

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
    return this.prismaService.profile.create({
      data: {
        name: data.name,
        description: data.description,
        links: data.links,
      },
    });
  }
}
