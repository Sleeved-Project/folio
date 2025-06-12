import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useCurrentUser } from '../hooks/queries/useCurrentUser';
import { useSignin } from '../hooks/mutations/useSignin';
import { useSignup } from '../hooks/mutations/useSignup';
import { useLogout } from '../hooks/mutations/useLogout';
import { authUtils } from '../utils/auth-utils';
import { User, AuthResponse } from '../types';
import { useQueryClient } from '@tanstack/react-query';
import { getErrorMessage } from '../../../lib/errors/errors-utils';
import { config } from '../../../config';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  signup: (email: string, password: string, name?: string) => Promise<AuthResponse>;
  signin: (email: string, password: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provider component that wraps the app and makes auth object available to any
 * child component that calls useAuth().
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [authCheckComplete, setAuthCheckComplete] = useState<boolean>(false);

  const queryClient = useQueryClient();

  // React Query hooks for authentication
  const { data: user, isLoading: userLoading, refetch } = useCurrentUser();
  const { mutateAsync: signinMutation, isPending: signinLoading } = useSignin();
  const { mutateAsync: signupMutation, isPending: signupLoading } = useSignup();
  const { mutateAsync: logoutMutation, isPending: logoutLoading } = useLogout();

  // Initial authentication check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (config.IS_DEV_MODE === true) {
          setIsAuthenticated(true);
          setAuthCheckComplete(true);
          return;
        }
        const isAuth = await authUtils.isAuthenticated();
        setIsAuthenticated(isAuth);

        if (isAuth) {
          // Fetch user data if authenticated
          refetch();
        }
      } catch (err) {
        console.error('Authentication check failed', err);
      } finally {
        setAuthCheckComplete(true);
      }
    };

    checkAuth();
  }, [refetch]);

  // Update isAuthenticated when user data changes
  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    }
  }, [user]);

  /**
   * Sign in with email and password
   * Exposed to components that use the useAuth hook
   */
  const signin = useCallback(
    async (email: string, password: string) => {
      setError(null);
      try {
        const response = await signinMutation({ email, password });
        setIsAuthenticated(true);
        return response;
      } catch (err: unknown) {
        setError(getErrorMessage(err));
        throw err;
      }
    },
    [signinMutation, queryClient]
  );

  /**
   * Create a new user account with email and password
   */
  const signup = useCallback(
    async (email: string, password: string, name?: string) => {
      setError(null);
      try {
        const response = await signupMutation({ email, password, name });
        setIsAuthenticated(true);
        return response;
      } catch (err: unknown) {
        // setIsAuthenticated(false);
        setError(getErrorMessage(err));
        throw err;
      }
    },
    [signupMutation]
  );

  /**
   * Sign out and clear all authentication data
   */
  const logout = useCallback(async () => {
    try {
      await logoutMutation();
      setIsAuthenticated(false);
      queryClient.clear(); // Clear all cached data when logging out
    } catch (err: unknown) {
      setError(getErrorMessage(err));
      throw err;
    }
  }, [logoutMutation, queryClient]);

  // Combine all loading states for a single isLoading flag
  const isLoading =
    userLoading || signinLoading || signupLoading || logoutLoading || !authCheckComplete;

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        isLoading,
        isAuthenticated,
        error,
        signin,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook that simplifies access to the auth context
 * Must be used within an AuthProvider component
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
