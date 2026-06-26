// Core domain models for Foxinburg Words.
import { EmojiName } from '../assets/emojiData';

export type LanguageCode = 'en' | 'de' | 'zh' | 'es' | 'fr' | 'ja';

export type Language = {
  code: LanguageCode;
  name: string; // Russian name
  nativeName: string;
  flag: EmojiName; // bundled circle-flags glyph id (never a system emoji)
  accent: string; // hex tint used for this language
};

export type Word = {
  id: string;
  term: string; // foreign term
  translation: string; // Russian translation
  transcription?: string;
  example?: string; // example sentence in foreign language
  emoji?: string;
};

export type WordSet = {
  id: string;
  title: string;
  description?: string;
  language: LanguageCode;
  emoji: string;
  words: Word[];
  authorId: string; // user id of creator (seed sets => 'system')
  isSystem: boolean;
  createdAt: number;
};

export type StudyMode =
  | 'flashcards'
  | 'learn'
  | 'write'
  | 'test'
  | 'match'
  | 'gravity';

export type Role = 'student' | 'teacher';

// Per-word memory state used by the spaced-repetition "Изучение" mode.
export type WordMemory = {
  wordId: string;
  box: number; // Leitner box 0..5
  correct: number;
  wrong: number;
  lastSeen: number;
};

export type SetProgress = {
  setId: string;
  mastered: number; // count of words in top box
  totalSeen: number;
  bestAccuracy: number; // 0..1
  memories: Record<string, WordMemory>;
  lastStudied: number;
};

export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string; // bundled glyph id from emojiData (never a system emoji)
  // requirement is evaluated against the profile/stats
  requirement: string;
};

export type DailyRecord = {
  date: string; // YYYY-MM-DD
  xp: number;
};

export type Profile = {
  id: string;
  name: string;
  role: Role;
  avatar: string; // emoji id from avatar catalog
  xp: number;
  coins: number;
  streak: number;
  lastActiveDate: string | null; // YYYY-MM-DD
  ownedAvatars: string[];
  ownedThemes: string[];
  activeThemeId: string;
  unlockedBadges: string[];
  history: DailyRecord[];
  createdAt: number;
};

export type SessionResult = {
  mode: StudyMode;
  setId: string;
  correct: number;
  total: number;
  xpEarned: number;
  coinsEarned: number;
  durationMs: number;
};
