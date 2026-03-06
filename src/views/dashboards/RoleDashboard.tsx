'use client'

// React Imports
import type { ReactNode } from 'react'

// Hook Imports
import { useRole } from '@/contexts/roleContext'

// Component Imports
import TenantDashboardStats from './TenantDashboardStats'
import OwnerDashboardStats from './OwnerDashboardStats'

const RoleDashboard = ({ pmDashboard }: { pmDashboard: ReactNode }) => {
  const { role } = useRole()

  if (role === 'tenant') return <TenantDashboardStats />
  if (role === 'property-owner') return <OwnerDashboardStats />

  return <>{pmDashboard}</>
}

export default RoleDashboard
