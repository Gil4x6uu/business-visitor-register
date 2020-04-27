import { Component, OnInit, Input } from '@angular/core';
import { StoreService} from  '../store.service'
import { Store } from '../models/store';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-store-check-in',
  templateUrl: './store-check-in.component.html',
  styleUrls: ['./store-check-in.component.css']
})
export class StoreCheckInComponent implements OnInit {
  @Input() store: Store;
  stores: Store[];
  constructor(
    private storeService: StoreService,
    private route: ActivatedRoute,
    ) {}
   
   clearInput(event):void{
     event.target.value = "";
   } 
  
  getStores(): void {
    this.storeService.getStores()
      .subscribe(stores => this.stores = stores);
   }
  getStoreById(id: string): void{
     this.storeService.getStoreById(id)
    .subscribe(store =>{
      this.store = store; 
      console.log(this.store)
    })
    
  }
   
  ngOnInit() {


  }

}
