import { Component } from '@angular/core';
import {InventoryService} from "../../core/service/inventory.service";
import {Inventory} from "../../core/model/inventory.model";
import {min} from "rxjs";
import {PageEvent} from "@angular/material/paginator";
import {DealershipService} from "../../core/service/dealership.service";
import {Dealership} from "../../core/model/dealership.model";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {DialogComponent} from "../dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {InventoryDialogComponent} from "../inventory-dialog/inventory-dialog.component";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {
  admin:boolean = false;

  content: Inventory[] = [];
  page: Inventory[] = [];

  //pages
  pageSizeOptions: number[] = [6,12,18];
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

  navigationSubscription: any;

  //filters
  makeOptions: string[] = [];
  makeSelected: string = "All";

  minPrice: number = 1000;
  maxPrice: number = 500000;
  maxPriceLimit: number = 500000;

  minMileage: number = 0;
  maxMileage: number = 500000;
  maxMileageLimit: number = 500000;

  transmissionToggle: string[] = [];
  transmissionToggleOptions: string[] = ["Automatic", "CVT", "Manual"];
  driveToggle: string[] = [];
  driveToggleOptions: string[] = ["2WD","4WD","AWD"];
  fuelToggle: string[] = [];
  fuelToggleOptions: string[] = ["Gasoline", "Diesel", "Electric"];


  dealershipToggle: string[] = [];
  dealershipToggleOptions: any = [];




  constructor(private inventory: InventoryService, private dealership: DealershipService, private activatedRoute: ActivatedRoute, public dialog: MatDialog, private router: Router) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.admin = params['admin'] != undefined ? true : false;
    });
    this.inventory.getMaxPrice().subscribe(max => { this.maxPriceLimit = max; this.maxPrice = max; });
    this.inventory.getMaxMileage().subscribe(max => { this.maxMileageLimit = max; this.maxMileage = max; });
    this.dealership.get().subscribe(data => {
      this.dealershipToggleOptions = data;
      this.getData();
    });
    this.inventory.getMakes().subscribe(data => {
      this.makeOptions = data
      this.makeOptions.unshift('All');
      this.makeSelected = 'All';
    })
  }


  handlePageEvent(e: PageEvent) {
    this.pageIndex = (this.pageSize == e.pageSize) ? e.pageIndex : 0;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.getData();
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

    let sortBy = this.sortBySelected.split(',')[0];
    let sortDir = this.sortBySelected.split(',')[1];

    this.inventory.get(this.pageIndex, this.pageSize, this.minPrice, this.maxPrice, this.minMileage, this.maxMileage, transmissionToggle, driveToggle, fuelToggle, dealershipToggle, sortBy, sortDir, this.makeSelected).subscribe((data: any) => {
      this.page = data;
      this.content = data.content;
      this.length = data.totalElements;
    });
  }

  openInventoryDialog(): void {
    let vehicle: Inventory = {
      color: "",
      dealershipId: 0,
      drive: "",
      engine: "",
      fuel: "",
      make: "",
      mileage: 0,
      model: "",
      model_year: 0,
      price: 0,
      transmission: "",
      vin: ""
    }
    const dialogRef = this.dialog.open(InventoryDialogComponent, {
      width: 'auto',
      data: { 'dealshipToggleOptions': this.dealershipToggleOptions, 'edit': false, 'vehicle': vehicle }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getData();
      console.log('The dialog was closed');
    });
  }


}
