import React from 'react';
import { Text } from 'react-native';
import { SellFormAction } from '../../types';
import { SellFormData } from '../../schemas/sellFormSchema';
import StepLayout from './StepLayout';
import StepHeader from './StepHeader';
import { useTheme } from '../../../../theme/useTheme';

interface ReviewStepProps {
  dispatch: React.Dispatch<SellFormAction>;
  formData: Partial<SellFormData>;
}

export default function ReviewStep({ formData, dispatch }: ReviewStepProps) {
  const theme = useTheme();

  const onSubmit = () => {
    console.log('Formulaire final :', formData);
    alert('Formulaire soumis avec succès 🎉');
  };

  const onPrev = () => {
    dispatch({ type: 'PREV_STEP' });
  };

  return (
    <StepLayout onNext={onSubmit} onPrev={onPrev} nextButtonText="Publish" showPrevButton={true}>
      <StepHeader
        title="Review step"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet."
      />
      <Text
        style={[
          {
            fontWeight: theme.typography.fontWeights.semiBold,
          },
        ]}
      >
        Ad review :
      </Text>
      <Text>Name : {formData.name}</Text>
      <Text>Choice : {formData.choice}</Text>
    </StepLayout>
  );
}
