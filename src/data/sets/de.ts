import { WordSet } from '../../domain/types';

// Starter German sets. Sub-agents expand this file with more sets/words.
const sets: WordSet[] = [
  {
    id: 'de_basics',
    title: 'Erste Wörter',
    description: 'Приветствия и вежливость',
    language: 'de',
    emoji: 'wave',
    authorId: 'system',
    isSystem: true,
    createdAt: 0,
    words: [
      { id: 'de_b1', term: 'Hallo', translation: 'привет', transcription: '[ˈhalo]', example: 'Hallo, wie geht es dir?' },
      { id: 'de_b2', term: 'Tschüss', translation: 'пока', transcription: '[tʃʏs]', example: 'Tschüss, bis morgen!' },
      { id: 'de_b3', term: 'bitte', translation: 'пожалуйста', transcription: '[ˈbɪtə]', example: 'Einen Kaffee, bitte.' },
      { id: 'de_b4', term: 'danke', translation: 'спасибо', transcription: '[ˈdaŋkə]', example: 'Danke schön!' },
      { id: 'de_b5', term: 'ja', translation: 'да', transcription: '[jaː]', example: 'Ja, natürlich.' },
      { id: 'de_b6', term: 'nein', translation: 'нет', transcription: '[naɪn]', example: 'Nein, danke.' },
      { id: 'de_b7', term: 'Entschuldigung', translation: 'извините', transcription: '[ɛntˈʃʊldɪɡʊŋ]', example: 'Entschuldigung, wo ist der Bahnhof?' },
      { id: 'de_b8', term: 'Freund', translation: 'друг', transcription: '[frɔɪnt]', example: 'Er ist mein Freund.' },
      { id: 'de_b9', term: 'Wasser', translation: 'вода', transcription: '[ˈvasɐ]', example: 'Ein Glas Wasser, bitte.' },
      { id: 'de_b10', term: 'Liebe', translation: 'любовь', transcription: '[ˈliːbə]', example: 'Liebe ist schön.' },
      { id: 'de_b11', term: 'heute', translation: 'сегодня', transcription: '[ˈhɔɪtə]', example: 'Heute ist Montag.' },
      { id: 'de_b12', term: 'Name', translation: 'имя', transcription: '[ˈnaːmə]', example: 'Wie ist dein Name?' },
    ],
  },
  {
    id: 'de_food',
    title: 'Essen und Trinken',
    description: 'Еда и напитки',
    language: 'de',
    emoji: 'books',
    authorId: 'system',
    isSystem: true,
    createdAt: 0,
    words: [
      { id: 'de_f1', term: 'Apfel', translation: 'яблоко', transcription: '[ˈapfl̩]', example: 'Ein roter Apfel.' },
      { id: 'de_f2', term: 'Brot', translation: 'хлеб', transcription: '[broːt]', example: 'Frisches Brot.' },
      { id: 'de_f3', term: 'Kaffee', translation: 'кофе', transcription: '[ˈkafe]', example: 'Ich trinke Kaffee.' },
      { id: 'de_f4', term: 'Milch', translation: 'молоко', transcription: '[mɪlç]', example: 'Ein Glas Milch.' },
      { id: 'de_f5', term: 'Käse', translation: 'сыр', transcription: '[ˈkɛːzə]', example: 'Ich mag Käse.' },
      { id: 'de_f6', term: 'Tee', translation: 'чай', transcription: '[teː]', example: 'Grüner Tee, bitte.' },
      { id: 'de_f7', term: 'Zucker', translation: 'сахар', transcription: '[ˈtsʊkɐ]', example: 'Ohne Zucker, danke.' },
      { id: 'de_f8', term: 'Fisch', translation: 'рыба', transcription: '[fɪʃ]', example: 'Der Fisch ist frisch.' },
      { id: 'de_f9', term: 'Ei', translation: 'яйцо', transcription: '[aɪ]', example: 'Ein gekochtes Ei.' },
      { id: 'de_f10', term: 'Suppe', translation: 'суп', transcription: '[ˈzʊpə]', example: 'Heiße Suppe.' },
    ],
  },
];

export default sets;
