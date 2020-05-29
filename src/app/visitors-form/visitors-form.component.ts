import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';



import { Store } from '../models/store';
import { Visitor } from '../models/visitor';
import { StoreService } from '../service/store.service';
import { kMaxLength } from 'buffer';

@Component({
  selector: 'app-visitors-form',
  templateUrl: './visitors-form.component.html',
  styleUrls: ['./visitors-form.component.scss']
})



export class VisitorsFormComponent implements OnInit {
  registered = false;
  submitted = false;
  userForm: FormGroup;
  visitorInfo: Visitor;
  todayTime : Date;
  @Input() storeToUpdate: Store;
  @Output() storeToUpdateChange = new EventEmitter<Store>();
  

  constructor(private formBuilder: FormBuilder, private storeService: StoreService) {
      this.userForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone: ['', [Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.email]],
    });
  }


  ngOnInit() {
    

    
  }

  onSubmit() {
    this.submitted = true;

    if (this.userForm.invalid == true) {
      return;
    }
    else {
      //this.registered = true;
      this.visitorInfo = new Visitor(this.userForm.value);
      this.visitorInfo.time = new Date().toLocaleString();
      this.storeService.addVisitoreToStore(this.visitorInfo, this.storeToUpdate.id)
      .subscribe(message =>{
        console.log( `inside onSubmit in visitor form ${message}`);
        this.storeToUpdateChange.emit(null);
      });
    }
  }
  goBackToCheckInForm() {
    this.storeToUpdateChange.emit(null);
  }
  
}
