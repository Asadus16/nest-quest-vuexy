// React Imports
import type { ReactNode } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Type Imports
import type { PropertyDetailType } from '@/types/apps/propertyTypes'

const ACQUISITION = {
  RENTED: 'Rented',
  BOUGHT_CASH: 'Bought (Cash)',
  FINANCED: 'Financed'
} as const

const InfoRow = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className='flex items-center flex-wrap gap-x-1.5'>
    <Typography className='font-medium' color='text.primary'>
      {label}:
    </Typography>
    <Typography>{children}</Typography>
  </div>
)

const formatCurrency = (value: string | null) =>
  value ? `AED ${Number(value).toLocaleString()}` : null

const PropertyFinancials = ({ property }: { property: PropertyDetailType }) => {
  const { acquisition_method } = property
  const isRented = acquisition_method === ACQUISITION.RENTED
  const isBoughtOrFinanced =
    acquisition_method === ACQUISITION.BOUGHT_CASH || acquisition_method === ACQUISITION.FINANCED
  const hasUtilities = property.dewa_number || property.internet_account_number || property.gas_number

  return (
    <Card>
      <CardContent className='flex flex-col gap-6'>
        <div>
          <Typography variant='h5'>Financials</Typography>
          <Divider className='mlb-4' />
          <div className='flex flex-col gap-2'>
            {property.usage_type && (
              <InfoRow label='Usage Type'>
                <span className='capitalize'>{property.usage_type.replace('-', ' ')}</span>
              </InfoRow>
            )}
            {property.monthly_rent && <InfoRow label='Monthly Rent'>{formatCurrency(property.monthly_rent)}</InfoRow>}
            {property.security_deposit_required && property.security_deposit_amount && (
              <InfoRow label='Security Deposit'>{formatCurrency(property.security_deposit_amount)}</InfoRow>
            )}
          </div>
        </div>

        {acquisition_method && (
          <div>
            <Typography variant='h5'>Acquisition</Typography>
            <Divider className='mlb-4' />
            <div className='flex flex-col gap-2'>
              <InfoRow label='Method'>{acquisition_method}</InfoRow>
              {isRented && (
                <>
                  {property.rent_amount && <InfoRow label='Rent Amount'>{formatCurrency(property.rent_amount)}</InfoRow>}
                  {property.rent_frequency && <InfoRow label='Frequency'>{property.rent_frequency}</InfoRow>}
                  {property.tenancy_start_date && (
                    <InfoRow label='Tenancy Start'>{property.tenancy_start_date}</InfoRow>
                  )}
                  {property.tenancy_end_date && <InfoRow label='Tenancy End'>{property.tenancy_end_date}</InfoRow>}
                </>
              )}
              {isBoughtOrFinanced && (
                <>
                  {property.purchase_price && (
                    <InfoRow label='Purchase Price'>{formatCurrency(property.purchase_price)}</InfoRow>
                  )}
                  {property.purchase_date && <InfoRow label='Purchase Date'>{property.purchase_date}</InfoRow>}
                </>
              )}
            </div>
          </div>
        )}

        {hasUtilities && (
          <div>
            <Typography variant='h5'>Utilities</Typography>
            <Divider className='mlb-4' />
            <div className='flex flex-col gap-2'>
              {property.dewa_number && <InfoRow label='DEWA'>{property.dewa_number}</InfoRow>}
              {property.internet_account_number && (
                <InfoRow label='Internet'>{property.internet_account_number}</InfoRow>
              )}
              {property.gas_number && <InfoRow label='Gas'>{property.gas_number}</InfoRow>}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default PropertyFinancials
