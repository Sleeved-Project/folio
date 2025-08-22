import React from 'react';
import { useForm } from 'react-hook-form';
import { StepPhotoFormData, stepPhotoSchema } from '../../schemas/sellFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import StepHeader from './StepHeader';
import StepLayout from './StepLayout';
import FormPhotoPicker from '../../../../components/ui/inputs/FormPhotoPicker';
import { useSellForm } from '../../context/SellFormContext';

export default function StepPhoto() {
  const { dispatch, formData: defaultValues } = useSellForm();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<StepPhotoFormData>({
    resolver: zodResolver(stepPhotoSchema),
    defaultValues: {
      rectoImage: defaultValues?.rectoImage || '',
      versoImage: defaultValues?.versoImage || '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: StepPhotoFormData) => {
    dispatch({ type: 'UPDATE_DATA', payload: data });
    dispatch({ type: 'NEXT_STEP' });
  };

  return (
    <StepLayout onNext={handleSubmit(onSubmit)}>
      <StepHeader
        title="Highlight your card"
        description="Crisp photos of both sides help present your card in the best possible light."
        infoField="* Required fields"
      />

      <FormPhotoPicker
        control={control}
        name="rectoImage"
        label="Front Side"
        placeholder="Tap to take front side photo"
        error={errors.rectoImage?.message}
        isRequired
      />

      <FormPhotoPicker
        control={control}
        name="versoImage"
        label="Back Side"
        placeholder="Tap to take back side photo"
        error={errors.versoImage?.message}
        isRequired
      />
    </StepLayout>
  );
}
