import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay, tap } from 'rxjs';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../models/authentication.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {}

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/auth/login', loginRequest)
      .pipe(
        tap(res => {
          let token = res.sessionId
          if (token) {
            this.saveToken(token);
          } else {
            throw Error('Token is not present')
          }
        }),
        shareReplay());
  }

  logout(): Observable<void> {
    return this.http.post<void>('/api/auth/logout', null)
      .pipe(
        tap(() => this.removeToken()),
        shareReplay()
      );
  }

  register(registerRequest: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>('/api/auth/register', registerRequest);
  }

  isAuthenticated(): boolean {
    return this.getToken() != null;
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  removeToken() {
    sessionStorage.removeItem('token');
  }

  public saveToken(token: string) {
    sessionStorage.setItem('token', token);
  }
}
