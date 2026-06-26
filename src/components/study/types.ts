import { Word } from '../../domain/types';

export type AnswerOutcome = { wordId: string; correct: boolean };

export type ModeProps = {
  words: Word[];
  onComplete: (results: AnswerOutcome[]) => void;
  onQuit: () => void;
};

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Normalize a typed answer for forgiving comparison.
export function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/[.,!?¡¿;:]/g, '')
    .replace(/\s+/g, ' ');
}
