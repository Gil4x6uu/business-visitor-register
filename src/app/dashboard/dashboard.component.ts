
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { StoreOwner } from '../models/storeOwner'
import { Router } from '@angular/router';
import { Store } from '../models/store';
import { Visitor } from '../models/visitor';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  storeOwner = new StoreOwner();
  store: Store;
  visitors: Visitor[];
  
  constructor(public OAuth: AuthService, private router: Router) { }
  
  
  ngOnInit() {
    this.storeOwner = JSON.parse(localStorage.getItem('storeOwner'));
    this.store = JSON.parse(localStorage.getItem('store'));
    this.visitors = this.store.visitors;
    console.log(this.store);
  }
  
  
  logout() {
    localStorage.clear();
    this.OAuth.signOut().then(data => {
      this.router.navigate([`mainScreen`]);
    });
  }
}