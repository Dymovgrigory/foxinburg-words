import React from 'react';
import { View, Pressable, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Screen } from '../../src/components/ui/Screen';
import { AppText } from '../../src/components/ui/Text';
import { Card } from '../../src/components/ui/Card';
import { Emoji } from '../../src/components/Emoji';
import { useTheme } from '../../src/theme/ThemeProvider';
import { useAppStore, useAllSets, getSetProgress } from '../../src/store/useAppStore';
import { getLanguage } from '../../src/data/languages';
import { STUDY_MODES } from '../../src/data/studyModes';

export default function SetDetail() {
  const t = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const sets = useAllSets();
  const prog = useAppStore((s) => getSetProgress(s, id ?? ''));

  const set = sets.find((s) => s.id === id);
  if (!set) {
    return (
      <Screen>
        <AppText variant="title" color="sky">
          Набор не найден
        </AppText>
      </Screen>
    );
  }
  const lang = getLanguage(set.language);
  const mastered = prog?.mastered ?? 0;

  return (
    <Screen>
      <Pressable onPress={() => router.back()} style={{ marginBottom: t.spacing.sm }}>
        <AppText variant="label" color="sky">
          ‹ Назад
        </AppText>
      </Pressable>

      <Card tone="surface">
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing.md }}>
          <Emoji name={lang.flag} size={40} />
          <View style={{ flex: 1 }}>
            <AppText variant="title">{set.title}</AppText>
            <AppText variant="caption" color="muted">
              {lang.name} · {set.words.length} слов · освоено {mastered}
            </AppText>
          </View>
        </View>
        {set.description ? (
          <AppText variant="body" color="muted" style={{ marginTop: t.spacing.sm }}>
            {set.description}
          </AppText>
        ) : null}
      </Card>

      <View style={{ height: t.spacing.lg }} />
      <AppText variant="heading" color="sky" style={{ marginBottom: t.spacing.md }}>
        Режимы тренировки
      </AppText>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: t.spacing.md }}>
        {STUDY_MODES.map((m) => (
          <Pressable
            key={m.id}
            onPress={() => router.push(`/study/${m.id}?setId=${set.id}`)}
            style={{ width: '47%' }}
          >
            <Card padded style={{ gap: t.spacing.xs, minHeight: 116 }}>
              <View
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: t.radius.md,
                  backgroundColor: m.accent + '22',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Emoji name={m.icon} size={28} />
              </View>
              <AppText variant="subtitle">{m.title}</AppText>
              <AppText variant="caption" color="muted" numberOfLines={2}>
                {m.description}
              </AppText>
            </Card>
          </Pressable>
        ))}
      </View>

      <View style={{ height: t.spacing.lg }} />
      <AppText variant="heading" color="sky" style={{ marginBottom: t.spacing.md }}>
        Слова
      </AppText>
      <Card>
        {set.words.map((w, i) => (
          <View
            key={w.id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: t.spacing.sm,
              borderTopWidth: i === 0 ? 0 : 1,
              borderTopColor: t.palette.border,
            }}
          >
            <View style={{ flex: 1 }}>
              <AppText variant="bodyStrong">{w.term}</AppText>
              {w.transcription ? (
                <AppText variant="caption" color="faint">
                  {w.transcription}
                </AppText>
              ) : null}
            </View>
            <AppText variant="body" color="muted">
              {w.translation}
            </AppText>
          </View>
        ))}
      </Card>
    </Screen>
  );
}
