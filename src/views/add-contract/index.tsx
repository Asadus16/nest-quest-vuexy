'use client'

// React Imports
import { useState, useRef, useEffect } from 'react'

// Next Imports
import { useParams, useRouter } from 'next/navigation'

// MUI Imports
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stepper from '@mui/material/Stepper'
import MuiStep from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import type { StepProps as MuiStepProps } from '@mui/material/Step'

// Third-party Imports
import classnames from 'classnames'

// Type Imports
import type { PaymentScheduleRow, OwnerAgreementScheduleRow, LinkedTenantType } from '@/types/apps/contractTypes'
import type { PropertyType } from '@/types/apps/propertyTypes'
import type { InventoryType } from '@/types/apps/inventoryTypes'
import type { Locale } from '@configs/i18n'

// Service Imports
import { getLinkedTenants, createTenancy } from '@/services/tenancy'
import { getProperties } from '@/services/properties'
import { getInventories } from '@/services/inventory'

// Context Imports
import { useToast } from '@/contexts/toastContext'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'
import CustomTextField from '@core/components/mui/TextField'
import FileUpload from '@core/components/FileUpload'
import DirectionalIcon from '@components/DirectionalIcon'

// Styled Component Imports
import StepperWrapper from '@core/styles/stepper'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// Styled Components
const Step = styled(MuiStep)<MuiStepProps>({
  '&.Mui-completed .step-title, &.Mui-completed .step-subtitle': {
    color: 'var(--mui-palette-text-disabled)'
  }
})

const DropZone = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(6),
  borderRadius: 'var(--mui-shape-borderRadius)',
  border: '2px dashed var(--mui-palette-divider)',
  cursor: 'pointer',
  transition: theme.transitions.create(['border-color', 'background-color'], {
    duration: theme.transitions.duration.shorter
  }),
  '&:hover': {
    borderColor: 'var(--mui-palette-primary-main)',
    backgroundColor: 'var(--mui-palette-action-hover)'
  }
}))

const PhotoThumbnail = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  paddingBlockEnd: '75%',
  borderRadius: 'var(--mui-shape-borderRadius)',
  overflow: 'hidden',
  border: `1px solid var(--mui-palette-divider)`,
  '& img': {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  '& .delete-btn': {
    position: 'absolute',
    insetBlockStart: 4,
    insetInlineEnd: 4,
    backgroundColor: 'var(--mui-palette-background-paper)',
    boxShadow: theme.shadows[2],
    '&:hover': {
      backgroundColor: 'var(--mui-palette-error-lightOpacity)'
    }
  }
}))

// Step definitions
const steps = [
  { icon: 'tabler-building', title: 'Property Selection', subtitle: 'Choose property' },
  { icon: 'tabler-contract', title: 'Owner Agreement', subtitle: 'PM & Owner terms' },
  { icon: 'tabler-file-text', title: 'Contract Details', subtitle: 'Tenant & rent info' },
  { icon: 'tabler-currency-dirham', title: 'Financial Details', subtitle: 'Deposits & fees' },
  { icon: 'tabler-bulb', title: 'Utilities', subtitle: 'Included utilities' },
  { icon: 'tabler-tool', title: 'Maintenance', subtitle: 'Responsibilities' },
  { icon: 'tabler-sofa', title: 'Property Type', subtitle: 'Furnishing & inventory' },
  { icon: 'tabler-file-upload', title: 'Documents', subtitle: 'PDF & Ejari' },
  { icon: 'tabler-camera', title: 'Entry Photos', subtitle: 'Property photos' },
  { icon: 'tabler-calendar-dollar', title: 'Payment Schedule', subtitle: 'Payment rows' }
]

// Data constants
const frequencyOptions = [
  { value: 'MONTHLY', label: 'Monthly' },
  { value: 'QUARTERLY', label: 'Quarterly' },
  { value: 'SEMI_ANNUALLY', label: 'Semi-Annually' },
  { value: 'ANNUALLY', label: 'Annually' }
]

const utilitiesOptions = [
  'DEWA (Electricity & Water)',
  'Internet',
  'Gas',
  'District Cooling',
  'Sewage',
  'Cable TV'
]

const furnishingOptions = ['Furnished', 'Semi-Furnished', 'Unfurnished']

const ownerAgreementTypes = [
  { value: 'PERCENTAGE', label: 'Percentage Agreement' },
  { value: 'FIXED_FEE', label: 'Fixed Fee' },
  { value: 'SUBLEASE', label: 'Sublease from Owner' }
]

const transactionTypes = ['Rent', 'Security Deposit', 'Agency Fee']

const MAX_PHOTOS = 20
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

