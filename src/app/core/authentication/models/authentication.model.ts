export interface LoginRequest {
  email?: string|null,
  password?: string|null
}

export interface LoginResponse {
  sessionId?: string;
}

export interface RegisterRequest {
  email?: string|null;
  username?: string|null;
  password?: string|null;
  password2?: string|null;
}

export interface RegisterResponse {
  error?: string
}