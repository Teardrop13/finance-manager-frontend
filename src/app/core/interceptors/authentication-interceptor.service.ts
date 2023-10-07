import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { AuthenticationService } from '../authentication/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationInterceptorService implements HttpInterceptor {

  isRefreshingToken = false;
  tokenSubject = new Subject<string | null>()

  constructor(private authentication: AuthenticationService,
    private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url === '/api/auth/refresh-jwt') {
      return next.handle(request);
    }

    let jwt = this.authentication.getJwt();

    if (jwt) {
      request = this.addAuthorizationHeader(request, jwt);
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status == HttpStatusCode.Unauthorized) {
            return this.handleUnauthorized(request, next);
          } else {
            this.handleError();
          }
        }
        return throwError(() => error);
      })
    );
  }

  handleUnauthorized(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (this.isRefreshingToken == false) {
      this.isRefreshingToken = true;
      this.tokenSubject.next(null);
    
      return this.authentication.refreshJwt()
        .pipe(
          switchMap(res => {
            this.isRefreshingToken = false;
            this.tokenSubject.next(res.jwt);
            return next.handle(this.addAuthorizationHeader(request, res.jwt));
          }),
          catchError(error => {
            this.isRefreshingToken = false;
            this.handleError();
            return throwError(() => error);
          })
        )
    } else {
      return this.tokenSubject.pipe(
        filter(jwt => jwt != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addAuthorizationHeader(request, jwt!));
        })
      );
    }
  }

  handleError() {
    this.authentication.removeAuthorizationData();
    this.router.navigateByUrl('/login');

  }

  addAuthorizationHeader(request: HttpRequest<any>, jwt: string): HttpRequest<any> {
    return request.clone({ headers: request.headers.set('authorization', `Bearer ${jwt}`) });
  }
}