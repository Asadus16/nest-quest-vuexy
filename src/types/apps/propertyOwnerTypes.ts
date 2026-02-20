// Type Imports
import type { ThemeColor } from '@core/types'

export type PropertyOwnerType = {
  id: number
  fullName: string
  email: string
  contact: string
  properties: number
  status: 'linked' | 'pending' | 'rejected'
  avatar: string
  avatarColor?: ThemeColor
  city: string
  invitedDate: string
  linkedDate?: string
}
