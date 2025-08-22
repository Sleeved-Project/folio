import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { StepCardInformationFormData, StepCardInformationSchema } from '../schemas/sellFormSchema';
import StepLayout from './shared/StepLayout';
import StepHeader from './shared/StepHeader';
import FormSelectInput from '../../../components/ui/inputs/FormSelectInput';
import { ActivityIndicator, View } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import { useCardConditions } from '../hooks/queries/useCardConditions';
import { useCardFinishes } from '../hooks/queries/useCardFinishes';
import { useSellForm } from '../context/SellFormContext';

export default function CardInformationStep() {
  const { dispatch, formData: defaultValues } = useSellForm();
  const theme = useTheme();
  const { data: conditions, isLoading: conditionsLoading } = useCardConditions();
  const { data: finishes, isLoading: finishesLoading } = useCardFinishes();

  const isLoading = useMemo(() => {
    return conditionsLoading || finishesLoading;
  }, [conditionsLoading, finishesLoading]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(StepCardInformationSchema),
    defaultValues: {
      condition: defaultValues?.condition || '',
      finish: defaultValues?.finish || '',
    },
  });

  const onSubmit = (data: StepCardInformationFormData) => {
    dispatch({ type: 'UPDATE_DATA', payload: data });
    dispatch({ type: 'NEXT_STEP' });
  };

  const onPrev = () => {
    dispatch({ type: 'PREV_STEP' });
  };

  return (
    <StepLayout onNext={handleSubmit(onSubmit)} onPrev={onPrev} showPrevButton={true}>
      <StepHeader
        title="Card informations"
        description="Specify your card’s condition and finish: key details collectors are looking for!"
        infoField="* Required fields"
      />

      {isLoading ? (
        <View style={{ alignItems: 'center', marginTop: 40 }}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        <View>
          <FormSelectInput
            control={control}
            name="condition"
            label="Card's Condition"
            options={conditions || []}
            error={errors.condition?.message}
            placeholder="-- Select Condition --"
            isRequired
          />

          <FormSelectInput
            control={control}
            name="finish"
            label="Card's Finish"
            options={finishes || []}
            error={errors.finish?.message}
            placeholder="-- Select Finish --"
            isRequired
          />
        </View>
      )}
    </StepLayout>
  );
}
