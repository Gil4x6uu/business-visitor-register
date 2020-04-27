import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreCheckInComponent } from './store-check-in/store-check-in.component';
import { VisitoresFormComponent } from './visitores-form/visitores-form.component';

const routes: Routes = [

  { path: 'checkIn', component: StoreCheckInComponent },
  { path: 'visitor-form/:id', component: VisitoresFormComponent },
  { path: '', redirectTo: '/checkIn', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
