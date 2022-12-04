import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DealershipService} from "../../core/service/dealership.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Inventory} from "../../core/model/inventory.model";
import {InventoryService} from "../../core/service/inventory.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-inventory-dialog',
  templateUrl: './inventory-dialog.component.html',
  styleUrls: ['./inventory-dialog.component.scss']
})
export class InventoryDialogComponent {

  transmissionToggle: string[] = [];
  transmissionToggleOptions: string[] = ["Automatic", "CVT", "Manual"];
  driveToggle: string[] = [];
  driveToggleOptions: string[] = ["2WD", "4WD", "AWD"];
  fuelToggle: string[] = [];
  fuelToggleOptions: string[] = ["Gasoline", "Diesel", "Electric"];
  dealershipToggle: string[] = [];
  dealershipToggleOptions: any = [];
  setting: any;
  invoiceDate: Date | undefined;

  firstFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, private dealership: DealershipService, @Inject(MAT_DIALOG_DATA) public data: any, private inventory: InventoryService, public dialogRef: MatDialogRef<InventoryDialogComponent>, private router: Router,) {
    this.dealershipToggleOptions = data.dealshipToggleOptions
    this.setting = data;
    this.dealership.get().subscribe(data => {
      this.dealershipToggleOptions = data;
    });

    this.firstFormGroup = this._formBuilder.group({
      vinCtrl: new FormControl(data.vehicle.vin, [Validators.pattern("^[a-zA-Z0-9]*$"), Validators.minLength(17), Validators.maxLength(17), Validators.required]),
      makeCtrl: new FormControl(data.vehicle.make, [Validators.pattern("^[a-zA-Z]*$"), Validators.required, Validators.max(32)]),
      modelCtrl: new FormControl(data.vehicle.model, [Validators.pattern("^[a-zA-Z0-9]*$"), Validators.required, Validators.max(32)]),
      modelYearCtrl: new FormControl(data.vehicle.model_year, [Validators.pattern("^[0-9]*$"), Validators.minLength(4), Validators.minLength(4), Validators.required]),
      engineCtrl: new FormControl(data.vehicle.engine, [Validators.pattern("^[a-zA-Z0-9]*$"), Validators.required, Validators.max(32)]),
      mileageCtrl: new FormControl(data.vehicle.mileage, [Validators.pattern("^[0-9]*$"), Validators.required]),
      priceCtrl: new FormControl(data.vehicle.price, [Validators.pattern("^[0-9]*$"), Validators.required]),
      colorCtrl: new FormControl(data.vehicle.color, Validators.required),
      transmissionCtrl: new FormControl(data.vehicle.transmission, Validators.required),
      driveCtrl: new FormControl(data.vehicle.drive, Validators.required),
      fuelCtrl: new FormControl(data.vehicle.fuel, Validators.required),
      dealerCtrl: new FormControl(data.vehicle.dealershipId, Validators.required),
    });
  }


  public submit() {
    if (this.validate(this.firstFormGroup)) {
      let vehicle: Inventory = {
        vin: this.firstFormGroup.get('vinCtrl')!.value!,
        make: this.firstFormGroup.get('makeCtrl')!.value!,
        model: this.firstFormGroup.get('modelCtrl')!.value!,
        model_year: parseInt(this.firstFormGroup.get('modelYearCtrl')!.value!),
        engine: this.firstFormGroup.get('engineCtrl')!.value!,
        mileage: parseInt(this.firstFormGroup.get('mileageCtrl')!.value!),
        price: parseInt(this.firstFormGroup.get('priceCtrl')!.value!),
        color: this.firstFormGroup.get('colorCtrl')!.value!,
        transmission: this.firstFormGroup.get('transmissionCtrl')!.value!,
        drive: this.firstFormGroup.get('driveCtrl')!.value!,
        fuel: this.firstFormGroup.get('fuelCtrl')!.value!,
        dealershipId: parseInt(this.firstFormGroup.get('dealerCtrl')!.value!),
      }
      console.log(vehicle);
      this.inventory.post(vehicle).subscribe(data => {
        console.log(data);
      })
      this.dialogRef.close();
      location.reload();
    }
  }

  public update() {
    if (this.validate(this.firstFormGroup)) {
      let vehicle: Inventory = {
        vin: this.firstFormGroup.get('vinCtrl')!.value!,
        make: this.firstFormGroup.get('makeCtrl')!.value!,
        model: this.firstFormGroup.get('modelCtrl')!.value!,
        model_year: parseInt(this.firstFormGroup.get('modelYearCtrl')!.value!),
        engine: this.firstFormGroup.get('engineCtrl')!.value!,
        mileage: parseInt(this.firstFormGroup.get('mileageCtrl')!.value!),
        price: parseInt(this.firstFormGroup.get('priceCtrl')!.value!),
        color: this.firstFormGroup.get('colorCtrl')!.value!,
        transmission: this.firstFormGroup.get('transmissionCtrl')!.value!,
        drive: this.firstFormGroup.get('driveCtrl')!.value!,
        fuel: this.firstFormGroup.get('fuelCtrl')!.value!,
        dealershipId: parseInt(this.firstFormGroup.get('dealerCtrl')!.value!),
      }
      this.inventory.update(vehicle.vin, vehicle).subscribe(data => {
        console.log(data);
      })
      this.dialogRef.close();
      location.reload();
    }
  }

  public delete() {
    this.inventory.delete(this.firstFormGroup.get('vinCtrl')!.value!).subscribe(data => {
    });
    this.dialogRef.close();
    location.reload();
  }

  private validate(formGroup: FormGroup) {
    let valid: boolean = true
    Object.keys(formGroup.controls).forEach(key => {
      if (formGroup.get(key)?.errors != undefined && formGroup.get(key)?.errors != null) {
        console.log(formGroup.get(key)!.errors);
        valid = false;
      }
    });
    return valid;
  }
}
