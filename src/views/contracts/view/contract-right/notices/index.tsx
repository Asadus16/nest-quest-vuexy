'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import MenuItem from '@mui/material/MenuItem'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'
import CustomTextField from '@core/components/mui/TextField'

// Type Imports
import type { ContractDetailType } from '@/types/apps/contractTypes'

// Service Imports
import { createNotice, markNoticeRead } from '@/services/tenancy'

// Context Imports
import { useRole } from '@/contexts/roleContext'
import { useToast } from '@/contexts/toastContext'

const noticeTypeConfig: Record<string, { color: 'primary' | 'warning' | 'info' | 'error' | 'secondary'; icon: string; label: string }> = {
  GENERAL: { color: 'primary', icon: 'tabler-info-circle', label: 'General' },
  RENT_REMINDER: { color: 'warning', icon: 'tabler-bell', label: 'Rent Reminder' },
  LEASE_RENEWAL: { color: 'info', icon: 'tabler-refresh', label: 'Lease Renewal' },
  MAINTENANCE: { color: 'secondary', icon: 'tabler-tool', label: 'Maintenance' },
  EVICTION: { color: 'error', icon: 'tabler-alert-triangle', label: 'Eviction' },
  OTHER: { color: 'secondary', icon: 'tabler-dots', label: 'Other' }
}

