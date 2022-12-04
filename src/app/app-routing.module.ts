import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShopComponent} from "./components/shop/shop.component";
import {FinanceComponent} from "./components/finance/finance.component";
import {LocationsComponent} from "./components/locations/locations.component";
import {LandingComponent} from "./components/landing/landing.component";

const routes: Routes = [
  { path: '', component: ShopComponent },
  { path: 'inventory', component: ShopComponent },
  { path: 'sales', component: FinanceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
