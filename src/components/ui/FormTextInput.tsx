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
import { useTheme } from '../../theme/useTheme';

type FormTextInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  error?: string;
  secureTextEntry?: boolean;
  containerStyle?: ViewStyle;
  inputType?: 'text' | 'password' | 'email';
  returnKeyType?: TextInputProps['returnKeyType'];
  onSubmitEditing?: () => void;
  isRequired?: boolean;
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
}: FormTextInputProps<T>) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();

  const isPassword = inputType === 'password' || secureTextEntry;

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
                  color: theme.colors.text.primary,
                  borderRadius: theme.borderRadius.medium,
                },
                isFocused && {
                  borderColor: theme.colors.primary,
                  backgroundColor: theme.colors.states.focus,
                },
                error && { borderColor: theme.colors.danger },
                isPassword && { paddingRight: 48 },
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
              keyboardType={inputType === 'email' ? 'email-address' : 'default'}
              autoCapitalize={inputType === 'email' ? 'none' : 'sentences'}
              returnKeyType={returnKeyType}
              onSubmitEditing={onSubmitEditing}
            />

            {isPassword && (
              <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => setShowPassword(!showPassword)}
                activeOpacity={0.7}
              >
                {showPassword ? (
                  <EyeOff size={22} color={theme.colors.text.secondary} strokeWidth={1.5} />
                ) : (
                  <Eye size={22} color={theme.colors.text.secondary} strokeWidth={1.5} />
                )}
              </TouchableOpacity>
            )}
          </View>
        )}
      />

      {error && <Text style={[styles.errorText, { color: theme.colors.danger }]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    paddingLeft: 4,
  },
  inputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 54,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  errorText: {
    fontSize: 14,
    marginTop: 5,
    marginLeft: 4,
  },
  toggleButton: {
    position: 'absolute',
    right: 16,
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
});

export default FormTextInput;
