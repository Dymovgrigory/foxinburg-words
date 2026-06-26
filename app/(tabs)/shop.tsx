import React from 'react';
import { View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Screen } from '../../src/components/ui/Screen';
import { AppText } from '../../src/components/ui/Text';
import { Card } from '../../src/components/ui/Card';
import { Pill } from '../../src/components/ui/Pill';
import { Button } from '../../src/components/ui/Button';
import { Avatar } from '../../src/components/ui/Avatar';
import { Emoji } from '../../src/components/Emoji';
import { useTheme } from '../../src/theme/ThemeProvider';
import { useAppStore, currentProfile } from '../../src/store/useAppStore';
import { AVATARS } from '../../src/data/avatars';
import { THEMES } from '../../src/theme/palettes';

export default function ShopScreen() {
  const t = useTheme();
  const profile = useAppStore(currentProfile);
  const buyAvatar = useAppStore((s) => s.buyAvatar);
  const equipAvatar = useAppStore((s) => s.equipAvatar);
  const buyTheme = useAppStore((s) => s.buyTheme);
  const equipTheme = useAppStore((s) => s.equipTheme);

  if (!profile) return null;

  function onBuyAvatar(id: string, price: number) {
    if (profile!.coins < price) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
      return;
    }
    if (buyAvatar(id)) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    }
  }

  function onBuyTheme(id: string, price: number) {
    if (profile!.coins < price) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
      return;
    }
    if (buyTheme(id)) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    }
  }

  return (
    <Screen>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <View style={{ flex: 1 }}>
          <AppText variant="display" color="sky">
            Магазин
          </AppText>
          <AppText variant="body" color="sky" style={{ marginTop: 2, opacity: 0.85 }}>
            Аватары и темы за монеты
          </AppText>
        </View>
        <Pill icon="coin" label={profile.coins} tone="gold" />
      </View>

      <View style={{ height: t.spacing.lg }} />
      <AppText variant="heading" color="sky" style={{ marginBottom: t.spacing.md }}>
        Аватары
      </AppText>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: t.spacing.md }}>
        {AVATARS.map((a) => {
          const owned = profile.ownedAvatars.includes(a.id);
          const equipped = profile.avatar === a.id;
          return (
            <Card key={a.id} padded style={{ width: '47%', alignItems: 'center', gap: t.spacing.sm }}>
              <Avatar id={a.id} size={64} ring={equipped} />
              <AppText variant="subtitle" numberOfLines={1}>
                {a.name}
              </AppText>
              {owned ? (
                <Button
                  label={equipped ? 'Выбран' : 'Надеть'}
                  variant={equipped ? 'ghost' : 'secondary'}
                  size="sm"
                  icon={equipped ? 'check' : undefined}
                  disabled={equipped}
                  onPress={() => equipAvatar(a.id)}
                />
              ) : (
                <Button
                  label={`${a.price}`}
                  icon="coin"
                  size="sm"
                  variant={profile.coins >= a.price ? 'primary' : 'ghost'}
                  disabled={profile.coins < a.price}
                  onPress={() => onBuyAvatar(a.id, a.price)}
                />
              )}
            </Card>
          );
        })}
      </View>

      <View style={{ height: t.spacing.xl }} />
      <AppText variant="heading" color="sky" style={{ marginBottom: t.spacing.md }}>
        Темы оформления
      </AppText>
      <View style={{ gap: t.spacing.md }}>
        {THEMES.map((theme) => {
          const owned = profile.ownedThemes.includes(theme.id);
          const active = profile.activeThemeId === theme.id;
          return (
            <Card key={theme.id} padded style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing.md }}>
              <View style={{ flexDirection: 'row', gap: 4 }}>
                {[theme.palette.sky[0], theme.palette.primary, theme.palette.accent].map((c, i) => (
                  <View key={i} style={{ width: 18, height: 36, borderRadius: 6, backgroundColor: c }} />
                ))}
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing.xs }}>
                  <Emoji name={theme.icon} size={22} />
                  <AppText variant="subtitle">{theme.name}</AppText>
                </View>
                <AppText variant="caption" color="muted">
                  {theme.price === 0 ? 'Бесплатно' : `${theme.price} монет`}
                </AppText>
              </View>
              {owned ? (
                <Button
                  label={active ? 'Активна' : 'Включить'}
                  variant={active ? 'ghost' : 'secondary'}
                  size="sm"
                  icon={active ? 'check' : undefined}
                  full={false}
                  disabled={active}
                  onPress={() => equipTheme(theme.id)}
                />
              ) : (
                <Button
                  label={`${theme.price}`}
                  icon="coin"
                  size="sm"
                  full={false}
                  variant={profile.coins >= theme.price ? 'primary' : 'ghost'}
                  disabled={profile.coins < theme.price}
                  onPress={() => onBuyTheme(theme.id, theme.price)}
                />
              )}
            </Card>
          );
        })}
      </View>
    </Screen>
  );
}
