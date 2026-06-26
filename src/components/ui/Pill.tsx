import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppText } from './Text';
import { Emoji, EmojiName } from '../Emoji';

type Props = {
  icon?: EmojiName;
  label: string | number;
  tone?: 'surface' | 'primary' | 'gold' | 'fire' | 'plain';
  size?: 'sm' | 'md';
  style?: StyleProp<ViewStyle>;
};

// Compact stat chip used in the HUD (coins / streak / xp).
export function Pill({ icon, label, tone = 'surface', size = 'md', style }: Props) {
  const t = useTheme();
  const bg =
    tone === 'primary'
      ? t.palette.primarySoft
      : tone === 'gold'
        ? t.palette.warningSoft
        : tone === 'fire'
          ? t.palette.dangerSoft
          : tone === 'plain'
            ? 'transparent'
            : t.palette.surface;
  const iconSize = size === 'sm' ? 16 : 20;
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: t.spacing.xs,
          paddingHorizontal: size === 'sm' ? t.spacing.sm : t.spacing.md,
          paddingVertical: size === 'sm' ? 4 : t.spacing.xs + 2,
          borderRadius: t.radius.pill,
          backgroundColor: bg,
        },
        style,
      ]}
    >
      {icon ? <Emoji name={icon} size={iconSize} /> : null}
      <AppText variant={size === 'sm' ? 'caption' : 'label'} style={{ color: t.palette.text }}>
        {label}
      </AppText>
    </View>
  );
}
