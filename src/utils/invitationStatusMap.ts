import type { ThemeColor } from '@core/types'

export const invitationStatusColors: Record<string, ThemeColor> = {
  ACCEPTED: 'success',
  PENDING: 'warning',
  REJECTED: 'error',
  EXPIRED: 'secondary'
}

export const invitationStatusLabels: Record<string, string> = {
  ACCEPTED: 'Linked',
  PENDING: 'Pending',
  REJECTED: 'Rejected',
  EXPIRED: 'Expired'
}
