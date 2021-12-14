import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ExchangeRateComponent } from './exchange-rate/exchange-rate.component';
import { MaterialModule } from './material.module'; 
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ExchangeRateService } from './exchange-rate/exchange-rate-service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ExchangeRateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [ExchangeRateService],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);