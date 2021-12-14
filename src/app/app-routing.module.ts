import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ExchangeRateComponent } from './exchange-rate/exchange-rate.component';


const routes: Routes = [
  { path: '', redirectTo: '/latest/GBP', pathMatch: 'full' },
  { path: 'latest/:currencyId', component: ExchangeRateComponent },
  { path: '**',  component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
