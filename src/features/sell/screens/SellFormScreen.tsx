import React from 'react';
import { StyleSheet, View, AccessibilityInfo } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stepper } from '../../../components/ui/stepper';
import { steps } from '../reducer/useSellFormReducer';
import { useTheme } from '../../../theme/useTheme';
import { SellFormProvider, useSellForm } from '../context/SellFormContext';
import PhotoStep from '../steps/PhotoStep';
import CardInformationStep from '../steps/CardInformationStep';
import PriceStep from '../steps/PriceStep';
import GradeStep from '../steps/GradeStep';
import ReviewStep from '../steps/ReviewStep';
import { SellFormStepEnum } from '../types';
import { useNavigation } from 'expo-router';
import { useScanContext } from '../../scan/context/ScanContext';

type BeforeRemoveEvent = {
  data?: { action?: { type?: string } };
};

function SellFormContent() {
  const theme = useTheme();
  const navigation = useNavigation();
  const { stepIndex, dispatch } = useSellForm();
  const { clearScanData } = useScanContext();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e: BeforeRemoveEvent) => {
      if (e?.data?.action?.type === 'POP') clearScanData();
    });
    return unsubscribe;
  }, [navigation, clearScanData]);

  const handleStepPress = (index: number) => {
    if (index < stepIndex) dispatch({ type: 'GO_TO_STEP', payload: index });
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

  React.useEffect(() => {
    const currentStepLabel = steps[stepIndex];
    AccessibilityInfo.announceForAccessibility(`Step ${stepIndex + 1}: ${currentStepLabel}`);
  }, [stepIndex]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background.primary }]}
    >
      <View
        accessible
        accessibilityRole="header"
        accessibilityLabel={`Sell form, step ${stepIndex + 1} of ${steps.length}`}
      >
        <Stepper currentStep={stepIndex} steps={steps} onStepPress={handleStepPress} />
      </View>
      <View accessible accessibilityLabel={`Step content: ${steps[stepIndex]}`}>
        {renderStep()}
      </View>
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
