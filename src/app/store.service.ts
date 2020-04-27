import { Injectable } from '@angular/core';
import { Store } from './models/store';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class StoreService {
private storeUrl = 'http://localhost:3000';  // URL to web api
store :Store;

constructor(
  private http: HttpClient
) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' },)
  };
  
  
  
  
  getStores(): Observable<Store[]> {
    return this.http.get<Store[]>(`${this.storeUrl}/getstores`)
      .pipe(
        tap(_ => console.log('fetched Stores')),
        catchError(this.handleError<Store[]>('getstores', []))
      );
  }
  
    getStoreById(id: string): Observable<Store>{
      const params =  new HttpParams().set('id' , id);
      return this.http.get<Store>(`${this.storeUrl}/getStoresById`, {params})
      .pipe(
        tap(_ => console.log('fetched Store by ID')),
        catchError(this.handleError<Store>('getStoresById/:' + id))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };

}
}



