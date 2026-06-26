import React from 'react';
import {
  View,
  ScrollView,
  StyleProp,
  ViewStyle,
  RefreshControlProps,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../theme/ThemeProvider';

type Props = {
  children: React.ReactNode;
  scroll?: boolean;
  padded?: boolean;
  edges?: { top?: boolean; bottom?: boolean };
  contentStyle?: StyleProp<ViewStyle>;
  footer?: React.ReactNode;
  refreshControl?: React.ReactElement<RefreshControlProps>;
};

// App background = a soft vertical "sky" gradient from the active palette.
export function Screen({
  children,
  scroll = true,
  padded = true,
  edges,
  contentStyle,
  footer,
  refreshControl,
}: Props) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const top = edges?.top === false ? 0 : insets.top;
  const bottom = edges?.bottom === false ? 0 : insets.bottom;

  const pad = padded ? t.spacing.lg : 0;
  const inner: StyleProp<ViewStyle> = [
    { paddingHorizontal: pad, paddingTop: top + (padded ? t.spacing.md : 0) },
    contentStyle,
  ];

  return (
    <LinearGradient colors={t.palette.sky} style={{ flex: 1 }}>
      {scroll ? (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[
            inner,
            { paddingBottom: bottom + t.spacing.xxxl },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          refreshControl={refreshControl}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[{ flex: 1 }, inner]}>{children}</View>
      )}
      {footer ? (
        <View
          style={{
            paddingHorizontal: t.spacing.lg,
            paddingTop: t.spacing.sm,
            paddingBottom: bottom + t.spacing.sm,
          }}
        >
          {footer}
        </View>
      ) : null}
    </LinearGradient>
  );
}
