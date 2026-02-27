import { apiFetch } from '@/lib/api'
import type { TenantInvitationType, TenantStatsType } from '@/types/apps/tenantTypes'

type InvitationListResponse = {
  data: TenantInvitationType[]
}

type InvitationResponse = {
  data: TenantInvitationType
  message: string
}

type StatsResponse = {
  data: TenantStatsType
}

export async function sendTenantInvite(email: string, phone?: string): Promise<InvitationResponse> {
  return apiFetch<InvitationResponse>('/pm/tenant-invitations', {
    method: 'POST',
    body: JSON.stringify({ email, phone: phone || null })
  })
}

export async function createTenant(data: {
  full_name: string
  email: string
  phone?: string
  dob?: string
  nationality?: string
  address?: string
}): Promise<{ message: string; data: { id: number; full_name: string; email: string } }> {
  return apiFetch('/pm/tenants', {
    method: 'POST',
    body: JSON.stringify(data)
  })
}

export async function getTenantInvitations(): Promise<TenantInvitationType[]> {
  const res = await apiFetch<InvitationListResponse>('/pm/tenant-invitations')

  return res.data
}

export async function getTenantInvitationStats(): Promise<TenantStatsType> {
  const res = await apiFetch<StatsResponse>('/pm/tenant-invitations/stats')

  return res.data
}

export async function getTenantInvitation(invitationId: number): Promise<TenantInvitationType> {
  const res = await apiFetch<InvitationResponse>(`/pm/tenant-invitations/${invitationId}`)

  return res.data
}
