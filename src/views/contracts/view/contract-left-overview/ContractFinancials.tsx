// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'

// Type Imports
import type { ContractDetailType } from '@/types/apps/contractTypes'

// Context Imports
import { useRole } from '@/contexts/roleContext'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

const ContractFinancials = ({ contract }: { contract: ContractDetailType }) => {
  const { role } = useRole()
  const totalPaid = contract.payment_schedules
    .filter(p => p.status === 'PAID')
    .reduce((sum, p) => sum + p.amount, 0)

  const totalDue = contract.payment_schedules
    .filter(p => p.status !== 'PAID')
    .reduce((sum, p) => sum + p.amount, 0)

  const totalScheduled = totalPaid + totalDue
  const paidPercentage = totalScheduled > 0 ? Math.round((totalPaid / totalScheduled) * 100) : 0

  return (
    <Card>
      <CardContent className='flex flex-col gap-8'>
        <div>
          <div className='flex items-center gap-2 mbe-3'>
            <CustomAvatar variant='rounded' color='primary' skin='light' size={32}>
              <i className='tabler-report-money text-lg' />
            </CustomAvatar>
            <Typography variant='h5'>Financial Summary</Typography>
          </div>
          <Divider className='mbe-5' />
          <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <i className='tabler-home-dollar text-textSecondary' />
                <Typography color='text.primary'>Total Rent</Typography>
              </div>
              <div className='flex items-center gap-2'>
                <Typography className='font-medium'>AED {contract.rent_amount_total.toLocaleString()}</Typography>
                {contract.rent_frequency && (
                  <Chip label={contract.rent_frequency.replace('_', '-')} size='small' variant='tonal' color='primary' />
                )}
              </div>
            </div>
            {contract.deposit_required && contract.deposit_amount && (
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <i className='tabler-shield-lock text-textSecondary' />
                  <Typography color='text.primary'>Security Deposit</Typography>
                </div>
                <Typography className='font-medium'>AED {contract.deposit_amount.toLocaleString()}</Typography>
              </div>
            )}
            {contract.agency_fee_required && contract.agency_fee_amount && (
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <i className='tabler-building-bank text-textSecondary' />
                  <Typography color='text.primary'>Agency Fee</Typography>
                </div>
                <Typography className='font-medium'>AED {contract.agency_fee_amount.toLocaleString()}</Typography>
              </div>
            )}
          </div>
        </div>
        {contract.payment_schedules.length > 0 && (
          <>
            <Divider />
            <div>
              <div className='flex items-center justify-between mbe-1'>
                <Typography variant='body2' className='font-medium' color='text.primary'>
                  Payment Progress
                </Typography>
                <Typography variant='body2' className='font-medium' color='text.primary'>
                  {paidPercentage}%
                </Typography>
              </div>
              <LinearProgress variant='determinate' value={paidPercentage} color='primary' className='bs-2' />
              <div className='flex items-center justify-between mbs-2'>
                <Typography variant='caption' color='success.main'>
                  <i className='tabler-circle-check text-xs mie-1 align-text-bottom' />
                  Paid: AED {totalPaid.toLocaleString()}
                </Typography>
                <Typography variant='caption' color='warning.main'>
                  <i className='tabler-clock text-xs mie-1 align-text-bottom' />
                  Due: AED {totalDue.toLocaleString()}
                </Typography>
              </div>
            </div>
          </>
        )}
        {role !== 'tenant' && contract.owner_agreement && (
          <>
            <Divider />
            <div>
              <div className='flex items-center gap-2 mbe-3'>
                <CustomAvatar variant='rounded' color='warning' skin='light' size={32}>
                  <i className='tabler-handshake text-lg' />
                </CustomAvatar>
                <Typography variant='h5'>
                  {contract.owner_agreement.agreement_type === 'SUBLEASE' ? 'Owner Payout' : 'Owner Commission'}
                </Typography>
              </div>
              <Divider className='mbe-5' />
              <div className='flex flex-col gap-4'>
                {contract.owner_agreement.agreement_type === 'PERCENTAGE' && (
                  <>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-2'>
                        <i className='tabler-percentage text-textSecondary' />
                        <Typography color='text.primary'>Commission Rate</Typography>
                      </div>
                      <Typography className='font-medium'>{contract.owner_agreement.commission_percentage}%</Typography>
                    </div>
                    {contract.owner_agreement.inclusive_of_agency_fee && (
                      <div className='flex items-center gap-2'>
                        <i className='tabler-info-circle text-textSecondary' />
                        <Typography variant='body2' color='text.secondary'>Inclusive of agency fee</Typography>
                      </div>
                    )}
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-2'>
                        <i className='tabler-calculator text-textSecondary' />
                        <Typography color='text.primary'>
                          Estimated Commission ({contract.owner_agreement.commission_percentage}%)
                        </Typography>
                      </div>
                      <Typography className='font-medium' color='success.main'>
                        AED {Number(contract.owner_agreement.computed_commission ?? 0).toLocaleString()}
                      </Typography>
                    </div>
                    <Typography variant='caption' color='text.secondary'>
                      Based on: Rent (AED {contract.rent_amount_total.toLocaleString()})
                    </Typography>
                  </>
                )}
                {contract.owner_agreement.agreement_type === 'FIXED_FEE' && (
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <i className='tabler-cash text-textSecondary' />
                      <Typography color='text.primary'>Fixed Fee</Typography>
                    </div>
                    <Typography className='font-medium' color='success.main'>
                      AED {Number(contract.owner_agreement.fixed_fee_amount ?? 0).toLocaleString()}
                    </Typography>
                  </div>
                )}
                {contract.owner_agreement.agreement_type === 'SUBLEASE' && (
                  <>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-2'>
                        <i className='tabler-cash text-textSecondary' />
                        <Typography color='text.primary'>Payout Amount</Typography>
                      </div>
                      <Typography className='font-medium' color='warning.main'>
                        AED {Number(contract.owner_agreement.payout_amount ?? 0).toLocaleString()}
                      </Typography>
                    </div>
                    {contract.owner_agreement.payout_frequency && (
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                          <i className='tabler-calendar-repeat text-textSecondary' />
                          <Typography color='text.primary'>Payout Frequency</Typography>
                        </div>
                        <Chip
                          label={contract.owner_agreement.payout_frequency.replace('_', '-')}
                          size='small'
                          variant='tonal'
                          color='warning'
                        />
                      </div>
                    )}
                    {contract.owner_agreement.schedules.length > 0 && (() => {
                      const totalPayout = contract.owner_agreement.schedules.reduce((sum, s) => sum + s.amount, 0)
                      const paidPayout = contract.owner_agreement.schedules
                        .filter(s => s.status === 'PAID')
                        .reduce((sum, s) => sum + s.amount, 0)
                      const paidPercent = totalPayout > 0 ? Math.round((paidPayout / totalPayout) * 100) : 0

                      return (
                        <>
                          <Divider />
                          <div className='flex items-center justify-between mbe-1'>
                            <Typography variant='body2' className='font-medium' color='text.primary'>
                              Payout Progress
                            </Typography>
                            <Typography variant='body2' className='font-medium' color='text.primary'>
                              {paidPercent}%
                            </Typography>
                          </div>
                          <LinearProgress variant='determinate' value={paidPercent} color='warning' className='bs-2' />
                          <div className='flex items-center justify-between mbs-2'>
                            <Typography variant='caption' color='success.main'>
                              <i className='tabler-circle-check text-xs mie-1 align-text-bottom' />
                              Paid: AED {paidPayout.toLocaleString()}
                            </Typography>
                            <Typography variant='caption' color='warning.main'>
                              <i className='tabler-clock text-xs mie-1 align-text-bottom' />
                              Remaining: AED {(totalPayout - paidPayout).toLocaleString()}
                            </Typography>
                          </div>
                        </>
                      )
                    })()}
                  </>
                )}
              </div>
            </div>
          </>
        )}
        <Divider />
        <div>
          <div className='flex items-center gap-2 mbe-3'>
            <CustomAvatar variant='rounded' color='info' skin='light' size={32}>
              <i className='tabler-bulb text-lg' />
            </CustomAvatar>
            <Typography variant='h5'>Utilities & Maintenance</Typography>
          </div>
          <Divider className='mbe-5' />
          <div className='flex flex-col gap-4'>
            {contract.utilities_included && contract.utilities && contract.utilities.length > 0 ? (
              <div>
                <Typography variant='body2' className='font-medium mbe-1.5' color='text.primary'>
                  <i className='tabler-plug text-base mie-1 align-text-bottom' />
                  Included Utilities
                </Typography>
                <div className='flex flex-wrap gap-1.5'>
                  {contract.utilities.map(utility => (
                    <Chip key={utility} label={utility} size='small' variant='tonal' color='info' />
                  ))}
                </div>
                {contract.max_utilities_per_month != null && (
                  <div className='flex items-center justify-between mbs-3'>
                    <div className='flex items-center gap-2'>
                      <i className='tabler-receipt text-textSecondary' />
                      <Typography variant='body2' color='text.primary'>Utilities Cap</Typography>
                    </div>
                    <Typography variant='body2' className='font-medium'>
                      AED {contract.max_utilities_per_month.toLocaleString()}/month
                    </Typography>
                  </div>
                )}
              </div>
            ) : (
              <Typography variant='body2' color='text.secondary'>
                <i className='tabler-plug text-base mie-1 align-text-bottom' />
                No utilities included
              </Typography>
            )}
            {contract.maintenance_included && contract.maintenance_responsibility ? (
              <>
                <div className='flex items-center gap-2'>
                  <i className='tabler-tool text-textSecondary' />
                  <Typography variant='body2'>{contract.maintenance_responsibility}</Typography>
                </div>
                {contract.maintenance_threshold != null && (
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <i className='tabler-ruler-2 text-textSecondary' />
                      <Typography variant='body2' color='text.primary'>Minimum Threshold</Typography>
                    </div>
                    <Typography variant='body2' className='font-medium'>
                      AED {contract.maintenance_threshold.toLocaleString()}
                    </Typography>
                  </div>
                )}
              </>
            ) : (
              <div className='flex items-center gap-2'>
                <i className='tabler-tool text-textSecondary' />
                <Typography variant='body2' color='text.secondary'>No maintenance included</Typography>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ContractFinancials
