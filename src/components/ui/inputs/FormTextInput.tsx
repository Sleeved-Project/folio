import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react-native';
import { useTheme } from '../../../theme/useTheme';

type FormTextInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  error?: string;
  secureTextEntry?: boolean;
  containerStyle?: ViewStyle;
  inputType?: 'text' | 'password' | 'email' | 'numeric';
  returnKeyType?: TextInputProps['returnKeyType'];
  onSubmitEditing?: () => void;
  isRequired?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  rightIcon?: React.ReactNode;
  accessibilityLabel?: string; // <-- Ajouté
  accessibilityHint?: string;  // <-- Ajouté
};

const FormTextInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  error,
  secureTextEntry,
  containerStyle,
  inputType = 'text',
  returnKeyType,
  onSubmitEditing,
  isRequired = false,
  multiline = false,
  numberOfLines = 4,
  rightIcon,
  accessibilityLabel,
  accessibilityHint,
}: FormTextInputProps<T>) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();

  const isPassword = inputType === 'password' || secureTextEntry;
  const hasRightIcon = !!rightIcon || isPassword;

  const getKeyboardType = () => {
    switch (inputType) {
      case 'email': return 'email-address';
      case 'numeric': return 'numeric';
      default: return 'default';
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, { color: theme.colors.text.primary }]}>
          {label}
          {isRequired && <Text style={{ color: theme.colors.danger }}>*</Text>}
        </Text>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: theme.colors.border.light,
                  backgroundColor: theme.colors.background.secondary,
                  color: theme.colors.primaryForeground,
                  borderRadius: theme.borderRadius.medium,
                },
                multiline && styles.multilineInput,
                isFocused && {
                  borderColor: theme.colors.primary,
                  backgroundColor: theme.colors.background.secondary,
                },
                error && { borderColor: theme.colors.danger },
                hasRightIcon && { paddingRight: 48 },
              ]}
              placeholder={placeholder}
              placeholderTextColor={theme.colors.text.tertiary}
              value={value}
              onChangeText={onChange}
              onBlur={() => {
                setIsFocused(false);
                onBlur();
              }}
              onFocus={() => setIsFocused(true)}
              secureTextEntry={isPassword && !showPassword}
              keyboardType={getKeyboardType()}
              autoCapitalize={inputType === 'email' ? 'none' : 'sentences'}
              returnKeyType={returnKeyType}
              onSubmitEditing={onSubmitEditing}
              multiline={multiline}
              numberOfLines={multiline ? numberOfLines : 1}
              textAlignVertical={multiline ? 'top' : 'center'}
              accessible
              accessibilityLabel={accessibilityLabel || `${label || ''}${isRequired ? ' (required)' : ''}`}
              accessibilityHint={accessibilityHint || (multiline ? 'Enter multiple lines of text' : 'Enter text')}
            />

            {hasRightIcon && (
              <View style={[styles.iconContainer, styles.rightIcon, multiline && { alignSelf: 'flex-start', top: 15 }]}>
                {isPassword ? (
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    activeOpacity={0.7}
                    accessible
                    accessibilityRole="button"
                    accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff size={22} color={theme.colors.text.secondary} strokeWidth={1.5} />
                    ) : (
                      <Eye size={22} color={theme.colors.text.secondary} strokeWidth={1.5} />
                    )}
                  </TouchableOpacity>
                ) : rightIcon}
              </View>
            )}
          </View>
        )}
      />

      {error && (
        <Text
          style={[styles.errorText, { color: theme.colors.danger }]}
          accessible
          accessibilityRole="alert"
        >
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '500', marginBottom: 8, paddingLeft: 4 },
  inputContainer: { position: 'relative', flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, height: 54, borderWidth: 1, paddingHorizontal: 16, fontSize: 16 },
  multilineInput: { height: 'auto', minHeight: 120, paddingTop: 16, paddingBottom: 16, textAlignVertical: 'top' },
  errorText: { fontSize: 14, marginTop: 5, marginLeft: 4 },
  rightIcon: { right: 0 },
  iconContainer: { position: 'absolute', right: 16, height: '100%', justifyContent: 'center', paddingHorizontal: 16 },
});

export default FormTextInput;
