import { Injectable } from '@nestjs/common';

import { Job } from '../../jobs/models';
import { PrismaService } from '../../prisma/prisma.service';
import { BaseLoader } from './base-loader';

@Injectable()
export class JobsByProfileIdLoader extends BaseLoader<Job[] | null> {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  protected async batch(ids: readonly string[]) {
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
  }
}
