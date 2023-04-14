export interface LoginRequest {
  username: string,
  password: string
}

export interface LoginResponse {
  sessionId?: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
}

export interface RegisterResponse {
  error?: string
}