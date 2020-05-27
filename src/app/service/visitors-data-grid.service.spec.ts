/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VisitorsDataGridService } from './visitors-data-grid.service';

describe('Service: VisitorsDataGrid', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VisitorsDataGridService]
    });
  });

  it('should ...', inject([VisitorsDataGridService], (service: VisitorsDataGridService) => {
    expect(service).toBeTruthy();
  }));
});
