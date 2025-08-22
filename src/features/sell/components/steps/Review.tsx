import React from 'react';
import { Text } from 'react-native';
import StepLayout from './StepLayout';
import StepHeader from './StepHeader';
import { useTheme } from '../../../../theme/useTheme';
import { useSellForm } from '../../context/SellFormContext';

export default function ReviewStep() {
  const theme = useTheme();
  const { dispatch, formData } = useSellForm();

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
      <Text>Condition : {formData.condition}</Text>
      <Text>Finish : {formData.finish}</Text>
    </StepLayout>
  );
}
