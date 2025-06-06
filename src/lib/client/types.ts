export type ApiType = 'global' | 'auth' | 'other';

export type FetchOptions = {
  headers?: Record<string, string>;
  body?: unknown;
  responseType?: 'json' | 'blob';
  apiType?: ApiType;
} & Omit<RequestInit, 'body'>;

export interface ApiResponse<T = null> {
  status: 'success' | 'error';
  message: string;
  data?: T;
}

export interface ApiErrorResponse {
  error: string;
  message: string;
}

export class ApiError extends Error {
  error: string;

  constructor(errorResponse: ApiErrorResponse) {
    super(errorResponse.message);
    this.name = 'ApiError';
    this.error = errorResponse.error;
  }
}
