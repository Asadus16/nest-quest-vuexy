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
  owned_by: string | null
  condition: string | null
  property: { id: number; public_name: string } | null
  created_at: string
  updated_at: string
}

export type InventoryStatsType = {
  total_items: number
  total_worth: number
  under_warranty: number
  warranty_expired: number
  pm_owned: number
  po_owned: number
  condition_new: number
  condition_good: number
  condition_fair: number
  condition_poor: number
  condition_damaged: number
}
