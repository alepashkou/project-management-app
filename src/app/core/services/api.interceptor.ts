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

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private router:Router){}
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
          if (err.status === 401) {
            this.router.navigate(['auth', 'login'])
          }
        }
        return throwError(() => err);
      })
    );
  }
}
