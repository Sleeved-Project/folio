import { config } from '../../config';
import { authUtils, TOKEN_KEY } from '../../features/auth/utils/auth-utils';
import { secureStorage } from '../storage/secure-storage';
import { type FetchOptions, type ApiType, ApiError, ExtendedError } from './types';

const NON_REFRESHABLE_ENDPOINTS = ['/refresh-token', '/login', '/register', '/signup'];

// Queue for storing refresh token requests
let isRefreshing = false;
let refreshQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: Error) => void;
}> = [];

// Process the refresh token queue
const processQueue = (error: Error | null, newToken: string | null = null) => {
  if (refreshQueue.length === 0) return;

  if (error) {
    refreshQueue.forEach((promise) => promise.reject(error));
    refreshQueue = [];
    return;
  }

  if (newToken) {
    refreshQueue.forEach((promise) => promise.resolve(newToken));
  }

  refreshQueue = [];
};

const getApiBaseUrl = (apiType: ApiType = 'global'): string => {
  switch (apiType) {
    case 'auth':
      return config.API_WARDEN_BASE_URL;
    case 'global':
      return config.API_ATLAS_BASE_URL;
    default:
      return config.API_ATLAS_BASE_URL;
  }
};

// Refresh the token with the stored refresh token
const refreshToken = async (): Promise<string> => {
  const refreshToken = await authUtils.getRefreshToken();
  if (!refreshToken) throw new Error('Refresh token not available');

  const response = await fetch(`${getApiBaseUrl('auth')}/refresh-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) throw new Error('Failed to refresh token');

  const data = await response.json();
  await authUtils.setToken(data.token);
  await authUtils.setRefreshToken(data.refreshToken);

  return data.token;
};

const createHttpClient = () => {
  const request = async <T>(
    endpoint: string,
    { body, headers, responseType, apiType = 'global', ...options }: FetchOptions = {}
  ): Promise<T> => {
    const executeRequest = async (customToken?: string): Promise<T> => {
      const defaultHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      const token = customToken || (await secureStorage.getItemAsync(TOKEN_KEY));
      if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
      }

      const isFormData = body instanceof FormData;
      const finalHeaders = isFormData
        ? { ...headers, ...(token ? { Authorization: `Bearer ${token}` } : {}) }
        : { ...defaultHeaders, ...headers };

      const baseUrl = getApiBaseUrl(apiType);
      const response = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        headers: finalHeaders,
        body: isFormData ? body : body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        try {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();

            // Gestion of 401 errors - attempt to refresh the token
            if (
              response.status === 401 &&
              !NON_REFRESHABLE_ENDPOINTS.some((nonRefreshableEndpoint) =>
                endpoint.endsWith(nonRefreshableEndpoint)
              )
            ) {
              // if already refreshing, add this request to the queue
              if (isRefreshing) {
                return new Promise<T>((resolve, reject) => {
                  refreshQueue.push({
                    resolve: (token) => {
                      executeRequest(token).then(resolve).catch(reject);
                    },
                    reject,
                  });
                });
              }

              isRefreshing = true;

              try {
                // Attempt to refresh the token
                const newToken = await refreshToken();
                isRefreshing = false;

                // Process the queue with the new token
                processQueue(null, newToken);

                // Retry the original request with the new token
                return executeRequest(newToken);
              } catch {
                isRefreshing = false;

                // Clear tokens and fail all pending requests
                await authUtils.clearTokens();

                // Notify all pending requests of the error
                processQueue(new Error('Token refresh failed'));

                // Trigger logout at the app level
                throw new Error('Session expired. Please login again.');
              }
            }

            // If the error data has a specific structure (e.g., code and message)
            if (errorData.code && errorData.message) {
              const apiError = new ApiError({
                error: errorData.code,
                message: errorData.message,
              });

              apiError.rawData = errorData;

              throw apiError;
            }

            // If the error data has a different structure (e.g., error and message)
            if (errorData.error && errorData.message) {
              throw new ApiError(errorData);
            }

            // If the error data is not in the expected format, throw a generic error
            const genericError = new Error(JSON.stringify(errorData)) as ExtendedError;
            genericError.rawData = errorData;
            throw genericError;
          }

          const errorMessage = await response.text();
          throw new Error(errorMessage || `Request failed with status ${response.status}`);
        } catch (error) {
          if (error instanceof ApiError) {
            throw error;
          }

          throw new Error(
            error instanceof Error ? error.message : `Request failed with status ${response.status}`
          );
        }
      }

      if (responseType === 'blob') {
        return response.blob() as Promise<T>;
      }

      return response.json();
    };

    return executeRequest();
  };

  return {
    get: <T>(endpoint: string, options?: Omit<FetchOptions, 'body'>) =>
      request<T>(endpoint, { ...options, method: 'GET' }),
    getBlob: (endpoint: string, options?: Omit<FetchOptions, 'body'>) =>
      request<Blob>(endpoint, {
        ...options,
        method: 'GET',
        responseType: 'blob',
      }),
    post: <T>(endpoint: string, body: unknown, options?: FetchOptions) =>
      request<T>(endpoint, { ...options, method: 'POST', body }),
    patch: <T>(endpoint: string, body: unknown, options?: FetchOptions) =>
      request<T>(endpoint, { ...options, method: 'PATCH', body }),
    put: <T>(endpoint: string, body: unknown, options?: FetchOptions) =>
      request<T>(endpoint, { ...options, method: 'PUT', body }),
    delete: <T>(endpoint: string, options?: FetchOptions) =>
      request<T>(endpoint, { ...options, method: 'DELETE' }),
  };
};

export const httpClient = createHttpClient();
