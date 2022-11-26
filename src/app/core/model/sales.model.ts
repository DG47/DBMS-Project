export interface Sales {
  id:number,
  vin:string,
  transaction_date:Date,
  sales_person_id:number,
  customer_id:number,
  dealership_id:number,
  sale_price:number,
  trade_in_value:number,
  down_payment:number,
  dealer_net:number,
  paid_in_full:boolean,

}
