import { Component, OnInit, Input } from '@angular/core';
import { StoreService} from  '../store.service'
import { Store } from '../models/store';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup} from '@angular/forms';
@Component({
  selector: 'app-store-check-in',
  templateUrl: './store-check-in.component.html',
  styleUrls: ['./store-check-in.component.css']
})
export class StoreCheckInComponent implements OnInit {
  store: Store;
  stores: Store[];
  storeIdForm: FormGroup;
  constructor(
    private storeService: StoreService,
    private route: ActivatedRoute,
    ) {}
   

  
  getStores(): void {
    this.storeService.getStores()
      .subscribe(stores => this.stores = stores);
   }
   
  getStoreById(id: Number): void{
     this.storeService.getStoreById(id)
    .subscribe(store =>{
      this.store = store[0];
    }) 
  }
  
  isStoreExicst(): void{
    if(this.store){
      
    }
  }
   
  ngOnInit() {


  }

}
