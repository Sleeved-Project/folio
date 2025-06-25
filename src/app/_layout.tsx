import 'react-native-reanimated';
import { Stack } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/query/query-client';
import { AuthProvider } from '../features/auth/context/AuthContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { useAuth } from '../features/auth/context/AuthContext';

function AppNavigator() {
  const { isFullyAuthenticated } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Root route - handles automatic redirections */}
      <Stack.Screen name="index" />

      {/* Verification route - accessible if email needs verification */}
      <Stack.Screen name="verify-email" />

      {/* Protected routes - only accessible if authenticated and verified */}
      <Stack.Protected guard={isFullyAuthenticated}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(scan)" />
      </Stack.Protected>

      {/* Auth routes - only accessible when not authenticated or pending verification */}
      <Stack.Protected guard={!isFullyAuthenticated}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
