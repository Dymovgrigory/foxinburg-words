// Avatar catalog — fox moods + friends. Bought with coins in the shop.
import { EmojiName } from '../assets/emojiData';

export type Avatar = {
  id: string;
  icon: EmojiName; // bundled glyph id (never a system emoji)
  name: string;
  price: number; // 0 = owned by default
};

export const AVATARS: Avatar[] = [
  { id: 'fox', icon: 'fox', name: 'Лис Фоксик', price: 0 },
  { id: 'cub', icon: 'paws', name: 'Лисёнок', price: 0 },
  { id: 'owl', icon: 'owl', name: 'Мудрая Сова', price: 150 },
  { id: 'cat', icon: 'cat', name: 'Кот-полиглот', price: 150 },
  { id: 'panda', icon: 'panda', name: 'Панда Линь', price: 250 },
  { id: 'dragon', icon: 'dragon', name: 'Дракончик', price: 350 },
  { id: 'unicorn', icon: 'unicorn', name: 'Единорог', price: 500 },
  { id: 'robot', icon: 'robot', name: 'Робо-репетитор', price: 500 },
  { id: 'astronaut', icon: 'astronaut', name: 'Космо-ученик', price: 700 },
  { id: 'wizard', icon: 'mage', name: 'Маг слов', price: 900 },
];

export const AVATAR_MAP: Record<string, Avatar> = AVATARS.reduce(
  (acc, a) => {
    acc[a.id] = a;
    return acc;
  },
  {} as Record<string, Avatar>,
);

export function getAvatar(id: string): Avatar {
  return AVATAR_MAP[id] ?? AVATARS[0];
}
