import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { passwordDifficulty } from 'src/app/auth/pages/sign-up-page/sign-up-page.component';
import { selectCurrentUserId, selectParseToken } from '../../../auth/store/auth.selectors';
import { UsersService } from '../../services/users.service';
import { loadCurrentUser, updateUser } from '../../store/users.actions';
import { selectActiveUser } from '../../store/users.selectors';

const LOGIN_MIN_LENGTH = 4;
const PASSWORD_MIN_LENGTH = 8;
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {

  token$ = this.store.select(selectParseToken);
  user$ = this.store.select(selectActiveUser);
  constructor(
    private store: Store,
    private router: Router,
    private service: UsersService,
    private matSnackBar: MatSnackBar,
    public dialog: MatDialog) {
    this.store.dispatch(loadCurrentUser())
  }

  profileForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    login: new FormControl('', [
      Validators.required,
      Validators.minLength(LOGIN_MIN_LENGTH),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(PASSWORD_MIN_LENGTH),
      passwordDifficulty,
    ])
  })

  editProfile() {
    if (this.profileForm.valid) {
      this.store.dispatch(updateUser({ updateUser: this.profileForm.value }))
      this.router.navigate(['board'])
    }
  }

  async deleteUser() {
    const result = await firstValueFrom(this.store.select(selectCurrentUserId));
    if (result) {
      await firstValueFrom(this.service.deleteUser(result))
      // localStorage.clear()
      this.router.navigate(['login'])
    }
    else {
      this.matSnackBar.open(`Something went wrong`, 'Hide', {
        duration: 5000
      })
    }
  }
}
