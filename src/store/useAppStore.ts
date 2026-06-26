import { useMemo } from 'react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Profile,
  Role,
  SessionResult,
  SetProgress,
  WordSet,
  LanguageCode,
  StudyMode,
} from '../domain/types';
import { SEED_SETS } from '../data/seedSets';
import { BADGES, BadgeContext } from '../data/badges';
import { DEFAULT_THEME_ID, getTheme } from '../theme/palettes';
import { AVATARS } from '../data/avatars';
import { todayKey, daysBetween } from '../utils/date';
import { uid } from '../utils/id';

export type Stats = {
  totalSessions: number;
  totalCorrect: number;
  totalAnswered: number;
  perfectSessions: number;
  setsCreated: number;
  studiedLanguages: LanguageCode[];
  modePlays: Partial<Record<StudyMode, number>>;
};

function emptyStats(): Stats {
  return {
    totalSessions: 0,
    totalCorrect: 0,
    totalAnswered: 0,
    perfectSessions: 0,
    setsCreated: 0,
    studiedLanguages: [],
    modePlays: {},
  };
}

type AppState = {
  hydrated: boolean;
  profiles: Record<string, Profile>;
  currentProfileId: string | null;
  customSets: WordSet[];
  progress: Record<string, SetProgress>; // key `${profileId}:${setId}`
  stats: Record<string, Stats>; // key profileId

  // lifecycle
  setHydrated: (v: boolean) => void;

  // profiles
  createProfile: (name: string, role: Role, avatar?: string) => string;
  setCurrentProfile: (id: string | null) => void;
  deleteProfile: (id: string) => void;
  patchCurrentProfile: (patch: Partial<Profile>) => void;

  // economy / cosmetics
  buyAvatar: (avatarId: string) => boolean;
  equipAvatar: (avatarId: string) => void;
  buyTheme: (themeId: string) => boolean;
  equipTheme: (themeId: string) => void;

  // gameplay
  applySession: (result: SessionResult) => {
    leveledUp: boolean;
    newBadges: string[];
  };
  recordWordOutcome: (setId: string, wordId: string, correct: boolean) => void;

  // sets (teacher)
  createSet: (
    data: Omit<WordSet, 'id' | 'authorId' | 'isSystem' | 'createdAt'>,
  ) => string;
  updateSet: (id: string, patch: Partial<WordSet>) => void;
  deleteSet: (id: string) => void;
};

