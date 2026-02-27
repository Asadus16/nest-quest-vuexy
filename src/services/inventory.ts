import { apiFetch, apiFetchFormData } from '@/lib/api'
import type { InventoryType, InventoryStatsType } from '@/types/apps/inventoryTypes'

export async function getInventories(propertyId?: number): Promise<InventoryType[]> {
  const query = propertyId ? `?property_id=${propertyId}` : ''
  const res = await apiFetch<{ data: InventoryType[] }>(`/pm/inventories${query}`)

  return res.data
}

export async function getInventoryStats(): Promise<InventoryStatsType> {
  const res = await apiFetch<{ data: InventoryStatsType }>('/pm/inventories/stats')

  return res.data
}

export async function getInventory(id: number): Promise<InventoryType> {
  const res = await apiFetch<{ data: InventoryType }>(`/pm/inventories/${id}`)

  return res.data
}

export async function createInventory(formData: FormData): Promise<InventoryType> {
  const res = await apiFetchFormData<{ data: InventoryType }>('/pm/inventories', formData)

  return res.data
}

export async function deleteInventory(id: number): Promise<void> {
  await apiFetch(`/pm/inventories/${id}`, { method: 'DELETE' })
}
