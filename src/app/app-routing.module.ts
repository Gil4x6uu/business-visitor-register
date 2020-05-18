import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreCheckInComponent } from './store-check-in/store-check-in.component';
import { VisitoresFormComponent } from './visitores-form/visitores-form.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
      title: 'Dashboard Page'
    }
  },

  { 
    path: 'checkIn', 
    component: StoreCheckInComponent 
  },
  { 
    path: 'visitor-form/:id', 
    component: VisitoresFormComponent 
  },
  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  }, 


];   

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
