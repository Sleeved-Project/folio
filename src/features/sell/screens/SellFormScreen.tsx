import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReviewStep from '../components/steps/Review';
import { Stepper } from '../../../components/ui/stepper';
import { steps } from '../reducer/useSellFormReducer';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import StepPhoto from '../components/steps/StepPhoto';
import StepCardInformation from '../components/steps/StepCardInformation';
import StepPrice from '../components/steps/prices/StepPrice';
import { SellFormProvider, useSellForm } from '../context/SellFormContext';

function SellFormContent() {
  const theme = useTheme();
  const { stepIndex } = useSellForm();

  const renderStep = () => {
    switch (stepIndex) {
      case 0:
        return <StepPhoto />;
      case 1:
        return <StepCardInformation />;
      case 2:
        return <StepPrice />;
      case 3:
        return <ReviewStep />;
      case 4:
        return <ReviewStep />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Stepper currentStep={stepIndex} steps={steps} />
      {renderStep()}
    </SafeAreaView>
  );
}

export default function SellFormScreen() {
  return (
    <SellFormProvider>
      <SellFormContent />
    </SellFormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
