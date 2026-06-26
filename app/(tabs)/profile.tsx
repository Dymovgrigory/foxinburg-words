import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '../../src/components/ui/Screen';
import { AppText } from '../../src/components/ui/Text';
import { Card } from '../../src/components/ui/Card';
import { Button } from '../../src/components/ui/Button';
import { Avatar } from '../../src/components/ui/Avatar';
import { Emoji, EmojiName } from '../../src/components/Emoji';
import { useTheme } from '../../src/theme/ThemeProvider';
import {
  useAppStore,
  currentProfile,
  currentStats,
} from '../../src/store/useAppStore';
import { getLevel, rankTitle } from '../../src/domain/leveling';

type StatTile = { icon: EmojiName; label: string; value: string };

export default function ProfileScreen() {
  const t = useTheme();
  const router = useRouter();
  const profile = useAppStore(currentProfile);
  const stats = useAppStore(currentStats);
  const progress = useAppStore((s) => s.progress);
  const setCurrentProfile = useAppStore((s) => s.setCurrentProfile);

  const mastered = useMemo(() => {
    if (!profile) return 0;
    return Object.entries(progress)
      .filter(([k]) => k.startsWith(profile.id + ':'))
      .reduce((acc, [, v]) => acc + v.mastered, 0);
  }, [progress, profile]);

  if (!profile) return null;
  const lvl = getLevel(profile.xp);
  const accuracy =
    stats.totalAnswered > 0
      ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100)
      : 0;

  const tiles: StatTile[] = [
    { icon: 'high-voltage', label: 'Тренировок', value: `${stats.totalSessions}` },
    { icon: 'direct-hit', label: 'Точность', value: `${accuracy}%` },
    { icon: 'gem', label: 'Освоено слов', value: `${mastered}` },
    { icon: 'globe', label: 'Языков', value: `${stats.studiedLanguages.length}` },
    { icon: 'trophy', label: 'Бейджей', value: `${profile.unlockedBadges.length}` },
    { icon: 'fire', label: 'Стрик', value: `${profile.streak} дн.` },
  ];

  function switchProfile() {
    setCurrentProfile(null);
    router.replace('/onboarding');
  }

  return (
    <Screen>
      <AppText variant="display" color="sky">
        Профиль
      </AppText>

      <View style={{ height: t.spacing.lg }} />
      <Card tone="surface" style={{ alignItems: 'center', gap: t.spacing.sm }}>
        <Avatar id={profile.avatar} size={96} ring />
        <AppText variant="title">{profile.name}</AppText>
        <AppText variant="caption" color="muted">
          {profile.role === 'teacher' ? 'Преподаватель' : rankTitle(lvl.level)} · уровень {lvl.level}
        </AppText>
        <View style={{ flexDirection: 'row', gap: t.spacing.md, marginTop: t.spacing.xs }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Emoji name="star" size={18} />
            <AppText variant="bodyStrong">{profile.xp} XP</AppText>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Emoji name="coin" size={18} />
            <AppText variant="bodyStrong">{profile.coins}</AppText>
          </View>
        </View>
      </Card>

      <View style={{ height: t.spacing.xl }} />
      <AppText variant="heading" color="sky" style={{ marginBottom: t.spacing.md }}>
        Статистика
      </AppText>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: t.spacing.md }}>
        {tiles.map((tile) => (
          <Card key={tile.label} padded style={{ width: '47%', gap: t.spacing.xs }}>
            <Emoji name={tile.icon} size={28} />
            <AppText variant="title">{tile.value}</AppText>
            <AppText variant="caption" color="muted">
              {tile.label}
            </AppText>
          </Card>
        ))}
      </View>

      <View style={{ height: t.spacing.xl }} />
      <Button
        label="Сменить профиль"
        icon="people"
        variant="secondary"
        onPress={switchProfile}
      />
    </Screen>
  );
}
