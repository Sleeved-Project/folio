export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
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
