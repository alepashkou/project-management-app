import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../shared/material/material.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { LogoutComponent } from './components/logout/logout.component';

@NgModule({
  declarations: [LoginPageComponent, SignUpPageComponent, LogoutComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule.forChild([
      { path: 'login', component: LoginPageComponent },
      { path: 'signup', component: SignUpPageComponent },
    ]),
  ],
  exports: [RouterModule],
})
export class AuthModule { }