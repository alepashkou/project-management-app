import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { ProfilePageComponent } from './users/pages/profile-page/profile-page.component';
import { SignUpPageComponent } from './auth/pages/sign-up-page/sign-up-page.component';

const routes: Routes = [{
  path: 'board', loadChildren: () => import('./boards/boards.module')
    .then((m) => m.BoardsModule),
},
{
  path: 'login',
  component: LoginPageComponent,
},
{
  path: 'signup',
  component: SignUpPageComponent,
},
{
  path: 'profile',
  component: ProfilePageComponent,
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
