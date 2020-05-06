import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


import { Store } from '../models/store';
import { Visitor } from '../models/visitor';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-visitores-form',
  templateUrl: './visitores-form.component.html',
  styleUrls: ['./visitores-form.component.css']
})



export class VisitoresFormComponent implements OnInit {
  registered = false;
  submitted = false;
  userForm: FormGroup;
  visitorInfo: Visitor;
  todayTime : Date;
  @Input() storeToUpdate: Store;

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
      this.registered = true;
      this.visitorInfo = new Visitor(this.userForm.value);
      this.visitorInfo.time = new Date().toLocaleString();
      this.storeService.addVisitoreToStore(this.visitorInfo, this.storeToUpdate.id)
      .subscribe(message =>console.log(message));
    }
  }

};
