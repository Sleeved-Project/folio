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
import { useNavigation } from 'expo-router';
import { useScanContext } from '../../scan/context/ScanContext';

type BeforeRemoveEvent = {
  data?: {
    action?: {
      type?: string;
    };
  };
};

function SellFormContent() {
  const theme = useTheme();
  const navigation = useNavigation();
  const { stepIndex, dispatch } = useSellForm();
  const { clearScanData } = useScanContext();

  const handleStepPress = (index: number) => {
    if (index < stepIndex) {
      dispatch({ type: 'GO_TO_STEP', payload: index });
    }
  };

  // Clear scan data when navigating back from the sell form
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e: BeforeRemoveEvent) => {
      const actionType = e?.data?.action?.type;
      // only clear on 'POP' (back), not on 'NAVIGATE' to a child screen (like scanner)
      if (actionType === 'POP') {
        clearScanData();
      }
    });

    return unsubscribe;
  }, [navigation, clearScanData]);

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
