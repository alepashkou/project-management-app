import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './redux/main.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthEffects } from './auth/store/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import { ApiInterceptor } from './core/services/api.interceptor';
import { HttpClient, HttpBackend, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { MainFooterComponent } from './core/components/main-footer/main-footer.component';
import { MainHeaderComponent } from './core/components/main-header/main-header.component';
import { MaterialModule } from './shared/material/material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UsersEffects } from './users/store/users.effects';
import { DialogComponent } from './core/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MainFooterComponent,
    MainHeaderComponent,
    DialogComponent
  ],
  imports: [SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers: metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true
      },
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpBackend]
      }
    }),
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([AuthEffects, UsersEffects])
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function httpTranslateLoader(http: HttpBackend) {
  return new TranslateHttpLoader(new HttpClient(http));
}