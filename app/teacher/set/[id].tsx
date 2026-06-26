import React, { useMemo, useState } from 'react';
import { View, Pressable, TextInput, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Screen } from '../../../src/components/ui/Screen';
import { AppText } from '../../../src/components/ui/Text';
import { Card } from '../../../src/components/ui/Card';
import { Button } from '../../../src/components/ui/Button';
import { Emoji } from '../../../src/components/Emoji';
import { useTheme } from '../../../src/theme/ThemeProvider';
import { useAppStore } from '../../../src/store/useAppStore';
import { LANGUAGES } from '../../../src/data/languages';
import { LanguageCode, Word } from '../../../src/domain/types';
import { uid } from '../../../src/utils/id';

type Draft = { id: string; term: string; translation: string; transcription: string };

function toDraft(w: Word): Draft {
  return {
    id: w.id,
    term: w.term,
    translation: w.translation,
    transcription: w.transcription ?? '',
  };
}

function emptyDraft(): Draft {
  return { id: uid('w_'), term: '', translation: '', transcription: '' };
}

export default function TeacherSetEditor() {
  const t = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const isNew = id === 'new';

  const customSets = useAppStore((s) => s.customSets);
  const createSet = useAppStore((s) => s.createSet);
  const updateSet = useAppStore((s) => s.updateSet);
  const deleteSet = useAppStore((s) => s.deleteSet);

  const existing = useMemo(
    () => (isNew ? undefined : customSets.find((s) => s.id === id)),
    [customSets, id, isNew],
  );

  const [title, setTitle] = useState(existing?.title ?? '');
  const [language, setLanguage] = useState<LanguageCode>(existing?.language ?? 'en');
  const [rows, setRows] = useState<Draft[]>(
    existing ? existing.words.map(toDraft) : [emptyDraft(), emptyDraft(), emptyDraft()],
  );

  function patchRow(rid: string, patch: Partial<Draft>) {
    setRows((rs) => rs.map((r) => (r.id === rid ? { ...r, ...patch } : r)));
  }
  function addRow() {
    setRows((rs) => [...rs, emptyDraft()]);
  }
  function removeRow(rid: string) {
    setRows((rs) => (rs.length > 1 ? rs.filter((r) => r.id !== rid) : rs));
  }

  const validWords: Word[] = rows
    .filter((r) => r.term.trim() && r.translation.trim())
    .map((r) => ({
      id: r.id,
      term: r.term.trim(),
      translation: r.translation.trim(),
      transcription: r.transcription.trim() || undefined,
    }));

  const canSave = title.trim().length > 0 && validWords.length >= 4;

  function save() {
    if (!canSave) return;
    if (existing) {
      updateSet(existing.id, { title: title.trim(), language, words: validWords });
    } else {
      createSet({ title: title.trim(), language, emoji: '', words: validWords });
    }
    router.back();
  }

  function confirmDelete() {
    if (!existing) return;
    Alert.alert('Удалить набор?', 'Это действие нельзя отменить.', [
      { text: 'Отмена', style: 'cancel' },
      {
        text: 'Удалить',
        style: 'destructive',
        onPress: () => {
          deleteSet(existing.id);
          router.back();
        },
      },
    ]);
  }

  const inputStyle = {
    fontFamily: t.fonts.body,
    fontSize: t.fontSize.md,
    color: t.palette.text,
    paddingVertical: t.spacing.sm,
    borderBottomWidth: 2,
    borderBottomColor: t.palette.border,
  } as const;

  return (
    <Screen>
      <Pressable onPress={() => router.back()} style={{ marginBottom: t.spacing.sm }}>
        <AppText variant="label" color="sky">
          ‹ Назад
        </AppText>
      </Pressable>
      <AppText variant="title" color="sky">
        {isNew ? 'Новый набор' : 'Редактировать набор'}
      </AppText>

      <View style={{ height: t.spacing.lg }} />
      <Card style={{ gap: t.spacing.md }}>
        <View>
          <AppText variant="label" color="muted" style={{ marginBottom: t.spacing.xs }}>
            Название набора
          </AppText>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Например, Еда и напитки"
            placeholderTextColor={t.palette.textFaint}
            maxLength={40}
            style={inputStyle}
          />
        </View>

        <View>
          <AppText variant="label" color="muted" style={{ marginBottom: t.spacing.xs }}>
            Язык
          </AppText>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: t.spacing.sm }}>
            {LANGUAGES.map((l) => {
              const active = language === l.code;
              return (
                <Pressable
                  key={l.code}
                  onPress={() => setLanguage(l.code)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 6,
                    paddingVertical: 6,
                    paddingHorizontal: t.spacing.sm,
                    borderRadius: t.radius.pill,
                    backgroundColor: active ? t.palette.primarySoft : t.palette.surfaceAlt,
                    borderWidth: active ? 2 : 0,
                    borderColor: t.palette.primary,
                  }}
                >
                  <Emoji name={l.flag} size={20} />
                  <AppText variant="caption">{l.name}</AppText>
                </Pressable>
              );
            })}
          </View>
        </View>
      </Card>

      <View style={{ height: t.spacing.xl }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: t.spacing.md }}>
        <AppText variant="heading" color="sky">
          Слова
        </AppText>
        <AppText variant="label" color="sky" style={{ opacity: 0.85 }}>
          {validWords.length} готово
        </AppText>
      </View>

      <View style={{ gap: t.spacing.md }}>
        {rows.map((r, i) => (
          <Card key={r.id} style={{ gap: t.spacing.sm }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <AppText variant="label" color="muted">
                Слово {i + 1}
              </AppText>
              <Pressable onPress={() => removeRow(r.id)} hitSlop={8}>
                <Emoji name="cross" size={18} />
              </Pressable>
            </View>
            <TextInput
              value={r.term}
              onChangeText={(v) => patchRow(r.id, { term: v })}
              placeholder="Слово на языке оригинала"
              placeholderTextColor={t.palette.textFaint}
              style={inputStyle}
            />
            <TextInput
              value={r.translation}
              onChangeText={(v) => patchRow(r.id, { translation: v })}
              placeholder="Перевод на русский"
              placeholderTextColor={t.palette.textFaint}
              style={inputStyle}
            />
            <TextInput
              value={r.transcription}
              onChangeText={(v) => patchRow(r.id, { transcription: v })}
              placeholder="Транскрипция (необязательно)"
              placeholderTextColor={t.palette.textFaint}
              style={inputStyle}
            />
          </Card>
        ))}
      </View>

      <View style={{ height: t.spacing.md }} />
      <Button label="Добавить слово" icon="pencil" variant="secondary" onPress={addRow} />

      <View style={{ height: t.spacing.xl }} />
      {!canSave ? (
        <AppText variant="caption" color="sky" align="center" style={{ marginBottom: t.spacing.sm, opacity: 0.85 }}>
          Нужно название и минимум 4 слова с переводом
        </AppText>
      ) : null}
      <Button label="Сохранить набор" icon="check" disabled={!canSave} onPress={save} />
      {existing ? (
        <>
          <View style={{ height: t.spacing.sm }} />
          <Button label="Удалить набор" icon="cross" variant="danger" onPress={confirmDelete} />
        </>
      ) : null}
    </Screen>
  );
}
