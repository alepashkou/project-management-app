import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, tap, catchError, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { login, loginError, loginSuccess } from './auth.actions';

@Injectable({
  providedIn: 'root',
})

export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private matSnackBar: MatSnackBar

  ) { }

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(login),
      switchMap(
        (action) => this.authService.signIn({ login: action.login, password: action.password }).pipe(
          map((result) => loginSuccess({
            authInfo: {
              login: action.login,
              token: result.token
            }
          })),
          catchError(() => of(loginError()))
        )
      ),

    )
  });

  showSnackbarWhenError$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginError),
      tap(() => {
        this.matSnackBar.open('The username and password were not recognized', 'Hide', {
          duration: 5000
        })
      })
    )
  }, { dispatch: false })

}