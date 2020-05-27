import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Store } from '../models/store';

@Injectable({
  providedIn: 'root'
})
export class VisitorsDataGridService {
 private url = 'http://services.odata.org/V4/Northwind/Northwind.svc/Alphabetical_list_of_products';
  constructor(private http: HttpClient) { }

  public fetchData(): Observable<Store[]> {
    return this.http.get(this.url)
    .pipe(
        map(response => response['value']),
        catchError(
          this.errorHandler('Error loading northwind data', [])
        )
      );
  }

  private errorHandler<T>(message: string, result: T) {
    return (error: any): Observable<any> => {
      console.error(`${message}: ${error.message}`);
      return of(result as T);
    };
  }

}
