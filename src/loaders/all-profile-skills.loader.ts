import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';

import { Skill } from '../skills/models';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AllProfileSkillsLoader {
  private readonly loaders = new WeakMap<
    object,
    DataLoader<string, Skill[] | null>
  >();

  constructor(private readonly prismaService: PrismaService) {}

  load(ctx: object, profileId: string) {
    let loader = this.loaders.get(ctx);

    if (!loader) {
      loader = new DataLoader(async (ids) => {
        const rows = await this.prismaService.$queryRaw<
          (Skill & { profileId: string })[]
        >`
            SELECT
                s.id AS id
                , s.name AS name
                , s.created_at AS "createdAt"
                , sp.profile_id AS "profileId"
            FROM skills s
            LEFT JOIN skills_on_profiles sp ON s.id=sp.skill_id
            WHERE sp.profile_id = ANY(${[...ids]}::uuid[])

            UNION

            SELECT
                s.id AS id
                , s.name AS name
                , s.created_at AS "createdAt"
                , j.profile_id AS "profileId"
            FROM jobs j
            JOIN skills_on_jobs sj ON sj.job_id=j.id
            JOIN skills s ON s.id=sj.skill_id
            WHERE j.profile_id = ANY(${[...ids]}::uuid[])
        `;

        const grouped = new Map<string, Skill[]>();
        for (const { profileId, ...skill } of rows) {
          const list = grouped.get(profileId);
          if (list) list.push(skill);
          else grouped.set(profileId, [skill]);
        }
        return ids.map((id) => grouped.get(id) || []);
      });
      this.loaders.set(ctx, loader);
    }

    return loader.load(profileId);
  }
}
