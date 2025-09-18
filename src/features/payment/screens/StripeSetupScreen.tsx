import React from 'react';
import { Button } from '../../../components/ui';
import { useCreateAccount } from '../hooks/mutations/useCreateAccount';
import { Image, Linking, StyleSheet, Text, View } from 'react-native';
import { theme } from '../../../theme/theme';
import SleevedLogo from '../../../../assets/logo.png';
import StripeLogo from '../../../../assets/stripe-logo.png';
import { ArrowRightLeft } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function StripeSetupScreen() {
  const { mutateAsync: createAccount, isPending } = useCreateAccount();

  const createStripeAccount = async () => {
    try {
      const stripeAccount = await createAccount();
      Linking.openURL(stripeAccount);
      router.replace('/');
    } catch (error) {
      console.error('Error creating Stripe account:', error);
    }
  };

  return (
    <SafeAreaView
      style={styles.container}
      accessible
      accessibilityRole="summary"
      accessibilityLabel="Stripe setup screen"
    >
      <View style={styles.header}>
        <View
          style={styles.logoContainer}
          accessible
          accessibilityRole="image"
          accessibilityLabel="Connect Sleeved account to Stripe"
        >
          <Image
            source={SleevedLogo}
            style={styles.logo}
            accessible
            accessibilityRole="image"
            accessibilityLabel="Sleeved logo"
          />
          <ArrowRightLeft
            size={30}
            color={theme.colors.text.primary}
            accessible
            accessibilityRole="image"
            accessibilityLabel="Connection arrow"
          />
          <Image
            source={StripeLogo}
            style={styles.logo}
            accessible
            accessibilityRole="image"
            accessibilityLabel="Stripe logo"
          />
        </View>

        <Text
          style={styles.description}
          accessible
          accessibilityRole="text"
        >
          Connect your sleeved account with{' '}
          <Text
            style={{ fontWeight: theme.typography.fontWeights.bold }}
            accessible
            accessibilityRole="text"
          >
            Stripe
          </Text>{' '}
          to start getting paid.
        </Text>
      </View>

      <Button
        title="Connect with Stripe"
        onPress={createStripeAccount}
        buttonStyle={styles.button}
        loading={isPending}
        accessibilityLabel="Connect with Stripe"
        accessibilityHint="Opens Stripe to link your account and enable payments"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: theme.spacing.xl,
  },
  header: {
    width: '90%',
  },
  logoContainer: {
    alignSelf: 'center',
    width: '100%',
    backgroundColor: theme.colors.border.medium,
    paddingVertical: theme.spacing.xl,
    flexDirection: 'row',
    gap: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.medium,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  description: {
    fontSize: theme.typography.fontSizes.md,
    textAlign: 'center',
    marginVertical: theme.spacing.lg,
  },
  button: {
    width: '90%',
  },
});
