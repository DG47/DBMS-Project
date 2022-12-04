export interface Loan {
  id: string,
  principal: number,
  apr: number,
  duration: number,
  lender_id: number,
  sale_id: number,
  customer_id: number
}
