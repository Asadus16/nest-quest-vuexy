// React Imports
import { useState } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Alert from '@mui/material/Alert'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'
import { MuiTelInput } from 'mui-tel-input'

// Service Imports
import { createTenant } from '@/services/tenantInvitations'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

type Props = {
  open: boolean
  handleClose: () => void
  onSuccess: () => void
}

type FormValidateType = {
  full_name: string
  email: string
  phone: string
  dob: string
  nationality: string
  address: string
}

const CreateTenantDrawer = ({ open, handleClose, onSuccess }: Props) => {
  // States
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  // Hooks
  const {
    control,
    reset: resetForm,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValidateType>({
    defaultValues: {
      full_name: '',
      email: '',
      phone: '',
      dob: '',
      nationality: '',
      address: ''
    }
  })

  const onSubmit = async (data: FormValidateType) => {
    setApiError('')
    setLoading(true)

    try {
      await createTenant({
        full_name: data.full_name,
        email: data.email,
        phone: data.phone || undefined,
        dob: data.dob || undefined,
        nationality: data.nationality || undefined,
        address: data.address || undefined
      })

      handleReset()
      onSuccess()
    } catch (err: any) {
      setApiError(err.message || 'Failed to create tenant.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    handleClose()
    setApiError('')
    resetForm({
      full_name: '',
      email: '',
      phone: '',
      dob: '',
      nationality: '',
      address: ''
    })
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
        <Typography variant='h5'>Create Tenant</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='tabler-x text-2xl text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
          {apiError && (
            <Alert severity='error' onClose={() => setApiError('')}>
              {apiError}
            </Alert>
          )}
          <Controller
            name='full_name'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Full Name'
                placeholder='John Doe'
                {...(errors.full_name && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
          <Controller
            name='email'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                type='email'
                label='Email'
                placeholder='tenant@example.com'
                {...(errors.email && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
          <Controller
            name='phone'
            control={control}
            render={({ field }) => (
              <MuiTelInput
                value={field.value}
                onChange={field.onChange}
                defaultCountry='AE'
                label='Phone Number (Optional)'
                fullWidth
              />
            )}
          />
          <Controller
            name='dob'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                type='date'
                label='Date of Birth (Optional)'
                slotProps={{ inputLabel: { shrink: true } }}
              />
            )}
          />
          <Controller
            name='nationality'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Nationality (Optional)'
                placeholder='e.g. UAE'
              />
            )}
          />
          <Controller
            name='address'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                multiline
                rows={3}
                label='Address (Optional)'
                placeholder='Enter full address'
              />
            )}
          />
          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit' disabled={loading}>
              {loading ? 'Creating...' : 'Create Tenant'}
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

export default CreateTenantDrawer
