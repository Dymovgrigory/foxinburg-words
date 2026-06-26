import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { Emoji } from '../Emoji';
import { getAvatar } from '../../data/avatars';

type Props = {
  id: string;
  size?: number;
  ring?: boolean;
  style?: StyleProp<ViewStyle>;
};

// Circular avatar chip rendering a bundled glyph (never a system emoji).
export function Avatar({ id, size = 48, ring = false, style }: Props) {
  const t = useTheme();
  const avatar = getAvatar(id);
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: t.palette.surface,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: ring ? 3 : 0,
          borderColor: t.palette.primary,
        },
        style,
      ]}
    >
      <Emoji name={avatar.icon} size={size * 0.62} />
    </View>
  );
}
