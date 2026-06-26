import React from 'react';
import { Text as RNText, TextProps, TextStyle, StyleProp } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { fonts } from '../../theme/tokens';

type Variant =
  | 'display'
  | 'title'
  | 'heading'
  | 'subtitle'
  | 'body'
  | 'bodyStrong'
  | 'caption'
  | 'label';

type Color = 'text' | 'muted' | 'faint' | 'primary' | 'onPrimary' | 'sky' | 'inherit';

type Props = TextProps & {
  variant?: Variant;
  color?: Color;
  align?: TextStyle['textAlign'];
  style?: StyleProp<TextStyle>;
};

const VARIANT: Record<Variant, { font: keyof typeof fonts; size: number; lh: number }> = {
  display: { font: 'display', size: 40, lh: 46 },
  title: { font: 'display', size: 30, lh: 36 },
  heading: { font: 'heading', size: 22, lh: 28 },
  subtitle: { font: 'heading', size: 18, lh: 24 },
  body: { font: 'bodyRegular', size: 16, lh: 23 },
  bodyStrong: { font: 'body', size: 16, lh: 23 },
  caption: { font: 'body', size: 13, lh: 18 },
  label: { font: 'semibold', size: 14, lh: 18 },
};

export function AppText({
  variant = 'body',
  color = 'text',
  align,
  style,
  ...rest
}: Props) {
  const t = useTheme();
  const v = VARIANT[variant];
  const colorValue =
    color === 'inherit'
      ? undefined
      : color === 'muted'
        ? t.palette.textMuted
        : color === 'faint'
          ? t.palette.textFaint
          : color === 'primary'
            ? t.palette.primary
            : color === 'onPrimary'
              ? t.palette.onPrimary
              : color === 'sky'
                ? t.palette.isDark
                  ? '#FFF6EC'
                  : t.palette.text
                : t.palette.text;
  return (
    <RNText
      {...rest}
      style={[
        {
          fontFamily: t.fonts[v.font],
          fontSize: v.size,
          lineHeight: v.lh,
          color: colorValue,
          textAlign: align,
        },
        style,
      ]}
    />
  );
}
