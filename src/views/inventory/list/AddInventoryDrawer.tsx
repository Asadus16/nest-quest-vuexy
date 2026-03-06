'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import InputAdornment from '@mui/material/InputAdornment'
import Alert from '@mui/material/Alert'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'

// Type Imports
import type { PropertyType } from '@/types/apps/propertyTypes'

// Service Imports
import { createInventory } from '@/services/inventory'
import { getProperties } from '@/services/properties'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import FileUpload from '@core/components/FileUpload'

type Props = {
  open: boolean
  handleClose: () => void
  onSuccess: () => void
}

type FormDataType = {
  name: string
  description: string
  type: string
  roomAssigned: string
  brand: string
  serialNumber: string
  currentWorth: string
  warrantyStart: string
  warrantyEnd: string
  propertyId: string
  ownedBy: string
  condition: string
  notes: string
}

const inventoryTypes = [
  'Furniture',
  'Electronics',
  'Decor',
  'Appliances',
  'Lighting',
  'Plumbing',
  'HVAC',
  'Kitchenware',
  'Linen',
  'Outdoor'
]

const rooms = [
  'Room 1',
  'Room 2',
  'Room 3',
  'Kitchen',
  'Balcony',
  'Living Room',
  'Bathroom',
  'Master Bedroom',
  'Guest Room',
  'Dining Room'
]

const conditions = ['NEW', 'GOOD', 'FAIR', 'POOR', 'DAMAGED']

const conditionLabels: Record<string, string> = {
  NEW: 'New',
  GOOD: 'Good',
  FAIR: 'Fair',
  POOR: 'Poor',
  DAMAGED: 'Damaged'
}

const defaultValues: FormDataType = {
  name: '',
  description: '',
  type: '',
  roomAssigned: '',
  brand: '',
  serialNumber: '',
  currentWorth: '',
  warrantyStart: '',
  warrantyEnd: '',
  propertyId: '',
  ownedBy: '',
  condition: '',
  notes: ''
}

