import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShopComponent} from "./components/shop/shop.component";
import {FinanceComponent} from "./components/finance/finance.component";
import {LocationsComponent} from "./components/locations/locations.component";

const routes: Routes = [
  { path: 'shop', component: FinanceComponent },
  { path: 'finance', component: ShopComponent },
  { path: 'locations', component: LocationsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
