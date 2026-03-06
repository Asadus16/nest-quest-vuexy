'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Chip from '@mui/material/Chip'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import FileUpload from '@core/components/FileUpload'
import DirectionalIcon from '@components/DirectionalIcon'

// Type Imports
import type { StepProps, FinanceItem } from '../types'

const acquisitionMethods = ['Rented', 'Bought (Cash)', 'Financed']

const rentFrequencies = ['Monthly', 'Quarterly', 'Semi-Annually', 'Annually']

const paymentMethods = ['Bank Transfer', 'Cheque', 'Cash']

const StepAgreement = ({ activeStep, handleNext, handlePrev, formData, setFormData }: StepProps) => {
  const updateField = <K extends keyof typeof formData>(field: K, value: (typeof formData)[K]) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleAcquisitionChange = (newMethod: string) => {
    const updated = { ...formData, acquisitionMethod: newMethod }

    // Clear rented fields when not Rented
    if (newMethod !== 'Rented') {
      updated.rentAmount = ''
      updated.rentFrequency = ''
      updated.paymentMethod = ''
      updated.tenancyStartDate = ''
      updated.tenancyEndDate = ''
      updated.tenancyAgreement = null
      updated.ejariCertificate = null
      updated.dcpmLetter = null
    }

    // Clear bought/financed shared fields when neither
    if (newMethod !== 'Bought (Cash)' && newMethod !== 'Financed') {
      updated.purchasePrice = ''
      updated.spa = null
    }

    // Clear bought-only fields when not Bought
    if (newMethod !== 'Bought (Cash)') {
      updated.purchaseDate = ''
      updated.paymentProof = null
    }

    // Clear financed-only fields when not Financed
    if (newMethod !== 'Financed') {
      updated.financeItems = []
    }

    setFormData(updated)
  }

  // Finance items helpers
  const addFinanceItem = () => {
    setFormData({
      ...formData,
      financeItems: [...formData.financeItems, { label: '', amount: '', dueDate: '', status: 'Unpaid' }]
    })
  }

  const updateFinanceItem = (index: number, field: keyof FinanceItem, value: string) => {
    const items = [...formData.financeItems]

    items[index] = { ...items[index], [field]: value } as FinanceItem
    setFormData({ ...formData, financeItems: items })
  }

  const removeFinanceItem = (index: number) => {
    setFormData({
      ...formData,
      financeItems: formData.financeItems.filter((_, i) => i !== index)
    })
  }

  // Computed totals
  const totalFinanceAmount = formData.financeItems.reduce((sum, item) => sum + (Number(item.amount) || 0), 0)

  const totalPaid = formData.financeItems
    .filter(i => i.status === 'Paid')
    .reduce((sum, item) => sum + (Number(item.amount) || 0), 0)

  const totalUnpaid = totalFinanceAmount - totalPaid

  // Validation
  const baseValid = formData.acquisitionMethod !== '' && formData.termsAccepted

  const rentedValid =
    formData.acquisitionMethod !== 'Rented' ||
    (!!formData.rentAmount &&
      !!formData.rentFrequency &&
      !!formData.paymentMethod &&
      !!formData.tenancyStartDate &&
      !!formData.tenancyEndDate)

  const boughtValid =
    formData.acquisitionMethod !== 'Bought (Cash)' || (!!formData.purchasePrice && !!formData.purchaseDate)

  const financedValid =
    formData.acquisitionMethod !== 'Financed' ||
    (!!formData.purchasePrice &&
      formData.financeItems.length > 0 &&
      formData.financeItems.every(item => item.label && item.amount && item.dueDate && item.status))

  const isValid = baseValid && rentedValid && boughtValid && financedValid

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Typography variant='h5'>Agreement</Typography>
        <Typography variant='body2' color='text.secondary'>
          Enter contract details, upload documents, and configure utilities
        </Typography>
      </Grid>

      {/* Acquisition Method */}
      <Grid size={{ xs: 12 }}>
        <CustomTextField
          select
          fullWidth
          label='How did you acquire this property?'
          value={formData.acquisitionMethod}
          onChange={e => handleAcquisitionChange(e.target.value)}
        >
          <MenuItem value=''>Select</MenuItem>
          {acquisitionMethods.map(method => (
            <MenuItem key={method} value={method}>
              {method}
            </MenuItem>
          ))}
        </CustomTextField>
      </Grid>

      {/* ─── RENTED SECTION ─── */}
      {formData.acquisitionMethod === 'Rented' && (
        <>
          <Grid size={{ xs: 12 }}>
            <Divider />
            <Typography variant='subtitle1' className='font-medium mbs-4'>
              Rental Details
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField
              fullWidth
              label='Total Rent (AED)'
              placeholder='e.g. 80000'
              value={formData.rentAmount}
              onChange={e => updateField('rentAmount', e.target.value.replace(/\D/g, ''))}
              slotProps={{
                htmlInput: { inputMode: 'numeric' },
                input: {
                  startAdornment: <InputAdornment position='start'>AED</InputAdornment>
                }
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField
              select
              fullWidth
              label='Rent Frequency'
              value={formData.rentFrequency}
              onChange={e => updateField('rentFrequency', e.target.value)}
            >
              <MenuItem value=''>Select</MenuItem>
              {rentFrequencies.map(freq => (
                <MenuItem key={freq} value={freq}>
                  {freq}
                </MenuItem>
              ))}
            </CustomTextField>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField
              select
              fullWidth
              label='Payment Method'
              value={formData.paymentMethod}
              onChange={e => updateField('paymentMethod', e.target.value)}
            >
              <MenuItem value=''>Select</MenuItem>
              {paymentMethods.map(method => (
                <MenuItem key={method} value={method}>
                  {method}
                </MenuItem>
              ))}
            </CustomTextField>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} />
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField
              fullWidth
              type='date'
              label='Tenancy Start Date'
              value={formData.tenancyStartDate}
              onChange={e => updateField('tenancyStartDate', e.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField
              fullWidth
              type='date'
              label='Tenancy End Date'
              value={formData.tenancyEndDate}
              onChange={e => updateField('tenancyEndDate', e.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Grid>

          {/* Rented Documents */}
          <Grid size={{ xs: 12 }}>
            <Divider />
            <Typography variant='subtitle1' className='font-medium mbs-4'>
              Documents
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FileUpload
              label='Upload Tenancy Agreement'
              accept='.pdf,.jpg,.jpeg,.png'
              onChange={f => updateField('tenancyAgreement', f)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FileUpload
              label='Upload Ejari Certificate'
              accept='.pdf,.jpg,.jpeg,.png'
              onChange={f => updateField('ejariCertificate', f)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FileUpload
              label='Upload DCPM Letter'
              accept='.pdf,.jpg,.jpeg,.png'
              onChange={f => updateField('dcpmLetter', f)}
            />
          </Grid>
        </>
      )}

      {/* ─── BOUGHT (CASH) SECTION ─── */}
      {formData.acquisitionMethod === 'Bought (Cash)' && (
        <>
          <Grid size={{ xs: 12 }}>
            <Divider />
            <Typography variant='subtitle1' className='font-medium mbs-4'>
              Purchase Details
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField
              fullWidth
              label='Purchase Price (AED)'
              placeholder='e.g. 1500000'
              value={formData.purchasePrice}
              onChange={e => updateField('purchasePrice', e.target.value.replace(/\D/g, ''))}
              slotProps={{
                htmlInput: { inputMode: 'numeric' },
                input: {
                  startAdornment: <InputAdornment position='start'>AED</InputAdornment>
                }
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField
              fullWidth
              type='date'
              label='Purchase Date'
              value={formData.purchaseDate}
              onChange={e => updateField('purchaseDate', e.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Grid>

          {/* Bought Documents */}
          <Grid size={{ xs: 12 }}>
            <Divider />
            <Typography variant='subtitle1' className='font-medium mbs-4'>
              Documents
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FileUpload
              label='Upload Sale Purchase Agreement (SPA)'
              accept='.pdf,.jpg,.jpeg,.png'
              onChange={f => updateField('spa', f)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FileUpload
              label='Upload Payment Proof'
              accept='.pdf,.jpg,.jpeg,.png'
              onChange={f => updateField('paymentProof', f)}
            />
          </Grid>
        </>
      )}

      {/* ─── FINANCED SECTION ─── */}
      {formData.acquisitionMethod === 'Financed' && (
        <>
          <Grid size={{ xs: 12 }}>
            <Divider />
            <Typography variant='subtitle1' className='font-medium mbs-4'>
              Purchase Details
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField
              fullWidth
              label='Purchase Price (AED)'
              placeholder='e.g. 1500000'
              value={formData.purchasePrice}
              onChange={e => updateField('purchasePrice', e.target.value.replace(/\D/g, ''))}
              slotProps={{
                htmlInput: { inputMode: 'numeric' },
                input: {
                  startAdornment: <InputAdornment position='start'>AED</InputAdornment>
                }
              }}
            />
          </Grid>

          {/* Finance Items */}
          <Grid size={{ xs: 12 }}>
            <Divider />
            <div className='flex items-center justify-between mbs-4'>
              <Typography variant='subtitle1' className='font-medium'>
                Finance Items
              </Typography>
              <Button variant='tonal' size='small' startIcon={<i className='tabler-plus' />} onClick={addFinanceItem}>
                Add Item
              </Button>
            </div>
          </Grid>

          {formData.financeItems.map((item, index) => (
            <Grid size={{ xs: 12 }} key={index}>
              <div className='flex flex-wrap gap-4 items-start'>
                <CustomTextField
                  label='Label'
                  placeholder='e.g. Down Payment'
                  value={item.label}
                  onChange={e => updateFinanceItem(index, 'label', e.target.value)}
                  className='flex-1 min-is-[150px]'
                />
                <CustomTextField
                  label='Amount (AED)'
                  placeholder='e.g. 100000'
                  value={item.amount}
                  onChange={e => updateFinanceItem(index, 'amount', e.target.value.replace(/\D/g, ''))}
                  slotProps={{
                    htmlInput: { inputMode: 'numeric' },
                    input: {
                      startAdornment: <InputAdornment position='start'>AED</InputAdornment>
                    }
                  }}
                  className='flex-1 min-is-[150px]'
                />
                <CustomTextField
                  type='date'
                  label='Due Date'
                  value={item.dueDate}
                  onChange={e => updateFinanceItem(index, 'dueDate', e.target.value)}
                  slotProps={{ inputLabel: { shrink: true } }}
                  className='flex-1 min-is-[150px]'
                />
                <CustomTextField
                  select
                  label='Status'
                  value={item.status}
                  onChange={e => updateFinanceItem(index, 'status', e.target.value)}
                  className='min-is-[120px]'
                >
                  <MenuItem value='Paid'>Paid</MenuItem>
                  <MenuItem value='Unpaid'>Unpaid</MenuItem>
                </CustomTextField>
                <IconButton color='error' onClick={() => removeFinanceItem(index)} className='mbs-4'>
                  <i className='tabler-trash' />
                </IconButton>
              </div>
            </Grid>
          ))}

          {formData.financeItems.length === 0 && (
            <Grid size={{ xs: 12 }}>
              <Typography variant='body2' color='text.secondary' className='text-center pbs-2'>
                No finance items added yet. Click &quot;Add Item&quot; to start.
              </Typography>
            </Grid>
          )}

          {/* Finance Summary */}
          {formData.financeItems.length > 0 && (
            <Grid size={{ xs: 12 }}>
              <div className='flex flex-wrap gap-4 p-4 rounded bg-actionHover'>
                <div className='flex flex-col gap-1'>
                  <Typography variant='body2' color='text.secondary'>
                    Total Amount
                  </Typography>
                  <Typography variant='subtitle1' className='font-semibold'>
                    AED {totalFinanceAmount.toLocaleString()}
                  </Typography>
                </div>
                <div className='flex flex-col gap-1'>
                  <Typography variant='body2' color='text.secondary'>
                    Total Paid
                  </Typography>
                  <Chip
                    label={`AED ${totalPaid.toLocaleString()}`}
                    color='success'
                    variant='tonal'
                    size='small'
                    className='mbs-1'
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <Typography variant='body2' color='text.secondary'>
                    Total Unpaid
                  </Typography>
                  <Chip
                    label={`AED ${totalUnpaid.toLocaleString()}`}
                    color='warning'
                    variant='tonal'
                    size='small'
                    className='mbs-1'
                  />
                </div>
              </div>
            </Grid>
          )}

          {/* Financed Documents */}
          <Grid size={{ xs: 12 }}>
            <Divider />
            <Typography variant='subtitle1' className='font-medium mbs-4'>
              Documents
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FileUpload
              label='Upload Sale Purchase Agreement (SPA)'
              accept='.pdf,.jpg,.jpeg,.png'
              onChange={f => updateField('spa', f)}
            />
          </Grid>
        </>
      )}

      {/* ─── UTILITIES (shown when method selected) ─── */}
      {formData.acquisitionMethod && (
        <>
          <Grid size={{ xs: 12 }}>
            <Divider />
            <Typography variant='subtitle1' className='font-medium mbs-4'>
              Utilities
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              fullWidth
              label='DEWA Number'
              placeholder='e.g. 123456789'
              value={formData.dewaNumber}
              onChange={e => updateField('dewaNumber', e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              fullWidth
              label='Internet Account Number'
              placeholder='e.g. 987654321'
              value={formData.internetAccountNumber}
              onChange={e => updateField('internetAccountNumber', e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              fullWidth
              label='Gas Number'
              placeholder='e.g. 456789123'
              value={formData.gasNumber}
              onChange={e => updateField('gasNumber', e.target.value)}
            />
          </Grid>
        </>
      )}

      {/* ─── TERMS & CONDITIONS ─── */}
      <Grid size={{ xs: 12 }}>
        <Divider />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.termsAccepted}
              onChange={e => updateField('termsAccepted', e.target.checked)}
            />
          }
          label='I accept the terms and conditions'
        />
      </Grid>

      {/* Navigation */}
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

export default StepAgreement
