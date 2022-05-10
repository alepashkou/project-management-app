import { Component } from '@angular/core';
import { slideInAnimation } from './core/animations/router.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation],
})
export class AppComponent {
  title = 'project-management-app';
}
