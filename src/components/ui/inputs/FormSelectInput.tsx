import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { ChevronDownIcon } from 'lucide-react-native';
import SelectModal from '../modal/SelectModal';

export interface SelectOption {
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
  const [showModal, setShowModal] = useState(false);

  const optionsMap = useMemo(() => {
    return options.reduce((acc, option) => {
      acc[option.value] = option.label;
      return acc;
    }, {} as Record<string, string>);
  }, [options]);

  return (
    <View style={{ marginBottom: theme.spacing.md }}>
      <Text
        style={{
          fontSize: theme.typography.fontSizes.md,
          fontWeight: theme.typography.fontWeights.medium,
          color: theme.colors.text.primary,
          marginBottom: theme.spacing.sm,
          paddingLeft: theme.spacing.xs,
        }}
        accessible
        accessibilityRole="header"
      >
        {label}
        {isRequired && <Text style={{ color: theme.colors.danger }}> *</Text>}
      </Text>

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <>
            <TouchableOpacity
              style={[
                styles.selectButton,
                {
                  borderColor: error ? theme.colors.danger : theme.colors.border.light,
                  borderRadius: theme.borderRadius.medium,
                  backgroundColor: theme.colors.background.secondary,
                  paddingHorizontal: theme.spacing.md,
                  paddingVertical: theme.spacing.md,
                },
              ]}
              onPress={() => setShowModal(true)}
              activeOpacity={0.7}
              accessible
              accessibilityRole="button"
              accessibilityLabel={`${label} selector`}
              accessibilityHint={`Tap to select ${label.toLowerCase()}`}
            >
              <Text
                style={[
                  styles.selectText,
                  {
                    color: value ? theme.colors.primaryForeground : theme.colors.text.tertiary,
                    fontSize: theme.typography.fontSizes.md,
                  },
                ]}
                accessible={false} // Le Text est décrit par le bouton parent
              >
                {optionsMap[value] || placeholder}
              </Text>
              <ChevronDownIcon size={20} color={theme.colors.text.secondary} strokeWidth={1.5} />
            </TouchableOpacity>

            <SelectModal
              isVisible={showModal}
              onClose={() => setShowModal(false)}
              options={options}
              selectedValue={value}
              onSelect={onChange}
              title={label}
            />
          </>
        )}
      />

      {error && (
        <Text
          style={{
            color: theme.colors.danger,
            marginTop: theme.spacing.xs,
            marginLeft: theme.spacing.xs,
            fontSize: theme.typography.fontSizes.sm,
          }}
          accessible
          accessibilityRole="alert"
        >
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  selectButton: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 54,
  },
  selectText: {
    textAlign: 'left',
    flex: 1,
  },
});

export default FormSelectInput;
