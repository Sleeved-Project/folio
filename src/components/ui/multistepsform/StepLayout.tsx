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
  isPrevDisabled?: boolean;
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
  isPrevDisabled = false,
  isNextDisabled = false,
}: StepLayoutProps) {
  const theme = useTheme();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? -56 : -56}
      accessible
      accessibilityLabel="Step layout container"
      accessibilityHint="Contains the content and navigation buttons for this step"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: theme.spacing.xl }}
        keyboardShouldPersistTaps="handled"
        accessible
        accessibilityLabel="Step content scroll area"
        accessibilityHint="Scroll through the content of this step"
      >
        {children}
      </ScrollView>

      <View
        style={[{ marginTop: theme.spacing.md, backgroundColor: theme.colors.background.primary }, styles.buttonRow]}
        accessible
        accessibilityRole="toolbar"
        accessibilityLabel="Step navigation buttons"
        accessibilityHint="Navigate to the previous or next step"
      >
        {showPrevButton && (
          <Button
            title={prevButtonText}
            onPress={onPrev}
            disabled={isPrevDisabled}
            buttonStyle={styles.button}
            variant="secondary"
            accessible
            accessibilityRole="button"
            accessibilityLabel={prevButtonText}
            accessibilityState={{ disabled: isPrevDisabled }}
          />
        )}
        {showNextButton && (
          <Button
            title={nextButtonText}
            onPress={onNext}
            disabled={isNextDisabled}
            buttonStyle={styles.button}
            variant="primary"
            accessible
            accessibilityRole="button"
            accessibilityLabel={nextButtonText}
            accessibilityState={{ disabled: isNextDisabled }}
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
