import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShopComponent} from "./components/shop/shop.component";
import {FinanceComponent} from "./components/finance/finance.component";
import {LocationsComponent} from "./components/locations/locations.component";
import {LandingComponent} from "./components/landing/landing.component";

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'finance', component: FinanceComponent },
  { path: 'locations', component: LocationsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
