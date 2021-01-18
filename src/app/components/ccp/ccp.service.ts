import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ ContentType: 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class CcpService {
  constructor(private http: HttpClient) {}

  getCcps() {
    return this.http.get<Object[]>(
      'assets/database/credit-card-payment-db.json'
    );
  }

  // getProduct(id: number) {
  //   return this.http.get('/server/api/v1/Ccps/' + id);
  // }

  // saveProduct(product) {
  //   let body = JSON.stringify(product);
  //   return this.http.post('/server/api/v1/Ccps', body, httpOptions);
  // }

  // private productUrl = 'api/Ccps/Ccps.json';

  // getCcpsFromLocalHardCoded(): Observable<IProduct[]> {
  //   return this.http.get<IProduct[]>(this.productUrl).pipe(
  //     tap(data => console.log('All: ' + JSON.stringify(data))),
  //     // tap  nu altereaza stream-ul, e bun pt debug
  //     catchError(this.handleError)
  //   );
  // }

  // private handleError(err: HttpErrorResponse): Observable<never> {
  //   // in a real world app, we may send the server to some remote logging infrastructure
  //   // instead of just logging it to the console
  //   let errorMessage = '';
  //   if (err.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     errorMessage = `An error occurred: ${err.error.message}`;
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
  //   }
  //   console.error(errorMessage);
  //   return throwError(errorMessage);
  // }
}
