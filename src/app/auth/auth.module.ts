import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../shared/material/material.module';
import { ProfilePageComponent } from '../users/pages/profile-page/profile-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';

@NgModule({
  declarations: [LoginPageComponent, SignUpPageComponent, ProfilePageComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule.forChild([
      { path: 'login', component: LoginPageComponent },
      { path: 'signup', component: SignUpPageComponent },
      { path: 'profile', component: ProfilePageComponent },
    ]),
  ],
  exports: [RouterModule],
})
export class AuthModule { }