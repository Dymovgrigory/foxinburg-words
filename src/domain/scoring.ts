import { StudyMode } from './types';

// Base reward weights per mode (harder/active recall modes pay a bit more).
const MODE_XP: Record<StudyMode, number> = {
  flashcards: 6,
  learn: 8,
  write: 10,
  test: 7,
  match: 7,
  gravity: 9,
};

export type Scored = { xpEarned: number; coinsEarned: number };

// Convert a correct/total result into XP + coins, with an accuracy bonus.
export function scoreSession(
  mode: StudyMode,
  correct: number,
  total: number,
): Scored {
  const base = MODE_XP[mode] ?? 6;
  const xpEarned = correct * base;
  const accuracy = total > 0 ? correct / total : 0;
  const perfectBonus = total > 0 && correct === total ? 20 : 0;
  const coinsEarned =
    Math.round(correct * 2 + accuracy * 10) + perfectBonus;
  return { xpEarned: xpEarned + perfectBonus, coinsEarned };
}
