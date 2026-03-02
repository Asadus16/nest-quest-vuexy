import { apiFetch, apiFetchFormData } from '@/lib/api'
import type {
  ContractType,
  ContractDetailType,
  ContractStatsType,
  LinkedTenantType,
  TenancyNoticeType
} from '@/types/apps/contractTypes'

// PM endpoints
export async function getTenancies(): Promise<ContractType[]> {
  const res = await apiFetch<{ data: ContractType[] }>('/pm/tenancies')

  return res.data
}

export async function getTenancyStats(): Promise<ContractStatsType> {
  const res = await apiFetch<{ data: ContractStatsType }>('/pm/tenancies/stats')

  return res.data
}

export async function getTenancy(id: number): Promise<ContractDetailType> {
  const res = await apiFetch<{ data: ContractDetailType }>(`/pm/tenancies/${id}`)

  return res.data
}

export async function createTenancy(formData: FormData): Promise<{ data: ContractDetailType }> {
  return apiFetchFormData<{ data: ContractDetailType }>('/pm/tenancies', formData)
}

export async function deleteTenancy(id: number): Promise<void> {
  await apiFetch(`/pm/tenancies/${id}`, { method: 'DELETE' })
}

export async function getLinkedTenants(): Promise<LinkedTenantType[]> {
  const res = await apiFetch<{ data: LinkedTenantType[] }>('/pm/linked-tenants')

  return res.data
}

export async function markPaymentPaid(
  paymentId: number,
  formData?: FormData
): Promise<void> {
  if (formData) {
    await apiFetchFormData(`/pm/tenancy-payments/${paymentId}/mark-paid`, formData)
  } else {
    await apiFetch(`/pm/tenancy-payments/${paymentId}/mark-paid`, { method: 'POST' })
  }
}

// Notice endpoints (PM)
export async function createNotice(
  tenancyId: number,
  data: { notice_type: string; subject: string; body: string; metadata?: Record<string, unknown> }
): Promise<TenancyNoticeType> {
  const res = await apiFetch<{ data: TenancyNoticeType }>(`/pm/tenancies/${tenancyId}/notices`, {
    method: 'POST',
    body: JSON.stringify(data)
  })

  return res.data
}

// Tenant endpoints
export async function getTenantTenancies(): Promise<ContractType[]> {
  const res = await apiFetch<{ data: ContractType[] }>('/tenant/tenancies')

  return res.data
}

export async function getTenantTenancy(id: number): Promise<ContractDetailType> {
  const res = await apiFetch<{ data: ContractDetailType }>(`/tenant/tenancies/${id}`)

  return res.data
}

// Owner endpoints
export async function getOwnerTenancies(): Promise<ContractType[]> {
  const res = await apiFetch<{ data: ContractType[] }>('/owner/tenancies')

  return res.data
}

export async function getOwnerTenancy(id: number): Promise<ContractDetailType> {
  const res = await apiFetch<{ data: ContractDetailType }>(`/owner/tenancies/${id}`)

  return res.data
}

// Tenant notice endpoints
export async function getUnreadNoticeCount(): Promise<number> {
  const res = await apiFetch<{ data: { count: number } }>('/tenant/notices/unread-count')

  return res.data.count
}

export async function markNoticeRead(noticeId: number): Promise<void> {
  await apiFetch(`/tenant/notices/${noticeId}/mark-read`, { method: 'POST' })
}
