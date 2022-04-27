import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  //ПЕРЕДЕЛАТЬ ПОЛУЧЕНИЕ ТОКЕНА МБ СЕРВИС
  private readonly userToken = localStorage.getItem('token');

  private readonly baseUrl = 'https://managment-app.ddns.net/';

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const clonedRequest = request.clone({
      headers: request.headers
      .set('Authorization', this.userToken ? `Bearer ${this.userToken}` : ''),
      url: this.baseUrl + request.url
    });
    return next.handle(clonedRequest).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401){
      //ТУТ НУЖЕН РИДИРЕКТ НА ЛОГИН ЕСЛИ ОШИБКА АВТОРИЗАЦИИ
          }
        }
        return throwError(() => err);
      })
    )
  }
}
