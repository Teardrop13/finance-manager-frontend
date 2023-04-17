import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationInterceptorService implements HttpInterceptor {
  constructor(private authentication: AuthenticationService,
    private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token = this.authentication.getToken()

    if (token) {
      request = request.clone({ headers: request.headers.set('authorization', token) });
    }
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if ([HttpStatusCode.Unauthorized,
          HttpStatusCode.GatewayTimeout].includes(error.status)) {

            this.authentication.removeToken()
            this.router.navigateByUrl('/login');
          }
        }
        return throwError(() => error);
      })
    );
  }
}