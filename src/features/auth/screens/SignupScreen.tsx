import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Platform,
  ScrollView,
  Keyboard,
  SafeAreaView,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormInput } from '../../../components/ui';
import { signupSchema, type SignupFormValues } from '../schemas/userSchema';
import AuthRedirectLink from '../components/AuthRedirectionLink';
import { getErrorMessage } from '../../../lib/errors/errors-utils';
import logoImage from '../../../../assets/logo.png';

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
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoContainer}>
            <Image source={logoImage} style={styles.logo} />
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>Let&apos;s get started</Text>
          </View>

          <View style={styles.formContainer}>
            <FormInput
              control={control}
              name="email"
              label="Email Address"
              placeholder="Enter your email address"
              inputType="email"
              error={errors.email?.message}
              returnKeyType="next"
            />

            <FormInput
              control={control}
              name="password"
              label="Password"
              placeholder="Create a secure password (min. 6 characters)"
              inputType="password"
              error={errors.password?.message}
              returnKeyType="next"
            />

            <FormInput
              control={control}
              name="verifyPassword"
              label="Confirm Password"
              placeholder="Re-enter your password to confirm"
              inputType="password"
              error={errors.verifyPassword?.message}
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>

          <View style={styles.flexSpace} />
        </ScrollView>

        <View style={styles.actionsContainer}>
          <Button
            title={isLoading ? 'Creating Account...' : 'Sign up'}
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
            disabled={isLoading}
            buttonStyle={styles.actionButton}
          />

          <AuthRedirectLink type="signin" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  titleContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    marginTop: 10,
  },
  flexSpace: {
    flex: 1,
    minHeight: 20,
  },
  actionsContainer: {
    width: '100%',
    padding: 24,
    paddingTop: 12,
    backgroundColor: '#fff',
  },
  actionButton: {
    width: '100%',
  },
  signinLink: {
    marginTop: 16,
    alignItems: 'center',
    padding: 10,
  },
  signinText: {
    color: '#666',
    fontSize: 16,
  },
  signinTextBold: {
    color: '#2196F3',
    fontWeight: '600',
  },
});

export default SignupScreen;
