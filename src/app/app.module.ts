import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';  

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VisitoresFormComponent } from './visitores-form/visitores-form.component';
import { EnterTokenScreenComponent } from './enter-token-screen/enter-token-screen.component';
import { StoreCheckInComponent } from './store-check-in/store-check-in.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';


import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angularx-social-login';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';  

export function socialConfigs() {
   const config = new AuthServiceConfig(
      [
         {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('699162380886253')
         },
         {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('184666646163-gu8sdh4lmhklnkrcgc4td935i571o7h1.apps.googleusercontent.com')
         }
      ]
   );
   return config;
} 

@NgModule({
   declarations: [
      AppComponent,
      VisitoresFormComponent,
      EnterTokenScreenComponent,
      StoreCheckInComponent,
      LoginComponent,
      DashboardComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule
   ],

   providers: [
      AuthService,
      {
         provide: AuthServiceConfig,
         useFactory: socialConfigs
      }
   ],
   bootstrap: [AppComponent]
})  
export class AppModule { }
