
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { StoreOwner } from '../models/storeOwner'
import { Router } from '@angular/router';
import { Store } from '../models/store';
import { Visitor } from '../models/visitor';
import { IgxGridComponent, IGridEditEventArgs, IgxGridRowComponent } from 'igniteui-angular/';
import { StoreService } from '../service/store.service'
import { VisitorsDataGridService } from '../service/visitors-data-grid.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})



export class DashboardComponent implements OnInit {
  storeOwner = new StoreOwner();
  store: Store;
  visitors: Visitor[];
  todayVisitors: Visitor[] = [];


  
  @ViewChild('myGrid', { read: IgxGridComponent })
  public gridRowEdit: IgxGridComponent;
  
  constructor(public OAuth: AuthService, private router: Router, private storeService: StoreService, private visitorsGridService: VisitorsDataGridService) {
    
   }
 
  
  ngOnInit() {
    localStorage.setItem("lastKnownDate", new Date().toLocaleString())
    setInterval(this.checkForDate, 50000);
    this.storeOwner = JSON.parse(localStorage.getItem('storeOwner'));
    this.store = JSON.parse(localStorage.getItem('store'));
    this.visitors = this.store.visitors;
    this.visitors.map((visitor, index) => {
      visitor.id = index;
    });
    console.log(this.store);
    this.initStream();
  }
  
  editDone(event: IGridEditEventArgs){
    const newRow =  event.newValue;
    this.storeService.updateVisitoreToStore(newRow, this.store.id)
      .subscribe(store => {
        this.store = store[0];
        this.visitors = this.store.visitors;
        localStorage.setItem('store', JSON.stringify(this.store));
      })
  }
  
  
  initStream(){
    const stream = new EventSource('http://localhost:3000/stream');
    stream.onmessage =  (event) => {
    this.store = JSON.parse(event.data);
    localStorage.setItem('store', JSON.stringify(this.store[0])); 
    this.visitors = this.store[0].visitors;
    this.visitors.map((visitor, index) => {
        visitor.id = index;
      });
      const lastVisitor: Visitor = this.visitors[(this.visitors.length) - 1]
      this.todayVisitors.push(lastVisitor);
    }
    
  }
  
  checkForDate(){
    const now = (new Date().toLocaleString().split(","))[0];
    const lastKnownDate = (localStorage.getItem("lastKnownDate").split(","))[0];
    console.log(`now is:${now} and last known date is:${lastKnownDate}`)
    if(now != lastKnownDate){
      this.todayVisitors = [];
    }    
  }

  
  logout() {
    localStorage.clear();
    this.OAuth.signOut().then(data => {
      this.router.navigate([`mainScreen`]);
    });
  }
}