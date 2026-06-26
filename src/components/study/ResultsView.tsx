import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppText } from '../ui/Text';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Pill } from '../ui/Pill';
import { Emoji, EmojiName } from '../Emoji';
import { FoxMascot, FoxMood } from '../FoxMascot';
import { BADGE_MAP } from '../../data/badges';

export type StudySummary = {
  correct: number;
  total: number;
  xpEarned: number;
  coinsEarned: number;
  leveledUp: boolean;
  newBadges: string[];
};

type Props = {
  summary: StudySummary;
  onRetry: () => void;
  onDone: () => void;
};

export function ResultsView({ summary, onRetry, onDone }: Props) {
  const t = useTheme();
  const accuracy = summary.total > 0 ? summary.correct / summary.total : 0;
  const pct = Math.round(accuracy * 100);

  const { mood, title } = useMemo<{ mood: FoxMood; title: string }>(() => {
    if (pct >= 90) return { mood: 'celebrate', title: 'Великолепно!' };
    if (pct >= 70) return { mood: 'happy', title: 'Отличная работа!' };
    if (pct >= 50) return { mood: 'wink', title: 'Неплохо!' };
    return { mood: 'sad', title: 'Ещё чуть-чуть!' };
  }, [pct]);

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ alignItems: 'center', marginBottom: t.spacing.lg }}>
        <FoxMascot size={132} mood={mood} />
        <AppText variant="title" color="sky" align="center" style={{ marginTop: t.spacing.md }}>
          {title}
        </AppText>
      </View>

      <Card tone="surface" style={{ gap: t.spacing.md }}>
        <View style={{ alignItems: 'center', gap: t.spacing.xs }}>
          <AppText variant="display" color="primary">
            {pct}%
          </AppText>
          <AppText variant="caption" color="muted">
            Правильно {summary.correct} из {summary.total}
          </AppText>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: t.spacing.md }}>
          <Pill icon="star" label={`+${summary.xpEarned} XP`} tone="primary" />
          <Pill icon="coin" label={`+${summary.coinsEarned}`} tone="gold" />
        </View>

        {summary.leveledUp ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: t.spacing.sm,
              backgroundColor: t.palette.primarySoft,
              borderRadius: t.radius.md,
              paddingVertical: t.spacing.sm,
            }}
          >
            <Emoji name="rocket" size={22} />
            <AppText variant="bodyStrong">Новый уровень!</AppText>
          </View>
        ) : null}

        {summary.newBadges.length > 0 ? (
          <View style={{ gap: t.spacing.sm }}>
            <AppText variant="label" color="muted" align="center">
              Новые награды
            </AppText>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: t.spacing.md }}>
              {summary.newBadges.map((id) => {
                const b = BADGE_MAP[id];
                if (!b) return null;
                return (
                  <View key={id} style={{ alignItems: 'center', width: 92 }}>
                    <Emoji name={b.icon as EmojiName} size={36} />
                    <AppText variant="caption" align="center" numberOfLines={2}>
                      {b.name}
                    </AppText>
                  </View>
                );
              })}
            </View>
          </View>
        ) : null}
      </Card>

      <View style={{ height: t.spacing.lg }} />
      <View style={{ gap: t.spacing.md }}>
        <Button label="Ещё раз" icon="high-voltage" variant="secondary" onPress={onRetry} />
        <Button label="Готово" icon="check" onPress={onDone} />
      </View>
    </View>
  );
}
