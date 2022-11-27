export interface Inventory {
  vin:string,
  make:string,
  model:string,
  model_year:number,
  type:string,
  engine:string,
  mileage:number,
  price:number,
  color:string,
  transmission:string,
  drive:string,
  fuel:string,
  sold: boolean
  invoice_date?: Date,
  dealershipId: number
}
