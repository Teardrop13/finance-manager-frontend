import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../models/authentication.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,
    private router: Router) {}

  login(loginRequest: LoginRequest) {
    this.http.post<LoginResponse>('/api/auth/login', loginRequest).subscribe(
      {
        next: res => {
          let token = res.sessionId
          if (token) {
            this.saveToken(token);
            this.router.navigateByUrl('home');
          }
        },
        error: () => {
          alert("Authentication failed.");
        }
      }
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
    sessionStorage.setItem(
      'token',
      token
    );
  }
}
