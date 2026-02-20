export type PaymentScheduleRow = {
  id: number
  transactionType: string
  amount: string
  paymentDate: string
}

export type ContractType = {
  id: number
  tenant: string
  property: string
  startDate: string
  endDate: string
  rentAmount: number
  frequency: string
  status: string
  furnishingStatus: string
  ejariNumber: string
}
