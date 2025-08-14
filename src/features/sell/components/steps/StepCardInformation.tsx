import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  StepCardInformationFormData,
  StepCardInformationSchema,
} from '../../schemas/sellFormSchema';
import StepLayout from './StepLayout';
import StepHeader from './StepHeader';
import FormSelectInput from '../../../../components/ui/inputs/FormSelectInput';
import { useSellForm } from '../../context/SellFormContext';

const CONDITIONS = [
  { label: 'Mint (M)', value: 'mint' },
  { label: 'Near Mint (NM)', value: 'near_mint' },
  { label: 'Excellent (EX)', value: 'excellent' },
  { label: 'Good (G)', value: 'good' },
  { label: 'Light Played (LP)', value: 'light_played' },
  { label: 'Played (P)', value: 'played' },
  { label: 'Poor', value: 'poor' },
];

const FINISHES = [
  { label: 'Regular', value: 'regular' },
  { label: 'Foil', value: 'foil' },
  { label: 'Etched Foil', value: 'etched' },
  { label: 'Borderless', value: 'borderless' },
  { label: 'Extended Art', value: 'extended_art' },
  { label: 'Showcase', value: 'showcase' },
];

export default function StepCardInformation() {
  const { dispatch, formData: defaultValues } = useSellForm();
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

      <FormSelectInput
        control={control}
        name="condition"
        label="Card's Condition"
        options={CONDITIONS}
        error={errors.condition?.message}
        placeholder="-- Select Condition --"
        isRequired
      />

      <FormSelectInput
        control={control}
        name="finish"
        label="Card's Finish"
        options={FINISHES}
        error={errors.finish?.message}
        placeholder="-- Select Finish --"
        isRequired
      />
    </StepLayout>
  );
}
