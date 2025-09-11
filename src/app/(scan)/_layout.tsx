import { Stack } from 'expo-router';
import { useTheme } from '../../theme/useTheme';

export default function ScanLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: {
          backgroundColor: theme.colors.background.primary,
        },
      }}
    >
      <Stack.Screen name="scan" />
      <Stack.Screen name="scan-result" />
      <Stack.Screen name="additional-results" />
      <Stack.Screen name="scan-identify" />
    </Stack>
  );
}
