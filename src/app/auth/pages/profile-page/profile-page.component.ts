import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectParseToken } from '../../store/auth.selectors';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {

  token$ = this.store.select(selectParseToken);
  constructor(private store: Store) { }
}
