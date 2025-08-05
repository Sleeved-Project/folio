import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import { View, Button, Text } from 'react-native';
import { SellFormAction } from '../../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { stepTwoSchema, StepTwoFormData, SellFormData } from '../../schemas/sellFormSchema';

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

  return (
    <View>
      <Text>Choisissez une option :</Text>
      <Controller
        control={control}
        name="choice"
        rules={{ required: 'Veuillez sélectionner une option' }}
        render={({ field: { onChange, value } }) => (
          <Picker selectedValue={value} onValueChange={onChange}>
            <Picker.Item label="-- Sélectionner --" value="" />
            <Picker.Item label="Option A" value="A" />
            <Picker.Item label="Option B" value="B" />
          </Picker>
        )}
      />
      {errors.choice && <Text style={{ color: 'red' }}>{errors.choice.message}</Text>}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button title="Retour" onPress={() => dispatch({ type: 'PREV_STEP' })} />
        <Button title="Suivant" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}
