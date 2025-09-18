import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import { CircleCheckBig } from 'lucide-react-native';
import { Button } from '../../../components/ui';
import { router } from 'expo-router';

export default function OrderConfirmationScreen() {
  const theme = useTheme();

  return (
    <View
      style={styles.container}
      accessible
      accessibilityRole="alert" // annonce la confirmation de commande
      accessibilityLabel="Order confirmation screen"
    >
      <CircleCheckBig
        color={theme.colors.success}
        size={120}
        accessible
        accessibilityRole="image"
        accessibilityLabel="Order confirmed checkmark"
      />

      <Text
        style={[styles.title, { color: theme.colors.text.primary }]}
        accessible
        accessibilityRole="header"
      >
        Order Confirmed!
      </Text>

      <Text
        style={[
          styles.text,
          { color: theme.colors.text.secondary, fontWeight: theme.typography.fontWeights.semiBold },
        ]}
        accessible
        accessibilityRole="text"
      >
        Thank you for your purchase.
      </Text>

      <Text
        style={[styles.text, { color: theme.colors.text.secondary }]}
        accessible
        accessibilityRole="text"
      >
        Your order is being processed and you will receive a confirmation email shortly.
      </Text>

      <Button
        title="Back to Home"
        onPress={() => router.push('/')}
        buttonStyle={styles.button}
        accessibilityLabel="Back to Home"
        accessibilityHint="Navigates back to the Marketplace home screen"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 16,
  },
  text: {
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
  button: {
    marginTop: 16,
  },
});
