import { StudyMode } from '../domain/types';
import { EmojiName } from '../assets/emojiData';

export type StudyModeMeta = {
  id: StudyMode;
  title: string;
  short: string;
  description: string;
  icon: EmojiName;
  accent: string; // hex tint
};

export const STUDY_MODES: StudyModeMeta[] = [
  {
    id: 'flashcards',
    title: 'Карточки',
    short: 'Карточки',
    description: 'Переворачивай и оценивай себя',
    icon: 'card-index',
    accent: '#3DA9FC',
  },
  {
    id: 'learn',
    title: 'Изучение',
    short: 'Изучение',
    description: 'Умный повтор по системе Лейтнера',
    icon: 'brain',
    accent: '#9B5DE5',
  },
  {
    id: 'write',
    title: 'Написание',
    short: 'Письмо',
    description: 'Вводи перевод вручную',
    icon: 'pencil',
    accent: '#26B673',
  },
  {
    id: 'test',
    title: 'Тест',
    short: 'Тест',
    description: 'Выбери правильный вариант',
    icon: 'check',
    accent: '#F2A007',
  },
  {
    id: 'match',
    title: 'Подбор',
    short: 'Подбор',
    description: 'Соединяй слова с переводами',
    icon: 'link',
    accent: '#2EC4B6',
  },
  {
    id: 'gravity',
    title: 'Гравитация',
    short: 'Гравитация',
    description: 'Успей ввести, пока слово падает',
    icon: 'high-voltage',
    accent: '#FF5D8F',
  },
];

export const STUDY_MODE_MAP: Record<StudyMode, StudyModeMeta> = STUDY_MODES.reduce(
  (acc, m) => {
    acc[m.id] = m;
    return acc;
  },
  {} as Record<StudyMode, StudyModeMeta>,
);
