import React, { useState, useMemo } from 'react';
import { View, Pressable, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Screen } from '../../src/components/ui/Screen';
import { AppText } from '../../src/components/ui/Text';
import { Card } from '../../src/components/ui/Card';
import { ProgressBar } from '../../src/components/ui/ProgressBar';
import { Emoji } from '../../src/components/Emoji';
import { useTheme } from '../../src/theme/ThemeProvider';
import { useAppStore, useAllSets, getSetProgress } from '../../src/store/useAppStore';
import { LANGUAGES } from '../../src/data/languages';
import { LanguageCode } from '../../src/domain/types';

export default function SetsScreen() {
  const t = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams<{ lang?: string }>();
  const sets = useAllSets();
  const progress = useAppStore((s) => s.progress);
  const pid = useAppStore((s) => s.currentProfileId);

  const initial = (LANGUAGES.find((l) => l.code === params.lang)?.code ??
    'en') as LanguageCode;
  const [lang, setLang] = useState<LanguageCode>(initial);

  const filtered = useMemo(
    () => sets.filter((s) => s.language === lang),
    [sets, lang],
  );

  return (
    <Screen>
      <AppText variant="title" color="sky">
        Наборы слов
      </AppText>
      <AppText variant="body" style={{ color: t.palette.primarySoft, marginBottom: t.spacing.md }}>
        Выбери язык и набор для тренировки
      </AppText>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: t.spacing.sm, paddingVertical: t.spacing.xs }}
        style={{ marginBottom: t.spacing.md, flexGrow: 0 }}
      >
        {LANGUAGES.map((l) => {
          const active = l.code === lang;
          return (
            <Pressable
              key={l.code}
              onPress={() => setLang(l.code)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: t.spacing.xs,
                paddingHorizontal: t.spacing.md,
                paddingVertical: t.spacing.sm,
                borderRadius: t.radius.pill,
                backgroundColor: active ? t.palette.primary : t.palette.surface,
              }}
            >
              <Emoji name={l.flag} size={20} />
              <AppText
                variant="label"
                style={{ color: active ? t.palette.onPrimary : t.palette.text }}
              >
                {l.name}
              </AppText>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={{ gap: t.spacing.md }}>
        {filtered.map((s) => {
          const prog = pid ? progress[`${pid}:${s.id}`] ?? null : null;
          const mastered = prog?.mastered ?? 0;
          const ratio = s.words.length ? mastered / s.words.length : 0;
          return (
            <Card key={s.id} onPress={() => router.push(`/set/${s.id}`)}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing.md }}>
                <View
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: t.radius.md,
                    backgroundColor: t.palette.surfaceAlt,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Emoji name={(s.emoji as Parameters<typeof Emoji>[0]['name']) || 'books'} size={30} />
                </View>
                <View style={{ flex: 1 }}>
                  <AppText variant="subtitle" numberOfLines={1}>
                    {s.title}
                  </AppText>
                  <AppText variant="caption" color="muted" numberOfLines={1}>
                    {s.words.length} слов · {s.description ?? ''}
                  </AppText>
                </View>
                {s.isSystem ? null : <Emoji name="writing-hand" size={18} />}
              </View>
              <View style={{ height: t.spacing.sm }} />
              <ProgressBar progress={ratio} height={8} />
              <AppText variant="caption" color="muted" style={{ marginTop: 4 }}>
                Освоено {mastered} / {s.words.length}
              </AppText>
            </Card>
          );
        })}
        {filtered.length === 0 ? (
          <Card>
            <AppText variant="body" color="muted" align="center">
              Пока нет наборов для этого языка.
            </AppText>
          </Card>
        ) : null}
      </View>
    </Screen>
  );
}
