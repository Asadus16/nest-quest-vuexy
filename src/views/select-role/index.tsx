'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

// Type Imports
import type { UserType } from '@/types/userTypes'

// Component Imports
import UserSelection from '@components/user-selection'

const SelectRolePage = ({ data }: { data: UserType[] }) => {
  return (
    <div className='flex justify-center items-center min-bs-full p-6'>
      <Card className='max-is-[1440px] is-full'>
        <CardContent className='xl:!plb-16 xl:pli-[6.25rem] pbs-10 pbe-5 pli-5 sm:p-16'>
          <UserSelection data={data} />
        </CardContent>
      </Card>
    </div>
  )
}

export default SelectRolePage
