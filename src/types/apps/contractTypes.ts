export type TenancyPaymentScheduleType = {
  id: number
  label: string
  year_number: number
  amount: number
  currency: string
  due_date: string
  status: string
  payment_method: string | null
  received_by: string | null
  notes: string | null
  payment_date: string | null
  proof_of_payment: string | null
  paid_at: string | null
}

export type TenancyDocumentType = {
  id: number
  doc_type: string
  file_url: string
  file_name: string | null
  file_size: number | null
  mime_type: string | null
  created_at: string
}

export type TenancyEntryPhotoType = {
  id: number
  url: string
  label: string | null
  sort_order: number
}

export type TenancyActivityLogType = {
  id: number
  action: string
  description: string
  metadata: Record<string, unknown> | null
  actor_name: string
  created_at: string
}

export type TenancyNoticeType = {
  id: number
  notice_type: string
  subject: string
  body: string
  metadata: Record<string, unknown> | null
  is_read: boolean
  read_at: string | null
  sender_name: string
  created_at: string
}

export type TenantDetailType = {
  id: number
  full_name: string
  dob: string | null
  nationality: string | null
  emirates_id_number: string | null
  emirates_id_expiry: string | null
  passport_number: string | null
  passport_expiry: string | null
  passport_issued_country: string | null
  passport_copy_url: string | null
  emirates_id_front_url: string | null
  emirates_id_back_url: string | null
  address: string | null
  email: string | null
  phone: string | null
}

export type OwnerDetailType = {
  id: number
  full_name: string
  dob: string | null
  nationality: string | null
  emirates_id_number: string | null
  emirates_id_expiry: string | null
  passport_number: string | null
  passport_expiry: string | null
  passport_issued_country: string | null
  passport_copy_url: string | null
  emirates_id_front_url: string | null
  emirates_id_back_url: string | null
  bank_name: string | null
  bank_branch: string | null
  account_number: string | null
  iban: string | null
  email: string | null
  phone: string | null
}

export type PropertyDetailInContractType = {
  id: number
  public_name: string
  property_type: string | null
  bedrooms: number | null
  bathrooms: number | null
  area_sqft: number | null
  unit_number: string | null
  floor_number: string | null
  building_name: string | null
  address_line_1: string | null
  city: string | null
  area: string | null
  status: string | null
}

export type OwnerAgreementScheduleType = {
  id: number
  label: string
  amount: number
  currency: string
  due_date: string
  status: string
  payment_method: string | null
  proof_of_payment: string | null
  paid_at: string | null
}

export type OwnerAgreementDetailType = {
  id: number
  agreement_type: 'PERCENTAGE' | 'FIXED_FEE' | 'SUBLEASE'
  commission_percentage: number | null
  inclusive_of_agency_fee: boolean
  fixed_fee_amount: number | null
  computed_commission: number | null
  payout_amount: number | null
  payout_frequency: string | null
  currency: string
  schedules: OwnerAgreementScheduleType[]
}

export type ContractType = {
  id: number
  property: { id: number; public_name: string } | null
  tenant: { id: number; full_name: string } | null
  owner: { id: number; full_name: string } | null
  contract_start_date: string
  contract_end_date: string
  rent_amount_total: number
  rent_frequency: string
  deposit_required: boolean
  deposit_amount: number | null
  agency_fee_required: boolean
  agency_fee_amount: number | null
  utilities_included: boolean
  utilities: string[] | null
  max_utilities_per_month: number | null
  maintenance_included: boolean
  maintenance_responsibility: string | null
  maintenance_threshold: number | null
  furnishing_status: string | null
  ejari_number: string | null
  owner_agreement_type: string | null
  status: string
  currency: string
  created_at: string
  updated_at: string
}

export type ContractDetailType = Omit<ContractType, 'property' | 'tenant' | 'owner'> & {
  property: PropertyDetailInContractType | null
  tenant: TenantDetailType | null
  owner: OwnerDetailType | null
  documents: TenancyDocumentType[]
  entry_photos: TenancyEntryPhotoType[]
  payment_schedules: TenancyPaymentScheduleType[]
  activity_logs: TenancyActivityLogType[]
  notices: TenancyNoticeType[]
  owner_agreement: OwnerAgreementDetailType | null
}

export type ContractStatsType = {
  total_contracts: number
  active: number
  expired: number
  draft: number
}

export type PaymentScheduleRow = {
  id: number
  transactionType: string
  amount: string
  paymentDate: string
}

export type OwnerAgreementScheduleRow = {
  id: number
  label: string
  amount: string
  paymentDate: string
}

export type LinkedTenantType = {
  id: number
  full_name: string
  user: { email: string; phone: string | null } | null
}
