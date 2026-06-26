// Friendly AI "rivals" that populate the leaderboard alongside real local profiles.
export type Bot = {
  id: string;
  name: string;
  avatar: string;
  xp: number;
};

export const LEADERBOARD_BOTS: Bot[] = [
  { id: 'bot_lina', name: 'Лина', avatar: 'unicorn', xp: 2480 },
  { id: 'bot_max', name: 'Макс', avatar: 'dragon', xp: 2120 },
  { id: 'bot_sofia', name: 'Софи', avatar: 'cat', xp: 1740 },
  { id: 'bot_robo', name: 'Роботутор', avatar: 'robot', xp: 1390 },
  { id: 'bot_kai', name: 'Кай', avatar: 'panda', xp: 980 },
  { id: 'bot_nia', name: 'Ния', avatar: 'owl', xp: 720 },
  { id: 'bot_tom', name: 'Том', avatar: 'astronaut', xp: 430 },
];
