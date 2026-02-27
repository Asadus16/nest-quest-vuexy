'use client'

// React Imports
import { useState, useEffect, useCallback } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'

// Third-party Imports
import classnames from 'classnames'

// Type Imports
import type { ThemeColor } from '@core/types'
import type { InventoryType } from '@/types/apps/inventoryTypes'

// Service Imports
import { getInventories } from '@/services/inventory'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

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

const InventoryTab = ({ propertyId }: { propertyId: number }) => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState<InventoryType[]>([])

  const fetchData = useCallback(async () => {
    try {
      const data = await getInventories(propertyId)

      setItems(data)
    } catch {
      // silently handle
    } finally {
      setLoading(false)
    }
  }, [propertyId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (loading) {
    return (
      <Card>
        <CardContent className='flex justify-center items-center min-h-[200px]'>
          <CircularProgress />
        </CardContent>
      </Card>
    )
  }

  if (items.length === 0) {
    return (
      <Card>
        <CardContent className='flex flex-col justify-center items-center min-h-[200px] gap-2'>
          <i className='tabler-packages text-4xl text-textDisabled' />
          <Typography color='text.secondary'>No inventory items assigned to this property.</Typography>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>Item</th>
              <th>Type</th>
              <th>Room</th>
              <th>Worth</th>
              <th>Warranty</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => {
              const status = getWarrantyStatus(item.warranty_end)

              return (
                <tr key={item.id}>
                  <td>
                    <div className='flex items-center gap-4'>
                      <CustomAvatar
                        skin='light'
                        color={typeObj[item.type]?.color || 'primary'}
                        variant='rounded'
                        size={34}
                      >
                        <i
                          className={classnames(
                            typeObj[item.type]?.icon || 'tabler-package',
                            'text-[22px]'
                          )}
                        />
                      </CustomAvatar>
                      <div className='flex flex-col'>
                        <Typography color='text.primary' className='font-medium'>
                          {item.name}
                        </Typography>
                        <Typography variant='body2'>{item.brand || '-'}</Typography>
                      </div>
                    </div>
                  </td>
                  <td>
                    <Typography className='capitalize'>{item.type}</Typography>
                  </td>
                  <td>
                    <Typography>{item.room_assigned || '-'}</Typography>
                  </td>
                  <td>
                    <Typography>
                      {item.current_worth ? `AED ${item.current_worth.toLocaleString()}` : '-'}
                    </Typography>
                  </td>
                  <td>
                    <Chip variant='tonal' label={status.label} size='small' color={status.color} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default InventoryTab
