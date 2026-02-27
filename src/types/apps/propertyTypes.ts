export type PropertyType = {
  id: number
  status: string
  property_type: string
  public_name: string
  building_name: string
  unit_number: string | null
  city: string
  area: string | null
  bedrooms: number
  bathrooms: number
  area_sqft: string
  monthly_rent: string | null
  furnished_status: string | null
  owner: {
    id: number
    full_name: string
  } | null
  image: string | null
  created_at: string
}

export type PropertyPhotoType = {
  id: number
  url: string
  sort_order: number
}

export type PropertyDetailType = {
  id: number
  status: string

  // Basic Information
  property_type: string
  unit_number: string | null
  floor_number: string | null
  building_name: string | null
  area_sqft: string
  bedrooms: number
  bathrooms: number
  max_guests: number
  maid_room: boolean
  balcony: boolean
  smart_home: boolean
  view: string | null
  furnished_status: string | null
  ceiling_height: string | null

  // Address
  address_line_1: string | null
  address_line_2: string | null
  country: string | null
  state: string | null
  city: string | null
  zip_code: string | null
  area: string | null
  latitude: string | null
  longitude: string | null

  // Parking
  parking_spaces: string | null
  parking_type: string | null

  // Description
  public_name: string
  short_description: string | null
  long_description: string | null
  internal_notes: string | null

  // Amenities
  amenities_general: string[]
  amenities_kitchen: string[]
  amenities_essentials: string[]
  amenities_safety: string[]

  // Usage
  usage_type: string | null
  monthly_rent: string | null
  security_deposit_required: boolean
  security_deposit_amount: string | null

  // Policies
  policies: { name: string; description: string }[]

  // Agreement
  acquisition_method: string | null
  rent_amount: string | null
  rent_frequency: string | null
  payment_method: string | null
  tenancy_start_date: string | null
  tenancy_end_date: string | null
  tenancy_agreement_url: string | null
  ejari_certificate_url: string | null
  dcpm_letter_url: string | null
  purchase_price: string | null
  purchase_date: string | null
  spa_url: string | null
  payment_proof_url: string | null
  finance_items: { label: string; amount: string; due_date: string; status: string }[]
  dewa_number: string | null
  internet_account_number: string | null
  gas_number: string | null

  // Relationships
  owner: {
    id: number
    full_name: string
    email: string | null
    phone: string | null
  } | null
  property_manager: {
    id: number
    full_name: string
    email: string | null
    phone: string | null
    company_name: string | null
  } | null
  photos: PropertyPhotoType[]

  created_at: string
  updated_at: string
}

export type PropertyStatsType = {
  total: number
  occupied: number
  vacant: number
  under_maintenance: number
}

export type LinkedOwnerType = {
  id: number
  full_name: string
  email: string
}
