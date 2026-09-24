import { Injectable } from '@nestjs/common';

import { Profile } from '../../profiles/models';
import { PrismaService } from '../../prisma/prisma.service';
import { BaseLoader } from './base-loader';

@Injectable()
export class ProfileByIdLoader extends BaseLoader<Profile | null> {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  protected async batch(ids: ReadonlyArray<string>) {
    const rows = await this.prismaService.profile.findMany({
      where: { id: { in: [...ids] } },
    });
    const map = new Map(rows.map((p) => [p.id, p]));
    return ids.map((id) => map.get(id) ?? null);
  }
}
