import { Component, OnInit, Input } from '@angular/core';
import { StoreService} from  '../service/store.service'
import { Store } from '../models/store';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Visitor } from '../models/visitor';
@Component({
  selector: 'app-store-check-in',
  templateUrl: './store-check-in.component.html',
  styleUrls: ['./store-check-in.component.scss']
})
export class StoreCheckInComponent implements OnInit {
  store: Store;
  storeId: number;
  stores: Store[];
  userForm: FormGroup;
  visitorInfo: Visitor;
  todayTime: Date;
  constructor(
    private storeService: StoreService,
    private formBuilder: FormBuilder
    ) {
    this.userForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone: ['', [Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.email]],
    });
    }
   

  
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
  onSubmit() {
      if (this.userForm.invalid == true) {
      return;
    }
    else {
      //this.registered = true;
      this.visitorInfo = new Visitor(this.userForm.value);
      this.visitorInfo.time = new Date().toLocaleString();
      this.storeService.addVisitoreToStore(this.visitorInfo, this.store.id)
        .subscribe(message => {
          console.log(`inside onSubmit in visitor form ${message}`);
          this.store = null;
        });
    }
  }
  goBackToCheckInForm() {
    this.store = null;
  }
   
  ngOnInit() {


  }

}
