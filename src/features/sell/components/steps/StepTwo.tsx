import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import { Text } from 'react-native';
import { SellFormAction } from '../../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { stepTwoSchema, StepTwoFormData, SellFormData } from '../../schemas/sellFormSchema';
import StepLayout from './StepLayout';
import StepHeader from './StepHeader';

interface StepTwoProps {
  dispatch: React.Dispatch<SellFormAction>;
  defaultValues?: Partial<SellFormData>;
}

export default function StepTwo({ dispatch, defaultValues }: StepTwoProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: { choice: defaultValues?.choice || '' },
  });

  const onSubmit = (data: StepTwoFormData) => {
    dispatch({ type: 'UPDATE_DATA', payload: data });
    dispatch({ type: 'NEXT_STEP' });
  };

  const onPrev = () => {
    dispatch({ type: 'PREV_STEP' });
  };

  return (
    <StepLayout onNext={handleSubmit(onSubmit)} onPrev={onPrev} showPrevButton={true}>
      <StepHeader
        title="Step titel"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet."
        infoField="* Required fields"
      />
      <Text>Option label:</Text>
      <Controller
        control={control}
        name="choice"
        rules={{ required: 'Choose an option' }}
        render={({ field: { onChange, value } }) => (
          <Picker selectedValue={value} onValueChange={onChange}>
            <Picker.Item label="-- Select --" value="" />
            <Picker.Item label="Option A" value="A" />
            <Picker.Item label="Option B" value="B" />
          </Picker>
        )}
      />
      {errors.choice && <Text style={{ color: 'red' }}>{errors.choice.message}</Text>}
    </StepLayout>
  );
}
