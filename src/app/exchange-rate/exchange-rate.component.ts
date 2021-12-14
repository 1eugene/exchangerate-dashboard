import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { ExchangeRateService } from './exchange-rate-service';
import { ExchangeRate } from './ExchangeRate';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.css']
})
export class ExchangeRateComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  columndefs = ['CurrencyName', 'CurrencyRateValue']
  dataSource: MatTableDataSource<ExchangeRate>;
  currencyId: string;
  currentMethod: string;
  getExchangeRates: any;
  constructor(private _exchangeRateService: ExchangeRateService, private route: ActivatedRoute) {
    this.dataSource = new MatTableDataSource();
    this.dataSource.filterPredicate = (data: ExchangeRate, filterValue: string) =>
      data.CurrencyName.trim().toLowerCase().indexOf(filterValue) !== -1;
  }

  ngOnInit() {
    let currentRoute = this.route.snapshot;
    this.currencyId = currentRoute.paramMap.get('currencyId');
    this.currentMethod = currentRoute.url[0].path.replace('/', '');
    console.log('ngOnInit completed  ');
  }

  ngAfterViewInit(): void {
    this._exchangeRateService.getExchangeRates(this.currentMethod, this.currencyId).subscribe((rates: ExchangeRate[]) => {
      setTimeout(() => { //timeout required to avoid ExpressionChangedAfterItHasBeenCheckedError  

        this.dataSource.data = rates;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      );
    });

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
