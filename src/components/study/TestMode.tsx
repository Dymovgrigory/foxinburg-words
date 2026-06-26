import React, { useMemo, useState } from 'react';
import { View, Pressable } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppText } from '../ui/Text';
import { Card } from '../ui/Card';
import { StudyTopBar } from './StudyTopBar';
import { ModeProps, AnswerOutcome, shuffle } from './types';
import { Word } from '../../domain/types';

type Question = { word: Word; options: string[] };

export function TestMode({ words, onComplete, onQuit }: ModeProps) {
  const t = useTheme();
  const questions = useMemo<Question[]>(() => {
    const pool = words.map((w) => w.translation);
    return shuffle(words).map((word) => {
      const distractors = shuffle(pool.filter((x) => x !== word.translation)).slice(0, 3);
      return { word, options: shuffle([word.translation, ...distractors]) };
    });
  }, [words]);

  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const results = React.useRef<AnswerOutcome[]>([]);

  const q = questions[index];

  function pick(option: string) {
    if (picked !== null) return;
    const correct = option === q.word.translation;
    setPicked(option);
    results.current.push({ wordId: q.word.id, correct });
    setTimeout(() => {
      if (index + 1 >= questions.length) {
        onComplete(results.current);
        return;
      }
      setPicked(null);
      setIndex((i) => i + 1);
    }, 750);
  }

  if (!q) return null;

  return (
    <View style={{ flex: 1 }}>
      <StudyTopBar progress={index / questions.length} onQuit={onQuit} />

      <Card tone="surface" style={{ alignItems: 'center', gap: t.spacing.xs }}>
        <AppText variant="caption" color="muted">
          Выбери перевод
        </AppText>
        <AppText variant="title" align="center">
          {q.word.term}
        </AppText>
        {q.word.transcription ? (
          <AppText variant="body" color="faint">
            {q.word.transcription}
          </AppText>
        ) : null}
      </Card>

      <View style={{ height: t.spacing.lg }} />
      <View style={{ gap: t.spacing.md }}>
        {q.options.map((option) => {
          const isCorrect = option === q.word.translation;
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
