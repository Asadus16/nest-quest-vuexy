import type { UserRole } from '@/types/userTypes'

/**
 * Role-based route permissions.
 * Each role has a list of route prefixes it can access.
 * Routes not listed here are accessible to all authenticated users.
 */
export const roleRoutes: Record<UserRole, string[]> = {
  'property-manager': [
    '/property-owners',
    '/owner-properties',
    '/properties',
    '/add-property',
    '/inventory',
    '/contracts',
    '/add-contract',
    '/view-contract',
    '/contract-financials',
    '/view-owner',
    '/dashboards',
    '/reviews',
    '/reports',
    '/rental-properties',
    '/tenants',
    '/rental-calculator',
    '/guests',
    '/bookings',
    '/enquiries',
    '/developers',
    '/projects',
    '/leads',
    '/transactions',
    '/ledger-pm',
    '/ledger-po',
    '/financial-statement',
    '/view-tenant',
    '/view-inventory'
  ],
  'property-owner': [
    '/dashboards',
    '/owner/properties',
    '/owner/dashboard',
    '/owner/transactions',
    '/properties/view',
    '/contracts',
    '/view-contract',
    '/property-owners',
    '/view-manager',
    '/profile'
  ],
  tenant: [
    '/dashboards',
    '/contracts',
    '/view-contract',
    '/notices',
    '/renewal-offers',
    '/manager-requests',
    '/view-manager'
  ],
  guest: [
    '/dashboards'
  ]
}

/** Routes that don't require authentication (no role cookie needed) */
export const publicRoutes = [
  '/select-role',
  '/login',
  '/register',
  '/forgot-password'
]

/**
 * Check if a role has access to a given path.
 * Returns true if the path matches any of the role's allowed route prefixes.
 */
export const hasRouteAccess = (role: UserRole, path: string): boolean => {
  const allowedRoutes = roleRoutes[role]

  return allowedRoutes.some(route => path.startsWith(route))
}
