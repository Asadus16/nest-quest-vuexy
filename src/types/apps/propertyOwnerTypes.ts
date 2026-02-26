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
    emirates_id_copy: string | null
    passport_number: string | null
    passport_expiry: string | null
    passport_issued_country: string | null
    passport_copy: string | null
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
    emirates_id_copy: string | null
    passport_number: string | null
    passport_expiry: string | null
    passport_copy: string | null
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
