// Color palettes. Each is a purchasable "theme" in the shop and recolors the app.
import { EmojiName } from '../assets/emojiData';

export type Palette = {
  // surfaces
  bg: string;
  bgElevated: string;
  surface: string;
  surfaceAlt: string;
  surfaceSunken: string;
  // brand
  primary: string;
  primaryDark: string;
  primarySoft: string;
  onPrimary: string;
  accent: string;
  accentSoft: string;
  // text
  text: string;
  textMuted: string;
  textFaint: string;
  // status
  success: string;
  successSoft: string;
  danger: string;
  dangerSoft: string;
  warning: string;
  warningSoft: string;
  info: string;
  // misc
  border: string;
  shadow: string;
  gold: string;
  // background gradient pair for the "sky"
  sky: [string, string];
  isDark: boolean;
};

export type ThemeMeta = {
  id: string;
  name: string;
  icon: EmojiName; // bundled glyph id (never a system emoji)
  price: number; // coins; 0 = free/default
  palette: Palette;
};

export const THEMES: ThemeMeta[] = [
  {
    id: 'foxfire',
    name: 'Лисий костёр',
    icon: 'fox',
    price: 0,
    palette: {
      bg: '#2A1B3D',
      bgElevated: '#34234C',
      surface: '#FFF6EC',
      surfaceAlt: '#FFE9D2',
      surfaceSunken: '#F2DBC2',
      primary: '#FF7A1A',
      primaryDark: '#E85D04',
      primarySoft: '#FFD9B8',
      onPrimary: '#3A1D00',
      accent: '#2EC4B6',
      accentSoft: '#BFF1EC',
      text: '#2A1B3D',
      textMuted: '#7A6A86',
      textFaint: '#B6A8C0',
      success: '#3DAE5A',
      successSoft: '#CDEFD4',
      danger: '#E5484D',
      dangerSoft: '#FBD5D5',
      warning: '#F2A007',
      warningSoft: '#FCEBC4',
      info: '#3C82F6',
      border: '#EAD6BF',
      shadow: '#1A1029',
      gold: '#F6B73C',
      sky: ['#3A2456', '#2A1B3D'],
      isDark: true,
    },
  },
  {
    id: 'polarnight',
    name: 'Полярная ночь',
    icon: 'snowflake',
    price: 400,
    palette: {
      bg: '#0B1B2B',
      bgElevated: '#12283E',
      surface: '#EAF4FB',
      surfaceAlt: '#D5E9F6',
      surfaceSunken: '#C2DCEE',
      primary: '#3DA9FC',
      primaryDark: '#1E78D6',
      primarySoft: '#C5E4FB',
      onPrimary: '#04243F',
      accent: '#7CF5D2',
      accentSoft: '#C9F7EB',
      text: '#0B1B2B',
      textMuted: '#5E7387',
      textFaint: '#9FB3C4',
      success: '#1FB6A6',
      successSoft: '#C6F0EA',
      danger: '#FF5C7A',
      dangerSoft: '#FAD4DC',
      warning: '#FFB454',
      warningSoft: '#FCE9CC',
      info: '#3DA9FC',
      border: '#D2E5F2',
      shadow: '#03101C',
      gold: '#FFCF5C',
      sky: ['#173A5A', '#0B1B2B'],
      isDark: true,
    },
  },
  {
    id: 'mintgrove',
    name: 'Мятная роща',
    icon: 'herb',
    price: 400,
    palette: {
      bg: '#10302A',
      bgElevated: '#163C34',
      surface: '#F2FBF4',
      surfaceAlt: '#DBF3E0',
      surfaceSunken: '#C6E8CE',
      primary: '#26B673',
      primaryDark: '#178A55',
      primarySoft: '#BDEBD2',
      onPrimary: '#04230F',
      accent: '#F4A259',
      accentSoft: '#FBE2C8',
      text: '#10302A',
      textMuted: '#557066',
      textFaint: '#97B2A6',
      success: '#26B673',
      successSoft: '#C5EFD6',
      danger: '#E5604D',
      dangerSoft: '#F9D8D2',
      warning: '#EFA53C',
      warningSoft: '#FBE7C6',
      info: '#3C9DD6',
      border: '#CFEAD6',
      shadow: '#041C16',
      gold: '#F2C14E',
      sky: ['#1C4A40', '#10302A'],
      isDark: true,
    },
  },
  {
    id: 'berrysmoothie',
    name: 'Ягодный смузи',
    icon: 'blueberries',
    price: 600,
    palette: {
      bg: '#2B1230',
      bgElevated: '#371A3E',
      surface: '#FDF1FB',
      surfaceAlt: '#F6DAF1',
      surfaceSunken: '#EAC4E4',
      primary: '#C13FC1',
      primaryDark: '#9A2B9A',
      primarySoft: '#F0CCEF',
      onPrimary: '#2C022C',
      accent: '#FF5D8F',
      accentSoft: '#FBD2E0',
      text: '#2B1230',
      textMuted: '#7A5C7E',
      textFaint: '#B79DBA',
      success: '#3DAE5A',
      successSoft: '#CDEFD4',
      danger: '#E5484D',
      dangerSoft: '#FBD5D5',
      warning: '#F2A007',
      warningSoft: '#FCEBC4',
      info: '#9B5DE5',
      border: '#ECD3E8',
      shadow: '#19071C',
      gold: '#F6B73C',
      sky: ['#43204A', '#2B1230'],
      isDark: true,
    },
  },
  {
    id: 'caramel',
    name: 'Карамель',
    icon: 'custard',
    price: 600,
    palette: {
      bg: '#FBF1E2',
      bgElevated: '#FFFFFF',
      surface: '#FFFFFF',
      surfaceAlt: '#FBEBD6',
      surfaceSunken: '#F2DEC2',
      primary: '#C8773A',
      primaryDark: '#A85C25',
      primarySoft: '#F3DBBF',
      onPrimary: '#FFF6EC',
      accent: '#6B9080',
      accentSoft: '#D5E5DE',
      text: '#43301B',
      textMuted: '#8A7152',
      textFaint: '#BCA88A',
      success: '#5E9B4E',
      successSoft: '#DBEFD2',
      danger: '#D4564B',
      dangerSoft: '#F6D9D5',
      warning: '#D9952A',
      warningSoft: '#F8E8C8',
      info: '#3C82F6',
      border: '#EAD9C0',
      shadow: '#C9A878',
      gold: '#D9952A',
      sky: ['#FBF1E2', '#F2DEC2'],
      isDark: false,
    },
  },
];

export const DEFAULT_THEME_ID = 'foxfire';

export function getTheme(id: string): ThemeMeta {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}
