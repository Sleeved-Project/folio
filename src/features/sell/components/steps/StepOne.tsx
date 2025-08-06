import React from 'react';
import { useForm } from 'react-hook-form';
import { View, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { SellFormAction } from '../../types';
import { stepOneSchema, StepOneFormData, SellFormData } from '../../schemas/sellFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from '../../../../theme/useTheme';
import { FormTextInput, Button } from '../../../../components/ui';
import StepHeader from './StepHeader';

interface StepOneProps {
  dispatch: React.Dispatch<SellFormAction>;
  defaultValues?: Partial<SellFormData>;
}

export default function StepOne({ dispatch, defaultValues }: StepOneProps) {
  const theme = useTheme();

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
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? -56 : -56}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: theme.spacing.xl }}
      >
        <StepHeader
          title="Exemple title"
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
      </ScrollView>
      <View style={{ marginTop: theme.spacing.md }}>
        <Button title="Suivant" onPress={handleSubmit(onSubmit)} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
