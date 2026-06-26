// Foxinburg Words — base design tokens.
// Tokens (spacing/radius/type) stay constant across themes; only palettes change.

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radius = {
  sm: 10,
  md: 16,
  lg: 22,
  xl: 30,
  pill: 999,
} as const;

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 19,
  xl: 24,
  xxl: 32,
  display: 42,
} as const;

// Bundled display/body fonts (Baloo 2 = rounded, friendly; Nunito = readable body).
export const fonts = {
  display: 'Baloo2_800ExtraBold',
  heading: 'Baloo2_700Bold',
  semibold: 'Nunito_700Bold',
  body: 'Nunito_600SemiBold',
  bodyRegular: 'Nunito_400Regular',
} as const;

export type FontKey = keyof typeof fonts;

export const duration = {
  fast: 140,
  base: 240,
  slow: 420,
} as const;
