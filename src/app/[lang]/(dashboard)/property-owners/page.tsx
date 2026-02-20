// Component Imports
import PropertyOwnerList from '@views/property-owners'

// Data Imports
import { getPropertyOwnerData } from '@/app/server/actions'

const PropertyOwnersPage = async () => {
  const data = await getPropertyOwnerData()

  return <PropertyOwnerList ownerData={data} />
}

export default PropertyOwnersPage
