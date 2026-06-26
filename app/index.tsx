import React from 'react';
import { Redirect } from 'expo-router';
import { useAppStore } from '../src/store/useAppStore';

// Entry router: send the user to onboarding, the teacher panel, or the student tabs.
export default function Index() {
  const profile = useAppStore((s) =>
    s.currentProfileId ? s.profiles[s.currentProfileId] ?? null : null,
  );

  if (!profile) return <Redirect href="/onboarding" />;
  if (profile.role === 'teacher') return <Redirect href="/teacher" />;
  return <Redirect href="/(tabs)/home" />;
}
