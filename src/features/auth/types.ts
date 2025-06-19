export interface User {
  id: string;
  email: string;
  name?: string;
  fullName?: string;
  isVerified: number;
}

export interface AuthResponse {
  token?: string;
  user: User;
  type?: string;
  requiresVerification?: boolean;
  message?: string;
  status?: boolean;
}

export interface SignupPayload {
  email: string;
  password: string;
  name?: string;
}

export interface SigninPayload {
  email: string;
  password: string;
}

export enum AuthErrorCode {
  EMAIL_NOT_VERIFIED = 'E_EMAIL_NOT_VERIFIED',
  INVALID_VERIFICATION_CODE = 'E_INVALID_VERIFICATION_CODE',
}

export interface AuthError {
  code: string;
  message: string;
  status: number;
}
