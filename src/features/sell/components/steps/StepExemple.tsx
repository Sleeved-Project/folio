import React from 'react';
import { useForm } from 'react-hook-form';
import { SellFormAction } from '../../types';
import { stepOneSchema, StepOneFormData, SellFormData } from '../../schemas/sellFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormTextInput } from '../../../../components/ui';
import StepHeader from './StepHeader';
import StepLayout from './StepLayout';

interface StepOneProps {
  dispatch: React.Dispatch<SellFormAction>;
  defaultValues?: Partial<SellFormData>;
}

export default function StepOne({ dispatch, defaultValues }: StepOneProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<StepOneFormData>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: { name: defaultValues?.name || '' },
    mode: 'onChange',
  });

  const onSubmit = (data: StepOneFormData) => {
    dispatch({ type: 'UPDATE_DATA', payload: data });
    dispatch({ type: 'NEXT_STEP' });
  };

  return (
    <StepLayout onNext={handleSubmit(onSubmit)}>
      <StepHeader
        title="Step title"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet."
        infoField="* Required fields"
      />

      <FormTextInput
        control={control}
        name="name"
        isRequired
        label="Your name "
        placeholder="Enter your name"
        error={errors.name?.message}
      />
      <FormTextInput
        control={control}
        name="name"
        isRequired
        label="Your name "
        placeholder="Enter your name"
        error={errors.name?.message}
      />
      <FormTextInput
        control={control}
        name="name"
        isRequired
        label="Your name "
        placeholder="Enter your name"
        error={errors.name?.message}
      />
      <FormTextInput
        control={control}
        name="name"
        isRequired
        label="Your name "
        placeholder="Enter your name"
        error={errors.name?.message}
      />
      <FormTextInput
        control={control}
        name="name"
        isRequired
        label="Your name "
        placeholder="Enter your name"
        error={errors.name?.message}
      />
      <FormTextInput
        control={control}
        name="name"
        isRequired
        label="Your name "
        placeholder="Enter your name"
        error={errors.name?.message}
      />
      <FormTextInput
        control={control}
        name="name"
        isRequired
        label="Your name "
        placeholder="Enter your name"
        error={errors.name?.message}
      />
      <FormTextInput
        control={control}
        name="name"
        isRequired
        label="Your name "
        placeholder="Enter your name"
        error={errors.name?.message}
      />
    </StepLayout>
  );
}
