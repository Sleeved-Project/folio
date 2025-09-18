import React from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import { StepPriceFormData, stepPriceSchema } from '../schemas/sellFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormTextInput } from '../../../components/ui';
import StepLayout from '../../../components/ui/multistepsform/StepLayout';
import StepHeader from '../../../components/ui/multistepsform/StepHeader';
import PriceEstimation from '../components/PriceEstimation';
import { useSellForm } from '../context/SellFormContext';
import { EuroIcon } from 'lucide-react-native';
import { useTheme } from '../../../theme/useTheme';

export default function PriceStep() {
  const theme = useTheme();
  const { dispatch, formData: defaultValues } = useSellForm();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<StepPriceFormData>({
    resolver: zodResolver(stepPriceSchema),
    defaultValues: { price: defaultValues?.price || '' },
    mode: 'onChange',
  });

  const onSubmit = (data: StepPriceFormData) => {
    dispatch({ type: 'UPDATE_DATA', payload: data });
    dispatch({ type: 'NEXT_STEP' });
  };

  const onPrev = () => {
    dispatch({ type: 'PREV_STEP' });
  };

  return (
    <StepLayout onNext={handleSubmit(onSubmit)} onPrev={onPrev} showPrevButton={true}>
      <View accessible accessibilityRole="header" accessibilityLabel="Set your price step">
        <StepHeader
          title="Set your price"
          description="Choose a fair price to attract buyers while giving your card the value it deserves."
          infoField="* Required fields"
        />
      </View>

      <View
        accessible
        accessibilityRole="summary"
        accessibilityLabel="Price estimation section"
        accessibilityHint="Shows the suggested price based on market data"
      >
        <PriceEstimation />
      </View>

      <View
        accessible
        accessibilityRole="adjustable"
        accessibilityLabel="Price input field"
        accessibilityHint="Enter the price you want to set for your card"
      >
        <FormTextInput
          control={control}
          name="price"
          isRequired
          label="Card's price"
          placeholder="0.00"
          inputType="numeric"
          rightIcon={<EuroIcon size={22} color={theme.colors.text.secondary} />}
          error={errors.price?.message}
        />
      </View>
    </StepLayout>
  );
}
