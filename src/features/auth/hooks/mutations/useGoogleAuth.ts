import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Platform, Alert } from 'react-native';
import { httpClient } from '../../../../lib/client/http-client';
import { useAuth } from '../../context/AuthContext';
import { userKeys } from '../queries/useCurrentUser';

// Terminer correctement la session de navigateur
WebBrowser.maybeCompleteAuthSession();

// Configuration depuis les variables d'environnement
const IOS_CLIENT_ID = '13152193692-1ag8ocrbf7g5p1cl2uif0cdtpeqs6llh.apps.googleusercontent.com';
const IOS_REDIRECT_SCHEME =
  'com.googleusercontent.apps.13152193692-1ag8ocrbf7g5p1cl2uif0cdtpeqs6llh';

export function useGoogleAuth() {
  const queryClient = useQueryClient();

  const { setIsAuthenticated, setToken } = useAuth();

  // Configuration de l'authentification Google avec PKCE
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: IOS_CLIENT_ID,
    redirectUri: Platform.OS === 'ios' ? `${IOS_REDIRECT_SCHEME}:/oauth2redirect` : undefined,
    usePKCE: true, // Activer le flux PKCE
    shouldAutoExchangeCode: false, // On gère l'échange manuellement
    scopes: ['profile', 'email'],
  });

  // Mutation pour échanger le token ou code avec notre backend
  const { mutateAsync: exchangeTokenWithBackend, isPending } = useMutation({
    mutationFn: async ({
      idToken,
      code,
      codeVerifier,
    }: {
      idToken?: string;
      code?: string;
      codeVerifier?: string;
    }) => {
      try {
        // Construire le payload en fonction de ce qu'on a obtenu
        const payload: Record<string, string> = {};
        if (idToken) payload['idToken'] = idToken;
        if (code) payload['code'] = code;
        if (codeVerifier) payload['codeVerifier'] = codeVerifier;

        // Appel à notre backend
        const response = await httpClient.post('/google/exchange-token', payload, {
          apiType: 'auth',
        });

        return response;
      } catch (error) {
        console.error("Erreur lors de l'échange avec le backend:", error);
        throw error;
      }
    },
    onSuccess: async (response) => {
      console.log('Authentification réussie avec le backend yeah', response);
      console.log('response token:', response.token);

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

  const signInWithGoogle = useCallback(async () => {
    if (!request) {
      console.error("La requête d'authentification n'est pas prête");
      return false;
    }

    // Afficher le code verifier pour debug
    console.log(
      'Code verifier disponible:',
      !!request.codeVerifier,
      request.codeVerifier ? `Longueur: ${request.codeVerifier.length}` : ''
    );

    try {
      console.log("Lancement de l'authentification Google...");
      const result = await promptAsync();

      console.log("Résultat de l'authentification:", {
        type: result.type,
        hasIdToken: !!result.authentication?.idToken,
        hasCode: !!result.params?.code,
      });

      if (result.type === 'success') {
        // Cas 1: ID token disponible directement
        if (result.authentication?.idToken) {
          console.log('ID token obtenu directement');
          return await exchangeTokenWithBackend({
            idToken: result.authentication.idToken,
          });
        }
        // Cas 2: Code d'autorisation disponible (cas mobile le plus courant)
        else if (result.params?.code) {
          console.log("Code d'autorisation obtenu avec PKCE");

          // IMPORTANT: Transmettre le codeVerifier avec le code d'autorisation
          return await exchangeTokenWithBackend({
            code: result.params.code,
            codeVerifier: request.codeVerifier, // Élément crucial pour PKCE
          });
        }
        // Aucune donnée d'authentification valide
        else {
          console.error("Authentification réussie mais aucune donnée d'identification reçue");
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
        console.error("Échec de l'authentification:", result);
        Alert.alert(
          "Erreur d'authentification",
          "Une erreur est survenue lors de l'authentification Google."
        );
        return false;
      }
    } catch (error) {
      console.error("Erreur lors de l'authentification Google:", error);
      Alert.alert(
        "Erreur d'authentification",
        "Une erreur inattendue s'est produite. Veuillez réessayer."
      );
      return false;
    }
  }, [request, promptAsync, exchangeTokenWithBackend]);

  return {
    signInWithGoogle,
    isLoading: !request || isPending,
  };
}
