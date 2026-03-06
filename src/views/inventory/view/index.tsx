'use client'

// React Imports
import { useState, useEffect, useCallback } from 'react'

// Next Imports
import { useParams, useRouter } from 'next/navigation'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'

// Third-party Imports
import classnames from 'classnames'

// Type Imports
import type { ThemeColor } from '@core/types'
import type { InventoryType } from '@/types/apps/inventoryTypes'

// Service Imports
import { getInventory } from '@/services/inventory'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

const typeObj: Record<string, { icon: string; color: ThemeColor }> = {
  Furniture: { icon: 'tabler-armchair', color: 'primary' },
  Electronics: { icon: 'tabler-device-desktop', color: 'info' },
  Decor: { icon: 'tabler-photo', color: 'warning' },
  Appliances: { icon: 'tabler-wash-machine', color: 'success' },
  Lighting: { icon: 'tabler-bulb', color: 'error' },
  Plumbing: { icon: 'tabler-droplet', color: 'primary' },
  HVAC: { icon: 'tabler-air-conditioning', color: 'info' },
  Kitchenware: { icon: 'tabler-tools-kitchen-2', color: 'warning' },
  Linen: { icon: 'tabler-bed', color: 'success' },
  Outdoor: { icon: 'tabler-trees', color: 'error' }
}

const getWarrantyStatus = (warrantyEnd: string | null): { label: string; color: ThemeColor } => {
  if (!warrantyEnd) return { label: 'N/A', color: 'secondary' }

  const today = new Date()
  const end = new Date(warrantyEnd)

  if (end < today) return { label: 'Expired', color: 'error' }

  const diffDays = (end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)

  if (diffDays <= 90) return { label: 'Expiring Soon', color: 'warning' }

  return { label: 'Active', color: 'success' }
}

const DetailRow = ({ icon, label, value }: { icon: string; label: string; value: string | null | undefined }) => (
  <div className='flex items-center gap-4'>
    <CustomAvatar skin='light' variant='rounded' size={40}>
      <i className={classnames(icon, 'text-[22px]')} />
    </CustomAvatar>
    <div>
      <Typography variant='body2' color='text.disabled'>
        {label}
      </Typography>
      <Typography color='text.primary' className='font-medium'>
        {value || '-'}
      </Typography>
    </div>
  </div>
)

