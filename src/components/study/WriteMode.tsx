import React, { useMemo, useState } from 'react';
import { View, TextInput } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppText } from '../ui/Text';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Emoji } from '../Emoji';
import { StudyTopBar } from './StudyTopBar';
import { ModeProps, AnswerOutcome, shuffle, normalize } from './types';

export function WriteMode({ words, onComplete, onQuit }: ModeProps) {
  const t = useTheme();
  const deck = useMemo(() => shuffle(words), [words]);
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState('');
  const [checked, setChecked] = useState<null | boolean>(null);
  const results = React.useRef<AnswerOutcome[]>([]);

  const word = deck[index];

  function check() {
    if (checked !== null) return next();
    const correct = normalize(value) === normalize(word.term);
    setChecked(correct);
    results.current.push({ wordId: word.id, correct });
  }

  function next() {
    if (index + 1 >= deck.length) {
      onComplete(results.current);
      return;
    }
    setValue('');
    setChecked(null);
    setIndex(index + 1);
  }

  if (!word) return null;
  const feedbackColor =
    checked === null ? t.palette.border : checked ? t.palette.success : t.palette.danger;

  return (
    <View style={{ flex: 1 }}>
      <StudyTopBar progress={index / deck.length} onQuit={onQuit} />

      <Card tone="surface" style={{ alignItems: 'center', gap: t.spacing.xs }}>
        <AppText variant="caption" color="muted">
          Переведи на изучаемый язык
        </AppText>
        <AppText variant="title" align="center">
          {word.translation}
        </AppText>
      </Card>

      <View style={{ height: t.spacing.lg }} />
      <TextInput
        value={value}
        onChangeText={setValue}
        editable={checked === null}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Введи слово…"
        placeholderTextColor={t.palette.textFaint}
        onSubmitEditing={check}
        style={{
          fontFamily: t.fonts.body,
          fontSize: t.fontSize.xl,
          color: t.palette.text,
          backgroundColor: t.palette.surface,
          borderRadius: t.radius.lg,
          borderWidth: 2,
          borderColor: feedbackColor,
          paddingHorizontal: t.spacing.lg,
          paddingVertical: t.spacing.md,
          textAlign: 'center',
        }}
      />

      {checked !== null ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing.sm, marginTop: t.spacing.md }}>
          <Emoji name={checked ? 'check' : 'cross'} size={22} />
          <AppText variant="bodyStrong" style={{ color: feedbackColor }}>
            {checked ? 'Верно!' : `Правильно: ${word.term}`}
          </AppText>
        </View>
      ) : null}

      <View style={{ flex: 1 }} />
      <Button
        label={checked === null ? 'Проверить' : index + 1 >= deck.length ? 'Завершить' : 'Дальше'}
        icon={checked === null ? 'direct-hit' : 'check'}
        onPress={check}
      />
    </View>
  );
}
