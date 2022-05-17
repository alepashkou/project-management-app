import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, tap, catchError, of, filter, timer } from 'rxjs';
import { isNotNull } from 'src/app/core/utils';
import { UsersService } from 'src/app/users/services/users.service';
import { AuthService } from '../services/auth.service';
import { deleteUserSuccess, loadToken, login, loginError, loginSuccess, logout, signup, signupError, signupSuccess, tokenExpired } from './auth.actions';
import { selectToken, selectTokenIat } from './auth.selectors';

const TOKEN_EXPIRED = 86400_000
@Injectable({
  providedIn: 'root',
})

export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private matSnackBar: MatSnackBar,
    private router: Router,
    private store: Store,
    private usersService: UsersService
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      this.store.dispatch(loadToken({ token }));
    }
  }

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(login),
      switchMap(
        (action) => this.authService.signIn({ login: action.login, password: action.password }).pipe(
          map((result) => {
            this.usersService.updateUserLoginStatus(true);
            return loginSuccess(
              {
                authInfo: {
                  login: action.login,
                  token: result.token
                }
              })
          }),
          catchError(() => of(loginError()))
        )
      ),
    )
  });

  showSnackbarWhenError$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginError, signupError),
      tap((action) => {
        const language = localStorage.getItem('language');
        const button = language === 'en' ? 'Hide' : 'Скрыть';
        let message = '';
        if (action.type === loginError.type) {
          language === 'en'
            ? message = '❌ The username and password were not recognized'
            : message = '❌ Имя пользователя и пароль не распознаны'
        };
        if (action.type === signupError.type) {
          language === 'en'
            ? message = `❌ Impossible to create account`
            : message = '❌ Невозможно создать аккаунт'
        };
        this.matSnackBar.open(message, button, {
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
        this.router.navigate(['auth/login'])
      }))
  },
    { dispatch: false }
  )

  showSnackbarWhenSignUpSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupSuccess),
      tap(() => {
        const message = localStorage.getItem('language') === 'en' ? '👍 Congrats! You are registered! Let\'s login' : '👍 Поздравляем! Вы успешно зарегистрированы!';
        const button = localStorage.getItem('language') === 'en' ? 'Hide' : 'Скрыть';
        this.matSnackBar.open(message, button, {
          duration: 5000
        })
      })
    )
  }, { dispatch: false })

  navigateToBoardsWhenLoginSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginSuccess),
      tap(() => {
        this.router.navigate(['boards'])
      }))
  },
    { dispatch: false }
  )

  showSnackbarWhenLoginSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginSuccess),
      tap(() => {
        const message = localStorage.getItem('language') === 'en' ? '👍 You are login, let\'s start!' : '👍 Вы успешно авторизованы!';
        const button = localStorage.getItem('language') === 'en' ? 'Hide' : 'Скрыть';
        this.matSnackBar.open(message, button, {
          duration: 5000
        })
      }))
  },
    { dispatch: false }
  )

  saveTokenToLocalStorage$ = createEffect(() => {
    return this.store.select(selectToken).pipe(
      filter(isNotNull),
      tap((token) => {
        localStorage.setItem('token', token);
      })
    )
  }, { dispatch: false }
  )

  checkTokenExpiration$ = createEffect(() => {
    return this.store.select(selectTokenIat).pipe(
      filter(isNotNull),
      switchMap((iat) => {
        const now = new Date().getTime()
        const lifeTime = now - iat * 1000
        return timer(TOKEN_EXPIRED - lifeTime).pipe(
          map(() => tokenExpired()),
        )
      })
    )
  })

  deleteTokenIfExpiredAndRedirect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(tokenExpired),
      tap(() => {
        localStorage.removeItem('token')
        this.usersService.updateUserLoginStatus(false)
        this.router.navigate([''])
      }),
    )
  }, { dispatch: false })

  showSnackbarWhenTokenExpired$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(tokenExpired),
      tap(() => {
        const message = localStorage.getItem('language') === 'en' ? 'Authorization expired' : 'Cрок авторизации истек';
        const button = localStorage.getItem('language') === 'en' ? 'Hide' : 'Скрыть';
        this.matSnackBar.open(message, button, {
          duration: 5000
        })
      }))
  },
    { dispatch: false }
  )

  logoutUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(logout),
      tap(() => {
        localStorage.removeItem('token')
        this.usersService.updateUserLoginStatus(false)
        this.router.navigate([''])
      })
    )
  }, { dispatch: false })

  showSnackbarWhenUserLogout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(logout),
      tap(() => {
        const message = localStorage.getItem('language') === 'en' ? 'You are logout' : 'Вы вышли';
        const button = localStorage.getItem('language') === 'en' ? 'Hide' : 'Скрыть';
        this.matSnackBar.open(message, button, {
          duration: 5000
        })
      }))
  },
    { dispatch: false }
  )

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteUserSuccess),
      tap(() => {
        localStorage.removeItem('token')
        this.usersService.updateUserLoginStatus(false)
        this.router.navigate([''])
      })
    )
  }, { dispatch: false })

  showSnackbarWhenUserDeleted$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteUserSuccess),
      tap(() => {
        const message = localStorage.getItem('language') === 'en' ? 'User deleted' : 'Пользователь удален';
        const button = localStorage.getItem('language') === 'en' ? 'Hide' : 'Скрыть';
        this.matSnackBar.open(message, button, {
          duration: 5000
        })
      }))
  },
    { dispatch: false }
  )
}
