import { WordSet } from '../../domain/types';

// Starter Japanese sets. Sub-agents expand this file with more sets/words.
const sets: WordSet[] = [
  {
    id: 'ja_basics',
    title: '最初の言葉 / Первые слова',
    description: 'Приветствия и вежливость',
    language: 'ja',
    emoji: 'wave',
    authorId: 'system',
    isSystem: true,
    createdAt: 0,
    words: [
      { id: 'ja_b1', term: 'こんにちは', translation: 'привет', transcription: 'konnichiwa', example: 'こんにちは、お元気ですか？' },
      { id: 'ja_b2', term: 'さようなら', translation: 'до свидания', transcription: 'sayōnara', example: 'さようなら、また明日。' },
      { id: 'ja_b3', term: 'お願いします', translation: 'пожалуйста', transcription: 'onegai shimasu', example: 'コーヒーをお願いします。' },
      { id: 'ja_b4', term: 'ありがとう', translation: 'спасибо', transcription: 'arigatō', example: 'どうもありがとう！' },
      { id: 'ja_b5', term: 'はい', translation: 'да', transcription: 'hai', example: 'はい、もちろん。' },
      { id: 'ja_b6', term: 'いいえ', translation: 'нет', transcription: 'iie', example: 'いいえ、結構です。' },
      { id: 'ja_b7', term: 'すみません', translation: 'извините', transcription: 'sumimasen', example: 'すみません、遅れました。' },
      { id: 'ja_b8', term: '友達', translation: 'друг', transcription: 'tomodachi', example: '彼は私の友達です。' },
      { id: 'ja_b9', term: '水', translation: 'вода', transcription: 'mizu', example: '水をください。' },
      { id: 'ja_b10', term: '愛', translation: 'любовь', transcription: 'ai', example: 'この町が大好きです。' },
      { id: 'ja_b11', term: '今日', translation: 'сегодня', transcription: 'kyō', example: '今日は月曜日です。' },
      { id: 'ja_b12', term: '名前', translation: 'имя', transcription: 'namae', example: 'お名前は何ですか？' },
    ],
  },
  {
    id: 'ja_food',
    title: '食べ物 / Еда',
    description: 'Еда и напитки',
    language: 'ja',
    emoji: 'books',
    authorId: 'system',
    isSystem: true,
    createdAt: 0,
    words: [
      { id: 'ja_f1', term: 'りんご', translation: 'яблоко', transcription: 'ringo', example: '赤いりんご。' },
      { id: 'ja_f2', term: 'パン', translation: 'хлеб', transcription: 'pan', example: '新しいパン。' },
      { id: 'ja_f3', term: 'コーヒー', translation: 'кофе', transcription: 'kōhī', example: 'コーヒーを飲みます。' },
      { id: 'ja_f4', term: '牛乳', translation: 'молоко', transcription: 'gyūnyū', example: '牛乳を一杯。' },
      { id: 'ja_f5', term: 'チーズ', translation: 'сыр', transcription: 'chīzu', example: 'チーズが好きです。' },
      { id: 'ja_f6', term: 'お茶', translation: 'чай', transcription: 'ocha', example: '緑茶をください。' },
      { id: 'ja_f7', term: '砂糖', translation: 'сахар', transcription: 'satō', example: '砂糖なしで。' },
      { id: 'ja_f8', term: '魚', translation: 'рыба', transcription: 'sakana', example: 'この魚は美味しい。' },
      { id: 'ja_f9', term: '卵', translation: 'яйцо', transcription: 'tamago', example: '卵を一つください。' },
      { id: 'ja_f10', term: 'スープ', translation: 'суп', transcription: 'sūpu', example: '熱いスープ。' },
    ],
  },
];

export default sets;
