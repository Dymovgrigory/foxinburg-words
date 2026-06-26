import { WordSet } from '../../domain/types';

// Starter Chinese (Mandarin) sets. Sub-agents expand this file with more sets/words.
const sets: WordSet[] = [
  {
    id: 'zh_basics',
    title: '第一批词 / Первые слова',
    description: 'Приветствия и вежливость',
    language: 'zh',
    emoji: 'wave',
    authorId: 'system',
    isSystem: true,
    createdAt: 0,
    words: [
      { id: 'zh_b1', term: '你好', translation: 'привет', transcription: 'nǐ hǎo', example: '你好！你好吗？' },
      { id: 'zh_b2', term: '再见', translation: 'до свидания', transcription: 'zàijiàn', example: '再见，明天见！' },
      { id: 'zh_b3', term: '请', translation: 'пожалуйста', transcription: 'qǐng', example: '请喝茶。' },
      { id: 'zh_b4', term: '谢谢', translation: 'спасибо', transcription: 'xièxie', example: '谢谢你！' },
      { id: 'zh_b5', term: '是', translation: 'да', transcription: 'shì', example: '是的。' },
      { id: 'zh_b6', term: '不', translation: 'нет', transcription: 'bù', example: '不，谢谢。' },
      { id: 'zh_b7', term: '对不起', translation: 'извините', transcription: 'duìbuqǐ', example: '对不起，我迟到了。' },
      { id: 'zh_b8', term: '朋友', translation: 'друг', transcription: 'péngyou', example: '他是我的朋友。' },
      { id: 'zh_b9', term: '水', translation: 'вода', transcription: 'shuǐ', example: '我要一杯水。' },
      { id: 'zh_b10', term: '爱', translation: 'любовь', transcription: 'ài', example: '我爱这个城市。' },
      { id: 'zh_b11', term: '今天', translation: 'сегодня', transcription: 'jīntiān', example: '今天是星期一。' },
      { id: 'zh_b12', term: '名字', translation: 'имя', transcription: 'míngzi', example: '你叫什么名字？' },
    ],
  },
  {
    id: 'zh_food',
    title: '食物 / Еда',
    description: 'Еда и напитки',
    language: 'zh',
    emoji: 'books',
    authorId: 'system',
    isSystem: true,
    createdAt: 0,
    words: [
      { id: 'zh_f1', term: '苹果', translation: 'яблоко', transcription: 'píngguǒ', example: '一个红苹果。' },
      { id: 'zh_f2', term: '面包', translation: 'хлеб', transcription: 'miànbāo', example: '新鲜的面包。' },
      { id: 'zh_f3', term: '咖啡', translation: 'кофе', transcription: 'kāfēi', example: '我喝咖啡。' },
      { id: 'zh_f4', term: '牛奶', translation: 'молоко', transcription: 'niúnǎi', example: '一杯牛奶。' },
      { id: 'zh_f5', term: '奶酪', translation: 'сыр', transcription: 'nǎilào', example: '我喜欢奶酪。' },
      { id: 'zh_f6', term: '茶', translation: 'чай', transcription: 'chá', example: '请喝绿茶。' },
      { id: 'zh_f7', term: '糖', translation: 'сахар', transcription: 'táng', example: '不要糖，谢谢。' },
      { id: 'zh_f8', term: '鱼', translation: 'рыба', transcription: 'yú', example: '这条鱼很好吃。' },
      { id: 'zh_f9', term: '鸡蛋', translation: 'яйцо', transcription: 'jīdàn', example: '我要一个鸡蛋。' },
      { id: 'zh_f10', term: '汤', translation: 'суп', transcription: 'tāng', example: '热汤。' },
    ],
  },
];

export default sets;
