import React, { useMemo, useState } from 'react';
import { View, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/ThemeProvider';
import { AppText } from '../ui/Text';
import { Button } from '../ui/Button';
import { StudyTopBar } from './StudyTopBar';
import { ModeProps, AnswerOutcome, shuffle } from './types';

export function Flashcards({ words, onComplete, onQuit }: ModeProps) {
  const t = useTheme();
  const deck = useMemo(() => shuffle(words), [words]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const results = React.useRef<AnswerOutcome[]>([]);
  const flip = useSharedValue(0);

  const word = deck[index];

  const frontStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 1000 }, { rotateY: `${interpolate(flip.value, [0, 1], [0, 180])}deg` }],
    backfaceVisibility: 'hidden',
  }));
  const backStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 1000 }, { rotateY: `${interpolate(flip.value, [0, 1], [180, 360])}deg` }],
    backfaceVisibility: 'hidden',
  }));

  function toggle() {
    const next = !flipped;
    setFlipped(next);
    flip.value = withTiming(next ? 1 : 0, { duration: 320 });
  }

  function answer(correct: boolean) {
    results.current.push({ wordId: word.id, correct });
    if (index + 1 >= deck.length) {
      onComplete(results.current);
      return;
    }
    flip.value = 0;
    setFlipped(false);
    setIndex(index + 1);
  }

  if (!word) return null;

  return (
    <View style={{ flex: 1 }}>
      <StudyTopBar progress={index / deck.length} onQuit={onQuit} />
      <AppText
        variant="caption"
        color="inherit"
        align="center"
        style={{ marginBottom: t.spacing.md, color: t.palette.isDark ? '#FFF6EC' : t.palette.text }}
      >
        {index + 1} / {deck.length}
      </AppText>

      <Pressable onPress={toggle} style={{ flex: 1, justifyContent: 'center' }}>
        <View style={{ height: 320 }}>
          <Animated.View
            style={[
              {
                position: 'absolute',
                inset: 0,
                backgroundColor: t.palette.surface,
                borderRadius: t.radius.xl,
                alignItems: 'center',
                justifyContent: 'center',
                padding: t.spacing.xl,
              },
              frontStyle,
            ]}
          >
            <AppText variant="display" align="center">
              {word.term}
            </AppText>
            {word.transcription ? (
              <AppText variant="body" color="faint" style={{ marginTop: t.spacing.sm }}>
                {word.transcription}
              </AppText>
            ) : null}
            <AppText variant="caption" color="muted" style={{ marginTop: t.spacing.lg }}>
              Нажми, чтобы перевернуть
            </AppText>
          </Animated.View>

          <Animated.View
            style={[
              {
                position: 'absolute',
                inset: 0,
                backgroundColor: t.palette.primarySoft,
                borderRadius: t.radius.xl,
                alignItems: 'center',
                justifyContent: 'center',
                padding: t.spacing.xl,
              },
              backStyle,
            ]}
          >
            <AppText variant="title" align="center">
              {word.translation}
            </AppText>
            {word.example ? (
              <AppText variant="body" color="muted" align="center" style={{ marginTop: t.spacing.md }}>
                {word.example}
              </AppText>
            ) : null}
          </Animated.View>
        </View>
      </Pressable>

      <View style={{ flexDirection: 'row', gap: t.spacing.md, marginTop: t.spacing.lg }}>
        <View style={{ flex: 1 }}>
          <Button label="Повторить" variant="secondary" icon="thinking" onPress={() => answer(false)} />
        </View>
        <View style={{ flex: 1 }}>
          <Button label="Знаю" variant="success" icon="check" onPress={() => answer(true)} />
        </View>
      </View>
    </View>
  );
}
