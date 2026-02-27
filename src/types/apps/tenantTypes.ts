export type TenantInvitationType = {
  id: number
  email: string
  phone: string | null
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED' | 'CREATED'
  tenant: {
    id: number
    full_name: string
    dob: string | null
    nationality: string | null
    address: string | null
    emirates_id_number: string | null
    emirates_id_expiry: string | null
    emirates_id_front_url: string | null
    emirates_id_back_url: string | null
    passport_number: string | null
    passport_expiry: string | null
    passport_issued_country: string | null
    passport_copy_url: string | null
    user?: {
      email: string
      phone: string | null
    }
  } | null
  property_manager: {
    id: number
    full_name: string
    phone: string | null
    dob: string | null
    nationality: string | null
    emirates_id_number: string | null
    emirates_id_expiry: string | null
    emirates_id_front_url: string | null
    emirates_id_back_url: string | null
    passport_number: string | null
    passport_expiry: string | null
    passport_copy_url: string | null
    company_name: string | null
    company_email: string | null
    company_logo_url: string | null
    trade_license_number: string | null
    trade_license_expiry: string | null
    trade_license_url: string | null
    user?: {
      email: string
      phone: string | null
    }
  } | null
  responded_at: string | null
  expires_at: string | null
  created_at: string | null
}

export type TenantStatsType = {
  total_linked: number
  invites_sent: number
  tenants_created: number
  linked_this_month: number
}
