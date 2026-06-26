import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { EMOJI_SVG, EmojiName } from '../assets/emojiData';

type Props = {
  name: EmojiName;
  size?: number;
  style?: ViewStyle;
};

// Renders a glyph from the bundled Fluent Emoji Flat / circle-flags collection.
// Consistent across iOS / Android / web — never falls back to the system emoji font.
function EmojiBase({ name, size = 24, style }: Props) {
  const xml = EMOJI_SVG[name];
  const sized = useMemo(() => {
    if (!xml) return null;
    return xml.replace('<svg', `<svg width="${size}" height="${size}"`);
  }, [xml, size]);

  if (!sized) {
    return <View style={[{ width: size, height: size }, style]} />;
  }
  return (
    <View style={[{ width: size, height: size }, style]}>
      <SvgXml xml={sized} width={size} height={size} />
    </View>
  );
}

export const Emoji = React.memo(EmojiBase);
export type { EmojiName };
