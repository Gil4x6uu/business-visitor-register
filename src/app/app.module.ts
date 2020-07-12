import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreCheckInComponent } from './store-check-in/store-check-in.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { GoogleLoginProvider, AuthService } from 'angularx-social-login';
import { AuthServiceConfig } from 'angularx-social-login';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {IgxListModule,	IgxGridModule,	IgxIconModule,	IgxButtonModule, IgxRippleModule,
	IgxCardModule,
	IgxInputGroupModule,
    IgxDialogModule, 
    IgxToggleModule 
} from 'igniteui-angular';

import { MonitorQueuesComponent } from './monitor-queues/monitor-queues.component';
import { AuthInterceptor } from'./_helpers/AuthInterceptor'
import { VisitorsGridComponent } from './visitors-grid/visitors-grid.component';
import { AvatarAndLogoutComponent } from './avatar-and-logout/avatar-and-logout.component';
import { StoreOwnerCardComponent } from './store-owner-card/store-owner-card.component';
import { NextVisitorComponent } from './next-visitor/next-visitor.component';
import { CheckInFormComponent } from './check-in-form/check-in-form.component';

export function socialConfigs() {
    const config = new AuthServiceConfig([
        {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('184666646163-gu8sdh4lmhklnkrcgc4td935i571o7h1.apps.googleusercontent.com')
        }
    ]);
    return config;
}
@NgModule({
   declarations: [
      AppComponent,
      StoreCheckInComponent,
      LoginComponent,
      DashboardComponent,
      MainScreenComponent,
      MonitorQueuesComponent,
      VisitorsGridComponent,
      AvatarAndLogoutComponent,
      StoreOwnerCardComponent,
      NextVisitorComponent,
      CheckInFormComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      IgxGridModule,
      BrowserAnimationsModule,
      IgxIconModule,
      IgxButtonModule,
      IgxRippleModule,
      IgxCardModule,
      IgxInputGroupModule,
      IgxDialogModule,
      IgxListModule,
      IgxToggleModule
   ],
   providers: [
      AuthService,
        {
            provide: AuthServiceConfig,
            useFactory: socialConfigs
        },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor , multi: true }
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
