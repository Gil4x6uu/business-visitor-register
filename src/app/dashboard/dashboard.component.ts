
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { StoreOwner } from '../models/storeOwner'
import { Router } from '@angular/router';
import { Store } from '../models/store';
import { Visitor } from '../models/visitor';
import { IgxGridComponent } from 'igniteui-angular/';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})



export class DashboardComponent implements OnInit {
  storeOwner = new StoreOwner();
  store: Store;
  visitors: Visitor[];
  
  @ViewChild('myGrid', { read: IgxGridComponent })
  public grid: IgxGridComponent;
  public gridRowEdit: IgxGridComponent;
  
  constructor(public OAuth: AuthService, private router: Router) { }
  
  
  ngOnInit() {
    this.storeOwner = JSON.parse(localStorage.getItem('storeOwner'));
    this.store = JSON.parse(localStorage.getItem('store'));
    this.visitors = this.store.visitors;
    this.visitors.map((visitor, index) => {
      visitor.id = index;
    });
    console.log(this.store);
  }
  
  
  logout() {
    localStorage.clear();
    this.OAuth.signOut().then(data => {
      this.router.navigate([`mainScreen`]);
    });
  }
}