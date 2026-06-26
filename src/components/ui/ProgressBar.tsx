import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

type Props = {
  progress: number; // 0..1
  height?: number;
  trackColor?: string;
  fillColor?: string;
  style?: StyleProp<ViewStyle>;
  rounded?: boolean;
};

export function ProgressBar({
  progress,
  height = 12,
  trackColor,
  fillColor,
  style,
  rounded = true,
}: Props) {
  const t = useTheme();
  const clamped = Math.max(0, Math.min(1, progress));
  return (
    <View
      style={[
        {
          height,
          borderRadius: rounded ? height / 2 : 0,
          backgroundColor: trackColor ?? t.palette.surfaceSunken,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <View
        style={{
          height: '100%',
          width: `${clamped * 100}%`,
          backgroundColor: fillColor ?? t.palette.primary,
          borderRadius: rounded ? height / 2 : 0,
        }}
      />
    </View>
  );
}