const NoticesTab = ({ contract, onRefresh }: { contract: ContractDetailType; onRefresh?: () => void }) => {
  const { role } = useRole()
  const toast = useToast()
  const isPM = role === 'property-manager'

  const [composeOpen, setComposeOpen] = useState(false)
  const [noticeType, setNoticeType] = useState('GENERAL')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [proposedRent, setProposedRent] = useState('')
  const [proposedStartDate, setProposedStartDate] = useState('')
  const [proposedEndDate, setProposedEndDate] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const notices = contract.notices || []

  const handleComposeOpen = () => {
    setNoticeType('GENERAL')
    setSubject('')
    setBody('')
    setProposedRent('')
    setProposedStartDate('')
    setProposedEndDate('')
    setComposeOpen(true)
  }

  const handleSendNotice = async () => {
    if (!subject.trim() || !body.trim()) return

    setSubmitting(true)

    try {
      const metadata: Record<string, unknown> = {}

      if (noticeType === 'LEASE_RENEWAL') {
        if (proposedRent) metadata.proposed_rent = Number(proposedRent)
        if (proposedStartDate) metadata.proposed_start_date = proposedStartDate
        if (proposedEndDate) metadata.proposed_end_date = proposedEndDate
      }

      await createNotice(contract.id, {
        notice_type: noticeType,
        subject,
        body,
        metadata: Object.keys(metadata).length > 0 ? metadata : undefined
      })

      setComposeOpen(false)
      toast.success('Notice sent successfully')
      onRefresh?.()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to send notice')
    } finally {
      setSubmitting(false)
    }
  }

  const handleMarkRead = async (noticeId: number) => {
    try {
      await markNoticeRead(noticeId)
      onRefresh?.()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to mark notice as read')
    }
  }

  return (
    <>
      <Card>
        <CardHeader
          title='Notices'
          avatar={
            <CustomAvatar variant='rounded' color='info' skin='light' size={34}>
              <i className='tabler-bell text-lg' />
            </CustomAvatar>
          }
          subheader={`${notices.length} notices`}
          action={
            isPM ? (
              <Button
                variant='contained'
                size='small'
                startIcon={<i className='tabler-send' />}
                onClick={handleComposeOpen}
              >
                Send Notice
              </Button>
            ) : undefined
          }
        />
        {notices.length > 0 ? (
          <CardContent className='flex flex-col gap-4'>
            {notices.map(notice => {
              const config = noticeTypeConfig[notice.notice_type] || noticeTypeConfig.OTHER

              return (
                <div
                  key={notice.id}
                  className={`p-4 rounded border ${notice.is_read ? 'border-divider' : 'border-primary bg-primaryLight'}`}
                >
                  <div className='flex items-start justify-between gap-2 mbe-2'>
                    <div className='flex items-center gap-2'>
                      <i className={`${config.icon} text-lg`} />
                      <Typography className='font-medium' color='text.primary'>
                        {notice.subject}
                      </Typography>
                    </div>
                    <Chip label={config.label} size='small' variant='tonal' color={config.color} />
                  </div>
                  <Typography variant='body2' color='text.secondary' className='mbe-2'>
                    {notice.body}
                  </Typography>
                  {notice.notice_type === 'LEASE_RENEWAL' && notice.metadata && (
                    <div className='p-2 rounded bg-actionHover mbe-2'>
                      <Typography variant='caption' className='font-medium' color='text.primary'>
                        Renewal Offer:
                      </Typography>
                      <div className='flex flex-wrap gap-3 mbs-1'>
                        {notice.metadata.proposed_rent != null ? (
                          <Typography variant='caption'>
                            Proposed Rent: AED {Number(notice.metadata.proposed_rent).toLocaleString()}
                          </Typography>
                        ) : null}
                        {notice.metadata.proposed_start_date != null ? (
                          <Typography variant='caption'>
                            Start: {String(notice.metadata.proposed_start_date)}
                          </Typography>
                        ) : null}
                        {notice.metadata.proposed_end_date != null ? (
                          <Typography variant='caption'>
                            End: {String(notice.metadata.proposed_end_date)}
                          </Typography>
                        ) : null}
                      </div>
                    </div>
                  )}
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      <Typography variant='caption' color='text.secondary'>
                        <i className='tabler-user text-xs mie-1' />
                        {notice.sender_name}
                      </Typography>
                      <Typography variant='caption' color='text.secondary'>
                        <i className='tabler-clock text-xs mie-1' />
                        {new Date(notice.created_at).toLocaleString()}
                      </Typography>
                    </div>
                    {role === 'tenant' && !notice.is_read && (
                      <Button size='small' variant='text' onClick={() => handleMarkRead(notice.id)}>
                        Mark as Read
                      </Button>
                    )}
                    {notice.is_read && (
                      <Chip label='Read' size='small' variant='tonal' color='success' />
                    )}
                  </div>
                </div>
              )
            })}
          </CardContent>
        ) : (
          <CardContent>
            <Typography variant='body2' color='text.secondary' className='text-center'>
              No notices sent yet
            </Typography>
          </CardContent>
        )}
      </Card>

      {/* Compose Notice Dialog */}
      <Dialog open={composeOpen} onClose={() => setComposeOpen(false)} maxWidth='sm' fullWidth>
        <DialogTitle>Send Notice to Tenant</DialogTitle>
        <DialogContent className='flex flex-col gap-4 pbs-2'>
          <CustomTextField
            select
            fullWidth
            label='Notice Type'
            value={noticeType}
            onChange={e => setNoticeType(e.target.value)}
          >
            <MenuItem value='GENERAL'>General</MenuItem>
            <MenuItem value='RENT_REMINDER'>Rent Reminder</MenuItem>
            <MenuItem value='LEASE_RENEWAL'>Lease Renewal</MenuItem>
            <MenuItem value='MAINTENANCE'>Maintenance</MenuItem>
            <MenuItem value='EVICTION'>Eviction</MenuItem>
            <MenuItem value='OTHER'>Other</MenuItem>
          </CustomTextField>
          <CustomTextField
            fullWidth
            label='Subject'
            value={subject}
            onChange={e => setSubject(e.target.value)}
          />
          <CustomTextField
            fullWidth
            multiline
            rows={4}
            label='Message'
            value={body}
            onChange={e => setBody(e.target.value)}
          />
          {noticeType === 'LEASE_RENEWAL' && (
            <>
              <Divider>
                <Typography variant='caption'>Renewal Offer Details</Typography>
              </Divider>
              <CustomTextField
                fullWidth
                type='number'
                label='Proposed Rent (AED)'
                value={proposedRent}
                onChange={e => setProposedRent(e.target.value)}
              />
              <div className='flex gap-4'>
                <CustomTextField
                  fullWidth
                  type='date'
                  label='Proposed Start Date'
                  value={proposedStartDate}
                  onChange={e => setProposedStartDate(e.target.value)}
                  slotProps={{ inputLabel: { shrink: true } }}
                />
                <CustomTextField
                  fullWidth
                  type='date'
                  label='Proposed End Date'
                  value={proposedEndDate}
                  onChange={e => setProposedEndDate(e.target.value)}
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              </div>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setComposeOpen(false)} color='secondary'>
            Cancel
          </Button>
          <Button
            variant='contained'
            onClick={handleSendNotice}
            disabled={submitting || !subject.trim() || !body.trim()}
            startIcon={submitting ? <CircularProgress size={16} /> : <i className='tabler-send' />}
          >
            Send Notice
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default NoticesTab
