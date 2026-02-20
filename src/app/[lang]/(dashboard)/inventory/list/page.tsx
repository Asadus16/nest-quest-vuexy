// Component Imports
import InventoryList from '@views/inventory/list'

// Data Imports
import { getInventoryData } from '@/app/server/actions'

const InventoryListPage = async () => {
  const data = await getInventoryData()

  return <InventoryList inventoryData={data} />
}

export default InventoryListPage
