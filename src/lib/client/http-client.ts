import { config } from '../../config';
import { TOKEN_KEY } from '../../constants';
import { secureStorage } from '../storage/secure-storage';

import { type FetchOptions, type ApiType, ApiError, ApiErrorResponse } from './types';

const getApiBaseUrl = (apiType: ApiType = 'global'): string => {
  switch (apiType) {
    case 'auth':
      return config.API_WARDEN_BASE_URL;
    case 'global':
      return config.API_ATLAS_BASE_URL;
    // add other URL API if needed here
    default:
      return config.API_ATLAS_BASE_URL;
  }
};

const createHttpClient = () => {
  const request = async <T>(
    endpoint: string,
    { body, headers, responseType, apiType = 'global', ...options }: FetchOptions = {}
  ): Promise<T> => {
    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const token = await secureStorage.getItemAsync(TOKEN_KEY);
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
          const errorData = (await response.json()) as ApiErrorResponse;

          if (errorData.error && errorData.message) {
            throw new ApiError(errorData);
          }

          throw new Error(JSON.stringify(errorData));
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
    put: <T>(endpoint: string, body: unknown, options?: FetchOptions) =>
      request<T>(endpoint, { ...options, method: 'PUT', body }),
    delete: <T>(endpoint: string, options?: FetchOptions) =>
      request<T>(endpoint, { ...options, method: 'DELETE' }),
  };
};

export const httpClient = createHttpClient();
