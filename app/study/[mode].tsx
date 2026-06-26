import React, { useMemo, useRef, useState, useCallback } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Screen } from '../../src/components/ui/Screen';
import { AppText } from '../../src/components/ui/Text';
import { useAppStore, useAllSets } from '../../src/store/useAppStore';
import { StudyMode } from '../../src/domain/types';
import { scoreSession } from '../../src/domain/scoring';
import { Flashcards } from '../../src/components/study/Flashcards';
import { LearnMode } from '../../src/components/study/LearnMode';
import { WriteMode } from '../../src/components/study/WriteMode';
import { TestMode } from '../../src/components/study/TestMode';
import { MatchMode } from '../../src/components/study/MatchMode';
import { GravityMode } from '../../src/components/study/GravityMode';
import { ResultsView, StudySummary } from '../../src/components/study/ResultsView';
import { AnswerOutcome, ModeProps } from '../../src/components/study/types';

const MODE_COMPONENT: Record<StudyMode, React.ComponentType<ModeProps>> = {
  flashcards: Flashcards,
  learn: LearnMode,
  write: WriteMode,
  test: TestMode,
  match: MatchMode,
  gravity: GravityMode,
};

const VALID_MODES = Object.keys(MODE_COMPONENT) as StudyMode[];

export default function StudyScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ mode: string; setId: string }>();
  const mode = params.mode as StudyMode;
  const setId = params.setId ?? '';

  const sets = useAllSets();
  const applySession = useAppStore((s) => s.applySession);
  const recordWordOutcome = useAppStore((s) => s.recordWordOutcome);

  const set = useMemo(() => sets.find((s) => s.id === setId), [sets, setId]);

  const [summary, setSummary] = useState<StudySummary | null>(null);
  const [runId, setRunId] = useState(0);
  const startedAt = useRef(Date.now());

  const handleComplete = useCallback(
    (results: AnswerOutcome[]) => {
      if (!set) return;
      const total = results.length;
      const correct = results.filter((r) => r.correct).length;
      const { xpEarned, coinsEarned } = scoreSession(mode, correct, total);

      for (const r of results) {
        recordWordOutcome(set.id, r.wordId, r.correct);
      }
      const { leveledUp, newBadges } = applySession({
        mode,
        setId: set.id,
        correct,
        total,
        xpEarned,
        coinsEarned,
        durationMs: Date.now() - startedAt.current,
      });
      setSummary({ correct, total, xpEarned, coinsEarned, leveledUp, newBadges });
    },
    [set, mode, applySession, recordWordOutcome],
  );

  const handleQuit = useCallback(() => {
    router.back();
  }, [router]);

  const handleRetry = useCallback(() => {
    startedAt.current = Date.now();
    setSummary(null);
    setRunId((n) => n + 1);
  }, []);

  if (!set || !VALID_MODES.includes(mode)) {
    return (
      <Screen scroll={false}>
        <AppText variant="title" color="sky">
          Тренировка недоступна
        </AppText>
      </Screen>
    );
  }

  if (set.words.length < 4) {
    return (
      <Screen scroll={false}>
        <AppText variant="title" color="sky">
          Нужно больше слов
        </AppText>
        <AppText variant="body" color="sky" style={{ marginTop: 8 }}>
          В наборе должно быть минимум 4 слова для тренировки.
        </AppText>
      </Screen>
    );
  }

  const ModeComponent = MODE_COMPONENT[mode];

  return (
    <Screen scroll={false}>
      {summary ? (
        <ResultsView summary={summary} onRetry={handleRetry} onDone={() => router.back()} />
      ) : (
        <ModeComponent
          key={runId}
          words={set.words}
          onComplete={handleComplete}
          onQuit={handleQuit}
        />
      )}
    </Screen>
  );
}
