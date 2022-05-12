import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/services/auth.guard';
import { PageNotFoundComponent } from './core/pages/page-not-found/page-not-found.component';
import { WelcomePageComponent } from './core/pages/welcome-page/welcome-page.component';
import { ProfilePageComponent } from './users/pages/profile-page/profile-page.component';

const routes: Routes = [{
  path: 'boards', loadChildren: () => import('./boards/boards.module')
    .then((m) => m.BoardsModule),
  canActivate: [AuthGuard],
  data: { animation: 'boards' },
},
{
  path: 'auth', loadChildren: () => import('./auth/auth.module')
    .then((m) => m.AuthModule),
    data: { animation: 'auth' },
},
{
  path: '',
  component: WelcomePageComponent,
},
{
  path: 'profile',
  component: ProfilePageComponent,
  canActivate: [AuthGuard],
  data: { animation: 'profile' },
},
{
  path: '**',
  component: PageNotFoundComponent,
  data: { animation: '404' },
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
