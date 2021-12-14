import { fakeAsync, TestBed } from '@angular/core/testing';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,

} from '@angular/common/http/testing';
import { ExchangeRateService } from './exchange-rate-service';
import { ExchangeRate } from './ExchangeRate';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { defaultIfEmpty } from 'rxjs/internal/operators/defaultIfEmpty';
import { of } from 'rxjs';
import { isEmpty } from 'rxjs/internal/operators/isEmpty';

describe('ExchangeRateServiceService', () => {
  let service: ExchangeRateService;
  let httpMock: HttpTestingController;


  beforeEach(fakeAsync(() => {

    TestBed.configureTestingModule({
      providers: [ExchangeRateService,],
      imports: [HttpClientTestingModule]

    });

    service = TestBed.inject(ExchangeRateService);
    httpMock = TestBed.inject(HttpTestingController);
  }));

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpMock.verify();
  });

  it('should return currency rate values if currency name is correct', fakeAsync((done: DoneFn) => {
    service.getExchangeRates("latest", "GBP")
      .subscribe(result => {
        expect(result.length).toEqual(4);
        done;
      });

    let exchangeRatesRequest = httpMock.expectOne('https://api.exchangerate-api.com/v4/latest/GBP');

    exchangeRatesRequest.flush({ "rates": { "GBP": 1, "AED": 4.86, "AFN": 136.56, "ALL": 142.23 } }, { status: 200, statusText: 'Success' });
   
  }));

  it('should return EMPTY if currency name is NOT correct', (done: DoneFn) => {

    //operation in RxJs that checks if an observable is empty. The operation is isEmpty()
    service.getExchangeRates("latest", "GBPPP").pipe(isEmpty()).subscribe((res) => {
      expect(res).toEqual(true);
      done()
    });

    let exchangeRatesRequest = httpMock.expectOne('https://api.exchangerate-api.com/v4/latest/GBPPP');
    const mockError = new ProgressEvent('error');
    exchangeRatesRequest.error(mockError);
    httpMock.verify();
  });
});
