import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VisitorsFormComponent } from './visitors-form/visitors-form.component';
import { StoreCheckInComponent } from './store-check-in/store-check-in.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { GoogleLoginProvider,  AuthService } from 'angularx-social-login';
import { AuthServiceConfig } from 'angularx-social-login';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {	IgxGridModule,	IgxAvatarModule,	IgxIconModule,	IgxButtonModule,	IgxRippleModule,	IgxCardModule,
    IgxInputGroupModule    
 } from 'igniteui-angular';
import { MonitorQueuesComponent } from './monitor-queues/monitor-queues.component';

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
      VisitorsFormComponent,
      StoreCheckInComponent,
      LoginComponent,
      DashboardComponent,
      MainScreenComponent,
      MonitorQueuesComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      IgxGridModule,
      BrowserAnimationsModule,
      IgxAvatarModule,
      IgxIconModule,
      IgxButtonModule,
      IgxRippleModule,
      IgxCardModule,
      IgxInputGroupModule
   ],
   providers: [
      AuthService,
        {
            provide: AuthServiceConfig,
            useFactory: socialConfigs
        }
    ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {
}
