import React from 'react';
import { View, ViewStyle, StyleProp, Pressable } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  tone?: 'surface' | 'alt' | 'sunken' | 'elevated';
  padded?: boolean;
  onPress?: () => void;
  bordered?: boolean;
};

export function Card({
  children,
  style,
  tone = 'surface',
  padded = true,
  onPress,
  bordered = false,
}: Props) {
  const t = useTheme();
  const bg =
    tone === 'alt'
      ? t.palette.surfaceAlt
      : tone === 'sunken'
        ? t.palette.surfaceSunken
        : tone === 'elevated'
          ? t.palette.bgElevated
          : t.palette.surface;

  const base: StyleProp<ViewStyle> = [
    {
      backgroundColor: bg,
      borderRadius: t.radius.lg,
      padding: padded ? t.spacing.lg : 0,
      borderWidth: bordered ? 1.5 : 0,
      borderColor: t.palette.border,
      shadowColor: t.palette.shadow,
      shadowOpacity: 0.18,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 8 },
      elevation: 3,
    },
    style,
  ];

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          base,
          pressed ? { transform: [{ scale: 0.98 }], opacity: 0.92 } : null,
        ]}
      >
        {children}
      </Pressable>
    );
  }
  return <View style={base}>{children}</View>;
}
