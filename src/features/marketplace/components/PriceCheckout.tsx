import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import { CheckoutPrice } from '../types';

export default function PriceCheckout({ price }: { price: CheckoutPrice }) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text style={{ color: theme.colors.text.secondary, fontSize: theme.typography.fontSizes.md }}>
        Shipping cost - {price.shippingCosts}
      </Text>
      <Text style={{ color: theme.colors.text.secondary, fontSize: theme.typography.fontSizes.md }}>
        Service cost - {price.serviceCosts}
      </Text>
      <Text
        style={{
          color: theme.colors.text.primary,
          fontSize: theme.typography.fontSizes.lg,
          fontWeight: theme.typography.fontWeights.bold,
        }}
      >
        Total cost - {price.totalCosts}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 12,
  },
});
