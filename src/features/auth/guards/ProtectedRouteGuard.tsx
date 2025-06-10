import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteGuardProps {
  children: React.ReactNode;
}

export function ProtectedRouteGuard({ children }: ProtectedRouteGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  const isAuthGroup = segments[0] === '(auth)';

  useEffect(() => {
    if (isLoading) return;

    // If not authenticated and not in auth group, redirect to sign-in
    if (!isAuthenticated && !isAuthGroup) {
      return router.replace('/sign-in');
    }

    // If authenticated and in auth group, redirect to home
    if (isAuthenticated && isAuthGroup) {
      return router.replace('/(tabs)');
    }
  }, [isAuthenticated, isLoading, segments, router]);

  return children;
}
