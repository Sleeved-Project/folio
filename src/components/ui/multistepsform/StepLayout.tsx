import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import Button from '../Button';

interface StepLayoutProps {
  children: React.ReactNode;
  onNext?: () => void;
  onPrev?: () => void;
  nextButtonText?: string;
  prevButtonText?: string;
  showNextButton?: boolean;
  showPrevButton?: boolean;
  isNextDisabled?: boolean;
}

export default function StepLayout({
  children,
  onNext,
  onPrev,
  nextButtonText = 'Continue',
  prevButtonText = 'Back',
  showNextButton = true,
  showPrevButton = false,
  isNextDisabled = false,
}: StepLayoutProps) {
  const theme = useTheme();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? -56 : -56}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: theme.spacing.xl }}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>

      <View
        style={[
          { marginTop: theme.spacing.md, backgroundColor: theme.colors.background.primary },
          styles.buttonRow,
        ]}
      >
        {showPrevButton && (
          <Button title={prevButtonText} onPress={onPrev} buttonStyle={styles.button} />
        )}
        {showNextButton && (
          <Button
            title={nextButtonText}
            onPress={onNext}
            disabled={isNextDisabled}
            buttonStyle={styles.button}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flex: 1,
  },
});
