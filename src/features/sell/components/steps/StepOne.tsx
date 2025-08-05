import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Button, View, Text } from 'react-native';
import { SellFormAction } from '../../types';
import { stepOneSchema, StepOneFormData, SellFormData } from '../../schemas/sellFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';

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
  });

  const onSubmit = (data: StepOneFormData) => {
    dispatch({ type: 'UPDATE_DATA', payload: data });
    dispatch({ type: 'NEXT_STEP' });
  };

  return (
    <View>
      <Text>Votre nom :</Text>
      <Controller
        control={control}
        name="name"
        rules={{ required: 'Nom requis' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            style={{ borderWidth: 1, marginBottom: 10 }}
          />
        )}
      />
      {errors.name && <Text style={{ color: 'red' }}>{errors.name.message}</Text>}
      <Button title="Suivant" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
