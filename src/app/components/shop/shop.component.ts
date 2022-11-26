import { Component } from '@angular/core';
import {InventoryService} from "../../core/service/inventory.service";
import {Inventory} from "../../core/model/inventory.model";
import {min} from "rxjs";
import {PageEvent} from "@angular/material/paginator";
import {DealershipService} from "../../core/service/dealership.service";
import {Dealership} from "../../core/model/dealership.model";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {
  content: Inventory[] = [];
  page: Inventory[] = [];

  //pages
  pageSizeOptions: number[] = [10,15,30];
  pageSize: number = this.pageSizeOptions[1];
  pageIndex: number = 0;
  length: number = 0;

  //sort
  sortOptions: any = [
    {text: 'Recent', value: 'invoice_date,desc'},
    {text: 'Price Asc', value: 'price,asc'},
    {text: 'Price Desc', value: 'price,desc'},
    {text: 'Mileage Asc', value: 'mileage,asc'},
    {text: 'Mileage Desc', value: 'mileage,desc'}
  ]
  sortBySelected: string = 'invoice_date,desc'

  //filters
  makeOptions: string[] = [];
  makeSelected: string = "All";

  minPrice: number = 1000;
  maxPrice: number = 150000;

  minMileage: number = 0;
  maxMileage: number = 200000;

  transmissionToggle: string[] = [];
  transmissionToggleOptions: string[] = ["Automatic", "CVT", "Manual"];
  driveToggle: string[] = [];
  driveToggleOptions: string[] = ["2WD","4WD","AWD"];
  fuelToggle: string[] = [];
  fuelToggleOptions: string[] = ["Gasoline", "Diesel", "Electric"];
  dealershipToggle: string[] = [];
  dealershipToggleOptions: any = []




  constructor(private inventory: InventoryService, private dealership: DealershipService) {
    this.dealership.get().subscribe(data => {
      this.dealershipToggleOptions = data;
      console.log(data)
      this.getData();
    });
    this.inventory.getMakes().subscribe(data => {
      this.makeOptions = data
      this.makeOptions.unshift('All');
      this.makeSelected = 'All';
    });

  }

  handlePageEvent(e: PageEvent) {
    this.pageIndex = (this.pageSize == e.pageSize) ? e.pageIndex : 0;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.getData();
    console.log(e)
  }

  handleFilterChange() {
    this.pageIndex = 0;
    this.getData()
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return `${value}`;
  }

  getData() {
    let transmissionToggle = (this.transmissionToggle.length == 0) ? this.transmissionToggleOptions : this.transmissionToggle;
    let driveToggle = (this.driveToggle.length == 0) ? this.driveToggleOptions : this.driveToggle;
    let fuelToggle = (this.fuelToggle.length == 0) ? this.fuelToggleOptions : this.fuelToggle;
    let dealershipToggle = (this.dealershipToggle.length == 0) ? this.dealershipToggleOptions.map((data: Dealership) => data.id) : this.dealershipToggle;
    console.log(dealershipToggle)
    let sortBy = this.sortBySelected.split(',')[0];
    let sortDir = this.sortBySelected.split(',')[1];

    this.inventory.get(this.pageIndex, this.pageSize, this.minPrice, this.maxPrice, this.minMileage, this.maxMileage, transmissionToggle, driveToggle, fuelToggle, dealershipToggle, sortBy, sortDir, this.makeSelected).subscribe((data: any) => {
      this.page = data;
      this.content = data.content;
      this.length = data.totalElements;
    });
  }

}
