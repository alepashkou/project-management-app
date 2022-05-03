import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectParseToken } from '../../../auth/store/auth.selectors';
import { loadCurrentUser, updateUser } from '../../store/users.actions';
import { selectActiveUser } from '../../store/users.selectors';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {

  token$ = this.store.select(selectParseToken);
  user$ = this.store.select(selectActiveUser);
  constructor(private store: Store) {
    this.store.dispatch(loadCurrentUser())
  }

  updateProfile() {
  }
}
