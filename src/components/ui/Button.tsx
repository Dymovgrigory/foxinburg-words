import React from 'react';
import {
  Pressable,
  ActivityIndicator,
  View,
  ViewStyle,
  StyleProp,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../../theme/ThemeProvider';
import { AppText } from './Text';
import { Emoji, EmojiName } from '../Emoji';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
type Size = 'sm' | 'md' | 'lg';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  icon?: EmojiName;
  disabled?: boolean;
  loading?: boolean;
  full?: boolean;
  haptic?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  disabled,
  loading,
  full = true,
  haptic = true,
  style,
}: Props) {
  const t = useTheme();
  const height = size === 'lg' ? 60 : size === 'sm' ? 42 : 52;
  const fontVariant = size === 'sm' ? 'label' : 'subtitle';

  const bg: Record<Variant, string> = {
    primary: t.palette.primary,
    secondary: t.palette.surfaceAlt,
    ghost: 'transparent',
    danger: t.palette.danger,
    success: t.palette.success,
  };
  const fg: Record<Variant, string> = {
    primary: t.palette.onPrimary,
    secondary: t.palette.text,
    ghost: t.palette.primary,
    danger: '#fff',
    success: '#fff',
  };

  function handle() {
    if (disabled || loading) return;
    if (haptic) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    onPress?.();
  }

  return (
    <Pressable
      onPress={handle}
      disabled={disabled || loading}
      style={({ pressed }) => [
        {
          height,
          minWidth: full ? undefined : height,
          width: full ? '100%' : undefined,
          paddingHorizontal: t.spacing.xl,
          borderRadius: t.radius.pill,
          backgroundColor: bg[variant],
          borderWidth: variant === 'ghost' ? 2 : 0,
          borderColor: t.palette.primary,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: t.spacing.sm,
          opacity: disabled ? 0.5 : 1,
          transform: [{ scale: pressed ? 0.97 : 1 }],
          shadowColor: variant === 'primary' ? t.palette.primaryDark : t.palette.shadow,
          shadowOpacity: variant === 'ghost' ? 0 : 0.3,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 5 },
          elevation: variant === 'ghost' ? 0 : 3,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={fg[variant]} />
      ) : (
        <>
          {icon ? <Emoji name={icon} size={size === 'lg' ? 26 : 22} /> : null}
          <AppText variant={fontVariant} style={{ color: fg[variant] }}>
            {label}
          </AppText>
          <View />
        </>
      )}
    </Pressable>
  );
}
