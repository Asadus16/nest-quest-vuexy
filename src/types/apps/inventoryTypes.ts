export type InventoryType = {
  id: number
  name: string
  description: string | null
  type: string
  room_assigned: string | null
  brand: string | null
  serial_number: string | null
  current_worth: number | null
  warranty_start: string | null
  warranty_end: string | null
  photo_url: string | null
  notes: string | null
  property: { id: number; public_name: string } | null
  created_at: string
  updated_at: string
}

export type InventoryStatsType = {
  total_items: number
  total_worth: number
  under_warranty: number
  warranty_expired: number
}
