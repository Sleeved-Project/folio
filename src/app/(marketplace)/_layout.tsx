import { Stack } from 'expo-router';
import { useTheme } from '../../theme/useTheme';

export default function MarketplaceLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background.primary,
        },
        headerTintColor: theme.colors.text.primary,
        contentStyle: {
          backgroundColor: theme.colors.background.primary,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Marketplace',
        }}
      />
      <Stack.Screen
        name="ad/[adId]"
        options={{
          title: 'Ad Details',
        }}
      />
      <Stack.Screen
        name="order-confirmation"
        options={{
          headerShown: false,
          title: 'Order Confirmation',
        }}
      />
    </Stack>
  );
}
