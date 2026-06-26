// XP / level curve. Each level needs a bit more XP than the last.

export type LevelInfo = {
  level: number;
  xpIntoLevel: number;
  xpForLevel: number; // total xp needed to clear current level
  progress: number; // 0..1 within the current level
  totalXp: number;
};

// XP required to advance FROM the given level to the next one.
export function xpForLevel(level: number): number {
  return 100 + (level - 1) * 50;
}

export function getLevel(totalXp: number): LevelInfo {
  let level = 1;
  let remaining = Math.max(0, Math.floor(totalXp));
  while (remaining >= xpForLevel(level)) {
    remaining -= xpForLevel(level);
    level += 1;
  }
  const need = xpForLevel(level);
  return {
    level,
    xpIntoLevel: remaining,
    xpForLevel: need,
    progress: need === 0 ? 0 : remaining / need,
    totalXp: Math.max(0, Math.floor(totalXp)),
  };
}

// Foxy rank titles tied to level bands.
export function rankTitle(level: number): string {
  if (level >= 20) return 'Легенда Фоксинбурга';
  if (level >= 15) return 'Великий лис';
  if (level >= 10) return 'Мастер слов';
  if (level >= 7) return 'Хитрый лис';
  if (level >= 5) return 'Знаток';
  if (level >= 3) return 'Ученик-следопыт';
  return 'Лисёнок';
}
