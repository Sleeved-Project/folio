import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupPasswordSchema, type SignupPasswordFormValues } from '../../schemas/userSchema';
import { FormTextInput } from '../../../../components/ui';
import { AuthStepLayout } from './AuthStepLayout';

export default function SignupPasswordStep({
  onSubmit,
  onBack,
  isLoading,
}: {
  onSubmit: (data: SignupPasswordFormValues) => void;
  onBack: () => void;
  isLoading?: boolean;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupPasswordFormValues>({
    resolver: zodResolver(signupPasswordSchema),
    defaultValues: { password: '' },
    mode: 'onSubmit',
  });

  return (
    <AuthStepLayout
      title="Create your password"
      subtitle="Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      onBack={onBack}
      buttonText="Finish"
      onButtonPress={handleSubmit(onSubmit)}
      buttonDisabled={isSubmitting || isLoading}
      buttonLoading={isSubmitting || isLoading}
    >
      <FormTextInput
        control={control}
        name="password"
        label="Password"
        placeholder="Create a secure password"
        inputType="password"
        error={errors.password?.message}
        returnKeyType="next"
        containerStyle={{ marginBottom: 24, width: '100%' }}
      />
    </AuthStepLayout>
  );
}
