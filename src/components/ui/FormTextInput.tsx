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
}: FormTextInputProps<T>) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = inputType === 'password' || secureTextEntry;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                isFocused && styles.inputFocused,
                error && styles.inputError,
                // Ajout de padding à droite pour les champs de mot de passe pour éviter que le texte ne se cache sous l'icône
                isPassword && { paddingRight: 48 },
              ]}
              placeholder={placeholder}
              placeholderTextColor="#A0A0A0"
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
                  <EyeOff size={22} color="#666" strokeWidth={1.5} />
                ) : (
                  <Eye size={22} color="#666" strokeWidth={1.5} />
                )}
              </TouchableOpacity>
            )}
          </View>
        )}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}
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
    color: '#333',
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
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#F8F8F8',
    color: '#333',
  },
  inputFocused: {
    borderColor: '#2196F3',
    backgroundColor: '#F0F9FF',
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
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
