import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private router:Router, private matSnackBar: MatSnackBar){}
  private readonly baseUrl = 'https://management-app-team7.herokuapp.com/';

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const userToken = localStorage.getItem('token');
    const clonedRequest = request.clone({
      headers: request.headers.set(
        'Authorization',
        userToken ? `Bearer ${userToken}` : ''
      ),
      url: this.baseUrl + request.url,
    });
    return next.handle(clonedRequest).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          let message = '';
          if (err.status === 400) {
            message = 'Bad request'
          }
          if (err.status === 401) {
            message = 'Not authorized'
            this.router.navigate(['auth', 'login'])
          }
          if (err.status === 404) {
            message = 'Not found'
          }
          if (err.status === 500) {
            message = 'Internal server error'
          }
          if (err.status === 502) {
            message = 'Bad Gateway'
          }
          if (err.status === 503) {
            message = 'Service Unavailable'
          }
          if (err.status === 505) {
            message = 'HTTP Version Not Supported'
          }
          this.matSnackBar.open(message, 'Hide', {
            duration: 5000
          })
        }
        return throwError(() => err);
      })
    );
  }
}
