import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/services/auth.guard';
import { ProfilePageComponent } from './users/pages/profile-page/profile-page.component';

const routes: Routes = [{
  path: 'boards', loadChildren: () => import('./boards/boards.module')
    .then((m) => m.BoardsModule),
  canActivate: [AuthGuard],
},
{
  path: 'auth', loadChildren: () => import('./auth/auth.module')
    .then((m) => m.AuthModule),
},
{
  path: 'profile',
  component: ProfilePageComponent,
  canActivate: [AuthGuard],
},
{
  path: '**',
  redirectTo: 'boards',
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
