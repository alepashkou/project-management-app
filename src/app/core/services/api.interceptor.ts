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
          const language = localStorage.getItem('language');
          const button = language === 'en' ? 'Hide' : 'Скрыть';
          let message = '';
          if (err.status === 400) {
            language === 'en' 
            ? message = 'Bad request' 
            : message = 'Плохой запрос';
          }
          if (err.status === 401) {
            language === 'en' 
            ? message = 'Not authorized' 
            : message = 'Не авторизован';
            this.router.navigate(['auth', 'login'])
          }
          if (err.status === 404) {
            language === 'en' 
            ? message = 'Not found'
            : message = 'Не найден';
          }
          if (err.status === 500) {
            language === 'en' 
            ? message = 'Internal server error'
            : message = 'Внутренняя ошибка сервера';
          }
          if (err.status === 502) {
            language === 'en' 
            ? message = 'Bad Gateway'
            : message = 'Плохой провайдер';
          }
          if (err.status === 503) {
            language === 'en' 
            ? message = 'Service Unavailable'
            : message = 'Не доступно';
          }
          if (err.status === 505) {
            language === 'en' 
            ? message = 'HTTP Version Not Supported'
            : message = 'Не поддерживаемая версия HTTP';
          }
          this.matSnackBar.open(message, button, {
            duration: 5000
          })
        }
        return throwError(() => err);
      })
    );
  }
}
