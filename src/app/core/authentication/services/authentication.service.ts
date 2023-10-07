import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay, tap, throwError } from 'rxjs';
import { LoginRequest, LoginResponse, RefreshJwtRequest, RefreshJwtResponse, RegisterRequest, RegisterResponse } from '../models/authentication.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {}

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/auth/login', loginRequest)
      .pipe(
        tap(res => {
          let jwt = res.jwt
          let refreshToken = res.refreshToken;
          if (jwt && refreshToken) {
            this.saveAuthorizationData(jwt, refreshToken);
          } else {
            throw Error('Token is not present')
          }
        }),
        shareReplay());
  }

  logout(): Observable<void> {
    return this.http.post<void>('/api/auth/logout', null)
      .pipe(
        tap(() => this.removeAuthorizationData()),
        shareReplay()
      );
  }

  register(registerRequest: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>('/api/auth/register', registerRequest);
  }

  isAuthenticated(): boolean {
    return this.getJwt() != null;
  }

  getJwt(): string | null {
    return localStorage.getItem('jwt');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  removeAuthorizationData() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('refreshToken');
  }

  saveAuthorizationData(jwt: string, refreshToken: string) {
    localStorage.setItem('jwt', jwt);
    localStorage.setItem('refreshToken', refreshToken);
  }

  refreshJwt(): Observable<RefreshJwtResponse> {
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      return throwError(() => new Error('Refresh token is available'));
    }

    const request: RefreshJwtRequest = {
      refreshToken: refreshToken
    }

    return this.http.post<RefreshJwtResponse>('/api/auth/refresh-jwt', request)
      .pipe(tap(res => {
        this.saveAuthorizationData(res.jwt, res.refreshToken);
      }));
  }
}
