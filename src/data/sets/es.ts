import { WordSet } from '../../domain/types';

// Starter Spanish sets. Sub-agents expand this file with more sets/words.
const sets: WordSet[] = [
  {
    id: 'es_basics',
    title: 'Primeras palabras',
    description: 'Приветствия и вежливость',
    language: 'es',
    emoji: 'wave',
    authorId: 'system',
    isSystem: true,
    createdAt: 0,
    words: [
      { id: 'es_b1', term: 'hola', translation: 'привет', transcription: '[ˈola]', example: '¡Hola! ¿Cómo estás?' },
      { id: 'es_b2', term: 'adiós', translation: 'до свидания', transcription: '[aˈðjos]', example: 'Adiós, hasta mañana.' },
      { id: 'es_b3', term: 'por favor', translation: 'пожалуйста', transcription: '[poɾ faˈβoɾ]', example: 'Un café, por favor.' },
      { id: 'es_b4', term: 'gracias', translation: 'спасибо', transcription: '[ˈɡɾaθjas]', example: '¡Muchas gracias!' },
      { id: 'es_b5', term: 'sí', translation: 'да', transcription: '[si]', example: 'Sí, claro.' },
      { id: 'es_b6', term: 'no', translation: 'нет', transcription: '[no]', example: 'No, gracias.' },
      { id: 'es_b7', term: 'perdón', translation: 'извините', transcription: '[peɾˈðon]', example: 'Perdón, llego tarde.' },
      { id: 'es_b8', term: 'amigo', translation: 'друг', transcription: '[aˈmiɣo]', example: 'Es mi amigo.' },
      { id: 'es_b9', term: 'agua', translation: 'вода', transcription: '[ˈaɣwa]', example: 'Un vaso de agua.' },
      { id: 'es_b10', term: 'amor', translation: 'любовь', transcription: '[aˈmoɾ]', example: 'El amor es bonito.' },
      { id: 'es_b11', term: 'hoy', translation: 'сегодня', transcription: '[oi]', example: 'Hoy es lunes.' },
      { id: 'es_b12', term: 'nombre', translation: 'имя', transcription: '[ˈnombɾe]', example: '¿Cuál es tu nombre?' },
    ],
  },
  {
    id: 'es_food',
    title: 'Comida y bebida',
    description: 'Еда и напитки',
    language: 'es',
    emoji: 'books',
    authorId: 'system',
    isSystem: true,
    createdAt: 0,
    words: [
      { id: 'es_f1', term: 'manzana', translation: 'яблоко', transcription: '[manˈθana]', example: 'Una manzana roja.' },
      { id: 'es_f2', term: 'pan', translation: 'хлеб', transcription: '[pan]', example: 'Pan fresco.' },
      { id: 'es_f3', term: 'café', translation: 'кофе', transcription: '[kaˈfe]', example: 'Bebo café.' },
      { id: 'es_f4', term: 'leche', translation: 'молоко', transcription: '[ˈletʃe]', example: 'Un vaso de leche.' },
      { id: 'es_f5', term: 'queso', translation: 'сыр', transcription: '[ˈkeso]', example: 'Me gusta el queso.' },
      { id: 'es_f6', term: 'té', translation: 'чай', transcription: '[te]', example: 'Té verde, por favor.' },
      { id: 'es_f7', term: 'azúcar', translation: 'сахар', transcription: '[aˈθukaɾ]', example: 'Sin azúcar, gracias.' },
      { id: 'es_f8', term: 'pescado', translation: 'рыба', transcription: '[pesˈkaðo]', example: 'El pescado está rico.' },
      { id: 'es_f9', term: 'huevo', translation: 'яйцо', transcription: '[ˈweβo]', example: 'Un huevo cocido.' },
      { id: 'es_f10', term: 'sopa', translation: 'суп', transcription: '[ˈsopa]', example: 'Sopa caliente.' },
    ],
  },
];

export default sets;
