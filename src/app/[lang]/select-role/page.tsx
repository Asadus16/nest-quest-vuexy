// Data Imports
import { userTypes } from '@/data/userTypes'

// View Imports
import SelectRolePage from '@views/select-role'

const SelectRole = () => {
  return <SelectRolePage data={userTypes} />
}

export default SelectRole
