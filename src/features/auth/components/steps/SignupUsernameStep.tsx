import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupUsernameSchema, type SignupUsernameFormValues } from '../../schemas/authUserSchema';
import { FormTextInput } from '../../../../components/ui';
import { AuthStepLayout } from './AuthStepLayout';
import { useCheckAvailability } from '../../hooks/queries/useCheckAvailability';

export default function SignupUsernameStep({
  onContinue,
  onBack,
  defaultValue,
}: {
  onContinue: (username: string) => void;
  onBack: () => void;
  defaultValue: string;
}) {
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const { mutateAsync: checkAvailability, isPending } = useCheckAvailability();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupUsernameFormValues>({
    resolver: zodResolver(signupUsernameSchema),
    defaultValues: { username: defaultValue },
    mode: 'onSubmit',
  });

  const handleContinue = useCallback(
    async (data: SignupUsernameFormValues) => {
      setUsernameError(null);
      const result = await checkAvailability({ username: data.username });

      if (result.username?.available) {
        return onContinue(data.username);
      }
      return setUsernameError('This username is already taken. Please try another one.');
    },
    [checkAvailability, onContinue]
  );

  return (
    <AuthStepLayout
      title="Choose a username"
      subtitle="This will be your public username on Sleeved."
      onBack={onBack}
      buttonText="Continue"
      onButtonPress={handleSubmit(handleContinue)}
      buttonDisabled={isSubmitting || isPending}
      buttonLoading={isSubmitting || isPending}
    >
      <View accessible accessibilityLabel="Username input field">
        <FormTextInput
          control={control}
          name="username"
          placeholder="Enter your username"
          error={usernameError || errors.username?.message}
          returnKeyType="done"
          containerStyle={{ marginBottom: 24, width: '100%' }}
        />
      </View>
    </AuthStepLayout>
  );
}
