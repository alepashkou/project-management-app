import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs';
import { selectCurrentUserId } from 'src/app/auth/store/auth.selectors';
import { isNotNull } from 'src/app/core/utils';
import { UsersService } from '../services/users.service';
import { loadCurrentUser, loadUserSuccess, updateUser, updateUserSuccess } from './users.actions';

@Injectable({
  providedIn: 'root',
})

export class UsersEffects {
  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private store: Store,
    private matSnackBar: MatSnackBar
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
          map(() => updateUserSuccess({ updateUser: action.updateUser }))
        )
      }),
      tap(() => {
        this.matSnackBar.open('👍 Your profile is updated', 'Hide', {
          duration: 5000
        })
      })
    )
  })

  loadUserInfo$ = createEffect(() => {
    return this.store.select(selectCurrentUserId).pipe(filter(isNotNull),
      switchMap((userId: string) => {
        return this.usersService.getUserById(userId).pipe(
          map((result) => loadUserSuccess({ userInfo: result })),
        )
      }));
  })
} 
