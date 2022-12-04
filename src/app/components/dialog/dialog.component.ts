import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Inventory} from "../../core/model/inventory.model";
import {FormBuilder, FormControl, Validators, Validator, FormGroup} from "@angular/forms";
import {formatCurrency} from "@angular/common";
import {SalesService} from "../../core/service/sales.service";
import {Customer} from "../../core/model/customer.model";
import {CustomerService} from "../../core/service/customer.service";
import {Sales} from "../../core/model/sales.model";
import {InventoryService} from "../../core/service/inventory.service";
import {InventorySold} from "../../core/model/inventory-sold.model";
import {Loan} from "../../core/model/loan.model";
import {LoanService} from "../../core/service/loan.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  vehicle!: Inventory;
  salesPerson: any;
  lenderOptions: any;

  tradeIn: number = 0;
  downPayment: number = 0;

  genderOptions: string[] = ["Male", "Female"];
  termOptions: number[] = [36, 48, 60, 72];
  termRates: { [key: number]: number; } = {36: 4, 48: 5, 60: 6, 72: 7};
  termSelected: number = 36;
  estimatedPayment: number = 0;

  constructor(
    private _formBuilder: FormBuilder,
    private sales: SalesService,
    private customer: CustomerService,
    private inventory: InventoryService,
    private loan: LoanService,
    public dialogRef: MatDialogRef<DialogComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.vehicle = data.vehicle;
    console.log(this.vehicle);
    this.sales.getSalesPerson(this.vehicle.dealershipId.toString()).subscribe((data: any) => {
      this.salesPerson = data;
    });
    this.loan.getLenders().subscribe((data: any) => {
      this.lenderOptions = data;
    })
    this.termOptions.forEach(term => {
      this.termRates[term] = this.termRates[term] + (Math.floor(Math.random() * 10) / 10);
    })


    this.calcPayment();
  }

  firstFormGroup = this._formBuilder.group({
    firstNameCtrl: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z]*$")]),
    lastNameCtrl: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z]*$")]),
    streetCtrl: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z0-9 \\s\\.]*$")]),
    cityCtrl: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z]*$")]),
    stateCtrl: new FormControl('', [Validators.required, Validators.pattern("^[A-Z][A-Z]$")]),
    zipCtrl: new FormControl('', [Validators.required, Validators.pattern("^[0-9][0-9][0-9][0-9][0-9]$")]),
    ageCtrl: new FormControl('', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]),
    incomeCtrl: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    genderCtrl: new FormControl('', [Validators.required]),
  });

  secondFormGroup = this._formBuilder.group({
    salesPersonCtrl: new FormControl('', [Validators.required]),
    downPaymentCtrl: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    lenderCtrl: new FormControl('', [Validators.required]),
    termCtrl: new FormControl('', [Validators.required]),
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

    if(this.validate(this.firstFormGroup) && this.validate(this.secondFormGroup)) {
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
      this.customer.post(customer).subscribe((customer: any) => {
        console.log(customer);
        if (customer.id != null) {
          let vehicleCopy: any = Object.assign({}, this.vehicle);
          delete vehicleCopy['price'];
          delete vehicleCopy['dealershipId']
          delete vehicleCopy['invoice_date']
          let vehicleSold: InventorySold = vehicleCopy;

          this.inventory.transfer(vehicleSold).subscribe((vehicleSoldOut: any) => {
            console.log(vehicleSoldOut);
            if (vehicleSoldOut.id != null) {
              let sales: Sales = {
                vehicle_sold_id: vehicleSoldOut.id,
                sales_person_id: parseInt(this.secondFormGroup.get('salesPersonCtrl')!.value!),
                customer_id: customer.id,
                dealership_id: this.vehicle.dealershipId,
                sale_price: this.vehicle.price,
                down_payment: parseInt(this.secondFormGroup.get('downPaymentCtrl')!.value!),
              }
              this.sales.post(sales).subscribe((salesOut: any) => {
                console.log(salesOut);
                if (salesOut.id != null && (sales.sale_price - sales.down_payment) > 0) {
                  let loan: Loan = {
                    apr: this.termRates[this.termSelected],
                    customer_id: customer.id,
                    duration: this.termSelected,
                    lender_id: 1,
                    principal: (sales.sale_price - sales.down_payment),
                    sale_id: salesOut.id,
                    id: this.makeid()
                  }
                  this.loan.post(loan).subscribe((loanOut: any) => {
                    console.log(loanOut);
                  });
                }
                location.reload();
              });
            }
          })
        }
      });
    }
  }

  calcPayment(): void {
    let mAPR: number = ((this.termRates[this.termSelected] / 100) / 12);

    let numerator = mAPR * (this.vehicle.price - this.downPayment);
    let denominator = 1 - Math.pow((1 + mAPR), (this.termSelected * -1));

    this.estimatedPayment = Math.max(0,Math.round((numerator / denominator) * 100) / 100);
  }

  makeid(): string {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let numbers = '0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < 3; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    for ( let i = 4; i < 12; i++ ) {
      result += numbers.charAt(Math.floor(Math.random() * charactersLength)).toString();
    }

    return result;
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
