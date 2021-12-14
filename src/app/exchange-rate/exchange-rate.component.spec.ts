import {  DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed,tick } from '@angular/core/testing';
import { Router, ActivatedRoute, Params, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {  of } from 'rxjs'
import { ExchangeRateService } from './exchange-rate-service';
import { ExchangeRateComponent } from './exchange-rate.component';
import { ExchangeRate } from './ExchangeRate';
import { MaterialModule } from '../material.module'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

let de: DebugElement;

describe('LatestExchangeRateComponent', () => {
  let component: ExchangeRateComponent;
  let fixture: ComponentFixture<ExchangeRateComponent>;
  let routerMock: Router;
  let mockExchangeRateService: any;

  const routes: Routes = [
    { path: '', redirectTo: '/latest/GBP', pathMatch: 'full' },
    { path: 'latest/:currencyId', component: ExchangeRateComponent },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExchangeRateComponent],
      schemas: [
        
      ],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [{
        provide: ExchangeRateService,
        useValue: jasmine.createSpyObj('ExchangeRateService', ['getExchangeRates'])
      },
      {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            paramMap: {
              get: (id: number) => { currencyId: "GBP" }
            },
            url: [{ path: "latest" }, { path: "GBP" }]
          }
        }
      }
      ]
    }).compileComponents();

    mockExchangeRateService = TestBed.inject(ExchangeRateService);

    mockExchangeRateService.getExchangeRates
      .and
      .returnValue(of([{
        CurrencyName: 'GBP',
        CurrencyRateValue: 1
      }] as ExchangeRate[]));

    routerMock = TestBed.inject(Router);

    fixture = TestBed.createComponent(ExchangeRateComponent);
    fixture.detectChanges();
    de = fixture.debugElement;
    await fixture.whenStable();
  });

  it('should return currency rate values if currency name is correct',  fakeAsync((done: DoneFn) => {
    
    const rowHtmlElements = de.nativeElement.querySelectorAll('.mat-row');
    
    expect(rowHtmlElements.length).toBe(1);
    done;
  }));
}); 
