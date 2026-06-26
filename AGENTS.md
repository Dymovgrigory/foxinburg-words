# Foxinburg Words 🦊 — conventions

## Expo HAS CHANGED
Read the exact versioned docs at https://docs.expo.dev/versions/v56.0.0/ before writing any code.
This project is on **Expo SDK 56** (React Native 0.85). APIs differ from older majors — always check v56 docs.

## Stack
- Expo SDK 56 + **expo-router** (file-based routing in `app/`)
- TypeScript (strict). No `any` without justification.
- **Zustand** + AsyncStorage for state/persistence (`src/store/useAppStore.ts`)
- **react-native-reanimated v4** (needs `react-native-worklets/plugin` LAST in `babel.config.js`)

## Commands
- Install deps: `npm install` (a `.npmrc` pins `legacy-peer-deps=true` — keep it)
- Typecheck: `npx tsc --noEmit`
- Bundle check: `CI=1 npx expo export --platform ios --output-dir /tmp/expo-export`
- Regenerate bundled emoji SVG data: `node scripts/build-emoji.mjs`
- Start: `npx expo start`

## Hard rules
- **NO system/Unicode emoji anywhere.** All glyphs come from bundled SVG only:
  - UI icons → `lucide-react-native`
  - Colored glyphs (moods, badges, set icons) → Fluent Emoji Flat via `<Emoji name="..." />` (`src/components/Emoji.tsx`)
  - Language flags → circle-flags ids (`flag-en`, `flag-de`, ...), never `🇬🇧`
  - Mascot → custom SVG `src/components/FoxMascot.tsx`
  The `Emoji`/flag fields in data are **icon ids** (e.g. `'wave'`, `'books'`), not Unicode characters.
- **Russian services only** for any future backend/integrations (Yandex Cloud / VK Cloud / Selectel, Yandex ID / VK ID, AppMetrica, RuStore). No Firebase/AWS/GCP. Keep the data layer abstracted so local AsyncStorage can be swapped for a Russian cloud later.
- **UI on the dark sky gradient:** text uses `color="sky"`; content cards use `tone="surface"`. Never `tone="elevated"` or `color="onPrimary"` on the sky (contrast fails).
- All user-facing copy is in **Russian**.

## Adding word sets (for the per-language sub-agents)
Edit only your language file: `src/data/sets/{en|de|zh|es|fr|ja}.ts`. Default-export `WordSet[]`.
Shape (see `src/domain/types.ts`):
```ts
{
  id: 'en_travel',            // unique, prefix with lang code
  title: 'Путешествия',       // Russian
  description: '...',         // Russian
  language: 'en',
  emoji: 'airplane',          // Emoji icon id (NOT a Unicode emoji) — must exist in scripts/emoji-manifest.json
  authorId: 'system',
  isSystem: true,
  createdAt: 0,
  words: [
    { id: 'en_tr1', term: 'airport', translation: 'аэропорт', transcription: '[ˈeəpɔːt]', example: '...' },
    // 8–12 words per set, transcription + a short example sentence each
  ],
}
```
Rules for sets: `term` = foreign word, `translation` = Russian. Keep ≥4 words (study modes require it; aim for 8–12). After editing, run `npx tsc --noEmit` and the bundle check above. If you need a new `emoji` icon id, add it to `scripts/emoji-manifest.json` and rerun `node scripts/build-emoji.mjs`.
