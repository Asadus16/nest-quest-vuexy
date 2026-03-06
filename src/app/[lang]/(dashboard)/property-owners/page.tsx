'use client'

// Hook Imports
import { useRole } from '@/contexts/roleContext'

// Component Imports
import PropertyOwnerList from '@views/property-owners'
import ManagerRequestList from '@views/manager-requests'

const PropertyOwnersPage = () => {
  const { role } = useRole()

  if (role === 'property-owner') {
    return <ManagerRequestList />
  }

  return <PropertyOwnerList />
}

export default PropertyOwnersPage
