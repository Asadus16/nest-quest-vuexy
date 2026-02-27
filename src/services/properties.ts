import { apiFetch, apiFetchFormData } from '@/lib/api'
import type { PropertyType, PropertyDetailType, PropertyStatsType, LinkedOwnerType } from '@/types/apps/propertyTypes'

export async function createProperty(formData: FormData): Promise<{ data: PropertyType }> {
  return apiFetchFormData<{ data: PropertyType }>('/pm/properties', formData)
}

export async function getProperties(): Promise<PropertyType[]> {
  const res = await apiFetch<{ data: PropertyType[] }>('/pm/properties')

  return res.data
}

export async function getPropertyStats(): Promise<PropertyStatsType> {
  const res = await apiFetch<{ data: PropertyStatsType }>('/pm/properties/stats')

  return res.data
}

export async function getProperty(id: number): Promise<PropertyDetailType> {
  const res = await apiFetch<{ data: PropertyDetailType }>(`/pm/properties/${id}`)

  return res.data
}

export async function getLinkedOwners(): Promise<LinkedOwnerType[]> {
  const res = await apiFetch<{ data: LinkedOwnerType[] }>('/pm/linked-owners')

  return res.data
}

// Owner endpoints
export async function getOwnerProperties(): Promise<PropertyType[]> {
  const res = await apiFetch<{ data: PropertyType[] }>('/owner/properties')

  return res.data
}

export async function getOwnerProperty(id: number): Promise<PropertyDetailType> {
  const res = await apiFetch<{ data: PropertyDetailType }>(`/owner/properties/${id}`)

  return res.data
}
