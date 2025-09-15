import { Stack } from 'expo-router';
import { useTheme } from '../../theme/useTheme';

export default function MarketplaceLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
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
        name="ad/[adId]"
        options={{
          title: 'Ad Details',
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
    </Stack>
  );
}
