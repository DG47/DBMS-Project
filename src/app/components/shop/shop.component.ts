import { Component } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {
  catalog: any = [
    {"id": "123", "year": 2015, "make": "Honda", "model": "CRV", "MSRP": 19000, "sold": false},
    {"id": "345", "year": 2017, "make": "Chrysler", "model": "300", "MSRP": 25000, "sold": true},
    {"id": "678", "year": 2015, "make": "Audi", "model": "S8", "MSRP": 14000, "sold": false},
    {"id": "678", "year": 2021, "make": "Audi", "model": "R8", "MSRP": 90000, "sold": false}, {"id": "678", "year": 2015, "make": "BMW", "model": "M3", "MSRP": 55500, "sold": false},
    {"id": "678", "year": 2015, "make": "Jeep", "model": "Wrangler", "MSRP": 30000, "sold": false},
  ]

}
