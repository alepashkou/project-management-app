import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { passwordDifficulty } from 'src/app/auth/pages/sign-up-page/sign-up-page.component';
import { deleteUserSuccess } from 'src/app/auth/store/auth.actions';
import { DialogComponent } from 'src/app/core/dialog/dialog.component';
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
    private service: UsersService,
    private matSnackBar: MatSnackBar,
    public dialog: MatDialog,
    private usersService: UsersService) {
    this.store.dispatch(loadCurrentUser())
    this.user$.subscribe((user) => {
      if (user) {
        this.profileForm.setValue({
          name: user.name,
          login: user.login,
          password: '',
          passwordRepeat: ''
        })
      }
    })
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
    ]),
    passwordRepeat: new FormControl('', [
      Validators.required,
      (passwordRepeatForm) => {
        if (passwordRepeatForm.value !== this.profileForm?.value.password) {
          return { notMatch: localStorage.getItem('language') === 'en' ? 'Passwords do not match' : '???????????? ???? ??????????????????' }
        }
        return null
      }
    ])
  })

  editProfile() {
    if (this.profileForm.valid) {
      this.store.dispatch(updateUser({ updateUser: this.profileForm.value }))
    }
  }

  async deleteUser() {
    const result = await firstValueFrom(this.store.select(selectCurrentUserId));
    if (result) {
      await firstValueFrom(this.service.deleteUser(result))
      this.store.dispatch(deleteUserSuccess())
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        message: localStorage.getItem('language') === 'en' 
          ? 'Are you sure you want to delete your account?' 
          : '???? ?????????????????????????? ???????????? ?????????????? ?????? ???????????????',
        confirmButtonText: localStorage.getItem('language') === 'en' 
          ? 'Delete' 
          : '??????????????',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser()
      }
    });
  }
}
