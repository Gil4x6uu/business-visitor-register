
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { StoreOwner } from '../Models/socialuser'
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  storeOwner = new StoreOwner();
  
  constructor(public OAuth: AuthService, private router: Router) { }
  
  
  ngOnInit() {
    this.storeOwner = JSON.parse(localStorage.getItem('storeOwner'));
    console.log(this.storeOwner.picture);
  }
  
  
  logout() {
    alert(1);
    this.OAuth.signOut().then(data => {
      debugger;
      this.router.navigate([`/`]);
    });
  }
}