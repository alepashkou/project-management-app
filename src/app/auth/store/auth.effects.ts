import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, tap, catchError, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { login, loginError, loginSuccess, signup, signupError, signupSuccess } from './auth.actions';

@Injectable({
  providedIn: 'root',
})

export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private matSnackBar: MatSnackBar,
    private router: Router,
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
      ofType(loginError, signupError),
      tap((action) => {
        let message = '';
        if (action.type === loginError.type) {
          message = 'The username and password were not recognized'
        };
        if (action.type === signupError.type) {
          message = `Impossible to create account`
        };
        this.matSnackBar.open(message, 'Hide', {
          duration: 5000
        })
      })
    )
  }, { dispatch: false })

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signup),
      switchMap(
        (action) => {
          return this.authService.signUp({
            name: action.signupInfo.name, login: action.signupInfo.login,
            password: action.signupInfo.password
          }).pipe(
            map(() => signupSuccess()),
            catchError(() => of(signupError()))
          )
        }
      ),
    )
  })

  navigateToLoginWhenSignUpSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupSuccess),
      tap(() => {
        this.router.navigate(['login'])
      }))
  },
    { dispatch: false }
  )

  navigateToMainPageWhenLoginSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginSuccess),
      tap(() => {
        this.router.navigate(['boards'])
      }))
  },
    { dispatch: false }
  )
}
