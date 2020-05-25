import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';



import { Store } from '../models/store';
import { Visitor } from '../models/visitor';
import { StoreService } from '../store.service';

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

  }

  invalidFirstName() {
    return (this.submitted && this.userForm.controls.first_name.errors != null);
  }

  invalidLastName() {
    return (this.submitted && this.userForm.controls.last_name.errors != null);
  }

  invalidEmail() {
    return (this.submitted && this.userForm.controls.email.errors != null);
  }
  invalidPhone() {
    return (this.submitted && this.userForm.controls.phone.errors != null);
  }
  
  goBackToCheckInForm(){
    this.storeToUpdateChange.emit(null);
  }

  ngOnInit() {
    
    this.userForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{3}(?:-[0-9]{7})?$')]],
      email: ['', [Validators.required, Validators.email]],
    });
    
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

};
