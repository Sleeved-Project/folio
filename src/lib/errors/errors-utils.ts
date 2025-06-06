import { ApiError } from '../client/types';

/**
 * Extracts a user-friendly error message from an error object.
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError || error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
}
