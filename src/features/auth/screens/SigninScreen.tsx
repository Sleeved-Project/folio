import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Alert, Keyboard } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormTextInput } from '../../../components/ui';
import { signinSchema, type SigninFormValues } from '../schemas/userSchema';
import { getErrorMessage } from '../../../lib/errors/errors-utils';
import AuthLayout from '../components/AuthLayout';

const SigninScreen: React.FC = () => {
  const { signin, isLoading } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SigninFormValues) => {
    try {
      await signin(data.email, data.password);
    } catch (err: unknown) {
      Alert.alert('Sign In Failed', getErrorMessage(err));
    }
  };

  // Forgot password component to pass as footer content
  const forgotPasswordLink = (
    <TouchableOpacity style={styles.forgotPassword}>
      <Text style={styles.forgotPasswordText}>Forgot password?</Text>
    </TouchableOpacity>
  );

  return (
    <AuthLayout
      title="Sign in to Sleeved"
      buttonTitle="Sign In"
      isLoading={isLoading}
      onSubmit={handleSubmit(onSubmit)}
      redirectType="signup"
      footerContent={forgotPasswordLink}
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
        placeholder="Enter your password"
        inputType="password"
        error={errors.password?.message}
        returnKeyType="done"
        onSubmitEditing={Keyboard.dismiss}
      />
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 4,
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#2196F3',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default SigninScreen;
