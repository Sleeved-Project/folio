import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useRouter, SplashScreen } from 'expo-router';
import { httpClient } from '../../../lib/client/http-client';
import { getErrorMessage } from '../../../lib/errors/errors-utils';
import { authUtils } from '../utils/auth-utils';
import { useSignin } from '../hooks/mutations/useSignin';
import { useSignup } from '../hooks/mutations/useSignup';
import { useCurrentUser } from '../hooks/queries/useCurrentUser';
import { AuthErrorCode, User } from '../types';
import { ApiError } from '../../../lib/client/types';

// Prevent auto-hiding of splash screen
SplashScreen.preventAutoHideAsync().catch(() => {
  console.error('SplashScreen.preventAutoHideAsync() failed');
});

export interface SigninResult {
  success: boolean;
}

export interface SignupResult {
  success: boolean;
  requiresVerification?: boolean;
  email?: string;
}

/**
 * Authentication context interface with computed auth states
 */
interface AuthContextType {
  // Authentication data
  user: User | null;

  // Authentication status flags
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  pendingVerificationEmail: string | null;

  // Computed navigation states
  isFullyAuthenticated: boolean;
  needsVerification: boolean;

  // Authentication methods
  signup: (email: string, password: string, name?: string) => Promise<SignupResult>;
  signin: (email: string, password: string) => Promise<SigninResult>;
  logout: () => Promise<void>;

  // State management
  setPendingVerificationEmail: (email: string | null) => void;
  setToken: (token: string) => Promise<void>;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Authentication Provider component with integrated splash screen management
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [initialLoadComplete, setInitialLoadComplete] = useState<boolean>(false);
  const [pendingVerificationEmail, setPendingVerificationEmail] = useState<string | null>(null);

  // API hooks
  const { mutateAsync: signinMutation, isPending: isSigninLoading } = useSignin();
  const { mutateAsync: signupMutation, isPending: isSignupLoading } = useSignup();
  const { data: user, isLoading: isUserLoading } = useCurrentUser();

  // Computed auth states used for routing decisions
  const needsVerification = !!pendingVerificationEmail;
  const isFullyAuthenticated = isAuthenticated && !needsVerification;

  // Loading state across all auth operations
  const isLoading = isUserLoading || !initialLoadComplete || isSigninLoading || isSignupLoading;

  // Verify token on startup and manage splash screen
  useEffect(() => {
    const verifyAuthentication = async () => {
      try {
        const hasToken = await authUtils.isAuthenticated();

        if (hasToken) {
          try {
            await httpClient.get('/me', { apiType: 'auth' });
            setIsAuthenticated(true);
          } catch {
            await authUtils.removeToken();
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      } finally {
        setInitialLoadComplete(true);
      }
    };

    verifyAuthentication();
  }, []);

  /**
   * Sign in user with email and password
   * @param email User's email
   * @param password User's password
   * @returns Promise with sign-in result
   */
  const signin = useCallback(
    async (email: string, password: string) => {
      setError(null);
      try {
        const response = await signinMutation({ email, password });

        if (response && response.token) {
          await authUtils.setToken(response.token);
          setIsAuthenticated(true);
          return { success: true };
        } else {
          throw new Error('No authentication token received');
        }
      } catch (err: unknown) {
        if (err instanceof ApiError && err.code === AuthErrorCode.EMAIL_NOT_VERIFIED) {
          setPendingVerificationEmail(email);
          router.replace({
            pathname: '/verify-email',
            params: { email },
          });
        }
        setError(getErrorMessage(err));
        throw err;
      }
    },
    [signinMutation]
  );

  /**
   * Register a new user
   * @param email User's email
   * @param password User's password
   * @param name Optional user's name
   * @returns Promise with registration result
   */
  const signup = async (email: string, password: string, name?: string) => {
    try {
      const response = await signupMutation({ email, password, name });

      if (response.requiresVerification) {
        setPendingVerificationEmail(email);
        return { success: true, requiresVerification: true, email };
      }

      if (response.token) {
        await authUtils.setToken(response.token);
        setIsAuthenticated(true);
      }

      return { success: true };
    } catch (err) {
      setError(getErrorMessage(err));
      throw err;
    }
  };

  /**
   * Log out the current user
   */
  const logout = async () => {
    try {
      await authUtils.removeToken();
      setIsAuthenticated(false);
      setError(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  /**
   * Helper to set authentication token
   * @param token Authentication token
   */
  const setToken = async (token: string) => {
    await authUtils.setToken(token);
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isLoading,
        isAuthenticated,
        error,
        pendingVerificationEmail,
        isFullyAuthenticated,
        needsVerification,
        signin,
        signup,
        logout,
        setPendingVerificationEmail,
        setToken,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook to access authentication context
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
