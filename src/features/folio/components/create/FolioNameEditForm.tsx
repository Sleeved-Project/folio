import React, { useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from '../../../../theme/useTheme';
import { Button } from '../../../../components/ui';
import { folioNameSchema, type FolioNameFormValues } from '../../folioSchema';

interface FolioNameEditFormProps {
  initialValue: string;
  onSave: (name: string) => void;
  onCancel: () => void;
}

export default function FolioNameEditForm({
  initialValue,
  onSave,
  onCancel,
}: FolioNameEditFormProps) {
  const theme = useTheme();
  const inputRef = useRef<TextInput>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FolioNameFormValues>({
    resolver: zodResolver(folioNameSchema),
    mode: 'onChange',
    defaultValues: {
      name: initialValue,
    },
  });

  const currentName = watch('name');

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, []);

  const onSubmit = (data: FolioNameFormValues) => {
    onSave(data.name);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: theme.colors.text.secondary }]}>Folio name</Text>

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              ref={inputRef}
              style={[
                styles.input,
                {
                  color: theme.colors.text.primary,
                  backgroundColor: theme.colors.background.secondary,
                  borderColor: errors.name ? theme.colors.danger : theme.colors.border.light,
                  borderRadius: theme.borderRadius.medium,
                },
              ]}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Untitled"
              placeholderTextColor={theme.colors.text.tertiary}
              maxLength={30}
              autoCapitalize="words"
              returnKeyType="done"
              onSubmitEditing={handleSubmit(onSubmit)}
              selectTextOnFocus
            />
          )}
        />

        <View style={styles.counterContainer}>
          <Text style={[styles.counter, { color: theme.colors.text.tertiary }]}>
            {currentName?.length || 0}/30
          </Text>
        </View>

        {/* Container fixe pour l'erreur - toujours la même hauteur */}
        <View style={styles.errorContainer}>
          {errors.name && (
            <Text style={[styles.errorText, { color: theme.colors.danger }]}>
              {errors.name.message}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Cancel"
          variant="outline"
          onPress={onCancel}
          buttonStyle={[styles.button, styles.cancelButton]}
        />
        <Button
          title="Save"
          variant="primary"
          onPress={handleSubmit(onSubmit)}
          buttonStyle={[styles.button, styles.saveButton]}
          disabled={!isValid || !currentName?.trim()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    height: 56,
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: '600',
    borderWidth: 1,
  },
  counterContainer: {
    alignItems: 'flex-end',
    marginTop: 4,
  },
  counter: {
    fontSize: 12,
  },
  errorContainer: {
    height: 24,
    justifyContent: 'center',
    marginTop: 2,
  },
  errorText: {
    fontSize: 14,
    marginLeft: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
  },
  cancelButton: {
    marginRight: 6,
  },
  saveButton: {
    marginLeft: 6,
  },
});
