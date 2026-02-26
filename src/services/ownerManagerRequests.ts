import { apiFetch } from '@/lib/api'
import type { OwnerInvitationType } from '@/types/apps/propertyOwnerTypes'

type InvitationListResponse = {
  data: OwnerInvitationType[]
}

type InvitationResponse = {
  data: OwnerInvitationType
  message: string
}

export async function getOwnerInvitation(invitationId: number): Promise<OwnerInvitationType> {
  const res = await apiFetch<InvitationResponse>(`/owner/invitations/${invitationId}`)

  return res.data
}

export async function getOwnerInvitations(): Promise<OwnerInvitationType[]> {
  const res = await apiFetch<InvitationListResponse>('/owner/invitations')

  return res.data
}

export async function respondToInvitation(
  invitationId: number,
  status: 'ACCEPTED' | 'REJECTED'
): Promise<InvitationResponse> {
  return apiFetch<InvitationResponse>(`/owner/invitations/${invitationId}/respond`, {
    method: 'POST',
    body: JSON.stringify({ status })
  })
}
