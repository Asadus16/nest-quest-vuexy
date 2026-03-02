import { apiFetch } from '@/lib/api'
import type { DashboardReportsType } from '@/types/apps/reportTypes'

export async function getDashboardReports(): Promise<DashboardReportsType> {
  const res = await apiFetch<{ data: DashboardReportsType }>('/pm/reports/dashboard')

  return res.data
}
