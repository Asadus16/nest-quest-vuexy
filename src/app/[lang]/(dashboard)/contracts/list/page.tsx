// Component Imports
import ContractList from '@views/contracts/list'

// Data Imports
import { getContractData } from '@/app/server/actions'

const ContractListPage = async () => {
  const data = await getContractData()

  return <ContractList contractData={data} />
}

export default ContractListPage
