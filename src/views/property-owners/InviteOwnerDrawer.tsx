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
import { sendInvite } from '@/services/ownerInvitations'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

type Props = {
  open: boolean
  handleClose: () => void
  onSuccess: () => void
}

type FormValidateType = {
  email: string
}

const InviteOwnerDrawer = ({ open, handleClose, onSuccess }: Props) => {
  // States
  const [phone, setPhone] = useState('')
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
      email: ''
    }
  })

  const onSubmit = async (data: FormValidateType) => {
    setApiError('')
    setLoading(true)

    try {
      await sendInvite(data.email, phone || undefined)
      handleReset()
      onSuccess()
    } catch (err: any) {
      setApiError(err.message || 'Failed to send invitation.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    handleClose()
    setPhone('')
    setApiError('')
    resetForm({ email: '' })
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
        <Typography variant='h5'>Invite Property Owner</Typography>
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
            name='email'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                type='email'
                label='Email'
                placeholder='owner@example.com'
                {...(errors.email && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
          <MuiTelInput
            value={phone}
            onChange={setPhone}
            defaultCountry='AE'
            label='Phone Number (Optional)'
            fullWidth
          />
          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit' disabled={loading}>
              {loading ? 'Sending...' : 'Send Invite'}
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

export default InviteOwnerDrawer
