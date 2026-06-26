import React from 'react';
import { View, ViewStyle } from 'react-native';
import Svg, { Path, Circle, Ellipse, G, Line } from 'react-native-svg';

export type FoxMood =
  | 'happy'
  | 'wave'
  | 'wink'
  | 'sad'
  | 'celebrate'
  | 'sleepy'
  | 'cool';

type Props = {
  size?: number;
  mood?: FoxMood;
  style?: ViewStyle;
};

const ORANGE = '#FF7A1A';
const ORANGE_DARK = '#E85D04';
const CREAM = '#FFF3E4';
const DARK = '#2A1B3D';
const BLUSH = '#FF9D5C';

// Eyes vary per mood.
function Eyes({ mood }: { mood: FoxMood }) {
  if (mood === 'wink') {
    return (
      <G>
        <Line x1={66} y1={96} x2={84} y2={96} stroke={DARK} strokeWidth={6} strokeLinecap="round" />
        <Circle cx={130} cy={96} r={9} fill={DARK} />
        <Circle cx={133} cy={92} r={3} fill="#fff" />
      </G>
    );
  }
  if (mood === 'sleepy') {
    return (
      <G>
        <Path d="M64 98 q11 8 22 0" stroke={DARK} strokeWidth={5} fill="none" strokeLinecap="round" />
        <Path d="M114 98 q11 8 22 0" stroke={DARK} strokeWidth={5} fill="none" strokeLinecap="round" />
      </G>
    );
  }
  if (mood === 'sad') {
    return (
      <G>
        <Circle cx={75} cy={100} r={8} fill={DARK} />
        <Circle cx={125} cy={100} r={8} fill={DARK} />
        <Path d="M60 86 q14 -8 28 -2" stroke={DARK} strokeWidth={4} fill="none" strokeLinecap="round" />
        <Path d="M112 84 q14 -6 28 2" stroke={DARK} strokeWidth={4} fill="none" strokeLinecap="round" />
      </G>
    );
  }
  if (mood === 'cool') {
    // sunglasses
    return (
      <G>
        <Path d="M58 90 h36 a6 6 0 0 1 6 6 v6 a14 14 0 0 1 -28 2 l-2 -6 a8 8 0 0 0 -12 -4 Z" fill={DARK} />
        <Path d="M142 90 h-36 a6 6 0 0 0 -6 6 v6 a14 14 0 0 0 28 2 l2 -6 a8 8 0 0 1 12 -4 Z" fill={DARK} />
      </G>
    );
  }
  // happy / wave / celebrate
  const cy = mood === 'celebrate' ? 94 : 98;
  return (
    <G>
      <Circle cx={75} cy={cy} r={9.5} fill={DARK} />
      <Circle cx={78} cy={cy - 4} r={3.2} fill="#fff" />
      <Circle cx={125} cy={cy} r={9.5} fill={DARK} />
      <Circle cx={128} cy={cy - 4} r={3.2} fill="#fff" />
    </G>
  );
}

function Mouth({ mood }: { mood: FoxMood }) {
  if (mood === 'sad') {
    return <Path d="M88 150 q12 -10 24 0" stroke={DARK} strokeWidth={4} fill="none" strokeLinecap="round" />;
  }
  if (mood === 'celebrate' || mood === 'wave') {
    return <Path d="M84 142 q16 22 32 0 q-16 8 -32 0 Z" fill={DARK} />;
  }
  if (mood === 'sleepy') {
    return <Path d="M92 146 q8 6 16 0" stroke={DARK} strokeWidth={3.5} fill="none" strokeLinecap="round" />;
  }
  return <Path d="M86 144 q14 14 28 0" stroke={DARK} strokeWidth={4.5} fill="none" strokeLinecap="round" />;
}

function FoxBase({ size = 120, mood = 'happy', style }: Props) {
  return (
    <View style={[{ width: size, height: size }, style]}>
      <Svg width={size} height={size} viewBox="0 0 200 200">
        {/* ears */}
        <Path d="M58 70 L30 20 C27 14 33 9 39 12 L92 50 Z" fill={ORANGE} />
        <Path d="M142 70 L170 20 C173 14 167 9 161 12 L108 50 Z" fill={ORANGE} />
        <Path d="M60 62 L44 34 L82 52 Z" fill={ORANGE_DARK} />
        <Path d="M140 62 L156 34 L118 52 Z" fill={ORANGE_DARK} />

        {/* head */}
        <Path
          d="M100 40 C151 40 169 78 166 112 C163 145 136 170 100 170 C64 170 37 145 34 112 C31 78 49 40 100 40 Z"
          fill={ORANGE}
        />

        {/* cream cheeks / muzzle */}
        <Path
          d="M100 172 C66 172 44 140 52 112 C70 120 86 122 100 122 C114 122 130 120 148 112 C156 140 134 172 100 172 Z"
          fill={CREAM}
        />
        {/* forehead blaze */}
        <Path d="M100 52 C112 64 112 92 100 104 C88 92 88 64 100 52 Z" fill={CREAM} />

        {/* blush */}
        <Ellipse cx={58} cy={126} rx={11} ry={7} fill={BLUSH} opacity={0.55} />
        <Ellipse cx={142} cy={126} rx={11} ry={7} fill={BLUSH} opacity={0.55} />

        <Eyes mood={mood} />

        {/* nose */}
        <Path d="M100 128 c-9 0 -14 6 -10 12 c3 5 14 5 17 0 c4 -6 -1 -12 -7 -12 Z" fill={DARK} />
        <Mouth mood={mood} />
      </Svg>
    </View>
  );
}

export const FoxMascot = React.memo(FoxBase);
