import { Injectable } from '@nestjs/common';

import { Skill } from '../../skills/models';
import { PrismaService } from '../../prisma/prisma.service';
import { BaseLoader } from './base-loader';

@Injectable()
export class SkillsByJobIdLoader extends BaseLoader<Skill[] | null> {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  protected async batch(ids: ReadonlyArray<string>) {
    const rows = await this.prismaService.skillsOnJobs.findMany({
      where: { jobId: { in: [...ids] } },
      include: {
        skill: true,
      },
    });

    const grouped = new Map<string, Skill[]>();
    for (const { jobId, skill } of rows) {
      const list = grouped.get(jobId);
      if (list) list.push(skill);
      else grouped.set(jobId, [skill]);
    }
    return ids.map((id) => grouped.get(id) || []);
  }
}
