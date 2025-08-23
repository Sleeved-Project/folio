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

function SellFormContent() {
  const theme = useTheme();
  const { stepIndex } = useSellForm();

  const renderStep = () => {
    switch (stepIndex) {
      case 0:
        return <PhotoStep />;
      case 1:
        return <CardInformationStep />;
      case 2:
        return <PriceStep />;
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
