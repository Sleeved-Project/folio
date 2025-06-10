import React from 'react';
import { Alert, Keyboard } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormTextInput } from '../../../components/ui';
import { signupSchema, type SignupFormValues } from '../schemas/userSchema';
import { getErrorMessage } from '../../../lib/errors/errors-utils';
import AuthLayout from '../components/AuthLayout';

const SignupScreen: React.FC = () => {
  const { signup, isLoading } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      verifyPassword: '',
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      await signup(data.email, data.password);
    } catch (err: unknown) {
      Alert.alert('Signup Failed', getErrorMessage(err));
    }
  };

  return (
    <AuthLayout
      title="Let's get started"
      buttonTitle="Sign up"
      isLoading={isLoading}
      onSubmit={handleSubmit(onSubmit)}
      redirectType="signin"
    >
      <FormTextInput
        control={control}
        name="email"
        label="Email Address"
        placeholder="Enter your email address"
        inputType="email"
        error={errors.email?.message}
        returnKeyType="next"
      />

      <FormTextInput
        control={control}
        name="password"
        label="Password"
        placeholder="Create a secure password (min. 6 characters)"
        inputType="password"
        error={errors.password?.message}
        returnKeyType="next"
      />

      <FormTextInput
        control={control}
        name="verifyPassword"
        label="Confirm Password"
        placeholder="Re-enter your password to confirm"
        inputType="password"
        error={errors.verifyPassword?.message}
        returnKeyType="done"
        onSubmitEditing={Keyboard.dismiss}
      />
    </AuthLayout>
  );
};

export default SignupScreen;
