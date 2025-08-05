import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import StepItem from './StepItem';
import StepSeparator from './StepSeparator';

interface StepperProps {
  steps: string[];
  currentStep: number;
}

export default function Stepper({ steps, currentStep }: StepperProps) {
  const theme = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      style={[styles.scrollView, { marginBottom: theme.spacing.md }]}
    >
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <StepItem
            step={step}
            index={index}
            isActive={currentStep === index}
            isCompleted={currentStep > index}
          />
          {index < steps.length - 1 && <StepSeparator isCompleted={currentStep > index} />}
        </React.Fragment>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {},
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: '100%',
    paddingHorizontal: 0,
  },
});
