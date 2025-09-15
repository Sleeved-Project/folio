import 'react-native-reanimated';
import { Stack } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/query/query-client';
import { AuthProvider } from '../features/auth/context/AuthContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LogBox, StyleSheet } from 'react-native';
import { useAuth } from '../features/auth/context/AuthContext';
import { ToasterProvider } from '../components/ui/ToasterProvider';
import { FilterProvider } from '../context/FilterContext';
import { ScanProvider } from '../features/scan/context/ScanContext';
import { StripeProvider } from '@stripe/stripe-react-native';
import { useFetchPublishableKey } from '../features/payment/hooks/queries/useFetchPublishableKey';
import { LoadingScreen } from '../components/ui/LoadingScreen';

function AppNavigator() {
  const { isFullyAuthenticated } = useAuth();
  const { data: stripeData, isLoading: isStripeDataLoading } = useFetchPublishableKey();

  if (isStripeDataLoading || !stripeData) {
    return <LoadingScreen />;
  }

  return (
    <StripeProvider
      publishableKey={stripeData.publishableKey}
      urlScheme="folio://marketplace/"
      setReturnUrlSchemeOnAndroid={true}
    >
      <Stack screenOptions={{ headerShown: false }}>
        {/* Root route - handles automatic redirections */}
        <Stack.Screen name="index" />

        {/* Verification route - accessible if email needs verification */}
        <Stack.Screen name="verify-email" />

        {/* Protected routes - only accessible if authenticated and verified */}
        <Stack.Protected guard={isFullyAuthenticated}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(scan)" />
          <Stack.Screen name="(marketplace)" />
          <Stack.Screen
            name="filter-detail"
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
        </Stack.Protected>

        {/* Auth routes - only accessible when not authenticated or pending verification */}
        <Stack.Protected guard={!isFullyAuthenticated}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>
      </Stack>
    </StripeProvider>
  );
}

export default function RootLayout() {
  LogBox.ignoreAllLogs(true);

  return (
    <GestureHandlerRootView style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ToasterProvider>
            <ScanProvider>
              <FilterProvider>
                <AppNavigator />
              </FilterProvider>
            </ScanProvider>
          </ToasterProvider>
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
