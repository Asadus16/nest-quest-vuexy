'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import FileUpload from '@core/components/FileUpload'
import DirectionalIcon from '@components/DirectionalIcon'

// Type Imports
import type { StepProps } from '../types'

type KYCProps = StepProps & {
  showTradeLicense?: boolean
}

const StepKYC = ({ activeStep, handleNext, handlePrev, steps, showTradeLicense = false }: KYCProps) => {
  // Text fields
  const [emiratesId, setEmiratesId] = useState('')
  const [emiratesIdExpiry, setEmiratesIdExpiry] = useState('')
  const [passportNo, setPassportNo] = useState('')
  const [passportExpiry, setPassportExpiry] = useState('')
  const [tradeLicenseNo, setTradeLicenseNo] = useState('')
  const [tradeLicenseExpiry, setTradeLicenseExpiry] = useState('')

  // File uploads
  const [passportCopy, setPassportCopy] = useState<File | null>(null)
  const [emiratesIdFront, setEmiratesIdFront] = useState<File | null>(null)
  const [emiratesIdBack, setEmiratesIdBack] = useState<File | null>(null)
  const [tradeLicenseFile, setTradeLicenseFile] = useState<File | null>(null)

  const baseValid =
    emiratesId.trim() && emiratesIdExpiry && passportNo.trim() && passportExpiry && passportCopy && emiratesIdFront && emiratesIdBack

  const tradeLicenseValid = !showTradeLicense || (tradeLicenseNo.trim() && tradeLicenseExpiry && tradeLicenseFile)

  const isValid = baseValid && tradeLicenseValid

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Typography variant='h5'>KYC Verification</Typography>
        <Typography variant='body2' color='text.secondary'>
          Upload your identification documents
        </Typography>
      </Grid>

      {/* Trade License - Property Manager only */}
      {showTradeLicense && (
        <>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField
              fullWidth
              label='Trade License No'
              placeholder='Enter trade license number'
              value={tradeLicenseNo}
              onChange={e => setTradeLicenseNo(e.target.value.replace(/\D/g, ''))}
              slotProps={{ htmlInput: { inputMode: 'numeric' } }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField
              fullWidth
              type='date'
              label='Trade License Expiry'
              value={tradeLicenseExpiry}
              onChange={e => setTradeLicenseExpiry(e.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Grid>
        </>
      )}

      {/* Emirates ID */}
      <Grid size={{ xs: 12, md: 6 }}>
        <CustomTextField
          fullWidth
          label='Emirates ID No'
          placeholder='Enter Emirates ID number'
          value={emiratesId}
          onChange={e => setEmiratesId(e.target.value.replace(/\D/g, ''))}
          slotProps={{ htmlInput: { inputMode: 'numeric' } }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <CustomTextField
          fullWidth
          type='date'
          label='Emirates ID Expiry'
          value={emiratesIdExpiry}
          onChange={e => setEmiratesIdExpiry(e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
        />
      </Grid>

      {/* Passport */}
      <Grid size={{ xs: 12, md: 6 }}>
        <CustomTextField
          fullWidth
          label='Passport No'
          placeholder='Enter passport number'
          value={passportNo}
          onChange={e => setPassportNo(e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <CustomTextField
          fullWidth
          type='date'
          label='Passport Expiry'
          value={passportExpiry}
          onChange={e => setPassportExpiry(e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
        />
      </Grid>

      {/* Document Uploads */}
      <Grid size={{ xs: 12 }}>
        <Typography variant='subtitle1' className='mbe-2'>
          Document Uploads
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FileUpload label='Upload Passport Copy' accept='image/*,.pdf' onChange={f => setPassportCopy(f)} />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FileUpload label='Upload Emirates ID (Front)' accept='image/*,.pdf' onChange={f => setEmiratesIdFront(f)} />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FileUpload label='Upload Emirates ID (Back)' accept='image/*,.pdf' onChange={f => setEmiratesIdBack(f)} />
      </Grid>
      {showTradeLicense && (
        <Grid size={{ xs: 12, md: 6 }}>
          <FileUpload label='Upload Trade License' accept='image/*,.pdf' onChange={f => setTradeLicenseFile(f)} />
        </Grid>
      )}

      <Grid size={{ xs: 12 }}>
        <div className='flex items-center justify-between'>
          <Button
            variant='tonal'
            color='secondary'
            disabled={activeStep === 0}
            onClick={handlePrev}
            startIcon={<DirectionalIcon ltrIconClass='tabler-arrow-left' rtlIconClass='tabler-arrow-right' />}
          >
            Previous
          </Button>
          <Button
            variant='contained'
            disabled={!isValid}
            onClick={handleNext}
            endIcon={<DirectionalIcon ltrIconClass='tabler-arrow-right' rtlIconClass='tabler-arrow-left' />}
          >
            Next
          </Button>
        </div>
      </Grid>
    </Grid>
  )
}

export default StepKYC
