'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'

// Type Imports
import type { ContractDetailType } from '@/types/apps/contractTypes'
import type { InventoryType } from '@/types/apps/inventoryTypes'

// Service Imports
import { getInventories } from '@/services/inventory'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

const DetailRow = ({ icon, label, value }: { icon: string; label: string; value: string | null | undefined }) => {
  if (!value) return null

  return (
    <div className='flex items-center flex-wrap gap-x-1.5'>
      <Typography className='font-medium' color='text.primary'>
        <i className={`${icon} text-base mie-1 align-text-bottom`} />
        {label}:
      </Typography>
      <Typography>{value}</Typography>
    </div>
  )
}

const OverviewTab = ({ contract }: { contract: ContractDetailType }) => {
  const [inventoryItems, setInventoryItems] = useState<InventoryType[]>([])

  useEffect(() => {
    let mounted = true

    if (contract.property?.id) {
      getInventories(contract.property.id)
        .then(data => { if (mounted) setInventoryItems(data) })
        .catch(() => { if (mounted) setInventoryItems([]) })
    }

    return () => { mounted = false }
  }, [contract.property?.id])

  const tenant = contract.tenant
  const owner = contract.owner
  const property = contract.property

  return (
    <Grid container spacing={6}>
      {/* Property Details */}
      {property && (
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardHeader
              title='Property Details'
              avatar={
                <CustomAvatar variant='rounded' color='primary' skin='light' size={34}>
                  <i className='tabler-building text-lg' />
                </CustomAvatar>
              }
            />
            <CardContent>
              <div className='flex flex-col gap-2'>
                <DetailRow icon='tabler-home' label='Name' value={property.public_name} />
                <DetailRow icon='tabler-category' label='Type' value={property.property_type} />
                <DetailRow icon='tabler-bed' label='Bedrooms' value={property.bedrooms?.toString()} />
                <DetailRow icon='tabler-bath' label='Bathrooms' value={property.bathrooms?.toString()} />
                <DetailRow icon='tabler-ruler-2' label='Area' value={property.area_sqft ? `${property.area_sqft.toLocaleString()} sq ft` : null} />
                <DetailRow icon='tabler-door' label='Unit' value={property.unit_number} />
                <DetailRow icon='tabler-stairs-up' label='Floor' value={property.floor_number} />
                <DetailRow icon='tabler-building-skyscraper' label='Building' value={property.building_name} />
                <DetailRow icon='tabler-map-pin' label='Address' value={property.address_line_1} />
                <DetailRow icon='tabler-map' label='City' value={property.city} />
                <DetailRow icon='tabler-map-2' label='Area' value={property.area} />
              </div>
            </CardContent>
          </Card>
        </Grid>
      )}

      {/* Property Inventory */}
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardHeader
            title='Property Inventory'
            avatar={
              <CustomAvatar variant='rounded' color='secondary' skin='light' size={34}>
                <i className='tabler-packages text-lg' />
              </CustomAvatar>
            }
            subheader={`${inventoryItems.length} items assigned`}
          />
          {inventoryItems.length > 0 ? (
            <div className='overflow-x-auto'>
              <table className={tableStyles.table}>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Type</th>
                    <th>Room</th>
                    <th>Brand</th>
                    <th>Worth</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryItems.map(inv => (
                    <tr key={inv.id}>
                      <td>
                        <Typography className='font-medium' color='text.primary'>
                          {inv.name}
                        </Typography>
                      </td>
                      <td>
                        <Chip label={inv.type} size='small' variant='tonal' color='secondary' />
                      </td>
                      <td><Typography>{inv.room_assigned || '-'}</Typography></td>
                      <td><Typography>{inv.brand || '-'}</Typography></td>
                      <td><Typography>{inv.current_worth ? `AED ${inv.current_worth.toLocaleString()}` : '-'}</Typography></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <CardContent>
              <Typography variant='body2' color='text.secondary'>No inventory items for this property</Typography>
            </CardContent>
          )}
        </Card>
      </Grid>

      {/* Tenant Information */}
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardHeader
            title='Tenant Information'
            avatar={
              <CustomAvatar variant='rounded' color='info' skin='light' size={34}>
                <i className='tabler-user-check text-lg' />
              </CustomAvatar>
            }
          />
          <CardContent>
            {tenant ? (
              <>
                <div className='flex items-center gap-4 mbe-4'>
                  <CustomAvatar alt={tenant.full_name} size={60}>
                    <i className='tabler-user text-[28px]' />
                  </CustomAvatar>
                  <div className='flex flex-col gap-1'>
                    <Typography variant='h6'>{tenant.full_name}</Typography>
                    {tenant.nationality && (
                      <Typography variant='body2' color='text.secondary'>{tenant.nationality}</Typography>
                    )}
                  </div>
                </div>
                <Divider className='mlb-4' />
                <div className='flex flex-col gap-2'>
                  <DetailRow icon='tabler-mail' label='Email' value={tenant.email} />
                  <DetailRow icon='tabler-phone' label='Phone' value={tenant.phone} />
                  <DetailRow icon='tabler-id' label='Emirates ID' value={tenant.emirates_id_number} />
                  <DetailRow icon='tabler-calendar' label='Emirates ID Expiry' value={tenant.emirates_id_expiry} />
                  <DetailRow icon='tabler-passport' label='Passport' value={tenant.passport_number} />
                  <DetailRow icon='tabler-calendar' label='Passport Expiry' value={tenant.passport_expiry} />
                  <DetailRow icon='tabler-flag' label='Passport Issued' value={tenant.passport_issued_country} />
                  <DetailRow icon='tabler-map-pin' label='Address' value={tenant.address} />
                </div>
              </>
            ) : (
              <Typography variant='body2' color='text.secondary'>No tenant assigned</Typography>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* Owner Information */}
      {owner && (
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardHeader
              title='Owner Information'
              avatar={
                <CustomAvatar variant='rounded' color='warning' skin='light' size={34}>
                  <i className='tabler-home-hand text-lg' />
                </CustomAvatar>
              }
            />
            <CardContent>
              <div className='flex items-center gap-4 mbe-4'>
                <CustomAvatar alt={owner.full_name} size={60}>
                  <i className='tabler-user text-[28px]' />
                </CustomAvatar>
                <div className='flex flex-col gap-1'>
                  <Typography variant='h6'>{owner.full_name}</Typography>
                  {owner.nationality && (
                    <Typography variant='body2' color='text.secondary'>{owner.nationality}</Typography>
                  )}
                </div>
              </div>
              <Divider className='mlb-4' />
              <div className='flex flex-col gap-2'>
                <DetailRow icon='tabler-mail' label='Email' value={owner.email} />
                <DetailRow icon='tabler-phone' label='Phone' value={owner.phone} />
                <DetailRow icon='tabler-id' label='Emirates ID' value={owner.emirates_id_number} />
                <DetailRow icon='tabler-calendar' label='Emirates ID Expiry' value={owner.emirates_id_expiry} />
                <DetailRow icon='tabler-passport' label='Passport' value={owner.passport_number} />
                <DetailRow icon='tabler-calendar' label='Passport Expiry' value={owner.passport_expiry} />
                <DetailRow icon='tabler-flag' label='Passport Issued' value={owner.passport_issued_country} />
              </div>
              {(owner.bank_name || owner.iban) && (
                <>
                  <Divider className='mlb-4' />
                  <Typography variant='subtitle2' className='font-medium mbe-2'>
                    <i className='tabler-building-bank text-base mie-1 align-text-bottom' />
                    Bank Details
                  </Typography>
                  <div className='flex flex-col gap-2'>
                    <DetailRow icon='tabler-building-bank' label='Bank' value={owner.bank_name} />
                    <DetailRow icon='tabler-map-pin' label='Branch' value={owner.bank_branch} />
                    <DetailRow icon='tabler-hash' label='Account No' value={owner.account_number} />
                    <DetailRow icon='tabler-credit-card' label='IBAN' value={owner.iban} />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  )
}

export default OverviewTab
