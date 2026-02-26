import { apiFetch } from '@/lib/api'
import type { OwnerInvitationType, InvitationStatsType } from '@/types/apps/propertyOwnerTypes'

type InvitationListResponse = {
  data: OwnerInvitationType[]
}

type InvitationResponse = {
  data: OwnerInvitationType
  message: string
}

type StatsResponse = {
  data: InvitationStatsType
}

export async function sendInvite(email: string, phone?: string): Promise<InvitationResponse> {
  return apiFetch<InvitationResponse>('/pm/owner-invitations', {
    method: 'POST',
    body: JSON.stringify({ email, phone: phone || null })
  })
}

export async function getInvitations(): Promise<OwnerInvitationType[]> {
  const res = await apiFetch<InvitationListResponse>('/pm/owner-invitations')

  return res.data
}

export async function getInvitationStats(): Promise<InvitationStatsType> {
  const res = await apiFetch<StatsResponse>('/pm/owner-invitations/stats')

  return res.data
}

export async function getInvitation(invitationId: number): Promise<OwnerInvitationType> {
  const res = await apiFetch<InvitationResponse>(`/pm/owner-invitations/${invitationId}`)

  return res.data
}
