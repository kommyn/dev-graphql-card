import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';

import { Skill } from '../skills/models';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SkillsByJobIdLoader {
  private readonly loaders = new WeakMap<
    object,
    DataLoader<string, Skill[] | null>
  >();

  constructor(private readonly prismaService: PrismaService) {}

  load(ctx: object, jobId: string) {
    let loader = this.loaders.get(ctx);

    if (!loader) {
      loader = new DataLoader(async (ids) => {
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
      });
      this.loaders.set(ctx, loader);
    }

    return loader.load(jobId);
  }
}
