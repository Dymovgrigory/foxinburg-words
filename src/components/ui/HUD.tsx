import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppText } from './Text';
import { Pill } from './Pill';
import { ProgressBar } from './ProgressBar';
import { Avatar } from './Avatar';
import { useAppStore, currentProfile } from '../../store/useAppStore';
import { getLevel, rankTitle } from '../../domain/leveling';

// Top status strip: avatar + level progress + coins/streak.
export function HUD() {
  const t = useTheme();
  const profile = useAppStore(currentProfile);
  if (!profile) return null;
  const lvl = getLevel(profile.xp);

  return (
    <View style={{ gap: t.spacing.md }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing.md }}>
        <Avatar id={profile.avatar} size={54} ring />
        <View style={{ flex: 1 }}>
          <AppText variant="subtitle" color="sky" numberOfLines={1}>
            {profile.name}
          </AppText>
          <AppText variant="caption" style={{ color: t.palette.primarySoft }}>
            {rankTitle(lvl.level)} · ур. {lvl.level}
          </AppText>
        </View>
        <Pill icon="fire" label={profile.streak} tone="fire" />
        <Pill icon="coin" label={profile.coins} tone="gold" />
      </View>
      <View style={{ gap: 4 }}>
        <ProgressBar progress={lvl.progress} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <AppText variant="caption" style={{ color: t.palette.primarySoft }}>
            {lvl.xpIntoLevel} / {lvl.xpForLevel} XP
          </AppText>
          <AppText variant="caption" style={{ color: t.palette.primarySoft }}>
            до ур. {lvl.level + 1}
          </AppText>
        </View>
      </View>
    </View>
  );
}
