import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../../../theme/useTheme';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface SelectOption {
  label: string;
  value: string;
}

interface FormSelectInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: SelectOption[];
  error?: string;
  placeholder?: string;
  isRequired?: boolean;
}

function FormSelectInput<T extends FieldValues>({
  control,
  name,
  label,
  options,
  error,
  placeholder = '-- Please select --',
  isRequired = false,
}: FormSelectInputProps<T>) {
  const theme = useTheme();
  const optionsWithPlaceholder = [{ label: placeholder, value: '' }, ...options];

  return (
    <View style={{ marginBottom: theme.spacing.md }}>
      <Text
        style={[
          styles.label,
          {
            fontSize: theme.typography.fontSizes.md,
            fontWeight: theme.typography.fontWeights.medium,
            color: theme.colors.text.primary,
            marginBottom: theme.spacing.sm,
          },
        ]}
      >
        {label}
        {isRequired && <Text style={{ color: theme.colors.danger }}> *</Text>}
      </Text>

      <View
        style={[
          styles.pickerContainer,
          {
            borderColor: error ? theme.colors.danger : theme.colors.border.light,
            borderRadius: theme.borderRadius.medium,
            backgroundColor: theme.colors.background.secondary,
          },
        ]}
      >
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={[
                styles.picker,
                {
                  color: theme.colors.text.primary,
                },
              ]}
            >
              {optionsWithPlaceholder.map((option) => (
                <Picker.Item
                  key={option.value}
                  label={option.label}
                  value={option.value}
                  color={theme.colors.text.primary}
                />
              ))}
            </Picker>
          )}
        />
      </View>

      {error && (
        <Text
          style={[
            styles.error,
            {
              color: theme.colors.danger,
              marginTop: theme.spacing.xs,
              fontSize: theme.typography.fontSizes.sm,
            },
          ]}
        >
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: '500',
    paddingLeft: 4,
  },
  pickerContainer: {
    borderWidth: 1,
    overflow: 'hidden',
    paddingHorizontal: 8,
  },
  picker: {
    height: 54,
  },
  error: {
    fontSize: 14,
    marginTop: 5,
    marginLeft: 4,
  },
});

export default FormSelectInput;
