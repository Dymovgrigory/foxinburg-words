import React, { useMemo, useState } from 'react';
import { View, Pressable } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppText } from '../ui/Text';
import { StudyTopBar } from './StudyTopBar';
import { ModeProps, AnswerOutcome, shuffle } from './types';
import { Word } from '../../domain/types';

const CHUNK = 5;

function chunkWords(words: Word[]): Word[][] {
  const shuffled = shuffle(words);
  const out: Word[][] = [];
  for (let i = 0; i < shuffled.length; i += CHUNK) {
    out.push(shuffled.slice(i, i + CHUNK));
  }
  return out;
}

export function MatchMode({ words, onComplete, onQuit }: ModeProps) {
  const t = useTheme();
  const chunks = useMemo(() => chunkWords(words), [words]);
  const [chunkIndex, setChunkIndex] = useState(0);

  const pairs = chunks[chunkIndex] ?? [];
  const rights = useMemo(() => shuffle(pairs), [pairs]);

  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrongRight, setWrongRight] = useState<string | null>(null);
  const results = React.useRef<AnswerOutcome[]>([]);
  const wrongWords = React.useRef<Set<string>>(new Set());

  function finishChunk() {
    for (const w of pairs) {
      results.current.push({ wordId: w.id, correct: !wrongWords.current.has(w.id) });
    }
    if (chunkIndex + 1 >= chunks.length) {
      onComplete(results.current);
      return;
    }
    setSelectedTerm(null);
    setMatched(new Set());
    setChunkIndex((i) => i + 1);
  }

  function tapTerm(id: string) {
    if (matched.has(id)) return;
    setSelectedTerm(id);
  }

  function tapTranslation(word: Word) {
    if (matched.has(word.id)) return;
    if (!selectedTerm) return;
    if (selectedTerm === word.id) {
      const nextMatched = new Set(matched);
      nextMatched.add(word.id);
      setMatched(nextMatched);
      setSelectedTerm(null);
      if (nextMatched.size === pairs.length) {
        setTimeout(finishChunk, 350);
      }
    } else {
      wrongWords.current.add(selectedTerm);
      setWrongRight(word.id);
      setTimeout(() => setWrongRight(null), 400);
      setSelectedTerm(null);
    }
  }

  const totalDone =
    chunkIndex * CHUNK + matched.size;

  return (
    <View style={{ flex: 1 }}>
      <StudyTopBar progress={words.length ? totalDone / words.length : 0} onQuit={onQuit} />
      <AppText
        variant="caption"
        color="inherit"
        align="center"
        style={{ marginBottom: t.spacing.md, color: t.palette.isDark ? '#FFF6EC' : t.palette.text }}
      >
        Соедини слово с переводом
      </AppText>

      <View style={{ flexDirection: 'row', gap: t.spacing.md, flex: 1 }}>
        <View style={{ flex: 1, gap: t.spacing.sm }}>
          {pairs.map((w) => {
            const isMatched = matched.has(w.id);
            const isSelected = selectedTerm === w.id;
            return (
              <Pressable key={w.id} onPress={() => tapTerm(w.id)} disabled={isMatched}>
                <View
                  style={{
                    backgroundColor: isMatched
                      ? t.palette.successSoft
                      : isSelected
                        ? t.palette.primarySoft
                        : t.palette.surface,
                    borderRadius: t.radius.md,
                    borderWidth: 2,
                    borderColor: isSelected ? t.palette.primary : 'transparent',
                    paddingVertical: t.spacing.md,
                    paddingHorizontal: t.spacing.sm,
                    opacity: isMatched ? 0.5 : 1,
                  }}
                >
                  <AppText variant="bodyStrong" align="center" numberOfLines={1}>
                    {w.term}
                  </AppText>
                </View>
              </Pressable>
            );
          })}
        </View>

        <View style={{ flex: 1, gap: t.spacing.sm }}>
          {rights.map((w) => {
            const isMatched = matched.has(w.id);
            const isWrong = wrongRight === w.id;
            return (
              <Pressable key={w.id} onPress={() => tapTranslation(w)} disabled={isMatched}>
                <View
                  style={{
                    backgroundColor: isMatched
                      ? t.palette.successSoft
                      : isWrong
                        ? t.palette.dangerSoft
                        : t.palette.surface,
                    borderRadius: t.radius.md,
                    borderWidth: 2,
                    borderColor: isWrong ? t.palette.danger : 'transparent',
                    paddingVertical: t.spacing.md,
                    paddingHorizontal: t.spacing.sm,
                    opacity: isMatched ? 0.5 : 1,
                  }}
                >
                  <AppText variant="bodyStrong" align="center" numberOfLines={1}>
                    {w.translation}
                  </AppText>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}
