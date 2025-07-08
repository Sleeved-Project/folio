import { Stack } from 'expo-router';
import { useTheme } from '../../theme/useTheme';

export default function FilterLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        contentStyle: {
          backgroundColor: theme.colors.background.primary,
        },
      }}
    >
      <Stack.Screen name="filter-detail" />
    </Stack>
  );
}
