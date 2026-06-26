import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { TextInput } from 'react-native';
import { Screen } from '../src/components/ui/Screen';
import { AppText } from '../src/components/ui/Text';
import { Card } from '../src/components/ui/Card';
import { Button } from '../src/components/ui/Button';
import { Emoji } from '../src/components/Emoji';
import { FoxMascot } from '../src/components/FoxMascot';
import { useTheme } from '../src/theme/ThemeProvider';
import { useAppStore } from '../src/store/useAppStore';
import { AVATARS } from '../src/data/avatars';
import { Role } from '../src/domain/types';

export default function Onboarding() {
  const t = useTheme();
  const router = useRouter();
  const createProfile = useAppStore((s) => s.createProfile);

  const [step, setStep] = useState<0 | 1>(0);
  const [role, setRole] = useState<Role>('student');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('fox');

  const freeAvatars = AVATARS.filter((a) => a.price === 0);

  function finish() {
    createProfile(name, role, avatar);
    if (role === 'teacher') router.replace('/teacher');
    else router.replace('/(tabs)/home');
  }

  if (step === 0) {
    return (
      <Screen>
        <View style={{ alignItems: 'center', marginTop: t.spacing.xl, gap: t.spacing.sm }}>
          <FoxMascot size={132} mood="wave" />
          <AppText variant="title" color="sky" align="center">
            Foxinburg Words
          </AppText>
          <AppText variant="body" align="center" style={{ color: t.palette.primarySoft }}>
            Учи языки вместе с лисёнком Фоксиком
          </AppText>
        </View>

        <View style={{ height: t.spacing.xl }} />
        <AppText variant="subtitle" color="sky" style={{ marginBottom: t.spacing.sm }}>
          Кто ты?
        </AppText>
        <View style={{ gap: t.spacing.md }}>
          <RoleCard
            active={role === 'student'}
            icon="backpack"
            title="Ученик"
            subtitle="Учись, играй, собирай награды"
            onPress={() => setRole('student')}
          />
          <RoleCard
            active={role === 'teacher'}
            icon="graduation"
            title="Преподаватель"
            subtitle="Создавай наборы и следи за учениками"
            onPress={() => setRole('teacher')}
          />
        </View>

        <View style={{ height: t.spacing.xl }} />
        <Button label="Дальше" icon="direct-hit" onPress={() => setStep(1)} />
      </Screen>
    );
  }

  return (
    <Screen>
      <View style={{ alignItems: 'center', marginTop: t.spacing.lg, gap: t.spacing.sm }}>
        <FoxMascot size={104} mood="happy" />
        <AppText variant="title" color="sky" align="center">
          Создай профиль
        </AppText>
      </View>

      <View style={{ height: t.spacing.lg }} />
      <Card>
        <AppText variant="label" color="muted" style={{ marginBottom: t.spacing.xs }}>
          Как тебя зовут?
        </AppText>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder={role === 'teacher' ? 'Имя преподавателя' : 'Имя ученика'}
          placeholderTextColor={t.palette.textFaint}
          maxLength={20}
          style={{
            fontFamily: t.fonts.body,
            fontSize: t.fontSize.lg,
            color: t.palette.text,
            paddingVertical: t.spacing.sm,
            borderBottomWidth: 2,
            borderBottomColor: t.palette.border,
          }}
        />
      </Card>

      <View style={{ height: t.spacing.lg }} />
      <AppText variant="subtitle" color="sky" style={{ marginBottom: t.spacing.sm }}>
        Выбери аватар
      </AppText>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: t.spacing.md }}>
        {freeAvatars.map((a) => {
          const active = avatar === a.id;
          return (
            <Pressable
              key={a.id}
              onPress={() => setAvatar(a.id)}
              style={{
                width: 84,
                alignItems: 'center',
                gap: 4,
                padding: t.spacing.sm,
                borderRadius: t.radius.lg,
                backgroundColor: active ? t.palette.primarySoft : t.palette.surface,
                borderWidth: active ? 2 : 0,
                borderColor: t.palette.primary,
              }}
            >
              <Emoji name={a.icon} size={44} />
              <AppText variant="caption" color="muted" numberOfLines={1}>
                {a.name}
              </AppText>
            </Pressable>
          );
        })}
      </View>

      <View style={{ height: t.spacing.xl }} />
      <Button label="Начать приключение" icon="rocket" onPress={finish} />
      <View style={{ height: t.spacing.sm }} />
      <Button label="Назад" variant="ghost" haptic={false} onPress={() => setStep(0)} />
    </Screen>
  );
}

function RoleCard({
  active,
  icon,
  title,
  subtitle,
  onPress,
}: {
  active: boolean;
  icon: Parameters<typeof Emoji>[0]['name'];
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  const t = useTheme();
  return (
    <Card
      onPress={onPress}
      style={{
        borderWidth: 2,
        borderColor: active ? t.palette.primary : 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        gap: t.spacing.md,
      }}
    >
      <View
        style={{
          width: 56,
          height: 56,
          borderRadius: t.radius.md,
          backgroundColor: active ? t.palette.primarySoft : t.palette.surfaceAlt,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Emoji name={icon} size={34} />
      </View>
      <View style={{ flex: 1 }}>
        <AppText variant="subtitle">{title}</AppText>
        <AppText variant="caption" color="muted">
          {subtitle}
        </AppText>
      </View>
      {active ? <Emoji name="check" size={24} /> : null}
    </Card>
  );
}
