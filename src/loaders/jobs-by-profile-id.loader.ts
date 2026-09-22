import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';

import { Job } from '../jobs/models';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JobsByProfileIdLoader {
  private readonly loaders = new WeakMap<
    object,
    DataLoader<string, Job[] | null>
  >();

  constructor(private readonly prismaService: PrismaService) {}

  load(ctx: object, profileId: string) {
    let loader = this.loaders.get(ctx);

    if (!loader) {
      loader = new DataLoader(async (ids) => {
        const rows = await this.prismaService.job.findMany({
          where: { profile: { id: { in: [...ids] } } },
        });
        const grouped = new Map<string, Job[]>();
        for (const row of rows) {
          const list = grouped.get(row.profileId);
          if (list) list.push(row);
          else grouped.set(row.profileId, [row]);
        }
        return ids.map((id) => grouped.get(id) || []);
      });
      this.loaders.set(ctx, loader);
    }

    return loader.load(profileId);
  }
}
