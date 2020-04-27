import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';  

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VisitoresFormComponent } from './visitores-form/visitores-form.component';
import { EnterTokenScreenComponent } from './enter-token-screen/enter-token-screen.component';
import { StoreCheckInComponent } from './store-check-in/store-check-in.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
   declarations: [
      AppComponent,
      VisitoresFormComponent,
      EnterTokenScreenComponent,
      StoreCheckInComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule
      
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
