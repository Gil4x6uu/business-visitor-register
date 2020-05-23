import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreCheckInComponent } from './store-check-in/store-check-in.component';
import { VisitorsFormComponent } from './visitors-form/visitors-form.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainScreenComponent} from './main-screen/main-screen.component'

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
      title: 'Dashboard Page'
    }
  },
  {
    path: 'mainScreen',
    component: MainScreenComponent
  },

  { 
    path: 'checkIn', 
    component: StoreCheckInComponent 
  },
  { 
    path: 'visitor-form/:id', 
    component: VisitorsFormComponent 
  },
  { 
    path: '', 
    redirectTo: '/mainScreen', 
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
