export interface LoginRequest {
  email?: string | null,
  password?: string | null
}

export interface LoginResponse {
  jwt: string,
  refreshToken: string
}

export interface RegisterRequest {
  email?: string | null,
  password?: string | null
}

export interface RegisterResponse {
  error?: string
}

export interface RefreshJwtRequest {
  refreshToken: string
}

export interface RefreshJwtResponse {
  jwt: string,
  refreshToken: string
}