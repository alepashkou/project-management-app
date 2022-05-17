import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, filter, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { selectCurrentUserId } from 'src/app/auth/store/auth.selectors';
import { isNotNull } from 'src/app/core/utils';
import { UsersService } from '../services/users.service';
import { loadCurrentUser, loadUserSuccess, updateUser, updateUserError, updateUserSuccess } from './users.actions';

@Injectable({
  providedIn: 'root',
})

export class UsersEffects {
  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private store: Store,
    private matSnackBar: MatSnackBar,
    private router: Router
  ) { }

  loadCurrentUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadCurrentUser),
      withLatestFrom(
        this.store.select(selectCurrentUserId).pipe(filter(isNotNull))
      ),
      map(([action, userId]) => userId),
      switchMap((userId) => {
        return this.usersService.getUserById(userId).pipe(
          map((result) => loadUserSuccess({ userInfo: result })),
        )
      })
    )
  })

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateUser),
      withLatestFrom(
        this.store.select(selectCurrentUserId).pipe(filter(isNotNull))
      ),
      switchMap(([action, userId]) => {
        return this.usersService.updateUser(action.updateUser, userId).pipe(
          map(() => updateUserSuccess({ updateUser: action.updateUser })),
          catchError(() => of(updateUserError())),
        )
      }),
    )
  })

  navigateToBoardsWhenUpdateUserSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateUserSuccess),
      tap(() => {
        this.router.navigate(['boards'])
      }))
  },
    { dispatch: false }
  )

  showSnackbarWhenUpdateUserSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateUserSuccess),
      tap(() => {
        const message = localStorage.getItem('language') === 'en' ? '👍 Your profile is updated' : '👍 Ваш профиль обновлен'; 
        const button = localStorage.getItem('language') === 'en' ? 'Hide' : 'Скрыть'; 
        this.matSnackBar.open(message, button, {
          duration: 5000
        })
      }))
  },
    { dispatch: false }
  )

  loadUserInfo$ = createEffect(() => {
    return this.store.select(selectCurrentUserId).pipe(filter(isNotNull),
      switchMap((userId: string) => {
        return this.usersService.getUserById(userId).pipe(
          map((result) => loadUserSuccess({ userInfo: result })),
        )
      }));
  })

  showUpdateUserError$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateUserError),
      tap(() => {
        const message = localStorage.getItem('language') === 'en' ? '❌ Unable to update data' : '❌ Не удалось обновить данные'; 
        const button = localStorage.getItem('language') === 'en' ? 'Hide' : 'Скрыть'; 
        this.matSnackBar.open(message, button, {
          duration: 5000
        })
      })
    )
  }, { dispatch: false })
} 
