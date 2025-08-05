import React, { useReducer } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import StepOne from '../components/steps/StepOne';
import StepTwo from '../components/steps/StepTwo';
import ReviewStep from '../components/steps/Review';
import Stepper from '../components/steps/Stepper';
import { reducer, initialState } from '../reducer/useSellFormReducer';

export default function MultiStepForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { stepIndex, formData } = state;

  const renderStep = () => {
    switch (stepIndex) {
      case 0:
        return <StepOne dispatch={dispatch} defaultValues={formData} />;
      case 1:
        return <StepTwo dispatch={dispatch} defaultValues={formData} />;
      case 2:
        return <ReviewStep dispatch={dispatch} formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ padding: 20 }}>
      <Stepper currentStep={stepIndex} />
      {renderStep()}
    </SafeAreaView>
  );
}
