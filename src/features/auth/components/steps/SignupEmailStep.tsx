import React, { useCallback, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupEmailSchema, type SignupEmailFormValues } from '../../schemas/authUserSchema';
import { FormTextInput, Button } from '../../../../components/ui';
import AuthRedirectLink from '../AuthRedirectLink';
import logoImage from '../../../../../assets/logo.png';
import { theme } from '../../../../theme/theme';
import { useCheckAvailability } from '../../hooks/queries/useCheckAvailability';

interface SignupEmailStepProps {
  onContinue: (email: string) => void;
  defaultValue: string;
}

export default function SignupEmailStep({ onContinue, defaultValue }: SignupEmailStepProps) {
  const [emailError, setEmailError] = useState<string | null>(null);

  const { mutateAsync: checkAvailability, isPending } = useCheckAvailability();

  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignupEmailFormValues>({
    resolver: zodResolver(signupEmailSchema),
    defaultValues: { email: defaultValue },
    mode: 'onSubmit',
  });

  const handleContinue = useCallback(
    async (data: SignupEmailFormValues) => {
      setEmailError(null);
      const result = await checkAvailability({ email: data.email });
      if (result.email?.available) {
        return onContinue(data.email);
      }
      return setEmailError('This email is already in use. Please try another one or sign in.');
    },
    [checkAvailability, onContinue]
  );

  return (
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
          Get started with Sleeved
        </Text>
        <View style={styles.inputWrapper}>
          <FormTextInput
            control={control}
            name="email"
            label="Email Address"
            placeholder="Enter your email address"
            inputType="email"
            error={emailError || errors.email?.message}
            returnKeyType="done"
            containerStyle={{ marginBottom: theme.spacing.lg, width: '100%' }}
            accessibilityLabel="Email input field"
            accessibilityHint="Enter your email address to continue signup"
          />
        </View>
      </View>
      <View style={styles.bottomContent}>
        <Button
          title="Continue"
          onPress={handleSubmit(handleContinue)}
          disabled={isSubmitting || isPending}
          loading={isSubmitting || isPending}
          accessibilityLabel="Continue button"
          accessibilityHint="Proceed to the next step"
        />
        <AuthRedirectLink type="signin" />
      </View>
    </View>
  );
}

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
  inputWrapper: { width: '100%' },
  bottomContent: { width: '100%', marginBottom: theme.spacing.xl },
});
