import React, { useMemo } from 'react';
import { View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '../../src/components/ui/Screen';
import { AppText } from '../../src/components/ui/Text';
import { Card } from '../../src/components/ui/Card';
import { HUD } from '../../src/components/ui/HUD';
import { Button } from '../../src/components/ui/Button';
import { Emoji } from '../../src/components/Emoji';
import { FoxMascot, FoxMood } from '../../src/components/FoxMascot';
import { useTheme } from '../../src/theme/ThemeProvider';
import { useAppStore, currentProfile, allSets } from '../../src/store/useAppStore';
import { LANGUAGES } from '../../src/data/languages';
import { getLevel } from '../../src/domain/leveling';

function greeting(): { text: string; mood: FoxMood } {
  const h = new Date().getHours();
  if (h < 6) return { text: 'Полуночник! Пара слов перед сном?', mood: 'sleepy' };
  if (h < 12) return { text: 'Доброе утро! Готов учиться?', mood: 'happy' };
  if (h < 18) return { text: 'Привет! Время прокачать словарь', mood: 'wave' };
  return { text: 'Добрый вечер! Закроем стрик?', mood: 'wink' };
}

export default function HomeScreen() {
  const t = useTheme();
  const router = useRouter();
  const profile = useAppStore(currentProfile);
  const sets = useAppStore(allSets);
  const progress = useAppStore((s) => s.progress);

  const g = useMemo(greeting, []);

  const counts = useMemo(() => {
    const byLang: Record<string, number> = {};
    for (const s of sets) byLang[s.language] = (byLang[s.language] ?? 0) + 1;
    return byLang;
  }, [sets]);

  const mastered = useMemo(() => {
    if (!profile) return 0;
    return Object.entries(progress)
      .filter(([k]) => k.startsWith(profile.id + ':'))
      .reduce((acc, [, v]) => acc + v.mastered, 0);
  }, [progress, profile]);

  if (!profile) return null;
  const lvl = getLevel(profile.xp);

  const firstSet = sets[0];

  return (
    <Screen>
      <HUD />

      <View style={{ height: t.spacing.lg }} />
      <Card tone="surface" style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing.md }}>
        <FoxMascot size={84} mood={g.mood} />
        <View style={{ flex: 1 }}>
          <AppText variant="subtitle">{g.text}</AppText>
          <AppText variant="caption" color="muted">
            Освоено слов: {mastered} · Уровень {lvl.level}
          </AppText>
        </View>
      </Card>

      <View style={{ height: t.spacing.md }} />
      {firstSet ? (
        <Button
          label="Быстрый старт"
          icon="high-voltage"
          size="lg"
          onPress={() => router.push(`/set/${firstSet.id}`)}
        />
      ) : null}

      <View style={{ height: t.spacing.xl }} />
      <AppText variant="heading" color="sky" style={{ marginBottom: t.spacing.md }}>
        Языки
      </AppText>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: t.spacing.md }}>
        {LANGUAGES.map((lang) => (
          <Pressable
            key={lang.code}
            onPress={() => router.push(`/(tabs)/sets?lang=${lang.code}`)}
            style={{ width: '47%' }}
          >
            <Card padded style={{ gap: t.spacing.sm }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing.sm }}>
                <Emoji name={lang.flag} size={36} />
                <View style={{ flex: 1 }}>
                  <AppText variant="subtitle" numberOfLines={1}>
                    {lang.name}
                  </AppText>
                  <AppText variant="caption" color="muted">
                    {counts[lang.code] ?? 0} наборов
                  </AppText>
                </View>
              </View>
            </Card>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}
