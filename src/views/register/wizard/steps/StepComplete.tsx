'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import { useParams } from 'next/navigation'
import Link from 'next/link'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Context Imports
import { useAuth } from '@/contexts/authContext'
import { useRegistration } from '@/contexts/registrationContext'

// Service Imports
import { ApiError } from '@/services/auth'

// Type Imports
import type { Locale } from '@configs/i18n'
import type { StepProps } from '../types'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

const StepComplete = ({ activeStep, handlePrev }: StepProps) => {
  const { lang: locale } = useParams()
  const { register: authRegister } = useAuth()
  const { getRegisterPayload, getRegisterFormData, formFiles } = useRegistration()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleRegister = async () => {
    setError(null)
    setLoading(true)
    try {
      const hasFiles = Object.keys(formFiles).length > 0
      const payload = hasFiles ? getRegisterFormData() : getRegisterPayload()
      await authRegister(payload)
      window.location.href = getLocalizedUrl('/dashboards/analytics', locale as Locale)
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Registration failed. Please try again.'
      setError(typeof message === 'string' ? message : JSON.stringify(message))
    } finally {
      setLoading(false)
    }
  }

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
            Click the button below to create your account and sign in.
          </Typography>
          {error && (
            <Typography color='error' variant='body2' className='text-center'>
              {error}
            </Typography>
          )}
          <Button
            variant='contained'
            onClick={handleRegister}
            disabled={loading}
            startIcon={loading ? <i className='tabler-loader-2 animate-spin' /> : <i className='tabler-login' />}
            size='large'
          >
            {loading ? 'Creating account...' : 'Complete Registration'}
          </Button>
          <Typography variant='body2' color='text.secondary'>
            Already have an account?{' '}
            <Typography component={Link} href={getLocalizedUrl('/login', locale as Locale)} color='primary.main'>
              Sign in
            </Typography>
          </Typography>
        </div>
      </Grid>
    </Grid>
  )
}

export default StepComplete
