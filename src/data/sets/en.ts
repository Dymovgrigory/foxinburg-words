import { WordSet } from '../../domain/types';

// Starter English sets. Sub-agents expand this file with more sets/words.
const sets: WordSet[] = [
  {
    id: 'en_basics',
    title: 'Первые слова',
    description: 'Приветствия и вежливость',
    language: 'en',
    emoji: 'wave',
    authorId: 'system',
    isSystem: true,
    createdAt: 0,
    words: [
      { id: 'en_b1', term: 'hello', translation: 'привет', transcription: '[həˈloʊ]', example: 'Hello, how are you?' },
      { id: 'en_b2', term: 'goodbye', translation: 'до свидания', transcription: '[ˌɡʊdˈbaɪ]', example: 'Goodbye, see you soon!' },
      { id: 'en_b3', term: 'please', translation: 'пожалуйста', transcription: '[pliːz]', example: 'Two coffees, please.' },
      { id: 'en_b4', term: 'thank you', translation: 'спасибо', transcription: '[ˈθæŋk juː]', example: 'Thank you very much!' },
      { id: 'en_b5', term: 'yes', translation: 'да', transcription: '[jes]', example: 'Yes, of course.' },
      { id: 'en_b6', term: 'no', translation: 'нет', transcription: '[noʊ]', example: 'No, thank you.' },
      { id: 'en_b7', term: 'sorry', translation: 'извините', transcription: '[ˈsɑːri]', example: 'Sorry, I am late.' },
      { id: 'en_b8', term: 'friend', translation: 'друг', transcription: '[frend]', example: 'She is my best friend.' },
      { id: 'en_b9', term: 'water', translation: 'вода', transcription: '[ˈwɔːtər]', example: 'Can I have some water?' },
      { id: 'en_b10', term: 'love', translation: 'любовь', transcription: '[lʌv]', example: 'I love this city.' },
      { id: 'en_b11', term: 'today', translation: 'сегодня', transcription: '[təˈdeɪ]', example: 'Today is a good day.' },
      { id: 'en_b12', term: 'name', translation: 'имя', transcription: '[neɪm]', example: 'What is your name?' },
    ],
  },
  {
    id: 'en_food',
    title: 'Еда и напитки',
    description: 'В кафе и магазине',
    language: 'en',
    emoji: 'books',
    authorId: 'system',
    isSystem: true,
    createdAt: 0,
    words: [
      { id: 'en_f1', term: 'apple', translation: 'яблоко', transcription: '[ˈæpl]', example: 'An apple a day.' },
      { id: 'en_f2', term: 'bread', translation: 'хлеб', transcription: '[bred]', example: 'Fresh bread, please.' },
      { id: 'en_f3', term: 'coffee', translation: 'кофе', transcription: '[ˈkɔːfi]', example: 'I drink coffee every morning.' },
      { id: 'en_f4', term: 'milk', translation: 'молоко', transcription: '[mɪlk]', example: 'A glass of milk.' },
      { id: 'en_f5', term: 'cheese', translation: 'сыр', transcription: '[tʃiːz]', example: 'I love cheese.' },
      { id: 'en_f6', term: 'tea', translation: 'чай', transcription: '[tiː]', example: 'Green tea, please.' },
      { id: 'en_f7', term: 'sugar', translation: 'сахар', transcription: '[ˈʃʊɡər]', example: 'No sugar, thanks.' },
      { id: 'en_f8', term: 'fish', translation: 'рыба', transcription: '[fɪʃ]', example: 'The fish is delicious.' },
      { id: 'en_f9', term: 'egg', translation: 'яйцо', transcription: '[eɡ]', example: 'I want one egg.' },
      { id: 'en_f10', term: 'soup', translation: 'суп', transcription: '[suːp]', example: 'Hot soup for lunch.' },
    ],
  },
];

export default sets;
