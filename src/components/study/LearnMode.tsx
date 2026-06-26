import React, { useMemo, useRef, useState } from 'react';
import { View, Pressable } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppText } from '../ui/Text';
import { Card } from '../ui/Card';
import { Emoji } from '../Emoji';
import { StudyTopBar } from './StudyTopBar';
import { ModeProps, AnswerOutcome, shuffle } from './types';
import { Word } from '../../domain/types';

// Adaptive recall: wrong answers are requeued until every word is cleared once.
export function LearnMode({ words, onComplete, onQuit }: ModeProps) {
  const t = useTheme();
  const pool = useMemo(() => words.map((w) => w.translation), [words]);
  const [queue, setQueue] = useState<Word[]>(() => shuffle(words));
  const [picked, setPicked] = useState<string | null>(null);
  const cleared = useRef<Set<string>>(new Set());
  const firstTryWrong = useRef<Set<string>>(new Set());
  const recorded = useRef<Set<string>>(new Set());
  const results = useRef<AnswerOutcome[]>([]);
  const total = words.length;

  const word = queue[0];
  const options = useMemo(() => {
    if (!word) return [];
    const distractors = shuffle(pool.filter((x) => x !== word.translation)).slice(0, 3);
    return shuffle([word.translation, ...distractors]);
  }, [word, pool]);

  function pick(option: string) {
    if (picked !== null || !word) return;
    const correct = option === word.translation;
    setPicked(option);
    if (!correct) firstTryWrong.current.add(word.id);

    setTimeout(() => {
      setPicked(null);
      const rest = queue.slice(1);
      if (correct) {
        cleared.current.add(word.id);
        if (!recorded.current.has(word.id)) {
          recorded.current.add(word.id);
          results.current.push({
            wordId: word.id,
            correct: !firstTryWrong.current.has(word.id),
          });
        }
        if (rest.length === 0) {
          onComplete(results.current);
          return;
        }
        setQueue(rest);
      } else {
        setQueue([...rest, word]);
      }
    }, 700);
  }

  if (!word) return null;

  return (
    <View style={{ flex: 1 }}>
      <StudyTopBar progress={cleared.current.size / Math.max(1, total)} onQuit={onQuit} />
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: t.spacing.xs, marginBottom: t.spacing.md }}>
        <Emoji name="brain" size={18} />
        <AppText
          variant="caption"
          color="inherit"
          style={{ color: t.palette.isDark ? '#FFF6EC' : t.palette.text }}
        >
          Освоено {cleared.current.size} / {total}
        </AppText>
      </View>

      <Card tone="surface" style={{ alignItems: 'center', gap: t.spacing.xs }}>
        <AppText variant="caption" color="muted">
          Что это значит?
        </AppText>
        <AppText variant="title" align="center">
          {word.term}
        </AppText>
        {word.example ? (
          <AppText variant="caption" color="faint" align="center">
            {word.example}
          </AppText>
        ) : null}
      </Card>

      <View style={{ height: t.spacing.lg }} />
      <View style={{ gap: t.spacing.md }}>
        {options.map((option) => {
          const isCorrect = option === word.translation;
          const isPicked = option === picked;
          let bg = t.palette.surface;
          let border = 'transparent';
          if (picked !== null) {
            if (isCorrect) {
              bg = t.palette.successSoft;
              border = t.palette.success;
            } else if (isPicked) {
              bg = t.palette.dangerSoft;
              border = t.palette.danger;
            }
          }
          return (
            <Pressable key={option} onPress={() => pick(option)}>
              <View
                style={{
                  backgroundColor: bg,
                  borderRadius: t.radius.lg,
                  borderWidth: 2,
                  borderColor: border,
                  paddingVertical: t.spacing.lg,
                  paddingHorizontal: t.spacing.lg,
                }}
              >
                <AppText variant="subtitle" align="center">
                  {option}
                </AppText>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
