import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiInterceptor } from './core/services/api.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { MainFooterComponent } from './core/components/main-footer/main-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    MainFooterComponent
  ],
  imports: [SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
