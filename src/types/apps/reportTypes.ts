export type MonthlyCollectionType = {
  month: string
  label: string
  amount: number
}

export type ExpiringContractType = {
  id: number
  property_name: string
  tenant_name: string
  end_date: string
  days_remaining: number
  rent_amount: number
}

export type RecentPaymentType = {
  id: number
  label: string
  amount: number
  paid_at: string | null
  payment_method: string | null
  property_name: string
  tenant_name: string
}

export type UpcomingPaymentType = {
  id: number
  label: string
  amount: number
  due_date: string | null
  status: string
  property_name: string
  tenant_name: string
}

export type TopPropertyType = {
  property_id: number
  property_name: string
  total_rent: number
}

export type DashboardReportsType = {
  contracts_by_status: {
    total: number
    active: number
    draft: number
    expired: number
    cancelled: number
  }
  financial_summary: {
    total_collected: number
    total_outstanding: number
    total_overdue: number
    total_active_rent: number
    pending_payments_count: number
  }
  monthly_collection: MonthlyCollectionType[]
  occupancy_rate: {
    total_properties: number
    occupied: number
    vacant: number
    rate: number
  }
  expiring_contracts: ExpiringContractType[]
  recent_payments: RecentPaymentType[]
  upcoming_payments: UpcomingPaymentType[]
  top_properties: TopPropertyType[]
}
