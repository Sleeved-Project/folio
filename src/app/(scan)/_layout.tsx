import { Stack } from 'expo-router';

export default function ScanLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="scan" />
      <Stack.Screen name="scan-result" />
      <Stack.Screen name="additional-results" />
      <Stack.Screen name="scan-identify" />
    </Stack>
  );
}
