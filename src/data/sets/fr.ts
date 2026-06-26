import { WordSet } from '../../domain/types';

// Starter French sets. Sub-agents expand this file with more sets/words.
const sets: WordSet[] = [
  {
    id: 'fr_basics',
    title: 'Premiers mots',
    description: 'Приветствия и вежливость',
    language: 'fr',
    emoji: 'wave',
    authorId: 'system',
    isSystem: true,
    createdAt: 0,
    words: [
      { id: 'fr_b1', term: 'bonjour', translation: 'здравствуйте', transcription: '[bɔ̃ʒuʁ]', example: 'Bonjour, ça va ?' },
      { id: 'fr_b2', term: 'au revoir', translation: 'до свидания', transcription: '[o ʁəvwaʁ]', example: 'Au revoir, à demain !' },
      { id: 'fr_b3', term: "s'il vous plaît", translation: 'пожалуйста', transcription: '[sil vu plɛ]', example: 'Un café, s’il vous plaît.' },
      { id: 'fr_b4', term: 'merci', translation: 'спасибо', transcription: '[mɛʁsi]', example: 'Merci beaucoup !' },
      { id: 'fr_b5', term: 'oui', translation: 'да', transcription: '[wi]', example: 'Oui, bien sûr.' },
      { id: 'fr_b6', term: 'non', translation: 'нет', transcription: '[nɔ̃]', example: 'Non, merci.' },
      { id: 'fr_b7', term: 'pardon', translation: 'извините', transcription: '[paʁdɔ̃]', example: 'Pardon, je suis en retard.' },
      { id: 'fr_b8', term: 'ami', translation: 'друг', transcription: '[ami]', example: "C'est mon ami." },
      { id: 'fr_b9', term: 'eau', translation: 'вода', transcription: '[o]', example: 'Un verre d’eau.' },
      { id: 'fr_b10', term: 'amour', translation: 'любовь', transcription: '[amuʁ]', example: "L'amour est beau." },
      { id: 'fr_b11', term: "aujourd'hui", translation: 'сегодня', transcription: '[oʒuʁdɥi]', example: "Aujourd'hui c'est lundi." },
      { id: 'fr_b12', term: 'nom', translation: 'имя', transcription: '[nɔ̃]', example: 'Quel est ton nom ?' },
    ],
  },
  {
    id: 'fr_food',
    title: 'Nourriture et boisson',
    description: 'Еда и напитки',
    language: 'fr',
    emoji: 'books',
    authorId: 'system',
    isSystem: true,
    createdAt: 0,
    words: [
      { id: 'fr_f1', term: 'pomme', translation: 'яблоко', transcription: '[pɔm]', example: 'Une pomme rouge.' },
      { id: 'fr_f2', term: 'pain', translation: 'хлеб', transcription: '[pɛ̃]', example: 'Du pain frais.' },
      { id: 'fr_f3', term: 'café', translation: 'кофе', transcription: '[kafe]', example: 'Je bois du café.' },
      { id: 'fr_f4', term: 'lait', translation: 'молоко', transcription: '[lɛ]', example: 'Un verre de lait.' },
      { id: 'fr_f5', term: 'fromage', translation: 'сыр', transcription: '[fʁɔmaʒ]', example: "J'aime le fromage." },
      { id: 'fr_f6', term: 'thé', translation: 'чай', transcription: '[te]', example: 'Du thé vert, s’il vous plaît.' },
      { id: 'fr_f7', term: 'sucre', translation: 'сахар', transcription: '[sykʁ]', example: 'Sans sucre, merci.' },
      { id: 'fr_f8', term: 'poisson', translation: 'рыба', transcription: '[pwasɔ̃]', example: 'Le poisson est bon.' },
      { id: 'fr_f9', term: 'œuf', translation: 'яйцо', transcription: '[œf]', example: 'Un œuf à la coque.' },
      { id: 'fr_f10', term: 'soupe', translation: 'суп', transcription: '[sup]', example: 'Une soupe chaude.' },
    ],
  },
];

export default sets;
