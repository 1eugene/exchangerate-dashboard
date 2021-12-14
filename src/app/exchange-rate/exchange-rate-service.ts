
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

import { HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, EMPTY } from 'rxjs'
import { ExchangeRate } from './ExchangeRate';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ExchangeRateService {

  private baseUrl = "https://api.exchangerate-api.com/v4/";

  constructor(private _http: HttpClient) {
    console.log('Exchange Rate service created');
  }

  private handleError(err: HttpErrorResponse) {
    console.log('Handle http error');
    console.log(err.message);

  }

  public getExchangeRates(currentMethod: string, currencyId:string): Observable<ExchangeRate[]> {

    let currentUrl = this.baseUrl + currentMethod   + "/" + currencyId ;
    console.log('calling ' + currentUrl );
  
    return this._http.get(currentUrl).pipe(map((data: any) => {
      let ratesObj = data["rates"];
      return Object.keys(ratesObj).map(function (k: any): ExchangeRate {
        return new ExchangeRate(k, ratesObj[k]);
      });
    }),
    catchError((err) => {
      console.log( 'Error in source. Details: ' + err); // Use console.log(err) for detail
      return EMPTY;
    }));
  }
}