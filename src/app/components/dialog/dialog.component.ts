import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Inventory} from "../../core/model/inventory.model";
import {FormBuilder, Validators} from "@angular/forms";
import {formatCurrency} from "@angular/common";
import {SalesService} from "../../core/service/sales.service";
import {Customer} from "../../core/model/customer.model";
import {CustomerService} from "../../core/service/customer.service";
import {Sales} from "../../core/model/sales.model";
import {InventoryService} from "../../core/service/inventory.service";


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  vehicle!: Inventory;
  salesPerson: any;

  tradeIn: number = 0;
  downPayment: number = 0;

  genderOptions: string[] = ["Male", "Female"];

  constructor(
    private _formBuilder: FormBuilder,
    private sales: SalesService,
    private customer: CustomerService,
    private inventory: InventoryService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.vehicle = data.vehicle;
    console.log(this.vehicle);
    this.sales.getSalesPerson(this.vehicle.dealershipId.toString()).subscribe((data: any) => {
      this.salesPerson = data;
    });
  }

  firstFormGroup = this._formBuilder.group({
    firstNameCtrl: ['', Validators.required],
    lastNameCtrl: ['', Validators.required],
    streetCtrl: ['', Validators.required],
    cityCtrl: ['', Validators.required],
    stateCtrl: ['', Validators.required],
    zipCtrl: ['', Validators.required],
    ageCtrl: ['', Validators.required],
    incomeCtrl: ['', Validators.required],
    genderCtrl: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    salesPersonCtrl: ['', Validators.required],
    tradeInCtrl: ['', Validators.required],
    downPaymentCtrl: ['', Validators.required],
  });

  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });

  onNoClick(): void {
    this.dialogRef.close();
  }

  public formatRemaining(MSRP: number): String {
    return this.formatMSRP(Math.max(0, MSRP));
  }

  public formatMSRP(MSRP: number): String {
    return formatCurrency(MSRP, 'en-US', '$');
  }

  public submitSale() {
    let customer: Customer = {
      first_name: this.firstFormGroup.get('firstNameCtrl')!.value!,
      last_name: this.firstFormGroup.get('lastNameCtrl')!.value!,
      address_street: this.firstFormGroup.get('streetCtrl')!.value!,
      address_city: this.firstFormGroup.get('cityCtrl')!.value!,
      address_state: this.firstFormGroup.get('stateCtrl')!.value!,
      address_zip: parseInt(this.firstFormGroup.get('zipCtrl')!.value!),
      age: parseInt(this.firstFormGroup.get('ageCtrl')!.value!),
      income: parseInt(this.firstFormGroup.get('incomeCtrl')!.value!),
      gender: this.firstFormGroup.get('genderCtrl')!.value!,
    }
    this.customer.post(customer).subscribe((data: any) => {
      console.log(data);
      if(data.id != null) {
        let sales: Sales = {
          vehicle_vin: this.vehicle.vin,
          sales_person_id: parseInt(this.secondFormGroup.get('salesPersonCtrl')!.value!),
          customer_id: data.id,
          dealership_id: this.vehicle.dealershipId,
          sale_price: this.vehicle.price,
          trade_in_value: parseInt(this.secondFormGroup.get('tradeInCtrl')!.value!),
          down_payment: parseInt(this.secondFormGroup.get('downPaymentCtrl')!.value!),
        }
        console.log(sales);
        this.sales.post(sales).subscribe((data: any) => {
          console.log(data);
          this.vehicle.sold = true;
          this.inventory.update(this.vehicle.vin, this.vehicle).subscribe();
          location.reload();
        });
      }
    });
  }
}
