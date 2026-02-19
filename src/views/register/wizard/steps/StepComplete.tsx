'use client'

// Next Imports
import { useParams } from 'next/navigation'
import Link from 'next/link'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Type Imports
import type { Locale } from '@configs/i18n'
import type { StepProps } from '../types'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

const StepComplete = ({ activeStep, handlePrev }: StepProps) => {
  const { lang: locale } = useParams()

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <div className='flex flex-col items-center gap-4 pbs-10 pbe-10'>
          <div className='flex justify-center'>
            <i className='tabler-circle-check text-[80px] text-success' />
          </div>
          <Typography variant='h4' className='text-center'>
            Registration Complete!
          </Typography>
          <Typography variant='body1' color='text.secondary' className='text-center max-is-[500px]'>
            Your account has been successfully created. You can now sign in to access your dashboard and start managing
            your properties.
          </Typography>
          <Button
            variant='contained'
            component={Link}
            href={getLocalizedUrl('/login', locale as Locale)}
            startIcon={<i className='tabler-login' />}
            size='large'
          >
            Sign In
          </Button>
        </div>
      </Grid>
    </Grid>
  )
}

export default StepComplete
