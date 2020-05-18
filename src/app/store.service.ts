import { Injectable } from '@angular/core';
import { Store } from './models/store';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Visitor } from './models/visitor';
import { StoreOwner } from './models/socialUser';

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
    headers: new HttpHeaders({ 'Content-Type': 'text' },)
  };
  
  
  
  
  getStores(): Observable<Store[]> {
    return this.http.get<Store[]>(`${this.storeUrl}/getstores`)
      .pipe(
        tap(_ => console.log('fetched Stores')),
        catchError(this.handleError<Store[]>('getstores', []))
      );
  }
  
  getStoreById(id: Number): Observable<StoreOwner>{
      const params =  new HttpParams().set('id' , id.toString());
    return this.http.get<StoreOwner>(`${this.storeUrl}/getStoresById`, {params})
      .pipe(
        tap(_ => console.log('fetched Store by ID')),
        catchError(this.handleError<StoreOwner>('getStoresById/:' + id))
      );
  }
  
  
  
  addVisitoreToStore(visitor: Visitor, storeId: Number): Observable<Store> {

    return this.http.post<Store>(`${this.storeUrl}/addVisitorToStore`, {'visitor':visitor, 'storeId': storeId})
    .pipe(
      tap(_ => console.log(`Visitor:${visitor.first_name} ${visitor.last_name} added to store with id:${storeId}`)),
      catchError(this.handleError<Store>('addVisitorToStore: ' + visitor._id))
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



