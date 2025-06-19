import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';

interface VerificationCodeInputProps {
  length: number;
  onCodeFilled?: (code: string) => void;
  keyboardType?: KeyboardTypeOptions;
  autoFocus?: boolean;
}

const VerificationCodeInput: React.FC<VerificationCodeInputProps> = ({
  length = 6,
  onCodeFilled,
  keyboardType = 'numeric',
  autoFocus = true,
}) => {
  // Store each character of the code
  const [code, setCode] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<Array<TextInput | null>>([]);

  // Initialize input references
  useEffect(() => {
    inputRefs.current = Array(length).fill(null);
  }, [length]);

  const handleChange = (text: string, index: number) => {
    // Handle when a full code is pasted
    if (text.length > 1 && text.length >= length) {
      const pastedCode = text.slice(0, length);
      const newCode = [...code];
      for (let i = 0; i < length; i++) {
        newCode[i] = pastedCode[i] || '';
      }
      setCode(newCode);

      // Focus the last input field
      if (inputRefs.current[length - 1]) {
        inputRefs.current[length - 1]?.focus();
      }

      onCodeFilled?.(pastedCode);
      return;
    }

    // Handle single character input
    const newCode = [...code];
    newCode[index] = text.slice(0, 1);
    setCode(newCode);

    // Auto-focus next field
    if (text && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if code is complete
    if (!text.includes(' ')) {
      const filledCode = newCode.join('');
      if (filledCode.length === length) {
        onCodeFilled?.(filledCode);
      }
    }
  };

  // Handle backspace key press
  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {Array(length)
        .fill(0)
        .map((_, index) => (
          <TextInput
            key={index}
            style={styles.input}
            value={code[index]}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType={keyboardType}
            maxLength={length} // Allows pasting a complete code
            autoFocus={autoFocus && index === 0}
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            textContentType="oneTimeCode" // For iOS auto-fill
            caretHidden={false}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 20,
  },
  input: {
    width: 45,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    borderColor: '#ccc',
  },
});

export default VerificationCodeInput;