const ViewInventoryPage = () => {
  const params = useParams()
  const router = useRouter()
  const id = Number(params.id)
  const locale = params.lang as string

  const [loading, setLoading] = useState(true)
  const [item, setItem] = useState<InventoryType | null>(null)

  const fetchData = useCallback(async () => {
    try {
      const data = await getInventory(id)

      setItem(data)
    } catch {
      router.push(`/${locale}/inventory/list`)
    } finally {
      setLoading(false)
    }
  }, [id, locale, router])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-[400px]'>
        <CircularProgress />
      </div>
    )
  }

  if (!item) {
    return (
      <div className='flex justify-center items-center min-h-[400px]'>
        <Typography color='text.secondary'>Inventory item not found.</Typography>
      </div>
    )
  }

  const warrantyStatus = getWarrantyStatus(item.warranty_end)
  const typeInfo = typeObj[item.type] || { icon: 'tabler-package', color: 'primary' as ThemeColor }

  return (
    <Grid container spacing={6}>
      {/* Left Panel — Item Profile */}
      <Grid size={{ xs: 12, lg: 4, md: 5 }}>
        <Card>
          <CardContent className='flex flex-col items-center gap-6 pt-12 pb-6'>
            <CustomAvatar skin='light' color={typeInfo.color} variant='rounded' size={100}>
              <i className={classnames(typeInfo.icon, 'text-[50px]')} />
            </CustomAvatar>
            <div className='flex flex-col items-center gap-2'>
              <Typography variant='h5'>{item.name}</Typography>
              <Chip variant='tonal' label={item.type} color={typeInfo.color} size='small' className='capitalize' />
            </div>
            <Chip variant='tonal' label={warrantyStatus.label} color={warrantyStatus.color} />
          </CardContent>
          <CardContent>
            <div className='flex flex-col gap-4'>
              <Typography variant='subtitle2' className='uppercase' color='text.disabled'>
                Quick Info
              </Typography>
              <Divider />
              <DetailRow icon='tabler-building' label='Property' value={item.property?.public_name} />
              <DetailRow icon='tabler-door' label='Room' value={item.room_assigned} />
              <DetailRow icon='tabler-tag' label='Brand' value={item.brand} />
              <DetailRow
                icon='tabler-currency-dirham'
                label='Current Worth'
                value={item.current_worth ? `AED ${item.current_worth.toLocaleString()}` : null}
              />
              <DetailRow
                icon='tabler-calendar-plus'
                label='Added'
                value={item.created_at ? new Date(item.created_at).toLocaleDateString() : null}
              />
            </div>
          </CardContent>
        </Card>
      </Grid>

      {/* Right Panel — Full Details */}
      <Grid size={{ xs: 12, lg: 8, md: 7 }}>
        <Grid container spacing={6}>
          {/* Item Information */}
          <Grid size={{ xs: 12 }}>
            <Card>
              <CardContent>
                <Typography variant='h6' className='mbe-4'>
                  Item Information
                </Typography>
                <Divider className='mbe-4' />
                <Grid container spacing={4}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <DetailRow icon='tabler-package' label='Name' value={item.name} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <DetailRow icon='tabler-category' label='Type' value={item.type} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <DetailRow icon='tabler-tag' label='Brand' value={item.brand} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <DetailRow icon='tabler-barcode' label='Serial Number' value={item.serial_number} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <DetailRow icon='tabler-door' label='Room Assigned' value={item.room_assigned} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <DetailRow icon='tabler-building' label='Property' value={item.property?.public_name} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <DetailRow
                      icon='tabler-currency-dirham'
                      label='Current Worth'
                      value={item.current_worth ? `AED ${item.current_worth.toLocaleString()}` : null}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <DetailRow
                      icon='tabler-user-check'
                      label='Owned By'
                      value={item.owned_by === 'PROPERTY_MANAGER' ? 'Property Manager' : item.owned_by === 'PROPERTY_OWNER' ? 'Property Owner' : null}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <DetailRow
                      icon='tabler-clipboard-check'
                      label='Condition'
                      value={item.condition ? item.condition.charAt(0) + item.condition.slice(1).toLowerCase() : null}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Warranty Details */}
          <Grid size={{ xs: 12 }}>
            <Card>
              <CardContent>
                <div className='flex items-center justify-between mbe-4'>
                  <Typography variant='h6'>Warranty Details</Typography>
                  <Chip variant='tonal' label={warrantyStatus.label} color={warrantyStatus.color} size='small' />
                </div>
                <Divider className='mbe-4' />
                <Grid container spacing={4}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <DetailRow
                      icon='tabler-calendar-check'
                      label='Warranty Start'
                      value={item.warranty_start ? new Date(item.warranty_start).toLocaleDateString() : null}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <DetailRow
                      icon='tabler-calendar-x'
                      label='Warranty End'
                      value={item.warranty_end ? new Date(item.warranty_end).toLocaleDateString() : null}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Description & Notes */}
          {(item.description || item.notes) && (
            <Grid size={{ xs: 12 }}>
              <Card>
                <CardContent>
                  <Typography variant='h6' className='mbe-4'>
                    Description & Notes
                  </Typography>
                  <Divider className='mbe-4' />
                  {item.description && (
                    <div className='mbe-4'>
                      <Typography variant='subtitle2' color='text.disabled' className='mbe-1'>
                        Description
                      </Typography>
                      <Typography>{item.description}</Typography>
                    </div>
                  )}
                  {item.notes && (
                    <div>
                      <Typography variant='subtitle2' color='text.disabled' className='mbe-1'>
                        Notes
                      </Typography>
                      <Typography>{item.notes}</Typography>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Grid>
          )}

          {/* Photo */}
          {item.photo_url && (
            <Grid size={{ xs: 12 }}>
              <Card>
                <CardContent>
                  <Typography variant='h6' className='mbe-4'>
                    Photo
                  </Typography>
                  <Divider className='mbe-4' />
                  <img
                    src={item.photo_url}
                    alt={item.name}
                    className='rounded-lg max-h-[300px] object-cover'
                  />
                </CardContent>
              </Card>
            </Grid>
          )}

          {/* Back Button */}
          <Grid size={{ xs: 12 }}>
            <Button
              variant='tonal'
              startIcon={<i className='tabler-arrow-left' />}
              onClick={() => router.push(`/${locale}/inventory/list`)}
            >
              Back to Inventory
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ViewInventoryPage
