import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Screen } from '../../src/components/ui/Screen';
import { AppText } from '../../src/components/ui/Text';
import { Card } from '../../src/components/ui/Card';
import { Pill } from '../../src/components/ui/Pill';
import { Avatar } from '../../src/components/ui/Avatar';
import { Emoji, EmojiName } from '../../src/components/Emoji';
import { useTheme } from '../../src/theme/ThemeProvider';
import { useAppStore, currentProfile } from '../../src/store/useAppStore';
import { BADGES } from '../../src/data/badges';
import { LEADERBOARD_BOTS } from '../../src/data/leaderboardBots';
import { getLevel, rankTitle } from '../../src/domain/leveling';

export default function RewardsScreen() {
  const t = useTheme();
  const profile = useAppStore(currentProfile);

  const board = useMemo(() => {
    const rows = LEADERBOARD_BOTS.map((b) => ({
      id: b.id,
      name: b.name,
      avatar: b.avatar,
      xp: b.xp,
      me: false,
    }));
    if (profile) {
      rows.push({
        id: profile.id,
        name: profile.name,
        avatar: profile.avatar,
        xp: profile.xp,
        me: true,
      });
    }
    return rows.sort((a, b) => b.xp - a.xp);
  }, [profile]);

  if (!profile) return null;
  const unlocked = new Set(profile.unlockedBadges);
  const lvl = getLevel(profile.xp);

  return (
    <Screen>
      <AppText variant="display" color="sky">
        Награды
      </AppText>
      <AppText variant="body" color="sky" style={{ marginTop: 2, opacity: 0.85 }}>
        Бейджи, стрик и таблица лидеров
      </AppText>

      <View style={{ height: t.spacing.lg }} />
      <Card tone="surface" style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing.md }}>
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: t.radius.lg,
            backgroundColor: t.palette.dangerSoft,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Emoji name="fire" size={32} />
        </View>
        <View style={{ flex: 1 }}>
          <AppText variant="title">{profile.streak} дн.</AppText>
          <AppText variant="caption" color="muted">
            Текущий стрик · занимайся каждый день
          </AppText>
        </View>
        <Pill icon="star" label={`ур. ${lvl.level}`} tone="primary" />
      </Card>

      <View style={{ height: t.spacing.xl }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: t.spacing.md }}>
        <AppText variant="heading" color="sky">
          Бейджи
        </AppText>
        <AppText variant="label" color="sky" style={{ opacity: 0.85 }}>
          {unlocked.size} / {BADGES.length}
        </AppText>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: t.spacing.md }}>
        {BADGES.map((b) => {
          const have = unlocked.has(b.id);
          return (
            <Card key={b.id} padded style={{ width: '47%', gap: t.spacing.xs, opacity: have ? 1 : 0.55 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing.sm }}>
                <Emoji name={b.icon as EmojiName} size={34} />
                {have ? null : <Emoji name="locked" size={16} />}
              </View>
              <AppText variant="subtitle" numberOfLines={1}>
                {b.name}
              </AppText>
              <AppText variant="caption" color="muted" numberOfLines={2}>
                {have ? b.description : b.requirement}
              </AppText>
            </Card>
          );
        })}
      </View>

      <View style={{ height: t.spacing.xl }} />
      <AppText variant="heading" color="sky" style={{ marginBottom: t.spacing.md }}>
        Таблица лидеров
      </AppText>
      <Card>
        {board.map((row, i) => (
          <View
            key={row.id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: t.spacing.md,
              paddingVertical: t.spacing.sm,
              paddingHorizontal: row.me ? t.spacing.sm : 0,
              marginHorizontal: row.me ? -t.spacing.sm : 0,
              borderRadius: t.radius.md,
              backgroundColor: row.me ? t.palette.primarySoft : 'transparent',
              borderTopWidth: i === 0 ? 0 : 1,
              borderTopColor: t.palette.border,
            }}
          >
            <AppText variant="subtitle" color={i < 3 ? 'primary' : 'muted'} style={{ width: 26 }}>
              {i + 1}
            </AppText>
            <Avatar id={row.avatar} size={40} ring={row.me} />
            <AppText variant="bodyStrong" numberOfLines={1} style={{ flex: 1 }}>
              {row.name}
              {row.me ? ' (ты)' : ''}
            </AppText>
            <AppText variant="caption" color="muted">
              {rankTitle(getLevel(row.xp).level)}
            </AppText>
            <Pill icon="star" label={row.xp} tone="primary" size="sm" />
          </View>
        ))}
      </Card>
    </Screen>
  );
}
