import { Language, LanguageCode } from '../domain/types';

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'Английский', nativeName: 'English', flag: 'flag-en', accent: '#3C82F6' },
  { code: 'de', name: 'Немецкий', nativeName: 'Deutsch', flag: 'flag-de', accent: '#1F2937' },
  { code: 'zh', name: 'Китайский', nativeName: '中文', flag: 'flag-zh', accent: '#E5484D' },
  { code: 'es', name: 'Испанский', nativeName: 'Español', flag: 'flag-es', accent: '#F2A007' },
  { code: 'fr', name: 'Французский', nativeName: 'Français', flag: 'flag-fr', accent: '#7C5CFC' },
  { code: 'ja', name: 'Японский', nativeName: '日本語', flag: 'flag-ja', accent: '#FF5D8F' },
];

export const LANGUAGE_MAP: Record<LanguageCode, Language> = LANGUAGES.reduce(
  (acc, l) => {
    acc[l.code] = l;
    return acc;
  },
  {} as Record<LanguageCode, Language>,
);

export function getLanguage(code: LanguageCode): Language {
  return LANGUAGE_MAP[code];
}
