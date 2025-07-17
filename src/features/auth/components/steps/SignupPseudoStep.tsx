import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupPseudoSchema, type SignupPseudoFormValues } from '../../schemas/userSchema';
import { FormTextInput } from '../../../../components/ui';
import { AuthStepLayout } from './AuthStepLayout';

export default function SignupPseudoStep({
  onContinue,
  onBack,
  defaultValue,
}: {
  onContinue: (pseudo: string) => void;
  onBack: () => void;
  defaultValue: string;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupPseudoFormValues>({
    resolver: zodResolver(signupPseudoSchema),
    defaultValues: { pseudo: defaultValue },
    mode: 'onSubmit',
  });

  return (
    <AuthStepLayout
      title="Choose a username"
      subtitle="This will be your public name on Sleeved."
      onBack={onBack}
      buttonText="Continue"
      onButtonPress={handleSubmit((data) => onContinue(data.pseudo))}
      buttonDisabled={isSubmitting}
      buttonLoading={isSubmitting}
    >
      <FormTextInput
        control={control}
        name="pseudo"
        placeholder="Enter your username"
        error={errors.pseudo?.message}
        returnKeyType="done"
        containerStyle={{ marginBottom: 24, width: '100%' }}
      />
    </AuthStepLayout>
  );
}
