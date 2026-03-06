'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// View Imports
import OwnerTransactionsList from '@/views/owner/transactions/OwnerTransactionsList'

const OwnerTransactionsPage = () => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Typography variant='h4'>Transactions</Typography>
        <Typography variant='body2' color='text.secondary'>
          View and manage all financial transactions across your properties.
        </Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <OwnerTransactionsList />
      </Grid>
    </Grid>
  )
}

export default OwnerTransactionsPage
