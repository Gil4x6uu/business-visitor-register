import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { IgxGridComponent, IRowDataEventArgs } from 'igniteui-angular';
import { Visitor } from '../models/visitor';

@Component({
  selector: 'app-monitor-queues',
  templateUrl: './monitor-queues.component.html',
  styleUrls: ['./monitor-queues.component.scss']
})
export class MonitorQueuesComponent implements OnInit {
  @ViewChild('monitorGrid', { read: IgxGridComponent })
  public grid: IgxGridComponent;
  
  @Input() VisitorsQueue : Visitor[];
  @Output() visitorRemoveFromQueue = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }
  
  
  public deleteRow(rowID): void {
  this.grid.deleteRow(rowID);
    this.visitorRemoveFromQueue.emit(rowID);
  }
 
}
