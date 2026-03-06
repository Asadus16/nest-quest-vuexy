export type TransactionDocumentType = {
  id: number
  doc_type: 'BILL' | 'PAYMENT_PROOF' | 'RECEIPT' | 'OTHER'
  file_url: string
  created_at: string
}

export type FinancialTransactionType = {
  id: number
  property_id: number
  tenancy_id: number | null
  owner_id: number
  type: 'INCOME' | 'EXPENSE'
  category: string
  amount: number
  currency: string
  description: string | null
  paid_by: string | null
  received_by: string | null
  responsibility: string | null
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED'
  transaction_date: string
  proof_url: string | null
  is_settled: boolean
  settled_at: string | null
  documents: TransactionDocumentType[]
  created_at: string
}

export type LedgerTransferType = {
  id: number
  property_id: number | null
  tenancy_id: number | null
  owner_id: number
  direction: 'MANAGER_TO_OWNER' | 'OWNER_TO_MANAGER'
  amount: number
  currency: string
  transfer_date: string
  proof_url: string | null
  notes: string | null
  created_at: string
}

export type ContractFinancialStatsType = {
  security_in_hand: number
  total_income: number
  total_expense: number
  net_income: number
  cash_received: number
  cash_paid: number
  net_cash: number
}

export type PropertyFinancialStatsType = {
  security_in_hand: number
  total_income: number
  total_expense: number
  total_investment: number
  inventory_value: number
  cash_received: number
  cash_paid: number
  net_cash: number
}

export type OwnerFinancialStatsType = {
  total_income: number
  total_expense: number
  total_investment: number
  net_income: number
  cash_received: number
  cash_paid: number
  net_cash: number
}

export type LedgerEntryType = {
  id: number
  date: string
  category: string
  direction: 'PM_TO_PO' | 'PO_TO_PM'
  amount: number
  is_settled: boolean
}

export type LedgerSummaryType = {
  manager_owes_owner: number
  owner_owes_manager: number
  net_balance: number
  total_collected: number
  commission: number
  total_commission: number
  agreement_type: string | null
  transfers_to_owner: number
  transfers: LedgerTransferType[]
  entries: LedgerEntryType[]
}

export type OwnerPropertyType = {
  id: number
  public_name: string
  property_type: string
  unit_number: string | null
  building_name: string | null
  city: string | null
  area: string | null
  status: string
  active_tenancy_id: number | null
}

export type PropertyTenancyType = {
  id: number
  tenant_name: string | null
  contract_start_date: string | null
  contract_end_date: string | null
  rent_amount_total: number
  status: string
}

export type UpcomingPaymentItemType = {
  id: number
  source: 'payment_schedule' | 'owner_agreement' | 'transaction'
  label: string
  amount: number
  currency: string
  due_date: string
  status: string
  property_name: string
}

export type OwnerDashboardStatsType = {
  owner_name: string
  properties_count: number
  active_contracts_count: number
  linked_pms_count: number
  monthly_income: number
  monthly_expenses: number
  monthly_net_balance: number
  held_by_pm: number
  security_deposits: number
  upcoming_payments: UpcomingPaymentItemType[]
}

export type OwnerAnalyticsPropertyType = {
  id: number
  public_name: string
  property_type: string
  purchase_price: number | null
  manager_name: string
  amount_paid: number
}

export type OwnerFinancialAnalyticsType = {
  property_value: number
  amount_invested: number
  remaining_to_pay: number
  rental_profit: number
  total_income: number
  total_expenses: number
  properties: OwnerAnalyticsPropertyType[]
}

export type OwnerPropertyFinancialSummaryType = {
  income_total: number
  expense_total: number
  net_profit: number
  cash_received: number
  cash_paid: number
  net_cash: number
}

export type TenantDashboardStatsType = {
  days_remaining: number | null
  contract_end_date: string | null
  next_due_date: string | null
  next_due_amount: number | null
  total_paid: number
  total_remaining: number
}

export type LedgerPmOwnerRowType = {
  owner_id: number
  owner_name: string
  properties_count: number
  total_collected: number
  commission: number
  paid_to_owner: number
  outstanding_balance: number
}

export type LedgerPmSummaryType = {
  total_credits: number
  total_debits: number
  total_commission: number
  outstanding_total: number
  owners: LedgerPmOwnerRowType[]
}

export type LedgerPoOwnerRowType = {
  owner_id: number
  owner_name: string
  total_credits: number
  total_debits: number
  balance: number
}

export type LedgerPoSummaryType = {
  total_credits: number
  total_debits: number
  current_balance: number
  owners: LedgerPoOwnerRowType[]
}
