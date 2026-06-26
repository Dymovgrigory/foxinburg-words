import React, { useMemo } from 'react';
import { View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '../../src/components/ui/Screen';
import { AppText } from '../../src/components/ui/Text';
import { Card } from '../../src/components/ui/Card';
import { Button } from '../../src/components/ui/Button';
import { Avatar } from '../../src/components/ui/Avatar';
import { Emoji, EmojiName } from '../../src/components/Emoji';
import { useTheme } from '../../src/theme/ThemeProvider';
import { useAppStore, currentProfile } from '../../src/store/useAppStore';
import { getLanguage } from '../../src/data/languages';

type StatTile = { icon: EmojiName; label: string; value: string };

export default function TeacherHome() {
  const t = useTheme();
  const router = useRouter();
  const profile = useAppStore(currentProfile);
  const customSets = useAppStore((s) => s.customSets);
  const setCurrentProfile = useAppStore((s) => s.setCurrentProfile);

  const mySets = useMemo(
    () => (profile ? customSets.filter((s) => s.authorId === profile.id) : []),
    [customSets, profile],
  );

  const totals = useMemo(() => {
    const words = mySets.reduce((acc, s) => acc + s.words.length, 0);
    const langs = new Set(mySets.map((s) => s.language));
    return { sets: mySets.length, words, langs: langs.size };
  }, [mySets]);

  if (!profile) return null;

  const tiles: StatTile[] = [
    { icon: 'books', label: 'Наборов', value: `${totals.sets}` },
    { icon: 'pencil', label: 'Слов', value: `${totals.words}` },
    { icon: 'globe', label: 'Языков', value: `${totals.langs}` },
  ];

  function switchProfile() {
    setCurrentProfile(null);
    router.replace('/onboarding');
  }

  return (
    <Screen>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing.md }}>
        <Avatar id={profile.avatar} size={56} ring />
        <View style={{ flex: 1 }}>
          <AppText variant="title" color="sky" numberOfLines={1}>
            {profile.name}
          </AppText>
          <AppText variant="caption" color="sky" style={{ opacity: 0.85 }}>
            Панель преподавателя
          </AppText>
        </View>
      </View>

      <View style={{ height: t.spacing.lg }} />
      <View style={{ flexDirection: 'row', gap: t.spacing.md }}>
        {tiles.map((tile) => (
          <Card key={tile.label} padded style={{ flex: 1, gap: t.spacing.xs }}>
            <Emoji name={tile.icon} size={26} />
            <AppText variant="title">{tile.value}</AppText>
            <AppText variant="caption" color="muted">
              {tile.label}
            </AppText>
          </Card>
        ))}
      </View>

      <View style={{ height: t.spacing.xl }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: t.spacing.md }}>
        <AppText variant="heading" color="sky">
          Мои наборы
        </AppText>
        <Pressable onPress={() => router.push('/teacher/set/new')}>
          <AppText variant="label" color="sky">
            + Создать
          </AppText>
        </Pressable>
      </View>

      {mySets.length === 0 ? (
        <Card tone="surface" style={{ alignItems: 'center', gap: t.spacing.sm, paddingVertical: t.spacing.xl }}>
          <Emoji name="seedling" size={44} />
          <AppText variant="subtitle" align="center">
            Пока нет наборов
          </AppText>
          <AppText variant="caption" color="muted" align="center">
            Создай свой первый набор слов для учеников
          </AppText>
          <View style={{ height: t.spacing.xs }} />
          <Button
            label="Создать набор"
            icon="pencil"
            full={false}
            onPress={() => router.push('/teacher/set/new')}
          />
        </Card>
      ) : (
        <View style={{ gap: t.spacing.md }}>
          {mySets.map((s) => {
            const lang = getLanguage(s.language);
            return (
              <Card
                key={s.id}
                onPress={() => router.push(`/teacher/set/${s.id}`)}
                style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing.md }}
              >
                <Emoji name={lang.flag} size={36} />
                <View style={{ flex: 1 }}>
                  <AppText variant="subtitle" numberOfLines={1}>
                    {s.title}
                  </AppText>
                  <AppText variant="caption" color="muted">
                    {lang.name} · {s.words.length} слов
                  </AppText>
                </View>
                <AppText variant="title" color="faint">
                  ›
                </AppText>
              </Card>
            );
          })}
        </View>
      )}

      <View style={{ height: t.spacing.xxl }} />
      <Button
        label="Сменить профиль"
        icon="people"
        variant="secondary"
        onPress={switchProfile}
      />
    </Screen>
  );
}
