import { apiFetch, apiFetchFormData } from '@/lib/api'
import type {
  FinancialTransactionType,
  LedgerTransferType,
  ContractFinancialStatsType,
  PropertyFinancialStatsType,
  OwnerFinancialStatsType,
  LedgerSummaryType,
  OwnerPropertyType,
  PropertyTenancyType,
  TransactionDocumentType,
  OwnerDashboardStatsType,
  OwnerFinancialAnalyticsType,
  OwnerPropertyFinancialSummaryType,
  LedgerPmSummaryType,
  LedgerPoSummaryType
} from '@/types/apps/financialTypes'

// ──────────────────────────────────────────────────────
// PM Contract-level endpoints
// ──────────────────────────────────────────────────────

export async function getContractTransactions(
  tenancyId: number,
  params?: { type?: string; category?: string }
): Promise<FinancialTransactionType[]> {
  const searchParams = new URLSearchParams()

  if (params?.type) searchParams.set('type', params.type)
  if (params?.category) searchParams.set('category', params.category)

  const query = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const res = await apiFetch<{ data: FinancialTransactionType[] }>(`/pm/tenancies/${tenancyId}/transactions${query}`)

  return res.data
}

export async function getContractFinancialStats(tenancyId: number): Promise<ContractFinancialStatsType> {
  const res = await apiFetch<{ data: ContractFinancialStatsType }>(`/pm/tenancies/${tenancyId}/financial-stats`)

  return res.data
}

export async function getContractLedger(tenancyId: number): Promise<LedgerSummaryType> {
  const res = await apiFetch<{ data: LedgerSummaryType }>(`/pm/tenancies/${tenancyId}/ledger`)

  return res.data
}

// ──────────────────────────────────────────────────────
// PM Property-level endpoints
// ──────────────────────────────────────────────────────

export async function getPropertyTransactions(
  propertyId: number,
  params?: { type?: string }
): Promise<FinancialTransactionType[]> {
  const query = params?.type ? `?type=${params.type}` : ''
  const res = await apiFetch<{ data: FinancialTransactionType[] }>(`/pm/properties/${propertyId}/transactions${query}`)

  return res.data
}

export async function getPropertyFinancialStats(propertyId: number): Promise<PropertyFinancialStatsType> {
  const res = await apiFetch<{ data: PropertyFinancialStatsType }>(`/pm/properties/${propertyId}/financial-stats`)

  return res.data
}

export async function getPropertyTenancies(propertyId: number): Promise<PropertyTenancyType[]> {
  const res = await apiFetch<{ data: PropertyTenancyType[] }>(`/pm/properties/${propertyId}/tenancies`)

  return res.data
}

// ──────────────────────────────────────────────────────
// PM Owner-level endpoints (PM viewing owner data)
// ──────────────────────────────────────────────────────

export async function getPmOwnerProperties(ownerId: number): Promise<OwnerPropertyType[]> {
  const res = await apiFetch<{ data: OwnerPropertyType[] }>(`/pm/owners/${ownerId}/properties`)

  return res.data
}

export async function getOwnerFinancialStats(ownerId: number): Promise<OwnerFinancialStatsType> {
  const res = await apiFetch<{ data: OwnerFinancialStatsType }>(`/pm/owners/${ownerId}/financial-stats`)

  return res.data
}

// ──────────────────────────────────────────────────────
// PM Ledger views
// ──────────────────────────────────────────────────────

export async function getLedgerPmSummary(): Promise<LedgerPmSummaryType> {
  const res = await apiFetch<{ data: LedgerPmSummaryType }>('/pm/ledger-pm')

  return res.data
}

export async function getLedgerPoSummary(): Promise<LedgerPoSummaryType> {
  const res = await apiFetch<{ data: LedgerPoSummaryType }>('/pm/ledger-po')

  return res.data
}

// ──────────────────────────────────────────────────────
// PM Mutations
// ──────────────────────────────────────────────────────

export async function createTransaction(formData: FormData): Promise<FinancialTransactionType> {
  const res = await apiFetchFormData<{ data: FinancialTransactionType }>('/pm/transactions', formData)

  return res.data
}

export async function createTransfer(formData: FormData): Promise<LedgerTransferType> {
  const res = await apiFetchFormData<{ data: LedgerTransferType }>('/pm/transfers', formData)

  return res.data
}

export async function uploadPmTransactionDocument(
  transactionId: number,
  formData: FormData
): Promise<TransactionDocumentType> {
  const res = await apiFetchFormData<{ data: TransactionDocumentType }>(
    `/pm/transactions/${transactionId}/documents`,
    formData
  )

  return res.data
}

export async function deletePmTransactionDocument(transactionId: number, documentId: number): Promise<void> {
  await apiFetch(`/pm/transactions/${transactionId}/documents/${documentId}`, { method: 'DELETE' })
}

// ──────────────────────────────────────────────────────
// Owner self-service endpoints
// ──────────────────────────────────────────────────────

export async function getOwnerTransactions(
  params?: { property_id?: number; type?: string; from?: string; to?: string }
): Promise<FinancialTransactionType[]> {
  const searchParams = new URLSearchParams()

  if (params?.property_id) searchParams.set('property_id', String(params.property_id))
  if (params?.type) searchParams.set('type', params.type)
  if (params?.from) searchParams.set('from', params.from)
  if (params?.to) searchParams.set('to', params.to)

  const query = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const res = await apiFetch<{ data: FinancialTransactionType[] }>(`/owner/transactions${query}`)

  return res.data
}

export async function getOwnerDashboard(): Promise<OwnerDashboardStatsType> {
  const res = await apiFetch<{ data: OwnerDashboardStatsType }>('/owner/dashboard')

  return res.data
}

export async function getOwnerFinancialAnalytics(
  params?: { from?: string; to?: string }
): Promise<OwnerFinancialAnalyticsType> {
  const searchParams = new URLSearchParams()

  if (params?.from) searchParams.set('from', params.from)
  if (params?.to) searchParams.set('to', params.to)

  const query = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const res = await apiFetch<{ data: OwnerFinancialAnalyticsType }>(`/owner/financial-analytics${query}`)

  return res.data
}

export async function getOwnerPropertyFinancialSummary(
  propertyId: number
): Promise<OwnerPropertyFinancialSummaryType> {
  const res = await apiFetch<{ data: OwnerPropertyFinancialSummaryType }>(
    `/owner/properties/${propertyId}/financial-summary`
  )

  return res.data
}

export async function createOwnerTransaction(formData: FormData): Promise<FinancialTransactionType> {
  const res = await apiFetchFormData<{ data: FinancialTransactionType }>('/owner/transactions', formData)

  return res.data
}

export async function updateOwnerTransaction(
  transactionId: number,
  data: { is_settled?: boolean; description?: string }
): Promise<FinancialTransactionType> {
  const res = await apiFetch<{ data: FinancialTransactionType }>(`/owner/transactions/${transactionId}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  })

  return res.data
}

export async function uploadOwnerTransactionDocument(
  transactionId: number,
  formData: FormData
): Promise<TransactionDocumentType> {
  const res = await apiFetchFormData<{ data: TransactionDocumentType }>(
    `/owner/transactions/${transactionId}/documents`,
    formData
  )

  return res.data
}

export async function deleteOwnerTransactionDocument(transactionId: number, documentId: number): Promise<void> {
  await apiFetch(`/owner/transactions/${transactionId}/documents/${documentId}`, { method: 'DELETE' })
}
