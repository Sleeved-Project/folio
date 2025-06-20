import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Platform, Alert } from 'react-native';
import { httpClient } from '../../../../lib/client/http-client';
import { useAuth } from '../../context/AuthContext';
import { userKeys } from '../queries/useCurrentUser';
import { config } from '../../../../config';

// Terminer correctement la session de navigateur
WebBrowser.maybeCompleteAuthSession();

const IOS_CLIENT_ID = config.GOOGLE_CLIENT_ID.ios;
const IOS_REDIRECT_SCHEME = config.GOOGLE_REDIRECT_SCHEMA.ios;

/**
 * Hook pour l'authentification avec Google (iOS et Android uniquement)
 */
export function useGoogleAuth() {
  const queryClient = useQueryClient();
  const { setIsAuthenticated, setToken } = useAuth();

  // Configuration de l'authentification Google avec PKCE
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: IOS_CLIENT_ID,
    redirectUri: Platform.OS === 'ios' ? `${IOS_REDIRECT_SCHEME}:/oauth2redirect` : undefined,
    usePKCE: true, // Activation of PKCE for enhanced security
    shouldAutoExchangeCode: false, // we handle this manually
    scopes: ['profile', 'email'],
  });

  // Mutation pour échanger avec notre backend
  const { mutateAsync: exchangeTokenWithBackend, isPending } = useMutation({
    mutationFn: async (authData: { idToken?: string; code?: string; codeVerifier?: string }) => {
      try {
        const response = await httpClient.post('/google/exchange-token', authData, {
          apiType: 'auth',
        });
        return response;
      } catch (error) {
        console.error("Erreur lors de l'échange avec le backend:", error);
        throw error;
      }
    },
    onSuccess: async (response) => {
      if (response.token) {
        await setToken(response.token);
        setIsAuthenticated(true);
      }

      if (response.user) {
        queryClient.setQueryData(userKeys.currentUser(), response.user);
        return true;
      }
      return false;
    },
    onError: (error) => {
      console.error("Échec de l'authentification avec le backend:", error);
      Alert.alert(
        "Erreur d'authentification",
        'Impossible de vous connecter avec Google. Veuillez réessayer.'
      );
      return false;
    },
  });

  /**
   * Déclenche le flux d'authentification Google
   */
  const signInWithGoogle = useCallback(async () => {
    if (!request) {
      console.error("La requête d'authentification n'est pas prête");
      return false;
    }

    try {
      console.log("Lancement de l'authentification Google...");
      const result = await promptAsync();

      if (result.type === 'success') {
        // Cas 1: ID token disponible directement
        if (result.authentication?.idToken) {
          return await exchangeTokenWithBackend({
            idToken: result.authentication.idToken,
          });
        }
        // Cas 2: Code d'autorisation disponible (cas le plus courant sur mobile)
        else if (result.params?.code) {
          // Le codeVerifier est nécessaire pour l'échange du code
          if (!request.codeVerifier) {
            throw new Error("Code verifier manquant pour l'échange du code d'autorisation");
          }

          return await exchangeTokenWithBackend({
            code: result.params.code,
            codeVerifier: request.codeVerifier,
          });
        }
        // Aucune donnée d'authentification valide
        else {
          Alert.alert(
            "Erreur d'authentification",
            "L'authentification Google a réussi mais aucune donnée valide n'a été reçue."
          );
          return false;
        }
      } else if (result.type === 'cancel') {
        console.log("Authentification annulée par l'utilisateur");
        return false;
      } else {
        Alert.alert(
          "Erreur d'authentification",
          "Une erreur est survenue lors de l'authentification Google."
        );
        return false;
      }
    } catch (error) {
      console.error("Erreur lors de l'authentification Google:", error);
      Alert.alert("Erreur d'authentification", "Une erreur inattendue s'est produite.");
      return false;
    }
  }, [request, promptAsync, exchangeTokenWithBackend]);

  return {
    signInWithGoogle,
    isLoading: !request || isPending,
  };
}
