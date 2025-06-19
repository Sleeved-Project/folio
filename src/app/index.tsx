import { Redirect } from 'expo-router';
import { useAuth } from '../features/auth/context/AuthContext';
import { LoadingScreen } from '../components/ui/LoadingScreen';

export default function Index() {
  const { isLoading, isFullyAuthenticated, needsVerification, pendingVerificationEmail } =
    useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (needsVerification) {
    return (
      <Redirect
        href={{
          pathname: '/verify-email',
          params: { email: pendingVerificationEmail },
        }}
      />
    );
  }

  if (isFullyAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/sign-in" />;
}
