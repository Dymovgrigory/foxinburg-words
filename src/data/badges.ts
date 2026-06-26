import { Badge, Profile } from '../domain/types';
import { getLevel } from '../domain/leveling';

export type BadgeDef = Badge & {
  // returns true when unlocked, given the profile and aggregate stats
  check: (ctx: BadgeContext) => boolean;
};

export type BadgeContext = {
  profile: Profile;
  totalSessions: number;
  totalCorrect: number;
  perfectSessions: number;
  masteredWords: number;
  languagesStudied: number;
  setsCreated: number;
};

export const BADGES: BadgeDef[] = [
  {
    id: 'first_steps',
    name: 'Первые шаги',
    icon: 'footprints',
    description: 'Заверши свою первую тренировку',
    requirement: '1 тренировка',
    check: (c) => c.totalSessions >= 1,
  },
  {
    id: 'streak_3',
    name: 'Разогрев',
    icon: 'fire',
    description: 'Стрик 3 дня подряд',
    requirement: 'Стрик 3 дня',
    check: (c) => c.profile.streak >= 3,
  },
  {
    id: 'streak_7',
    name: 'Неделя огня',
    icon: 'fire',
    description: 'Стрик 7 дней подряд',
    requirement: 'Стрик 7 дней',
    check: (c) => c.profile.streak >= 7,
  },
  {
    id: 'perfectionist',
    name: 'Перфекционист',
    icon: 'hundred',
    description: 'Пройди тренировку без ошибок',
    requirement: '100% за тренировку',
    check: (c) => c.perfectSessions >= 1,
  },
  {
    id: 'level_5',
    name: 'Знаток',
    icon: 'star',
    description: 'Достигни 5 уровня',
    requirement: '5 уровень',
    check: (c) => getLevel(c.profile.xp).level >= 5,
  },
  {
    id: 'level_10',
    name: 'Мастер слов',
    icon: 'glowing-star',
    description: 'Достигни 10 уровня',
    requirement: '10 уровень',
    check: (c) => getLevel(c.profile.xp).level >= 10,
  },
  {
    id: 'polyglot',
    name: 'Полиглот',
    icon: 'globe',
    description: 'Позанимайся на 3 разных языках',
    requirement: '3 языка',
    check: (c) => c.languagesStudied >= 3,
  },
  {
    id: 'collector',
    name: 'Коллекционер',
    icon: 'gem',
    description: 'Освой 50 слов',
    requirement: '50 освоенных слов',
    check: (c) => c.masteredWords >= 50,
  },
  {
    id: 'rich_fox',
    name: 'Богатый лис',
    icon: 'money-bag',
    description: 'Накопи 1000 монет',
    requirement: '1000 монет',
    check: (c) => c.profile.coins >= 1000,
  },
  {
    id: 'author',
    name: 'Автор',
    icon: 'writing-hand',
    description: 'Создай свой первый набор (для преподавателей)',
    requirement: 'Создать набор',
    check: (c) => c.setsCreated >= 1,
  },
  {
    id: 'centurion',
    name: 'Центурион',
    icon: 'shield',
    description: 'Дай 100 правильных ответов',
    requirement: '100 верных ответов',
    check: (c) => c.totalCorrect >= 100,
  },
  {
    id: 'sharpshooter',
    name: 'Снайпер',
    icon: 'bullseye',
    description: '5 идеальных тренировок',
    requirement: '5× 100%',
    check: (c) => c.perfectSessions >= 5,
  },
];

export const BADGE_MAP: Record<string, BadgeDef> = BADGES.reduce(
  (acc, b) => {
    acc[b.id] = b;
    return acc;
  },
  {} as Record<string, BadgeDef>,
);
