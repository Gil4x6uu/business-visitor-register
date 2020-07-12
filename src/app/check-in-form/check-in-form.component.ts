import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { IgxDialogComponent } from 'igniteui-angular';
import { Visitor } from '../models/visitor';

@Component({
  selector: 'app-check-in-form',
  templateUrl: './check-in-form.component.html',
  styleUrls: ['./check-in-form.component.scss']
})
export class CheckInFormComponent implements OnInit {
  @ViewChild("dialogAdd", { read: IgxDialogComponent, static: true })
  public dialog: IgxDialogComponent;
  
  @Input() visitor: Visitor;

  constructor() { }

  ngOnInit() {
  }
  public cancel() {
    this.dialog.close();
   // this.visitor = new Visitor();
  }
  
  public open() {
    this.dialog.open();
    // this.visitor = new Visitor();
  }
  
    public addRow() {
    //this.visitor.time = new Date().toLocaleString();
    //this.storeService.addVisitoreToStore(this.visitor, this.store.id)
     // .subscribe(message => {
     // });
    this.cancel();
  }

}
