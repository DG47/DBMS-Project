import {Component} from '@angular/core';
import {SalesService} from 'src/app/core/service/sales.service';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss']
})

// sale_id	vehicle_vin	transaction_date	sale_price	down_payment	loan_id	principal	duration	apr	lender_name	dealership_city	dealership_zip	region_name	make	model	model_year	invoice_date	customer_name	sales_person	dealership_manager	regional_manager
export class FinanceComponent {
  sales_detail: any;
  agg_data: any;
  option: string = "Salesperson";
  options: string[] = ["Salesperson", "Dealership", "Region", "Lender"];
  column_mapper: { [key: string]: string; } = {
    "sale_id": "SaleID	",
    "vehicle_vin": "Vehicle Identification Number",
    "transaction_date": "Transaction Data",
    "sale_price": "Sale Price",
    "down_payment": "Down Payment",
    "loan_id": "Loan ID",
    "principal": "Principal",
    "duration": "Duration",
    "apr": "Apr",
    "lender_name": "Lender Name",
    "dealership_city": "Dealership City",
    "dealership_zip": "Dealership Zip",
    "region_name": "Region Name",
    "make": "Make",
    "model": "Model",
    "model_year": "Model Year",
    "invoice_date": "Invoice Date",
    "customer_name": " Customer Name",
    "sales_person": "Sales Person",
    "dealership_manager": "Dealership Manager",
    "regional_manager": "Reagional Manager"
  }


  constructor(private sales_service: SalesService) {
    this.sales_service.get_sales_details().subscribe((data: any) => {
      this.sales_detail = data;
      console.log(this.sales_detail)
    });

    this.sales_service.get_salesperson_agg().subscribe((data: any) => {
      this.agg_data = data;
      console.log(this.agg_data)
    });

  }

  get_keys(data: any): any {
    return Object.keys(data)
  }

  switch(): void {
    if (this.option == "Salesperson") {
      this.sales_service.get_salesperson_agg().subscribe((data: any) => {
        this.agg_data = data;
        console.log(this.agg_data)
      });
    }
    if (this.option == "Dealership") {
      this.sales_service.get_dealership_agg().subscribe((data: any) => {
        this.agg_data = data;
        console.log(this.agg_data)
      });
    }
    if (this.option == "Region") {
      this.sales_service.get_region_agg().subscribe((data: any) => {
        this.agg_data = data;
        console.log(this.agg_data)
      });
    }
    if (this.option == "Lender") {
      this.sales_service.get_lender_agg().subscribe((data: any) => {
        this.agg_data = data;
        console.log(this.agg_data)
      });
    }


  }
}
