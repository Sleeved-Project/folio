import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupEmailSchema, type SignupEmailFormValues } from '../../schemas/userSchema';
import { FormTextInput, Button } from '../../../../components/ui';
import AuthRedirectLink from '../AuthRedirectLink';
import logoImage from '../../../../../assets/logo.png';
import { theme } from '../../../../theme/theme';

export default function SignupEmailStep({
  onContinue,
  defaultValue,
}: {
  onContinue: (email: string) => void;
  defaultValue: string;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupEmailFormValues>({
    resolver: zodResolver(signupEmailSchema),
    defaultValues: { email: defaultValue },
    mode: 'onSubmit',
  });

  return (
    <View style={styles.container}>
      <View style={styles.centerContent}>
        <Image source={logoImage} style={styles.logo} />
        <Text style={styles.title}>Get started with Sleeved</Text>
        <View style={styles.inputWrapper}>
          <FormTextInput
            control={control}
            name="email"
            label="Email Address"
            placeholder="Enter your email address"
            inputType="email"
            error={errors.email?.message}
            returnKeyType="done"
            containerStyle={{ marginBottom: theme.spacing.lg, width: '100%' }}
          />
        </View>
      </View>
      <View style={styles.bottomContent}>
        <Button
          title="Continue"
          onPress={handleSubmit((data) => onContinue(data.email))}
          disabled={isSubmitting}
          loading={isSubmitting}
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
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xxl,
    textAlign: 'center',
  },
  inputWrapper: {
    width: '100%',
  },
  bottomContent: {
    width: '100%',
    marginBottom: theme.spacing.xl,
  },
});
