import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupUsernameSchema, type SignupUsernameFormValues } from '../../schemas/userSchema';
import { FormTextInput } from '../../../../components/ui';
import { AuthStepLayout } from './AuthStepLayout';

export default function SignupUsernameStep({
  onContinue,
  onBack,
  defaultValue,
}: {
  onContinue: (username: string) => void;
  onBack: () => void;
  defaultValue: string;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupUsernameFormValues>({
    resolver: zodResolver(signupUsernameSchema),
    defaultValues: { username: defaultValue },
    mode: 'onSubmit',
  });

  return (
    <AuthStepLayout
      title="Choose a username"
      subtitle="This will be your public username on Sleeved."
      onBack={onBack}
      buttonText="Continue"
      onButtonPress={handleSubmit((data) => onContinue(data.username))}
      buttonDisabled={isSubmitting}
      buttonLoading={isSubmitting}
    >
      <FormTextInput
        control={control}
        name="username"
        placeholder="Enter your username"
        error={errors.username?.message}
        returnKeyType="done"
        containerStyle={{ marginBottom: 24, width: '100%' }}
      />
    </AuthStepLayout>
  );
}
