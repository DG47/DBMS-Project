export interface Inventory {
  vin:string,
  make:string,
  model:string,
  model_year:number,
  engine:string,
  mileage:number,
  price:number,
  color:string,
  transmission:string,
  drive:string,
  fuel:string,
  invoice_date?: Date,
  dealershipId: number
}
