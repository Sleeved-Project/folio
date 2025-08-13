import React, { useReducer } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReviewStep from '../components/steps/Review';
import { Stepper } from '../../../components/ui/stepper';
import { reducer, initialState, steps } from '../reducer/useSellFormReducer';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import StepPhoto from '../components/steps/StepPhoto';
import StepCardInformation from '../components/steps/StepCardInformation';

export default function MultiStepForm() {
  const therme = useTheme();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { stepIndex, formData } = state;

  const renderStep = () => {
    switch (stepIndex) {
      case 0:
        return <StepPhoto dispatch={dispatch} defaultValues={formData} />;
      case 1:
        return <StepCardInformation dispatch={dispatch} defaultValues={formData} />;
      case 2:
        return <ReviewStep dispatch={dispatch} formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: therme.colors.background.primary }]}>
      <Stepper currentStep={stepIndex} steps={steps} />
      {renderStep()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
