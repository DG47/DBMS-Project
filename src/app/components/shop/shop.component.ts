import { Component } from '@angular/core';
import {InventoryService} from "../../service/inventory.service";
import {Inventory} from "../../core/model/inventory.model";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {
  catalog: Inventory[] | undefined;


  constructor(private inventory: InventoryService) {
    this.inventory.get().subscribe((data: Inventory[]) => this.catalog = data);
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }


}
