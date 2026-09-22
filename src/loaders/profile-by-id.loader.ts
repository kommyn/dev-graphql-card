import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';

import { Profile } from '../profiles/models';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfileByIdLoader {
  private readonly loaders = new WeakMap<
    object,
    DataLoader<string, Profile | null>
  >();

  constructor(private readonly prismaService: PrismaService) {}

  load(ctx: object, id: string) {
    let loader = this.loaders.get(ctx);

    if (!loader) {
      loader = new DataLoader(async (ids) => {
        const rows = await this.prismaService.profile.findMany({
          where: { id: { in: [...ids] } },
        });
        const map = new Map(rows.map((p) => [p.id, p]));
        return ids.map((id) => map.get(id) ?? null);
      });
      this.loaders.set(ctx, loader);
    }

    return loader.load(id);
  }
}
