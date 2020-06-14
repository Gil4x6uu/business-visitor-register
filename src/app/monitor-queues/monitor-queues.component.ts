import { Component, OnInit, ViewChild } from '@angular/core';
import { IgxGridComponent } from 'igniteui-angular';

@Component({
  selector: 'app-monitor-queues',
  templateUrl: './monitor-queues.component.html',
  styleUrls: ['./monitor-queues.component.scss']
})
export class MonitorQueuesComponent implements OnInit {
  @ViewChild('monitorGrid', { read: IgxGridComponent })
  public grid: IgxGridComponent;
  
  constructor() { }

  ngOnInit() {
  }

}
