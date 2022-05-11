import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

  constructor(private store: Store) { }

}
