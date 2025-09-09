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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={SleevedLogo} style={styles.logo} />
          <ArrowRightLeft size={30} color={theme.colors.text.primary} />
          <Image source={StripeLogo} style={styles.logo} />
        </View>
        <Text style={styles.description}>
          Connect your sleeved account with{' '}
          <Text style={{ fontWeight: theme.typography.fontWeights.bold }}>stripe</Text> to start
          getting paid.
        </Text>
      </View>
      <Button
        title="Connect with Stripe"
        onPress={createStripeAccount}
        buttonStyle={styles.button}
        loading={isPending}
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
