export type OwnerInvitationType = {
  id: number
  email: string
  phone: string | null
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED'
  owner: {
    id: number
    full_name: string
    dob: string | null
    nationality: string | null
    emirates_id_number: string | null
    emirates_id_expiry: string | null
    emirates_id_front_url: string | null
    emirates_id_back_url: string | null
    passport_number: string | null
    passport_expiry: string | null
    passport_issued_country: string | null
    passport_copy_url: string | null
    bank_name: string | null
    bank_branch: string | null
    account_number: string | null
    iban: string | null
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
    company_address: string | null
    company_city: string | null
    company_area: string | null
    company_logo_url: string | null
    trade_license_number: string | null
    trade_license_expiry: string | null
    trade_license_url: string | null
    bank_name: string | null
    bank_branch: string | null
    account_number: string | null
    iban: string | null
    properties_count: number
    owners_count: number
    tenancies_count: number
    user?: {
      email: string
      phone: string | null
    }
  } | null
  responded_at: string | null
  expires_at: string | null
  created_at: string | null
}

export type InvitationStatsType = {
  total_linked: number
  invites_sent: number
  properties_managed: number
  linked_this_month: number
}
