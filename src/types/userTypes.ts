export const validRoles = ['property-manager', 'property-owner', 'tenant', 'guest'] as const

export type UserRole = (typeof validRoles)[number]

export type UserType = {
  role: UserRole
  title: string
  subtitle: string
  imgSrc: string
  recommended: boolean
  features: string[]
}

export const roleNames: Record<UserRole, string> = {
  'property-manager': 'Property Manager',
  'property-owner': 'Property Owner',
  tenant: 'Tenant',
  guest: 'Guest'
}