function progressKey(pid: string, setId: string) {
  return `${pid}:${setId}`;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      hydrated: false,
      profiles: {},
      currentProfileId: null,
      customSets: [],
      progress: {},
      stats: {},

      setHydrated: (v) => set({ hydrated: v }),

      createProfile: (name, role, avatar = 'fox') => {
        const id = uid('p_');
        const profile: Profile = {
          id,
          name: name.trim() || (role === 'teacher' ? 'Преподаватель' : 'Ученик'),
          role,
          avatar,
          xp: 0,
          coins: 100,
          streak: 0,
          lastActiveDate: null,
          ownedAvatars: AVATARS.filter((a) => a.price === 0).map((a) => a.id),
          ownedThemes: [DEFAULT_THEME_ID],
          activeThemeId: DEFAULT_THEME_ID,
          unlockedBadges: [],
          history: [],
          createdAt: Date.now(),
        };
        set((s) => ({
          profiles: { ...s.profiles, [id]: profile },
          stats: { ...s.stats, [id]: emptyStats() },
          currentProfileId: id,
        }));
        return id;
      },

      setCurrentProfile: (id) => set({ currentProfileId: id }),

      deleteProfile: (id) =>
        set((s) => {
          const profiles = { ...s.profiles };
          delete profiles[id];
          const stats = { ...s.stats };
          delete stats[id];
          const progress = { ...s.progress };
          for (const k of Object.keys(progress)) {
            if (k.startsWith(id + ':')) delete progress[k];
          }
          return {
            profiles,
            stats,
            progress,
            currentProfileId:
              s.currentProfileId === id ? null : s.currentProfileId,
          };
        }),

      patchCurrentProfile: (patch) =>
        set((s) => {
          const id = s.currentProfileId;
          if (!id) return s;
          return {
            profiles: {
              ...s.profiles,
              [id]: { ...s.profiles[id], ...patch },
            },
          };
        }),

      buyAvatar: (avatarId) => {
        const s = get();
        const id = s.currentProfileId;
        if (!id) return false;
        const p = s.profiles[id];
        const av = AVATARS.find((a) => a.id === avatarId);
        if (!av || p.ownedAvatars.includes(avatarId)) return false;
        if (p.coins < av.price) return false;
        set({
          profiles: {
            ...s.profiles,
            [id]: {
              ...p,
              coins: p.coins - av.price,
              ownedAvatars: [...p.ownedAvatars, avatarId],
            },
          },
        });
        return true;
      },

      equipAvatar: (avatarId) =>
        set((s) => {
          const id = s.currentProfileId;
          if (!id) return s;
          const p = s.profiles[id];
          if (!p.ownedAvatars.includes(avatarId)) return s;
          return {
            profiles: { ...s.profiles, [id]: { ...p, avatar: avatarId } },
          };
        }),

      buyTheme: (themeId) => {
        const s = get();
        const id = s.currentProfileId;
        if (!id) return false;
        const p = s.profiles[id];
        const t = getTheme(themeId);
        if (p.ownedThemes.includes(themeId)) return false;
        if (p.coins < t.price) return false;
        set({
          profiles: {
            ...s.profiles,
            [id]: {
              ...p,
              coins: p.coins - t.price,
              ownedThemes: [...p.ownedThemes, themeId],
            },
          },
        });
        return true;
      },

      equipTheme: (themeId) =>
        set((s) => {
          const id = s.currentProfileId;
          if (!id) return s;
          const p = s.profiles[id];
          if (!p.ownedThemes.includes(themeId)) return s;
          return {
            profiles: { ...s.profiles, [id]: { ...p, activeThemeId: themeId } },
          };
        }),

      recordWordOutcome: (setId, wordId, correct) =>
        set((s) => {
          const pid = s.currentProfileId;
          if (!pid) return s;
          const key = progressKey(pid, setId);
          const prev: SetProgress =
            s.progress[key] ?? {
              setId,
              mastered: 0,
              totalSeen: 0,
              bestAccuracy: 0,
              memories: {},
              lastStudied: Date.now(),
            };
          const mem = prev.memories[wordId] ?? {
            wordId,
            box: 0,
            correct: 0,
            wrong: 0,
            lastSeen: 0,
          };
          const box = correct
            ? Math.min(5, mem.box + 1)
            : Math.max(0, mem.box - 1);
          const updatedMem = {
            ...mem,
            box,
            correct: mem.correct + (correct ? 1 : 0),
            wrong: mem.wrong + (correct ? 0 : 1),
            lastSeen: Date.now(),
          };
          const memories = { ...prev.memories, [wordId]: updatedMem };
          const mastered = Object.values(memories).filter(
            (m) => m.box >= 5,
          ).length;
          return {
            progress: {
              ...s.progress,
              [key]: {
                ...prev,
                memories,
                mastered,
                totalSeen: Object.keys(memories).length,
                lastStudied: Date.now(),
              },
            },
          };
        }),

      applySession: (result) => {
        const s = get();
        const pid = s.currentProfileId;
        if (!pid) return { leveledUp: false, newBadges: [] };
        const p = s.profiles[pid];

        // streak
        const today = todayKey();
        let streak = p.streak;
        if (p.lastActiveDate !== today) {
          if (p.lastActiveDate && daysBetween(p.lastActiveDate, today) === 1) {
            streak = p.streak + 1;
          } else {
            streak = 1;
          }
        }
        const streakBonusCoins =
          p.lastActiveDate !== today ? Math.min(streak * 5, 50) : 0;

        // history
        const history = [...p.history];
        const todayRec = history.find((h) => h.date === today);
        if (todayRec) {
          todayRec.xp += result.xpEarned;
        } else {
          history.push({ date: today, xp: result.xpEarned });
        }

        const newXp = p.xp + result.xpEarned;
        const newCoins = p.coins + result.coinsEarned + streakBonusCoins;

        // stats
        const st = s.stats[pid] ?? emptyStats();
        const setObj = [...SEED_SETS, ...s.customSets].find(
          (x) => x.id === result.setId,
        );
        const langs = new Set(st.studiedLanguages);
        if (setObj) langs.add(setObj.language);
        const isPerfect = result.total > 0 && result.correct === result.total;
        const newStats: Stats = {
          ...st,
          totalSessions: st.totalSessions + 1,
          totalCorrect: st.totalCorrect + result.correct,
          totalAnswered: st.totalAnswered + result.total,
          perfectSessions: st.perfectSessions + (isPerfect ? 1 : 0),
          studiedLanguages: Array.from(langs),
          modePlays: {
            ...st.modePlays,
            [result.mode]: (st.modePlays[result.mode] ?? 0) + 1,
          },
        };

        // mastered words across all sets for this profile
        const masteredWords = Object.entries(s.progress)
          .filter(([k]) => k.startsWith(pid + ':'))
          .reduce((acc, [, v]) => acc + v.mastered, 0);

        const updatedProfile: Profile = {
          ...p,
          xp: newXp,
          coins: newCoins,
          streak,
          lastActiveDate: today,
          history,
        };

        // badges
        const ctx: BadgeContext = {
          profile: updatedProfile,
          totalSessions: newStats.totalSessions,
          totalCorrect: newStats.totalCorrect,
          perfectSessions: newStats.perfectSessions,
          masteredWords,
          languagesStudied: newStats.studiedLanguages.length,
          setsCreated: newStats.setsCreated,
        };
        const unlocked = new Set(p.unlockedBadges);
        const newBadges: string[] = [];
        for (const b of BADGES) {
          if (!unlocked.has(b.id) && b.check(ctx)) {
            unlocked.add(b.id);
            newBadges.push(b.id);
          }
        }
        updatedProfile.unlockedBadges = Array.from(unlocked);
        updatedProfile.coins += newBadges.length * 50; // badge reward

        const prevLevelXp = p.xp;
        const leveledUp =
          levelOf(newXp) > levelOf(prevLevelXp);

        set({
          profiles: { ...s.profiles, [pid]: updatedProfile },
          stats: { ...s.stats, [pid]: newStats },
        });
        return { leveledUp, newBadges };
      },

      createSet: (data) => {
        const s = get();
        const pid = s.currentProfileId ?? 'system';
        const id = uid('set_');
        const newSet: WordSet = {
          ...data,
          id,
          authorId: pid,
          isSystem: false,
          createdAt: Date.now(),
        };
        const st = s.stats[pid];
        set({
          customSets: [...s.customSets, newSet],
          stats: st
            ? { ...s.stats, [pid]: { ...st, setsCreated: st.setsCreated + 1 } }
            : s.stats,
        });
        return id;
      },

      updateSet: (id, patch) =>
        set((s) => ({
          customSets: s.customSets.map((x) =>
            x.id === id ? { ...x, ...patch } : x,
          ),
        })),

      deleteSet: (id) =>
        set((s) => ({
          customSets: s.customSets.filter((x) => x.id !== id),
        })),
    }),
    {
      name: 'foxinburg-store-v1',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({
        profiles: s.profiles,
        currentProfileId: s.currentProfileId,
        customSets: s.customSets,
        progress: s.progress,
        stats: s.stats,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);

// minimal local copy to avoid importing leveling (kept in sync conceptually)
function levelOf(totalXp: number): number {
  let level = 1;
  let remaining = Math.max(0, Math.floor(totalXp));
  let need = 100;
  while (remaining >= need) {
    remaining -= need;
    level += 1;
    need = 100 + (level - 1) * 50;
  }
  return level;
}

// selectors
//
// NOTE: Zustand v5 is backed by useSyncExternalStore, which requires selectors
// to return a stable reference for unchanged state. Selectors that build a new
// array/object on every call (e.g. spreading) trigger an infinite render loop
// ("Maximum update depth exceeded"). Such derived values are exposed as hooks
// that subscribe to the stable underlying slice and memoize the result.
export function useAllSets(): WordSet[] {
  const customSets = useAppStore((s) => s.customSets);
  return useMemo(() => [...SEED_SETS, ...customSets], [customSets]);
}

export function currentProfile(state: AppState): Profile | null {
  return state.currentProfileId
    ? state.profiles[state.currentProfileId] ?? null
    : null;
}

export function getSetProgress(
  state: AppState,
  setId: string,
): SetProgress | null {
  const pid = state.currentProfileId;
  if (!pid) return null;
  return state.progress[`${pid}:${setId}`] ?? null;
}

const EMPTY_STATS: Stats = emptyStats();

export function currentStats(state: AppState): Stats {
  const pid = state.currentProfileId;
  if (!pid) return EMPTY_STATS;
  return state.stats[pid] ?? EMPTY_STATS;
}
