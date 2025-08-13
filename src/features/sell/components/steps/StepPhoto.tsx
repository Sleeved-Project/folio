import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SellFormAction } from '../../types';
import { SellFormData, StepPhotoFormData, stepPhotoSchema } from '../../schemas/sellFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import StepHeader from './StepHeader';
import StepLayout from './StepLayout';
import PhotoPicker from '../../../../components/ui/PhotoPicker';

interface StepPhotoProps {
  dispatch: React.Dispatch<SellFormAction>;
  defaultValues?: Partial<SellFormData>;
}

export default function StepPhoto({ dispatch, defaultValues }: StepPhotoProps) {
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

      <Controller
        control={control}
        name="rectoImage"
        render={({ field: { onChange, value } }) => (
          <PhotoPicker
            label="Front Side"
            image={value}
            onImageChange={onChange}
            error={errors.rectoImage?.message}
            placeholder="Tap to take front side photo"
            isRequired
          />
        )}
      />

      <Controller
        control={control}
        name="versoImage"
        render={({ field: { onChange, value } }) => (
          <PhotoPicker
            label="Back Side"
            image={value}
            onImageChange={onChange}
            error={errors.versoImage?.message}
            placeholder="Tap to take back side photo"
            isRequired
          />
        )}
      />
    </StepLayout>
  );
}
