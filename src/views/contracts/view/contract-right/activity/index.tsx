// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'

// Type Imports
import type { ContractDetailType } from '@/types/apps/contractTypes'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

const actionConfig: Record<string, { icon: string; color: 'primary' | 'success' | 'info' | 'warning' | 'error' }> = {
  CONTRACT_CREATED: { icon: 'tabler-file-plus', color: 'primary' },
  PAYMENT_MARKED_PAID: { icon: 'tabler-circle-check', color: 'success' },
  NOTICE_SENT: { icon: 'tabler-send', color: 'info' },
  STATUS_CHANGED: { icon: 'tabler-arrows-exchange', color: 'warning' },
  CONTRACT_DELETED: { icon: 'tabler-trash', color: 'error' }
}

const ActivityTab = ({ contract }: { contract: ContractDetailType }) => {
  const logs = contract.activity_logs || []

  return (
    <Card>
      <CardHeader
        title='Activity Log'
        avatar={
          <CustomAvatar variant='rounded' color='primary' skin='light' size={34}>
            <i className='tabler-activity text-lg' />
          </CustomAvatar>
        }
        subheader={`${logs.length} events`}
      />
      {logs.length > 0 ? (
        <CardContent>
          <Timeline position='right' sx={{ '& .MuiTimelineItem-root:before': { flex: 0, padding: 0 } }}>
            {logs.map((log, index) => {
              const config = actionConfig[log.action] || { icon: 'tabler-point', color: 'primary' as const }

              return (
                <TimelineItem key={log.id}>
                  <TimelineSeparator>
                    <TimelineDot color={config.color} variant='outlined'>
                      <i className={`${config.icon} text-base`} />
                    </TimelineDot>
                    {index < logs.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>
                    <div className='flex flex-col gap-0.5'>
                      <Typography className='font-medium' color='text.primary'>
                        {log.description}
                      </Typography>
                      <div className='flex items-center gap-2'>
                        <Typography variant='caption' color='text.secondary'>
                          <i className='tabler-user text-xs mie-1' />
                          {log.actor_name}
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                          <i className='tabler-clock text-xs mie-1' />
                          {new Date(log.created_at).toLocaleString()}
                        </Typography>
                      </div>
                    </div>
                  </TimelineContent>
                </TimelineItem>
              )
            })}
          </Timeline>
        </CardContent>
      ) : (
        <CardContent>
          <Typography variant='body2' color='text.secondary' className='text-center'>
            No activity recorded yet
          </Typography>
        </CardContent>
      )}
    </Card>
  )
}

export default ActivityTab
