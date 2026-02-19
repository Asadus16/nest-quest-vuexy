'use client'

// MUI Imports
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

// Type Imports
import type { UserType } from '@/types/userTypes'

// Component Imports
import UserTypeCard from './UserTypeCard'

const UserSelection = ({ data }: { data: UserType[] }) => {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col justify-center items-center gap-2'>
        <Typography variant='h3'>Welcome to Nest Quest</Typography>
        <div className='flex items-center text-center flex-col'>
          <Typography>
            Choose your role to get started. Each role provides tailored tools and features for your needs.
          </Typography>
        </div>
      </div>
      <Grid container spacing={6}>
        {data.map((userType, index) => (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={index}>
            <UserTypeCard data={userType} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default UserSelection
