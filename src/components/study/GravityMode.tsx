import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import { View, TextInput, LayoutChangeEvent } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  cancelAnimation,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/ThemeProvider';
import { AppText } from '../ui/Text';
import { Emoji } from '../Emoji';
import { StudyTopBar } from './StudyTopBar';
import { ModeProps, AnswerOutcome, shuffle, normalize } from './types';

const FALL_MS = 9000;
const START_LIVES = 3;

export function GravityMode({ words, onComplete, onQuit }: ModeProps) {
  const t = useTheme();
  const deck = useMemo(() => shuffle(words), [words]);
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState('');
  const [lives, setLives] = useState(START_LIVES);
  const [areaH, setAreaH] = useState(0);
  const results = useRef<AnswerOutcome[]>([]);
  const y = useSharedValue(0);
  const drift = useSharedValue(0);
  const handledRef = useRef(false);

  const word = deck[index];

  const advance = useCallback(
    (correct: boolean) => {
      if (handledRef.current) return;
      handledRef.current = true;
      cancelAnimation(y);
      if (word) results.current.push({ wordId: word.id, correct });
      const nextLives = correct ? lives : lives - 1;
      if (!correct) setLives(nextLives);

      if (nextLives <= 0 || index + 1 >= deck.length) {
        onComplete(results.current);
        return;
      }
      setValue('');
      setIndex((i) => i + 1);
    },
    [word, lives, index, deck.length, onComplete, y],
  );

  // Start the fall whenever a new word appears.
  useEffect(() => {
    if (!word || areaH <= 0) return;
    handledRef.current = false;
    y.value = 0;
    drift.value = 0;
    drift.value = withRepeat(withTiming(1, { duration: 1600, easing: Easing.inOut(Easing.quad) }), -1, true);
    y.value = withTiming(
      Math.max(0, areaH - 60),
      { duration: FALL_MS, easing: Easing.linear },
      (finished) => {
        if (finished) runOnJS(advance)(false);
      },
    );
    return () => cancelAnimation(y);
  }, [index, areaH, word, y, drift, advance]);

  function submit() {
    if (!word) return;
    if (normalize(value) === normalize(word.translation)) {
      advance(true);
    } else {
      setValue('');
    }
  }

  const fallStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: y.value },
      { translateX: (drift.value - 0.5) * 40 },
    ],
  }));

  function onArea(e: LayoutChangeEvent) {
    setAreaH(e.nativeEvent.layout.height);
  }

  if (!word) return null;

  return (
    <View style={{ flex: 1 }}>
      <StudyTopBar progress={index / deck.length} onQuit={onQuit} />

      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: t.spacing.xs, marginBottom: t.spacing.sm }}>
        {Array.from({ length: START_LIVES }).map((_, i) => (
          <Emoji key={i} name={i < lives ? 'growing-heart' : 'cross'} size={22} />
        ))}
      </View>

      <View onLayout={onArea} style={{ flex: 1, overflow: 'hidden' }}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              alignSelf: 'center',
              backgroundColor: t.palette.primary,
              borderRadius: t.radius.pill,
              paddingHorizontal: t.spacing.lg,
              paddingVertical: t.spacing.md,
            },
            fallStyle,
          ]}
        >
          <AppText variant="heading" style={{ color: t.palette.onPrimary }}>
            {word.term}
          </AppText>
        </Animated.View>
      </View>

      <TextInput
        value={value}
        onChangeText={setValue}
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus
        placeholder="Перевод…"
        placeholderTextColor={t.palette.textFaint}
        onSubmitEditing={submit}
        returnKeyType="go"
        style={{
          fontFamily: t.fonts.body,
          fontSize: t.fontSize.lg,
          color: t.palette.text,
          backgroundColor: t.palette.surface,
          borderRadius: t.radius.lg,
          paddingHorizontal: t.spacing.lg,
          paddingVertical: t.spacing.md,
          textAlign: 'center',
          marginTop: t.spacing.md,
        }}
      />
    </View>
  );
}
