import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs';
import { selectCurrentUserId } from 'src/app/auth/store/auth.selectors';
import { isNotNull } from 'src/app/core/utils';
import { UsersService } from '../services/users.service';
import { loadCurrentUser, loadUserSuccess } from './users.actions';

@Injectable({
  providedIn: 'root',
})

export class UsersEffects {
  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private matSnackBar: MatSnackBar,
    private router: Router,
    private store: Store,
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
}
