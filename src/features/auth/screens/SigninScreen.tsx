import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  SafeAreaView,
  Image,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormTextInput, Button } from '../../../components/ui';
import { signinSchema, type SigninFormValues } from '../schemas/authUserSchema';
import { getErrorMessage } from '../../../lib/errors/errors-utils';
import AuthRedirectLink from '../components/AuthRedirectLink';
import logoImage from '../../../../assets/logo.png';
import { theme } from '../../../theme/theme';

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
      alert(getErrorMessage(err));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background.primary }}>
      <View style={styles.container}>
        <View style={styles.centerContent}>
          <Image
            source={logoImage}
            style={styles.logo}
            accessible
            accessibilityRole="image"
            accessibilityLabel="Sleeved app logo"
          />
          <Text
            style={[styles.title, { color: theme.colors.primaryForeground }]}
            accessible
            accessibilityRole="header"
          >
            Sign in to Sleeved
          </Text>
          <View style={styles.inputWrapper}>
            <FormTextInput
              control={control}
              name="email"
              label="Email Address"
              placeholder="Enter your email address"
              inputType="email"
              error={typeof errors.email?.message === 'string' ? errors.email?.message : undefined}
              returnKeyType="next"
              accessibilityLabel="Email input field"
              accessibilityHint="Enter your email address to sign in"
            />
            <FormTextInput
              control={control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              inputType="password"
              error={typeof errors.password?.message === 'string' ? errors.password?.message : undefined}
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
              accessibilityLabel="Password input field"
              accessibilityHint="Enter your password to sign in"
            />
            <TouchableOpacity
              style={styles.forgotPassword}
              accessible
              accessibilityRole="button"
              accessibilityLabel="Forgot password"
              accessibilityHint="Tap to reset your password"
              onPress={() => {}}
            >
              <Text style={[styles.forgotPasswordText, { color: theme.colors.secondary }]}>
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomContent}>
          <Button
            title="Sign in"
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
            disabled={isLoading}
            accessibilityLabel="Sign in button"
            accessibilityHint="Press to sign in to your account"
          />
          <AuthRedirectLink type="signup" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
    paddingHorizontal: theme.spacing.lg,
    justifyContent: 'space-between',
  },
  centerContent: {
    alignItems: 'center',
    marginTop: theme.spacing.xxl,
    width: '100%',
  },
  logo: {
    width: 48,
    height: 48,
    marginBottom: theme.spacing.xl,
    resizeMode: 'contain',
  },
  title: {
    fontSize: theme.typography.fontSizes.xxl,
    fontWeight: theme.typography.fontWeights.bold,
    marginBottom: theme.spacing.xxl,
    textAlign: 'center',
  },
  inputWrapper: {
    width: '100%',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 4,
    marginBottom: 20,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '500',
  },
  bottomContent: {
    width: '100%',
    marginBottom: theme.spacing.xl,
  },
});

export default SigninScreen;
