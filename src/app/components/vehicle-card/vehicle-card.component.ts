import {Component, Inject, Input} from '@angular/core';
import {formatCurrency} from "@angular/common";
import {MatDialog } from '@angular/material/dialog';
import {DialogComponent} from "../dialog/dialog.component";
import {ActivatedRoute} from "@angular/router";
import {InventoryDialogComponent} from "../inventory-dialog/inventory-dialog.component";
import {DealershipService} from "../../core/service/dealership.service";

@Component({
  selector: 'app-vehicle-card',
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.scss']
})
export class VehicleCardComponent {
  admin:boolean = false;
  @Input() vehicle: any;

  dealershipToggleOptions: any = [];

  constructor(public dialog: MatDialog, private activatedRoute: ActivatedRoute, private dealership: DealershipService) {

  }

  ngOnInit(): void {
    this.dealership.get().subscribe(data => {
      this.dealershipToggleOptions = data;
    });
    this.activatedRoute.queryParams.subscribe(params => {
      this.admin = params['admin'] != undefined ? true : false;
    });
  }

  public formatMSRP(MSRP: number): String {
    return formatCurrency(MSRP, 'en-US', '$');
  }

  public formatMileage(milage: number): String {
    return milage.toLocaleString("en-US");
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: 'auto',
      data: { vehicle: this.vehicle }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openInventoryDialog(): void {
    const dialogRef = this.dialog.open(InventoryDialogComponent, {
      width: 'auto',
      data: { 'dealshipToggleOptions': this.dealershipToggleOptions, 'edit': true, 'vehicle': this.vehicle },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
