import { apiFetch } from '@/lib/api'
import type { TenantInvitationType } from '@/types/apps/tenantTypes'

type InvitationListResponse = {
  data: TenantInvitationType[]
}

type InvitationResponse = {
  data: TenantInvitationType
  message: string
}

export async function getTenantInvitation(invitationId: number): Promise<TenantInvitationType> {
  const res = await apiFetch<InvitationResponse>(`/tenant/invitations/${invitationId}`)

  return res.data
}

export async function getTenantInvitations(): Promise<TenantInvitationType[]> {
  const res = await apiFetch<InvitationListResponse>('/tenant/invitations')

  return res.data
}

export async function respondToTenantInvitation(
  invitationId: number,
  status: 'ACCEPTED' | 'REJECTED'
): Promise<InvitationResponse> {
  return apiFetch<InvitationResponse>(`/tenant/invitations/${invitationId}/respond`, {
    method: 'POST',
    body: JSON.stringify({ status })
  })
}
