import { Stack } from 'expo-router';

export default function ScanLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="scan-result" />
      <Stack.Screen name="additional-results" />
    </Stack>
  );
}
