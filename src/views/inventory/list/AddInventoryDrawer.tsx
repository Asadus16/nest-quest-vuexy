'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import InputAdornment from '@mui/material/InputAdornment'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'

// Type Imports
import type { InventoryType } from '@/types/apps/inventoryTypes'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import FileUpload from '@core/components/FileUpload'

type Props = {
  open: boolean
  handleClose: () => void
  inventoryData?: InventoryType[]
  setData: (data: InventoryType[]) => void
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
  propertyAssigned: string
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

const properties = [
  'Marina Heights 2BR',
  'Palm Villa Deluxe',
  'Business Bay Studio',
  'JVC Family Townhouse',
  'Reem Island 1BR',
  'Downtown Penthouse',
  'Sharjah Family Flat',
  'Yas Island Duplex',
  'Dubai Hills 3BR',
  'DIFC Office Suite',
  'Al Barsha Studio',
  'Arabian Ranches Villa',
  'Ajman Tower 2BR',
  'Saadiyat Beach Villa',
  'Motor City Loft',
  'JBR Waterfront 2BR',
  'Silicon Oasis 1BR',
  'Corniche Apartment',
  'Al Majaz Flat',
  'RAK Beachfront Villa'
]

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
  propertyAssigned: '',
  notes: ''
}

const AddInventoryDrawer = (props: Props) => {
  // Props
  const { open, handleClose, inventoryData, setData } = props

  // States
  const [photos, setPhotos] = useState<File | null>(null)

  // Hooks
  const {
    control,
    reset: resetForm,
    handleSubmit,
    formState: { errors }
  } = useForm<FormDataType>({ defaultValues })

  const onSubmit = (data: FormDataType) => {
    const newItem: InventoryType = {
      id: (inventoryData?.length ?? 0) + 1,
      name: data.name,
      description: data.description,
      type: data.type,
      roomAssigned: data.roomAssigned,
      brand: data.brand,
      serialNumber: data.serialNumber,
      currentWorth: Number(data.currentWorth),
      warrantyStart: data.warrantyStart,
      warrantyEnd: data.warrantyEnd,
      propertyAssigned: data.propertyAssigned,
      photos: photos ? [URL.createObjectURL(photos)] : [],
      notes: data.notes
    }

    setData([...(inventoryData ?? []), newItem])
    handleReset()
  }

  const handleReset = () => {
    handleClose()
    resetForm(defaultValues)
    setPhotos(null)
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
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='Room Assigned'
                {...field}
                {...(errors.roomAssigned && { error: true, helperText: 'This field is required.' })}
              >
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
            rules={{ required: true }}
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
                {...(errors.currentWorth && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
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
          <Controller
            name='propertyAssigned'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='Property Assigned To'
                {...field}
                {...(errors.propertyAssigned && { error: true, helperText: 'This field is required.' })}
              >
                <MenuItem value=''>Select Property</MenuItem>
                {properties.map(p => (
                  <MenuItem key={p} value={p}>
                    {p}
                  </MenuItem>
                ))}
              </CustomTextField>
            )}
          />
          <FileUpload
            label='Upload Photos'
            accept='.jpg,.jpeg,.png,.webp'
            onChange={f => setPhotos(f)}
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
            <Button variant='contained' type='submit'>
              Submit
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
