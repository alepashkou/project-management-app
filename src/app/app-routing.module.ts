import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'board', loadChildren: () => import('./boards/boards.module')
    .then((m) => m.BoardsModule),
},
{
  path: 'auth', loadChildren: () => import('./auth/auth.module')
    .then((m) => m.AuthModule),
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
