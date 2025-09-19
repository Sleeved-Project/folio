import { Stack } from 'expo-router';
import { useTheme } from '../../theme/useTheme';

export default function MarketplaceLayout() {
  const theme = useTheme();
  return (
    <Stack>
      <Stack.Screen
        name="ad/[adId]"
        options={{
          title: 'Ad Details',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="order/[orderId]"
        options={{
          title: 'Order Details',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="order-confirmation"
        options={{
          headerShown: false,
          title: 'Order Confirmation',
        }}
      />
      <Stack.Screen
        name="purchase-recap/[adId]"
        options={{
          title: 'Checkout',
          headerBackTitle: 'Back',
          headerTintColor: theme.colors.primaryForeground,
          // headerShown: false,
        }}
      />
      <Stack.Screen
        name="seller/[sellerId]"
        options={{
          title: 'Seller profile',
          headerBackTitle: 'Back',
          headerTintColor: theme.colors.primaryForeground,
        }}
      />
    </Stack>
  );
}
