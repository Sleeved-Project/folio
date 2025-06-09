import { Redirect } from 'expo-router';
import { useAuth } from '../features/auth/context/AuthContext';

export default function Index() {
  const { isAuthenticated } = useAuth();

  // Redirect to the appropriate starting route based on authentication
  return isAuthenticated ? <Redirect href="/(tabs)" /> : <Redirect href="/sign-in" />;
}
