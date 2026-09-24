import { Injectable } from '@nestjs/common';

import { Skill } from '../../skills/models';
import { PrismaService } from '../../prisma/prisma.service';
import { BaseLoader } from './base-loader';

@Injectable()
export class SkillsByProfileId extends BaseLoader<Skill[] | null> {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  protected async batch(ids: ReadonlyArray<string>) {
    const rows = await this.prismaService.skillsOnProfile.findMany({
      where: { profileId: { in: [...ids] } },
      include: { skill: true },
    });

    const grouped = new Map<string, Skill[]>();
    for (const { profileId, skill } of rows) {
      const list = grouped.get(profileId);
      if (list) list.push(skill);
      else grouped.set(profileId, [skill]);
    }
    return ids.map((id) => grouped.get(id) || []);
  }
}
