'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import CircularProgress from '@mui/material/CircularProgress'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Type Imports
import type { FinancialTransactionType, TransactionDocumentType } from '@/types/apps/financialTypes'

// Service Imports
import {
  updateOwnerTransaction,
  uploadOwnerTransactionDocument,
  deleteOwnerTransactionDocument
} from '@/services/financial'

const statusColorMap: Record<string, 'success' | 'warning' | 'error' | 'default'> = {
  COMPLETED: 'success',
  PENDING: 'warning',
  CANCELLED: 'error'
}

const docTypeLabels: Record<string, string> = {
  BILL: 'Bill',
  PAYMENT_PROOF: 'Payment Proof',
  RECEIPT: 'Receipt',
  OTHER: 'Other'
}

type TransactionDetailDrawerProps = {
  open: boolean
  handleClose: () => void
  transaction: FinancialTransactionType | null
  onUpdate: () => void
}

const TransactionDetailDrawer = ({ open, handleClose, transaction, onUpdate }: TransactionDetailDrawerProps) => {
  const [settledLoading, setSettledLoading] = useState(false)
  const [uploadingDoc, setUploadingDoc] = useState(false)
  const [deletingDocId, setDeletingDocId] = useState<number | null>(null)
  const [docType, setDocType] = useState('PAYMENT_PROOF')
  const [docFile, setDocFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  if (!transaction) return null

  const handleToggleSettled = async () => {
    setSettledLoading(true)
    setError(null)

    try {
      await updateOwnerTransaction(transaction.id, { is_settled: !transaction.is_settled })
      onUpdate()
    } catch {
      setError('Failed to update settlement status')
    } finally {
      setSettledLoading(false)
    }
  }

  const handleUploadDoc = async () => {
    if (!docFile) return

    setUploadingDoc(true)
    setError(null)

    try {
      const formData = new FormData()

      formData.append('doc_type', docType)
      formData.append('file', docFile)

      await uploadOwnerTransactionDocument(transaction.id, formData)
      setDocFile(null)
      onUpdate()
    } catch {
      setError('Failed to upload document')
    } finally {
      setUploadingDoc(false)
    }
  }

  const handleDeleteDoc = async (doc: TransactionDocumentType) => {
    setDeletingDocId(doc.id)
    setError(null)

    try {
      await deleteOwnerTransactionDocument(transaction.id, doc.id)
      onUpdate()
    } catch {
      setError('Failed to delete document')
    } finally {
      setDeletingDocId(null)
    }
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 320, sm: 440 } } }}
    >
      <div className='flex items-center justify-between pli-6 plb-5'>
        <Typography variant='h5'>Transaction Details</Typography>
        <IconButton onClick={handleClose}>
          <i className='tabler-x text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div className='flex flex-col gap-4 p-6'>
        <div className='flex justify-between items-center'>
          <Typography variant='body2' color='text.secondary'>
            Type
          </Typography>
          <Chip
            label={transaction.type}
            size='small'
            variant='tonal'
            color={transaction.type === 'INCOME' ? 'success' : 'error'}
          />
        </div>
        <div className='flex justify-between items-center'>
          <Typography variant='body2' color='text.secondary'>
            Category
          </Typography>
          <Chip label={transaction.category.replace(/_/g, ' ')} size='small' variant='tonal' color='primary' className='capitalize' />
        </div>
        <div className='flex justify-between items-center'>
          <Typography variant='body2' color='text.secondary'>
            Amount
          </Typography>
          <Typography className='font-medium'>AED {transaction.amount.toLocaleString()}</Typography>
        </div>
        <div className='flex justify-between items-center'>
          <Typography variant='body2' color='text.secondary'>
            Date
          </Typography>
          <Typography>{new Date(transaction.transaction_date).toLocaleDateString()}</Typography>
        </div>
        <div className='flex justify-between items-center'>
          <Typography variant='body2' color='text.secondary'>
            Status
          </Typography>
          <Chip
            label={transaction.status}
            size='small'
            variant='tonal'
            color={statusColorMap[transaction.status] || 'default'}
          />
        </div>
        {transaction.description && (
          <div>
            <Typography variant='body2' color='text.secondary'>
              Description
            </Typography>
            <Typography variant='body2'>{transaction.description}</Typography>
          </div>
        )}
        {transaction.paid_by && (
          <div className='flex justify-between items-center'>
            <Typography variant='body2' color='text.secondary'>
              Paid By
            </Typography>
            <Typography>{transaction.paid_by}</Typography>
          </div>
        )}
        {transaction.received_by && (
          <div className='flex justify-between items-center'>
            <Typography variant='body2' color='text.secondary'>
              Received By
            </Typography>
            <Typography>{transaction.received_by}</Typography>
          </div>
        )}
        {transaction.responsibility && (
          <div className='flex justify-between items-center'>
            <Typography variant='body2' color='text.secondary'>
              Responsibility
            </Typography>
            <Typography>{transaction.responsibility}</Typography>
          </div>
        )}

        <Divider />

        {/* Settlement toggle */}
        <div className='flex justify-between items-center'>
          <div>
            <Typography variant='body2' className='font-medium'>
              Settled
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              Mark when cash is actually received/paid
            </Typography>
          </div>
          {settledLoading ? (
            <CircularProgress size={20} />
          ) : (
            <Switch checked={transaction.is_settled} onChange={handleToggleSettled} />
          )}
        </div>
        {transaction.settled_at && (
          <Typography variant='caption' color='text.secondary'>
            Settled on {new Date(transaction.settled_at).toLocaleDateString()}
          </Typography>
        )}

        <Divider />

        {/* Documents */}
        <Typography variant='h6'>Documents</Typography>
        {transaction.documents && transaction.documents.length > 0 ? (
          <div className='flex flex-col gap-2'>
            {transaction.documents.map(doc => (
              <div key={doc.id} className='flex items-center justify-between p-3 rounded border'>
                <div className='flex items-center gap-2'>
                  <i className='tabler-file text-xl' />
                  <div>
                    <Typography variant='body2' className='font-medium'>
                      {docTypeLabels[doc.doc_type] || doc.doc_type}
                    </Typography>
                    <Typography variant='caption' color='text.secondary'>
                      {new Date(doc.created_at).toLocaleDateString()}
                    </Typography>
                  </div>
                </div>
                <div className='flex items-center gap-1'>
                  <IconButton size='small' onClick={() => window.open(doc.file_url, '_blank', 'noopener,noreferrer')}>
                    <i className='tabler-download text-lg' />
                  </IconButton>
                  <IconButton
                    size='small'
                    color='error'
                    onClick={() => handleDeleteDoc(doc)}
                    disabled={deletingDocId === doc.id}
                  >
                    {deletingDocId === doc.id ? (
                      <CircularProgress size={16} />
                    ) : (
                      <i className='tabler-trash text-lg' />
                    )}
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Typography variant='body2' color='text.secondary'>
            No documents attached
          </Typography>
        )}

        {/* Upload document */}
        <div className='flex flex-col gap-3 p-3 rounded border'>
          <Typography variant='body2' className='font-medium'>
            Upload Document
          </Typography>
          <CustomTextField
            select
            fullWidth
            size='small'
            label='Document Type'
            value={docType}
            onChange={e => setDocType(e.target.value)}
          >
            <MenuItem value='BILL'>Bill</MenuItem>
            <MenuItem value='PAYMENT_PROOF'>Payment Proof</MenuItem>
            <MenuItem value='RECEIPT'>Receipt</MenuItem>
            <MenuItem value='OTHER'>Other</MenuItem>
          </CustomTextField>
          <input
            type='file'
            accept='.jpg,.jpeg,.png,.pdf'
            onChange={e => setDocFile(e.target.files?.[0] || null)}
          />
          <Button
            variant='tonal'
            size='small'
            onClick={handleUploadDoc}
            disabled={uploadingDoc || !docFile}
            startIcon={uploadingDoc ? <CircularProgress size={14} /> : <i className='tabler-upload' />}
          >
            {uploadingDoc ? 'Uploading...' : 'Upload'}
          </Button>
        </div>

        {error && (
          <Typography color='error' variant='body2'>
            {error}
          </Typography>
        )}
      </div>
    </Drawer>
  )
}

export default TransactionDetailDrawer