const AddInventoryDrawer = (props: Props) => {
  // Props
  const { open, handleClose, onSuccess } = props

  // States
  const [photo, setPhoto] = useState<File | null>(null)
  const [hasWarranty, setHasWarranty] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [properties, setProperties] = useState<PropertyType[]>([])

  // Hooks
  const {
    control,
    reset: resetForm,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormDataType>({ defaultValues })

  useEffect(() => {
    if (open) {
      getProperties()
        .then(setProperties)
        .catch(() => {})
    }
  }, [open])

  const onSubmit = async (data: FormDataType) => {
    setLoading(true)
    setError(null)

    try {
      const fd = new FormData()

      fd.append('name', data.name)
      fd.append('type', data.type)

      if (data.description) fd.append('description', data.description)
      if (data.roomAssigned) fd.append('room_assigned', data.roomAssigned)
      if (data.brand) fd.append('brand', data.brand)
      if (data.serialNumber) fd.append('serial_number', data.serialNumber)
      if (data.currentWorth) fd.append('current_worth', data.currentWorth)

      if (hasWarranty) {
        if (data.warrantyStart) fd.append('warranty_start', data.warrantyStart)
        if (data.warrantyEnd) fd.append('warranty_end', data.warrantyEnd)
      }

      if (data.propertyId) fd.append('property_id', data.propertyId)
      if (data.ownedBy) fd.append('owned_by', data.ownedBy)
      if (data.condition) fd.append('condition', data.condition)
      if (data.notes) fd.append('notes', data.notes)
      if (photo) fd.append('photo', photo)

      await createInventory(fd)
      handleReset()
      onSuccess()
    } catch (err: any) {
      setError(err.message || 'Failed to create inventory item.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    handleClose()
    resetForm(defaultValues)
    setPhoto(null)
    setHasWarranty(false)
    setError(null)
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <div className='flex items-center justify-between plb-5 pli-6'>
        <Typography variant='h5'>Add Inventory Item</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='tabler-x text-2xl text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
          {error && <Alert severity='error'>{error}</Alert>}
          <Controller
            name='name'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Name'
                placeholder='e.g. Samsung Smart TV'
                {...(errors.name && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
          <Controller
            name='description'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Description'
                placeholder='Brief description of the item'
                multiline
                rows={3}
              />
            )}
          />
          <Controller
            name='type'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='Type'
                {...field}
                {...(errors.type && { error: true, helperText: 'This field is required.' })}
              >
                <MenuItem value=''>Select Type</MenuItem>
                {inventoryTypes.map(t => (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                ))}
              </CustomTextField>
            )}
          />
          <Controller
            name='roomAssigned'
            control={control}
            render={({ field }) => (
              <CustomTextField select fullWidth label='Room Assigned' {...field}>
                <MenuItem value=''>Select Room</MenuItem>
                {rooms.map(r => (
                  <MenuItem key={r} value={r}>
                    {r}
                  </MenuItem>
                ))}
              </CustomTextField>
            )}
          />
          <Controller
            name='brand'
            control={control}
            render={({ field }) => (
              <CustomTextField {...field} fullWidth label='Brand' placeholder='e.g. Samsung, IKEA' />
            )}
          />
          <Controller
            name='serialNumber'
            control={control}
            render={({ field }) => (
              <CustomTextField {...field} fullWidth label='Serial Number' placeholder='e.g. STV-2024-001' />
            )}
          />
          <Controller
            name='currentWorth'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Current Worth'
                placeholder='e.g. 4500'
                slotProps={{
                  htmlInput: { inputMode: 'numeric' },
                  input: {
                    startAdornment: <InputAdornment position='start'>AED</InputAdornment>
                  }
                }}
                onChange={e => field.onChange(e.target.value.replace(/\D/g, ''))}
              />
            )}
          />
          <FormControlLabel
            control={
              <Switch
                checked={hasWarranty}
                onChange={e => {
                  setHasWarranty(e.target.checked)

                  if (!e.target.checked) {
                    setValue('warrantyStart', '')
                    setValue('warrantyEnd', '')
                  }
                }}
              />
            }
            label='Has Warranty'
          />
          {hasWarranty && (
            <>
              <Controller
                name='warrantyStart'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    type='date'
                    label='Warranty Start'
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                )}
              />
              <Controller
                name='warrantyEnd'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    type='date'
                    label='Warranty End'
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                )}
              />
            </>
          )}
          <Controller
            name='ownedBy'
            control={control}
            render={({ field }) => (
              <CustomTextField select fullWidth label='Owned By' {...field}>
                <MenuItem value=''>Select Owner</MenuItem>
                <MenuItem value='PROPERTY_MANAGER'>Property Manager</MenuItem>
                <MenuItem value='PROPERTY_OWNER'>Property Owner</MenuItem>
              </CustomTextField>
            )}
          />
          <Controller
            name='condition'
            control={control}
            render={({ field }) => (
              <CustomTextField select fullWidth label='Condition' {...field}>
                <MenuItem value=''>Select Condition</MenuItem>
                {conditions.map(c => (
                  <MenuItem key={c} value={c}>
                    {conditionLabels[c]}
                  </MenuItem>
                ))}
              </CustomTextField>
            )}
          />
          <Controller
            name='propertyId'
            control={control}
            render={({ field }) => (
              <CustomTextField select fullWidth label='Property Assigned To' {...field}>
                <MenuItem value=''>Select Property</MenuItem>
                {properties.map(p => (
                  <MenuItem key={p.id} value={String(p.id)}>
                    {p.public_name || `${p.building_name} - ${p.unit_number}`}
                  </MenuItem>
                ))}
              </CustomTextField>
            )}
          />
          <FileUpload
            label='Upload Photo'
            accept='.jpg,.jpeg,.png,.webp'
            onChange={f => setPhoto(f)}
          />
          <Controller
            name='notes'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Notes'
                placeholder='Any additional notes...'
                multiline
                rows={3}
              />
            )}
          />
          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit' disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
            <Button variant='tonal' color='error' type='reset' onClick={handleReset}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default AddInventoryDrawer
