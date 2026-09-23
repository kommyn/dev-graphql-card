export type SkillIds = ReadonlyMap<string, string>;

/**
 * Resolves a skill name to its id, failing loudly on a name that is not in the
 * dictionary. Without this a typo in a fixture would silently produce a link
 * row with an undefined skill id.
 */
export function requireSkillId(skillIds: SkillIds, name: string): string {
  const id = skillIds.get(name);

  if (!id)
    throw new Error(
      `Unknown skill "${name}". Add it to prisma/seeds/data/skills.json.`,
    );

  return id;
}
