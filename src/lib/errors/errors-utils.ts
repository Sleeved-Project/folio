import { ApiError } from '../client/http-client';

/**
 * Extrait un message d'erreur utilisable à partir de différents types d'erreurs
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError || error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
}