const AddContract = () => {
  const router = useRouter()
  const { lang: locale } = useParams()
  const toast = useToast()
  const [activeStep, setActiveStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)

  // API data
  const [tenantsList, setTenantsList] = useState<LinkedTenantType[]>([])
  const [propertiesList, setPropertiesList] = useState<PropertyType[]>([])
  const [inventoryItems, setInventoryItems] = useState<InventoryType[]>([])

  // Fetch tenants and properties on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tenantsData, propertiesData] = await Promise.all([
          getLinkedTenants(),
          getProperties()
        ])

        setTenantsList(tenantsData)
        setPropertiesList(propertiesData)
      } catch {
        // silently handle
      }
    }

    fetchData()
  }, [])

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1)
    }
  }

  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1)
    }
  }

  // --- Section 0: Owner Agreement ---
  const [ownerAgreementType, setOwnerAgreementType] = useState('')
  const [commissionPercentage, setCommissionPercentage] = useState('')
  const [inclusiveOfAgencyFee, setInclusiveOfAgencyFee] = useState(false)
  const [fixedFeeAmount, setFixedFeeAmount] = useState('')
  const [payoutAmount, setPayoutAmount] = useState('')
  const [payoutFrequency, setPayoutFrequency] = useState('')
  const [ownerScheduleRows, setOwnerScheduleRows] = useState<OwnerAgreementScheduleRow[]>([])
  const [editingOwnerScheduleRow, setEditingOwnerScheduleRow] = useState<OwnerAgreementScheduleRow | null>(null)

  // --- Section 1: Contract Details ---
  const [tenantId, setTenantId] = useState('')
  const [propertyId, setPropertyId] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [rentAmount, setRentAmount] = useState('')
  const [frequency, setFrequency] = useState('')

  // When property changes, fetch inventory
  useEffect(() => {
    if (propertyId) {
      getInventories(Number(propertyId))
        .then(data => setInventoryItems(data))
        .catch(() => setInventoryItems([]))
    } else {
      setInventoryItems([])
    }
  }, [propertyId])

  // Get selected property's owner
  const selectedProperty = propertiesList.find(p => p.id === Number(propertyId))

  // --- Section 2: Financial Details ---
  const [securityDepositRequired, setSecurityDepositRequired] = useState(false)
  const [securityDepositAmount, setSecurityDepositAmount] = useState('')
  const [agencyFeeRequired, setAgencyFeeRequired] = useState(false)
  const [agencyFeeAmount, setAgencyFeeAmount] = useState('')

  // --- Section 3: Utilities ---
  const [utilitiesIncluded, setUtilitiesIncluded] = useState(false)
  const [selectedUtilities, setSelectedUtilities] = useState<string[]>([])
  const [maxUtilitiesPerMonth, setMaxUtilitiesPerMonth] = useState('')

  // --- Section 4: Maintenance ---
  const [maintenanceIncluded, setMaintenanceIncluded] = useState(false)
  const [maintenanceResponsibility, setMaintenanceResponsibility] = useState('')
  const [maintenanceThreshold, setMaintenanceThreshold] = useState('')

  // --- Section 5: Property Type ---
  const [furnishingStatus, setFurnishingStatus] = useState('')

  // --- Section 6: Documents ---
  const [ejariNumber, setEjariNumber] = useState('')
  const [contractPdf, setContractPdf] = useState<File | null>(null)
  const [ejariCertificate, setEjariCertificate] = useState<File | null>(null)

  // --- Section 7: Entry Photos ---
  const [entryPhotos, setEntryPhotos] = useState<File[]>([])
  const entryPhotoRef = useRef<HTMLInputElement>(null)

  // --- Section 8: Payment Schedule ---
  const [paymentRows, setPaymentRows] = useState<PaymentScheduleRow[]>([])
  const [editingRow, setEditingRow] = useState<PaymentScheduleRow | null>(null)

  const handleUtilityToggle = (utility: string) => {
    setSelectedUtilities(prev =>
      prev.includes(utility) ? prev.filter(u => u !== utility) : [...prev, utility]
    )
  }

  const handleAddEntryPhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const remaining = MAX_PHOTOS - entryPhotos.length
    const validFiles = files
      .filter(f => ALLOWED_TYPES.includes(f.type) && f.size <= MAX_FILE_SIZE)
      .slice(0, remaining)

    if (validFiles.length > 0) {
      setEntryPhotos(prev => [...prev, ...validFiles])
    }

    if (entryPhotoRef.current) {
      entryPhotoRef.current.value = ''
    }
  }

  const handleRemoveEntryPhoto = (index: number) => {
    setEntryPhotos(prev => prev.filter((_, i) => i !== index))
  }

  const handleAddPaymentRow = () => {
    setEditingRow({
      id: Date.now(),
      transactionType: '',
      amount: '',
      paymentDate: ''
    })
  }

  const handleConfirmPaymentRow = () => {
    if (editingRow && editingRow.transactionType && editingRow.amount && editingRow.paymentDate) {
      setPaymentRows(prev => [...prev, editingRow])
      setEditingRow(null)
    }
  }

  const handleCancelEditingRow = () => {
    setEditingRow(null)
  }

  const handleRemovePaymentRow = (id: number) => {
    setPaymentRows(prev => prev.filter(r => r.id !== id))
  }

  const handleAddOwnerScheduleRow = () => {
    setEditingOwnerScheduleRow({
      id: Date.now(),
      label: '',
      amount: '',
      paymentDate: ''
    })
  }

  const handleConfirmOwnerScheduleRow = () => {
    if (editingOwnerScheduleRow && editingOwnerScheduleRow.paymentDate && editingOwnerScheduleRow.amount) {
      setOwnerScheduleRows(prev => [...prev, editingOwnerScheduleRow])
      setEditingOwnerScheduleRow(null)
    }
  }

  const handleCancelOwnerScheduleRow = () => {
    setEditingOwnerScheduleRow(null)
  }

  const handleRemoveOwnerScheduleRow = (id: number) => {
    setOwnerScheduleRows(prev => prev.filter(r => r.id !== id))
  }

  const handleSubmit = async () => {
    if (!tenantId || !propertyId || !startDate || !endDate || !rentAmount || !frequency) return

    setSubmitting(true)

    try {
      const fd = new FormData()

      fd.append('property_id', propertyId)
      fd.append('tenant_id', tenantId)
      fd.append('contract_start_date', startDate)
      fd.append('contract_end_date', endDate)
      fd.append('rent_amount_total', rentAmount)
      fd.append('rent_frequency', frequency)

      // Financial
      fd.append('deposit_required', securityDepositRequired ? '1' : '0')

      if (securityDepositRequired && securityDepositAmount) {
        fd.append('deposit_amount', securityDepositAmount)
      }

      fd.append('agency_fee_required', agencyFeeRequired ? '1' : '0')

      if (agencyFeeRequired && agencyFeeAmount) {
        fd.append('agency_fee_amount', agencyFeeAmount)
      }

      // Utilities
      fd.append('utilities_included', utilitiesIncluded ? '1' : '0')

      if (utilitiesIncluded && selectedUtilities.length > 0) {
        fd.append('utilities', JSON.stringify(selectedUtilities))
      }

      if (utilitiesIncluded && maxUtilitiesPerMonth) {
        fd.append('max_utilities_per_month', maxUtilitiesPerMonth)
      }

      // Maintenance
      fd.append('maintenance_included', maintenanceIncluded ? '1' : '0')

      if (maintenanceIncluded && maintenanceResponsibility) {
        fd.append('maintenance_responsibility', maintenanceResponsibility)
      }

      if (maintenanceIncluded && maintenanceThreshold) {
        fd.append('maintenance_threshold', maintenanceThreshold)
      }

      // Furnishing & Ejari
      if (furnishingStatus) fd.append('furnishing_status', furnishingStatus)
      if (ejariNumber) fd.append('ejari_number', ejariNumber)

      // Files
      if (contractPdf) fd.append('contract_pdf', contractPdf)
      if (ejariCertificate) fd.append('ejari_certificate', ejariCertificate)

      entryPhotos.forEach(photo => {
        fd.append('entry_photos[]', photo)
      })

      // Payment schedules as JSON
      if (paymentRows.length > 0) {
        const schedules = paymentRows.map(row => ({
          label: row.transactionType,
          amount: row.amount,
          due_date: row.paymentDate
        }))

        fd.append('payment_schedules', JSON.stringify(schedules))
      }

      // Owner agreement
      if (ownerAgreementType) {
        fd.append('owner_agreement_type', ownerAgreementType)

        if (ownerAgreementType === 'PERCENTAGE') {
          if (commissionPercentage) fd.append('commission_percentage', commissionPercentage)
          fd.append('inclusive_of_agency_fee', inclusiveOfAgencyFee ? '1' : '0')
        } else if (ownerAgreementType === 'FIXED_FEE') {
          if (fixedFeeAmount) fd.append('fixed_fee_amount', fixedFeeAmount)
        } else if (ownerAgreementType === 'SUBLEASE') {
          if (payoutAmount) fd.append('payout_amount', payoutAmount)
          if (payoutFrequency) fd.append('payout_frequency', payoutFrequency)
        }

        if (ownerScheduleRows.length > 0) {
          const ownerSchedules = ownerScheduleRows.map(row => ({
            label: `Payout ${row.paymentDate}`,
            amount: row.amount,
            due_date: row.paymentDate
          }))

          fd.append('owner_agreement_schedules', JSON.stringify(ownerSchedules))
        }
      }

      await createTenancy(fd)
      toast.success('Contract created successfully')
      router.push(getLocalizedUrl('/contracts/list', locale as Locale))
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to create contract')
    } finally {
      setSubmitting(false)
    }
  }

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Grid container spacing={6}>
            <Grid size={{ xs: 12 }}>
              <Typography variant='h5'>Property Selection</Typography>
              <Typography variant='body2' color='text.secondary'>
                Select the property for this contract
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                select
                fullWidth
                label='Property'
                value={propertyId}
                onChange={e => setPropertyId(e.target.value)}
              >
                <MenuItem value=''>Select Property</MenuItem>
                {propertiesList.map(p => (
                  <MenuItem key={p.id} value={p.id}>{p.public_name}</MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            {selectedProperty?.owner && (
              <Grid size={{ xs: 12 }}>
                <div className='flex items-center gap-2'>
                  <Typography variant='body2' color='text.secondary'>Owner:</Typography>
                  <Chip label={selectedProperty.owner.full_name} size='small' color='info' variant='tonal' />
                </div>
              </Grid>
            )}
          </Grid>
        )

      case 1:
        return (
          <Grid container spacing={6}>
            <Grid size={{ xs: 12 }}>
              <Typography variant='h5'>Owner Agreement</Typography>
              <Typography variant='body2' color='text.secondary'>
                Define the agreement terms between PM and property owner
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                select
                fullWidth
                label='Agreement Type'
                value={ownerAgreementType}
                onChange={e => {
                  setOwnerAgreementType(e.target.value)
                  setCommissionPercentage('')
                  setInclusiveOfAgencyFee(false)
                  setFixedFeeAmount('')
                  setPayoutAmount('')
                  setPayoutFrequency('')
                  setOwnerScheduleRows([])
                  setEditingOwnerScheduleRow(null)
                }}
              >
                <MenuItem value=''>Select Agreement Type</MenuItem>
                {ownerAgreementTypes.map(t => (
                  <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            {ownerAgreementType === 'PERCENTAGE' && (
              <>
                <Grid size={{ xs: 12, md: 6 }}>
                  <CustomTextField
                    fullWidth
                    label='Commission Percentage (%)'
                    placeholder='e.g. 5'
                    value={commissionPercentage}
                    onChange={e => setCommissionPercentage(e.target.value.replace(/[^\d.]/g, ''))}
                    slotProps={{
                      htmlInput: { inputMode: 'decimal' },
                      input: { endAdornment: <InputAdornment position='end'>%</InputAdornment> }
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={inclusiveOfAgencyFee}
                        onChange={e => setInclusiveOfAgencyFee(e.target.checked)}
                      />
                    }
                    label='Inclusive of Agency Fee'
                  />
                </Grid>
              </>
            )}
            {ownerAgreementType === 'FIXED_FEE' && (
              <Grid size={{ xs: 12, md: 6 }}>
                <CustomTextField
                  fullWidth
                  label='Fixed Fee Amount (AED)'
                  placeholder='e.g. 10000'
                  value={fixedFeeAmount}
                  onChange={e => setFixedFeeAmount(e.target.value.replace(/\D/g, ''))}
                  slotProps={{
                    htmlInput: { inputMode: 'numeric' },
                    input: { startAdornment: <InputAdornment position='start'>AED</InputAdornment> }
                  }}
                />
              </Grid>
            )}
            {ownerAgreementType === 'SUBLEASE' && (
              <>
                <Grid size={{ xs: 12, md: 6 }}>
                  <CustomTextField
                    fullWidth
                    label='Owner Payout Amount (AED)'
                    placeholder='e.g. 50000'
                    value={payoutAmount}
                    onChange={e => setPayoutAmount(e.target.value.replace(/\D/g, ''))}
                    slotProps={{
                      htmlInput: { inputMode: 'numeric' },
                      input: { startAdornment: <InputAdornment position='start'>AED</InputAdornment> }
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <CustomTextField
                    select
                    fullWidth
                    label='Payout Frequency'
                    value={payoutFrequency}
                    onChange={e => setPayoutFrequency(e.target.value)}
                  >
                    <MenuItem value=''>Select Frequency</MenuItem>
                    {frequencyOptions.map(f => (
                      <MenuItem key={f.value} value={f.value}>{f.label}</MenuItem>
                    ))}
                  </CustomTextField>
                </Grid>
              </>
            )}
            {(ownerAgreementType === 'PERCENTAGE' || ownerAgreementType === 'FIXED_FEE' || ownerAgreementType === 'SUBLEASE') && (
              <>
                <Grid size={{ xs: 12 }}>
                  <Typography variant='subtitle1' className='font-medium'>
                    {ownerAgreementType === 'SUBLEASE' ? 'Owner Payout Schedule' : 'Commission Payout Schedule'}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Button
                    variant='tonal'
                    color='primary'
                    startIcon={<i className='tabler-plus' />}
                    onClick={handleAddOwnerScheduleRow}
                    disabled={editingOwnerScheduleRow !== null}
                  >
                    Add Row
                  </Button>
                </Grid>
                {(ownerScheduleRows.length > 0 || editingOwnerScheduleRow) && (
                  <Grid size={{ xs: 12 }}>
                    <div className='overflow-x-auto border rounded'>
                      <table className={tableStyles.table}>
                        <thead>
                          <tr>
                            <th>Due Date</th>
                            <th>Amount (AED)</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ownerScheduleRows.map(row => (
                            <tr key={row.id}>
                              <td><Typography variant='body2'>{row.paymentDate}</Typography></td>
                              <td><Typography variant='body2'>AED {Number(row.amount).toLocaleString()}</Typography></td>
                              <td>
                                <IconButton size='small' onClick={() => handleRemoveOwnerScheduleRow(row.id)}>
                                  <i className='tabler-x text-textSecondary' />
                                </IconButton>
                              </td>
                            </tr>
                          ))}
                          {editingOwnerScheduleRow && (
                            <tr>
                              <td>
                                <CustomTextField
                                  size='small'
                                  fullWidth
                                  type='date'
                                  value={editingOwnerScheduleRow.paymentDate}
                                  onChange={e => setEditingOwnerScheduleRow({ ...editingOwnerScheduleRow, paymentDate: e.target.value })}
                                  slotProps={{ inputLabel: { shrink: true } }}
                                />
                              </td>
                              <td>
                                <CustomTextField
                                  size='small'
                                  fullWidth
                                  placeholder='Amount'
                                  value={editingOwnerScheduleRow.amount}
                                  onChange={e => setEditingOwnerScheduleRow({ ...editingOwnerScheduleRow, amount: e.target.value.replace(/\D/g, '') })}
                                  slotProps={{ htmlInput: { inputMode: 'numeric' } }}
                                />
                              </td>
                              <td>
                                <div className='flex items-center'>
                                  <IconButton size='small' color='success' onClick={handleConfirmOwnerScheduleRow}>
                                    <i className='tabler-plus' />
                                  </IconButton>
                                  <IconButton size='small' color='error' onClick={handleCancelOwnerScheduleRow}>
                                    <i className='tabler-x' />
                                  </IconButton>
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </Grid>
                )}
              </>
            )}
          </Grid>
        )

      case 2:
        return (
          <Grid container spacing={6}>
            <Grid size={{ xs: 12 }}>
              <Typography variant='h5'>Contract Details</Typography>
              <Typography variant='body2' color='text.secondary'>
                Enter the basic contract information
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                select
                fullWidth
                label='Tenant'
                value={tenantId}
                onChange={e => setTenantId(e.target.value)}
              >
                <MenuItem value=''>Select Tenant</MenuItem>
                {tenantsList.map(t => (
                  <MenuItem key={t.id} value={t.id}>{t.full_name}</MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                fullWidth
                type='date'
                label='Start Date'
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                fullWidth
                type='date'
                label='End Date'
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                fullWidth
                label='Rent Amount'
                placeholder='e.g. 95000'
                value={rentAmount}
                onChange={e => setRentAmount(e.target.value.replace(/\D/g, ''))}
                slotProps={{
                  htmlInput: { inputMode: 'numeric' },
                  input: { startAdornment: <InputAdornment position='start'>AED</InputAdornment> }
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                select
                fullWidth
                label='Frequency'
                value={frequency}
                onChange={e => setFrequency(e.target.value)}
              >
                <MenuItem value=''>Select Frequency</MenuItem>
                {frequencyOptions.map(f => (
                  <MenuItem key={f.value} value={f.value}>{f.label}</MenuItem>
                ))}
              </CustomTextField>
            </Grid>
          </Grid>
        )

      case 3:
        return (
          <Grid container spacing={6}>
            <Grid size={{ xs: 12 }}>
              <Typography variant='h5'>Financial Details</Typography>
              <Typography variant='body2' color='text.secondary'>
                Configure deposit and agency fee details
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={securityDepositRequired}
                    onChange={e => {
                      setSecurityDepositRequired(e.target.checked)

                      if (!e.target.checked) setSecurityDepositAmount('')
                    }}
                  />
                }
                label='Security Deposit Required'
              />
              {securityDepositRequired && (
                <CustomTextField
                  fullWidth
                  label='Security Deposit Amount (AED)'
                  placeholder='e.g. 5000'
                  value={securityDepositAmount}
                  onChange={e => setSecurityDepositAmount(e.target.value.replace(/\D/g, ''))}
                  className='mbs-4'
                  slotProps={{
                    htmlInput: { inputMode: 'numeric' },
                    input: { startAdornment: <InputAdornment position='start'>AED</InputAdornment> }
                  }}
                />
              )}
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={agencyFeeRequired}
                    onChange={e => {
                      setAgencyFeeRequired(e.target.checked)

                      if (!e.target.checked) setAgencyFeeAmount('')
                    }}
                  />
                }
                label='Agency Fee Required'
              />
              {agencyFeeRequired && (
                <CustomTextField
                  fullWidth
                  label='Agency Fee Amount (AED)'
                  placeholder='e.g. 5000'
                  value={agencyFeeAmount}
                  onChange={e => setAgencyFeeAmount(e.target.value.replace(/\D/g, ''))}
                  className='mbs-4'
                  slotProps={{
                    htmlInput: { inputMode: 'numeric' },
                    input: { startAdornment: <InputAdornment position='start'>AED</InputAdornment> }
                  }}
                />
              )}
            </Grid>
          </Grid>
        )

      case 4:
        return (
          <Grid container spacing={6}>
            <Grid size={{ xs: 12 }}>
              <Typography variant='h5'>Utilities</Typography>
              <Typography variant='body2' color='text.secondary'>
                Specify which utilities are included in the contract
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={utilitiesIncluded}
                    onChange={e => {
                      setUtilitiesIncluded(e.target.checked)

                      if (!e.target.checked) {
                        setSelectedUtilities([])
                        setMaxUtilitiesPerMonth('')
                      }
                    }}
                  />
                }
                label='Utilities Included'
              />
            </Grid>
            {utilitiesIncluded && (
              <>
                <Grid size={{ xs: 12 }}>
                  <Typography variant='body2' className='font-medium mbe-2'>
                    Utilities Checklist
                  </Typography>
                  <div className='flex flex-wrap gap-x-6 gap-y-2'>
                    {utilitiesOptions.map(utility => (
                      <FormControlLabel
                        key={utility}
                        control={
                          <Checkbox
                            size='small'
                            checked={selectedUtilities.includes(utility)}
                            onChange={() => handleUtilityToggle(utility)}
                          />
                        }
                        label={utility}
                      />
                    ))}
                  </div>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <CustomTextField
                    fullWidth
                    label='Maximum Total Utilities Per Month'
                    placeholder='e.g. 1500'
                    value={maxUtilitiesPerMonth}
                    onChange={e => setMaxUtilitiesPerMonth(e.target.value.replace(/\D/g, ''))}
                    slotProps={{
                      htmlInput: { inputMode: 'numeric' },
                      input: { startAdornment: <InputAdornment position='start'>AED</InputAdornment> }
                    }}
                    helperText='Bills at or below this amount are covered. Any excess is paid by the tenant.'
                  />
                </Grid>
              </>
            )}
          </Grid>
        )

      case 5:
        return (
          <Grid container spacing={6}>
            <Grid size={{ xs: 12 }}>
              <Typography variant='h5'>Maintenance</Typography>
              <Typography variant='body2' color='text.secondary'>
                Define maintenance responsibilities
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={maintenanceIncluded}
                    onChange={e => {
                      setMaintenanceIncluded(e.target.checked)

                      if (!e.target.checked) {
                        setMaintenanceResponsibility('')
                        setMaintenanceThreshold('')
                      }
                    }}
                  />
                }
                label='Maintenance Included'
              />
            </Grid>
            {maintenanceIncluded && (
              <>
                <Grid size={{ xs: 12, md: 6 }}>
                  <CustomTextField
                    select
                    fullWidth
                    label='Maintenance Responsibility'
                    value={maintenanceResponsibility}
                    onChange={e => setMaintenanceResponsibility(e.target.value)}
                  >
                    <MenuItem value=''>Select Responsibility</MenuItem>
                    <MenuItem value='Responsibility of Owner'>Responsibility of Owner</MenuItem>
                    <MenuItem value='Responsibility of Tenant'>Responsibility of Tenant</MenuItem>
                    <MenuItem value='Responsibility of Property Manager'>Responsibility of Property Manager</MenuItem>
                  </CustomTextField>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <CustomTextField
                    fullWidth
                    label='Minimum Threshold (AED)'
                    placeholder='e.g. 500'
                    value={maintenanceThreshold}
                    onChange={e => setMaintenanceThreshold(e.target.value.replace(/\D/g, ''))}
                    slotProps={{
                      htmlInput: { inputMode: 'numeric' },
                      input: { startAdornment: <InputAdornment position='start'>AED</InputAdornment> }
                    }}
                  />
                </Grid>
              </>
            )}
          </Grid>
        )

      case 6:
        return (
          <Grid container spacing={6}>
            <Grid size={{ xs: 12 }}>
              <Typography variant='h5'>Property Type</Typography>
              <Typography variant='body2' color='text.secondary'>
                Furnishing status and property inventory
              </Typography>
            </Grid>
            {selectedProperty && (
              <Grid size={{ xs: 12 }}>
                <div className='flex items-center gap-2'>
                  <Typography variant='body2' color='text.secondary'>Property:</Typography>
                  <Chip label={selectedProperty.public_name} size='small' color='primary' variant='tonal' />
                </div>
              </Grid>
            )}
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                select
                fullWidth
                label='Furnishing Status'
                value={furnishingStatus}
                onChange={e => setFurnishingStatus(e.target.value)}
              >
                <MenuItem value=''>Select Furnishing</MenuItem>
                {furnishingOptions.map(f => (
                  <MenuItem key={f} value={f}>{f}</MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant='body2' className='font-medium mbe-2'>
                Property Inventory
              </Typography>
              {inventoryItems.length > 0 ? (
                <div className='overflow-x-auto border rounded'>
                  <table className={tableStyles.table}>
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Type</th>
                        <th>Brand</th>
                        <th>Room</th>
                        <th>Worth</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inventoryItems.map(inv => (
                        <tr key={inv.id}>
                          <td><Typography variant='body2'>{inv.name}</Typography></td>
                          <td><Typography variant='body2'>{inv.type}</Typography></td>
                          <td><Typography variant='body2'>{inv.brand || '-'}</Typography></td>
                          <td><Typography variant='body2'>{inv.room_assigned || '-'}</Typography></td>
                          <td><Typography variant='body2'>{inv.current_worth ? `AED ${inv.current_worth.toLocaleString()}` : '-'}</Typography></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <Typography variant='body2' color='text.secondary'>
                  {propertyId ? 'No inventory items for this property' : 'Select a property in Contract Details to view inventory'}
                </Typography>
              )}
            </Grid>
          </Grid>
        )

      case 7:
        return (
          <Grid container spacing={6}>
            <Grid size={{ xs: 12 }}>
              <Typography variant='h5'>Documents</Typography>
              <Typography variant='body2' color='text.secondary'>
                Upload contract documents and enter Ejari details
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant='subtitle1' className='font-medium mbe-2'>
                Contract PDF
              </Typography>
              <FileUpload label='Upload Contract PDF' accept='.pdf' onChange={file => setContractPdf(file)} />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant='subtitle1' className='font-medium mbe-2'>
                Ejari Registration
              </Typography>
              <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <CustomTextField
                    fullWidth
                    label='Ejari Number'
                    placeholder='e.g. 1234567890'
                    value={ejariNumber}
                    onChange={e => setEjariNumber(e.target.value.replace(/\D/g, ''))}
                    slotProps={{ htmlInput: { inputMode: 'numeric' } }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FileUpload label='Upload Ejari Certificate' accept='.pdf,.jpg,.jpeg,.png' onChange={file => setEjariCertificate(file)} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )

      case 8:
        return (
          <Grid container spacing={6}>
            <Grid size={{ xs: 12 }}>
              <Typography variant='h5'>Entry Photos</Typography>
              <Typography variant='body2' color='text.secondary'>
                Upload photos of the property at the time of contract entry
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <DropZone
                onClick={() => entryPhotos.length < MAX_PHOTOS && entryPhotoRef.current?.click()}
                style={{ opacity: entryPhotos.length >= MAX_PHOTOS ? 0.5 : 1 }}
              >
                <input
                  ref={entryPhotoRef}
                  type='file'
                  hidden
                  multiple
                  accept='.jpg,.jpeg,.png,.webp'
                  onChange={handleAddEntryPhotos}
                />
                <i className='tabler-cloud-upload text-[40px] text-textSecondary' />
                <Typography variant='body1' color='text.secondary'>
                  {entryPhotos.length >= MAX_PHOTOS ? 'Maximum photos reached' : 'Click to upload or drag and drop'}
                </Typography>
                <Typography variant='caption' color='text.disabled'>
                  {entryPhotos.length} / {MAX_PHOTOS} photos uploaded
                </Typography>
              </DropZone>
            </Grid>
            {entryPhotos.length > 0 && (
              <Grid size={{ xs: 12 }}>
                <Grid container spacing={3}>
                  {entryPhotos.map((photo, index) => (
                    <Grid key={index} size={{ xs: 6, sm: 4, md: 3 }}>
                      <PhotoThumbnail>
                        <img src={URL.createObjectURL(photo)} alt={`Entry photo ${index + 1}`} />
                        <IconButton className='delete-btn' size='small' onClick={() => handleRemoveEntryPhoto(index)}>
                          <i className='tabler-x text-base' />
                        </IconButton>
                      </PhotoThumbnail>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}
          </Grid>
        )

      case 9:
        return (
          <Grid container spacing={6}>
            <Grid size={{ xs: 12 }}>
              <Typography variant='h5'>Payment Schedule</Typography>
              <Typography variant='body2' color='text.secondary'>
                Add payment rows for rent, deposits, and fees
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Button
                variant='tonal'
                color='primary'
                startIcon={<i className='tabler-plus' />}
                onClick={handleAddPaymentRow}
                disabled={editingRow !== null}
              >
                Add Row
              </Button>
            </Grid>
            {(paymentRows.length > 0 || editingRow) && (
              <Grid size={{ xs: 12 }}>
                <div className='overflow-x-auto border rounded'>
                  <table className={tableStyles.table}>
                    <thead>
                      <tr>
                        <th>Transaction Type</th>
                        <th>Amount (AED)</th>
                        <th>Payment Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentRows.map(row => (
                        <tr key={row.id}>
                          <td><Typography variant='body2'>{row.transactionType}</Typography></td>
                          <td><Typography variant='body2'>{`AED ${Number(row.amount).toLocaleString()}`}</Typography></td>
                          <td><Typography variant='body2'>{row.paymentDate}</Typography></td>
                          <td>
                            <IconButton size='small' onClick={() => handleRemovePaymentRow(row.id)}>
                              <i className='tabler-x text-textSecondary' />
                            </IconButton>
                          </td>
                        </tr>
                      ))}
                      {editingRow && (
                        <tr>
                          <td>
                            <CustomTextField
                              select
                              size='small'
                              fullWidth
                              value={editingRow.transactionType}
                              onChange={e => setEditingRow({ ...editingRow, transactionType: e.target.value })}
                            >
                              <MenuItem value=''>Select</MenuItem>
                              {transactionTypes.map(t => (
                                <MenuItem key={t} value={t}>{t}</MenuItem>
                              ))}
                            </CustomTextField>
                          </td>
                          <td>
                            <CustomTextField
                              size='small'
                              fullWidth
                              placeholder='Amount'
                              value={editingRow.amount}
                              onChange={e =>
                                setEditingRow({ ...editingRow, amount: e.target.value.replace(/\D/g, '') })
                              }
                              slotProps={{ htmlInput: { inputMode: 'numeric' } }}
                            />
                          </td>
                          <td>
                            <CustomTextField
                              size='small'
                              fullWidth
                              type='date'
                              value={editingRow.paymentDate}
                              onChange={e => setEditingRow({ ...editingRow, paymentDate: e.target.value })}
                              slotProps={{ inputLabel: { shrink: true } }}
                            />
                          </td>
                          <td>
                            <div className='flex items-center'>
                              <IconButton size='small' color='success' onClick={handleConfirmPaymentRow}>
                                <i className='tabler-plus' />
                              </IconButton>
                              <IconButton size='small' color='error' onClick={handleCancelEditingRow}>
                                <i className='tabler-x' />
                              </IconButton>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </Grid>
            )}
          </Grid>
        )

      default:
        return null
    }
  }

  return (
    <Card className='flex flex-col lg:flex-row lg:min-bs-[680px]'>
      <CardContent className='max-lg:border-be lg:border-ie lg:min-is-[300px]'>
        <StepperWrapper>
          <Stepper
            activeStep={activeStep}
            orientation='vertical'
            connector={<></>}
            className='flex flex-col gap-4 min-is-[220px]'
          >
            {steps.map((step, index) => (
              <Step key={index} onClick={() => setActiveStep(index)} completed={false}>
                <StepLabel icon={<></>} className='p-1 cursor-pointer'>
                  <div className='step-label'>
                    <CustomAvatar
                      variant='rounded'
                      skin={activeStep === index ? 'filled' : 'light'}
                      color='primary'
                      {...(activeStep === index && { className: 'shadow-primarySm' })}
                      size={38}
                    >
                      <i className={classnames(step.icon, 'text-[22px]!')} />
                    </CustomAvatar>
                    <div className='flex flex-col'>
                      <Typography color='text.primary' className='step-title'>
                        {step.title}
                      </Typography>
                      <Typography className='step-subtitle'>{step.subtitle}</Typography>
                    </div>
                  </div>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </StepperWrapper>
      </CardContent>

      <CardContent className='flex-1 flex flex-col pbs-6 overflow-y-auto'>
        <div className='flex-1'>
          {renderStepContent()}
        </div>
        <div className='flex items-center justify-between mbs-6'>
          <Button
            variant='tonal'
            color='secondary'
            disabled={activeStep === 0}
            onClick={handlePrev}
            startIcon={<DirectionalIcon ltrIconClass='tabler-arrow-left' rtlIconClass='tabler-arrow-right' />}
          >
            Previous
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button
              variant='contained'
              color='success'
              onClick={handleSubmit}
              disabled={submitting}
              endIcon={submitting ? <CircularProgress size={20} color='inherit' /> : <i className='tabler-check' />}
            >
              {submitting ? 'Creating...' : 'Create Contract'}
            </Button>
          ) : (
            <Button
              variant='contained'
              onClick={handleNext}
              endIcon={<DirectionalIcon ltrIconClass='tabler-arrow-right' rtlIconClass='tabler-arrow-left' />}
            >
              Next
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default AddContract
