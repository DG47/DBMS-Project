import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DealershipService} from "../../core/service/dealership.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Inventory} from "../../core/model/inventory.model";
import {InventoryService} from "../../core/service/inventory.service";

@Component({
  selector: 'app-inventory-dialog',
  templateUrl: './inventory-dialog.component.html',
  styleUrls: ['./inventory-dialog.component.scss']
})
export class InventoryDialogComponent {

  transmissionToggle: string[] = [];
  transmissionToggleOptions: string[] = ["Automatic", "CVT", "Manual"];
  driveToggle: string[] = [];
  driveToggleOptions: string[] = ["2WD","4WD","AWD"];
  fuelToggle: string[] = [];
  fuelToggleOptions: string[] = ["Gasoline", "Diesel", "Electric"];
  dealershipToggle: string[] = [];
  dealershipToggleOptions: any = [];
  setting: any;
  invoiceDate: Date | undefined;

  firstFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, private dealership: DealershipService, @Inject(MAT_DIALOG_DATA) public data: any, private inventory: InventoryService) {
    this.dealershipToggleOptions = data.dealshipToggleOptions
    this.setting = data;

    if (this.setting.edit) {
      this.firstFormGroup = this._formBuilder.group({
        vinCtrl: [data.vehicle.vin, Validators.required],
        makeCtrl: [data.vehicle.make, Validators.required],
        modelCtrl: [data.vehicle.model, Validators.required],
        modelYearCtrl: [data.vehicle.model_year, Validators.required],
        typeCtrl: [data.vehicle.type, Validators.required],
        engineCtrl: [data.vehicle.engine, Validators.required],
        mileageCtrl: [data.vehicle.mileage, Validators.required],
        priceCtrl: [data.vehicle.price, Validators.required],
        colorCtrl: [data.vehicle.color, Validators.required],
        transmissionCtrl: [data.vehicle.transmission, Validators.required],
        driveCtrl: [data.vehicle.drive, Validators.required],
        fuelCtrl: [data.vehicle.fuel, Validators.required],
        dealerCtrl: [data.vehicle.dealershipId, Validators.required],
      });
    } else {
      this.firstFormGroup = this._formBuilder.group({
        vinCtrl: ['', Validators.required],
        makeCtrl: ['', Validators.required],
        modelCtrl: ['', Validators.required],
        modelYearCtrl: ['', Validators.required],
        typeCtrl: ['', Validators.required],
        engineCtrl: ['', Validators.required],
        mileageCtrl: ['', Validators.required],
        priceCtrl: ['', Validators.required],
        colorCtrl: ['', Validators.required],
        transmissionCtrl: ['', Validators.required],
        driveCtrl: ['', Validators.required],
        fuelCtrl: ['', Validators.required],
        dealerCtrl: ['', Validators.required],
      });
    }
  }



  public submit() {
    let vehicle: Inventory = {
      vin: this.firstFormGroup.get('vinCtrl')!.value!,
      make: this.firstFormGroup.get('makeCtrl')!.value!,
      model: this.firstFormGroup.get('modelCtrl')!.value!,
      model_year: parseInt(this.firstFormGroup.get('modelYearCtrl')!.value!),
      type: this.firstFormGroup.get('typeCtrl')!.value!,
      engine: this.firstFormGroup.get('engineCtrl')!.value!,
      mileage: parseInt(this.firstFormGroup.get('mileageCtrl')!.value!),
      price: parseInt(this.firstFormGroup.get('priceCtrl')!.value!),
      color: this.firstFormGroup.get('colorCtrl')!.value!,
      transmission: this.firstFormGroup.get('transmissionCtrl')!.value!,
      drive: this.firstFormGroup.get('driveCtrl')!.value!,
      fuel: this.firstFormGroup.get('fuelCtrl')!.value!,
      dealershipId: parseInt(this.firstFormGroup.get('dealerCtrl')!.value!),
      sold: false
    }
    console.log(vehicle);
    this.inventory.post(vehicle).subscribe(data => {
      console.log(data);
    })
    location.reload();
  }

  public update() {
    let vehicle: Inventory = {
      vin: this.firstFormGroup.get('vinCtrl')!.value!,
      make: this.firstFormGroup.get('makeCtrl')!.value!,
      model: this.firstFormGroup.get('modelCtrl')!.value!,
      model_year: parseInt(this.firstFormGroup.get('modelYearCtrl')!.value!),
      type: this.firstFormGroup.get('typeCtrl')!.value!,
      engine: this.firstFormGroup.get('engineCtrl')!.value!,
      mileage: parseInt(this.firstFormGroup.get('mileageCtrl')!.value!),
      price: parseInt(this.firstFormGroup.get('priceCtrl')!.value!),
      color: this.firstFormGroup.get('colorCtrl')!.value!,
      transmission: this.firstFormGroup.get('transmissionCtrl')!.value!,
      drive: this.firstFormGroup.get('driveCtrl')!.value!,
      fuel: this.firstFormGroup.get('fuelCtrl')!.value!,
      dealershipId: parseInt(this.firstFormGroup.get('dealerCtrl')!.value!),
      sold: false
    }
    console.log(vehicle);
    this.inventory.update(vehicle.vin, vehicle).subscribe(data => {
      console.log(data);
    })
    location.reload();
  }
}
