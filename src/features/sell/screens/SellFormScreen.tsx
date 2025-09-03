import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReviewStep from '../steps/ReviewStep';
import { Stepper } from '../../../components/ui/stepper';
import { steps } from '../reducer/useSellFormReducer';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import PhotoStep from '../steps/PhotoStep';
import CardInformationStep from '../steps/CardInformationStep';
import PriceStep from '../steps/PriceStep';
import { SellFormProvider, useSellForm } from '../context/SellFormContext';
import GradeStep from '../steps/GradeStep';
import { SellFormStepEnum } from '../types';

function SellFormContent() {
  const theme = useTheme();
  const { stepIndex, dispatch } = useSellForm();

  const handleStepPress = (index: number) => {
    if (index < stepIndex) {
      dispatch({ type: 'GO_TO_STEP', payload: index });
    }
  };

  const renderStep = () => {
    switch (stepIndex) {
      case SellFormStepEnum.PHOTOS:
        return <PhotoStep />;
      case SellFormStepEnum.CARD_INFOS:
        return <CardInformationStep />;
      case SellFormStepEnum.PRICE:
        return <PriceStep />;
      case SellFormStepEnum.GRADE:
        return <GradeStep />;
      case SellFormStepEnum.REVIEW:
        return <ReviewStep />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Stepper currentStep={stepIndex} steps={steps} onStepPress={handleStepPress} />
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
