import React, { createContext, useContext, useMemo } from 'react';
import { Palette } from './palettes';
import { spacing, radius, fontSize, fonts, duration } from './tokens';

export type Theme = {
  palette: Palette;
  spacing: typeof spacing;
  radius: typeof radius;
  fontSize: typeof fontSize;
  fonts: typeof fonts;
  duration: typeof duration;
};

const ThemeContext = createContext<Theme | null>(null);

export function ThemeProvider({
  palette,
  children,
}: {
  palette: Palette;
  children: React.ReactNode;
}) {
  const value = useMemo<Theme>(
    () => ({ palette, spacing, radius, fontSize, fonts, duration }),
    [palette],
  );
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): Theme {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}
