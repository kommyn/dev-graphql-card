import { Injectable } from '@nestjs/common';

import { Project } from '../../projects/models';
import { PrismaService } from '../../prisma/prisma.service';
import { BaseLoader } from './base-loader';

@Injectable()
export class ProjectsByProfileIdLoader extends BaseLoader<Project[] | null> {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  protected async batch(ids: ReadonlyArray<string>) {
    const rows = await this.prismaService.project.findMany({
      where: { profile: { id: { in: [...ids] } } },
    });
    const grouped = new Map<string, Project[]>();
    for (const row of rows) {
      const list = grouped.get(row.profileId);
      if (list) list.push(row);
      else grouped.set(row.profileId, [row]);
    }
    return ids.map((id) => grouped.get(id) || []);
  }
}
