import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Alert, Keyboard, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormTextInput } from '../../../components/ui';
import { signinSchema, type SigninFormValues } from '../schemas/userSchema';
import { getErrorMessage } from '../../../lib/errors/errors-utils';
import AuthLayout from '../components/AuthLayout';
import { GoogleSignInButton } from '../components/GoogleSignInButton';

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

  // Combined footer content with forgot password and social login options
  const footerContent = (
    <View style={styles.footerContainer}>
      {/* Forgot password link */}
      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
      </TouchableOpacity>

      {/* Separator */}
      <View style={styles.separator}>
        <View style={styles.separatorLine} />
        <Text style={styles.separatorText}>or continue with</Text>
        <View style={styles.separatorLine} />
      </View>

      {/* Social login buttons */}
      <GoogleSignInButton />
    </View>
  );

  return (
    <AuthLayout
      title="Sign in to Sleeved"
      buttonTitle="Sign In"
      isLoading={isLoading}
      onSubmit={handleSubmit(onSubmit)}
      redirectType="signup"
      footerContent={footerContent}
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
  footerContainer: {
    width: '100%',
    marginTop: 4,
    marginBottom: 20,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#2196F3',
    fontSize: 14,
    fontWeight: '500',
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  separatorText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#757575',
  },
});

export default SigninScreen;
