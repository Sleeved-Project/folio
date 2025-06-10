import { Stack } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/query/query-client';
import { AuthProvider } from '../features/auth/context/AuthContext';
import { ProtectedRouteGuard } from '../features/auth/guards/ProtectedRouteGuard';

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ProtectedRouteGuard>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen
              name="(auth)"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="index"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </ProtectedRouteGuard>
      </AuthProvider>
    </QueryClientProvider>
  );
}
