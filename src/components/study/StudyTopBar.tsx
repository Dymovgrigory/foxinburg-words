import React from 'react';
import { View, Pressable } from 'react-native';
import { X } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { ProgressBar } from '../ui/ProgressBar';

type Props = {
  progress: number; // 0..1
  onQuit: () => void;
};

export function StudyTopBar({ progress, onQuit }: Props) {
  const t = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: t.spacing.md,
        marginBottom: t.spacing.lg,
      }}
    >
      <Pressable onPress={onQuit} hitSlop={10}>
        <X color={t.palette.isDark ? '#FFF6EC' : t.palette.text} size={26} />
      </Pressable>
      <View style={{ flex: 1 }}>
        <ProgressBar progress={progress} height={12} fillColor={t.palette.primary} />
      </View>
    </View>
  );
}
