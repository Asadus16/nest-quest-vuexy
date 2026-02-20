'use client'

// React Imports
import { useState, useRef } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import InputAdornment from '@mui/material/InputAdornment'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'

// Type Imports
import type { ContractType, PaymentScheduleRow } from '@/types/apps/contractTypes'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import FileUpload from '@core/components/FileUpload'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

type Props = {
  open: boolean
  handleClose: () => void
  contractData?: ContractType[]
  setData: (data: ContractType[]) => void
}

// Inventory items per property (sample data)
const propertyInventory: Record<string, { item: string; type: string; condition: string; room: string; qty: number }[]> = {
  'Marina Heights 2BR': [
    { item: 'Samsung Smart TV 65"', type: 'Electronics', condition: 'Good', room: 'Living Room', qty: 1 },
    { item: 'Split AC Unit 2 Ton', type: 'HVAC', condition: 'Good', room: 'Master Bedroom', qty: 1 },
    { item: 'Water Heater 80L', type: 'Plumbing', condition: 'Good', room: 'Bathroom', qty: 1 }
  ],
  'Palm Villa Deluxe': [
    { item: 'L-Shaped Sofa Set', type: 'Furniture', condition: 'Excellent', room: 'Living Room', qty: 1 },
    { item: 'King Size Bed Frame', type: 'Furniture', condition: 'Excellent', room: 'Master Bedroom', qty: 1 },
    { item: 'LG Refrigerator 700L', type: 'Appliances', condition: 'Good', room: 'Kitchen', qty: 1 }
  ],
  'JVC Family Townhouse': [
    { item: 'Bosch Dishwasher', type: 'Appliances', condition: 'Good', room: 'Kitchen', qty: 1 },
    { item: 'Microwave Oven', type: 'Kitchenware', condition: 'Good', room: 'Kitchen', qty: 1 }
  ],
  'Downtown Penthouse': [
    { item: 'Chandelier Crystal', type: 'Lighting', condition: 'Excellent', room: 'Dining Room', qty: 1 },
    { item: 'Wall Art Canvas Set', type: 'Decor', condition: 'Excellent', room: 'Living Room', qty: 1 }
  ],
  'Saadiyat Beach Villa': [
    { item: 'Persian Area Rug', type: 'Decor', condition: 'Good', room: 'Living Room', qty: 1 },
    { item: 'Outdoor Dining Set', type: 'Outdoor', condition: 'Good', room: 'Balcony', qty: 1 }
  ],
  'Arabian Ranches Villa': [
    { item: 'Security Camera System', type: 'Electronics', condition: 'Good', room: 'Living Room', qty: 1 }
  ]
}

const tenants = [
  'Rashid Al Mualla',
  'Aisha Bin Zayed',
  'Hassan Al Suwaidi',
  'Mariam Al Shamsi',
  'Yusuf Al Dhaheri',
  'Fatima Al Blooshi',
  'Omar Al Rashid',
  'Dana Al Mazrouei',
  'Khalifa Al Nuaimi',
  'Hind Al Kaabi',
  'Saeed Al Tayer',
  'Noora Al Hashimi'
]

const properties = [
  'Marina Heights 2BR',
  'Palm Villa Deluxe',
  'Business Bay Studio',
  'JVC Family Townhouse',
  'Reem Island 1BR',
  'Downtown Penthouse',
  'Sharjah Family Flat',
  'Yas Island Duplex',
  'Dubai Hills 3BR',
  'DIFC Office Suite',
  'Al Barsha Studio',
  'Arabian Ranches Villa',
  'Ajman Tower 2BR',
  'Saadiyat Beach Villa',
  'Motor City Loft',
  'JBR Waterfront 2BR',
  'Silicon Oasis 1BR',
  'Corniche Apartment',
  'Al Majaz Flat',
  'RAK Beachfront Villa'
]

const frequencies = ['Weekly', 'Monthly', 'Quarterly', 'Semi-Annually', 'Annually']

const utilitiesOptions = [
  'DEWA (Electricity & Water)',
  'Internet',
  'Gas',
  'District Cooling',
  'Sewage',
  'Cable TV'
]

const furnishingOptions = ['Furnished', 'Semi-Furnished', 'Unfurnished']

const transactionTypes = ['Rent', 'Security Deposit', 'Agency Fee']

const AddContractDrawer = (props: Props) => {
  const { open, handleClose, contractData, setData } = props

  // --- Section 1: Contract Details ---
  const [tenant, setTenant] = useState('')
  const [property, setProperty] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [rentAmount, setRentAmount] = useState('')
  const [frequency, setFrequency] = useState('')

  // --- Section 2: Financial Details ---
  const [securityDepositRequired, setSecurityDepositRequired] = useState(false)
  const [securityDepositAmount, setSecurityDepositAmount] = useState('')
  const [agencyFeeRequired, setAgencyFeeRequired] = useState(false)
  const [agencyFeeAmount, setAgencyFeeAmount] = useState('')

  // --- Section 3: Utilities ---
  const [utilitiesIncluded, setUtilitiesIncluded] = useState(false)
  const [selectedUtilities, setSelectedUtilities] = useState<string[]>([])

  // --- Section 4: Maintenance ---
  const [maintenanceIncluded, setMaintenanceIncluded] = useState(false)
  const [maintenanceResponsibility, setMaintenanceResponsibility] = useState('')

  // --- Section 5: Property Type ---
  const [furnishingStatus, setFurnishingStatus] = useState('')

  // --- Section 6: Documents ---
  const [ejariNumber, setEjariNumber] = useState('')

  // --- Section 7: Entry Photos ---
  const [entryPhotos, setEntryPhotos] = useState<File[]>([])
  const entryPhotoRef = useRef<HTMLInputElement>(null)

  // --- Section 8: Payment Schedule ---
  const [paymentRows, setPaymentRows] = useState<PaymentScheduleRow[]>([])
  const [editingRow, setEditingRow] = useState<PaymentScheduleRow | null>(null)

  const handleUtilityToggle = (utility: string) => {
    setSelectedUtilities(prev =>
      prev.includes(utility) ? prev.filter(u => u !== utility) : [...prev, utility]
    )
  }

  const handleAddEntryPhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (files) {
      setEntryPhotos(prev => [...prev, ...Array.from(files)])
    }

    e.target.value = ''
  }

  const handleRemoveEntryPhoto = (index: number) => {
    setEntryPhotos(prev => prev.filter((_, i) => i !== index))
  }

  const handleAddPaymentRow = () => {
    setEditingRow({
      id: Date.now(),
      transactionType: '',
      amount: '',
      paymentDate: ''
    })
  }

  const handleConfirmPaymentRow = () => {
    if (editingRow && editingRow.transactionType && editingRow.amount && editingRow.paymentDate) {
      setPaymentRows(prev => [...prev, editingRow])
      setEditingRow(null)
    }
  }

  const handleCancelEditingRow = () => {
    setEditingRow(null)
  }

  const handleRemovePaymentRow = (id: number) => {
    setPaymentRows(prev => prev.filter(r => r.id !== id))
  }

  const handleReset = () => {
    setTenant('')
    setProperty('')
    setStartDate('')
    setEndDate('')
    setRentAmount('')
    setFrequency('')
    setSecurityDepositRequired(false)
    setSecurityDepositAmount('')
    setAgencyFeeRequired(false)
    setAgencyFeeAmount('')
    setUtilitiesIncluded(false)
    setSelectedUtilities([])
    setMaintenanceIncluded(false)
    setMaintenanceResponsibility('')
    setFurnishingStatus('')
    setEjariNumber('')
    setEntryPhotos([])
    setPaymentRows([])
    setEditingRow(null)
    handleClose()
  }

  const handleSubmit = () => {
    if (!tenant || !property || !startDate || !endDate || !rentAmount || !frequency) return

    const newContract: ContractType = {
      id: (contractData?.length ?? 0) + 1,
      tenant,
      property,
      startDate,
      endDate,
      rentAmount: Number(rentAmount),
      frequency,
      status: 'Draft',
      furnishingStatus: furnishingStatus || 'Unfurnished',
      ejariNumber
    }

    setData([...(contractData ?? []), newContract])
    handleReset()
  }

  const inventoryItems = propertyInventory[property] || []

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 320, sm: 450, md: 550 } } }}
    >
      <div className='flex items-center justify-between plb-5 pli-6'>
        <Typography variant='h5'>Create Contract</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='tabler-x text-2xl text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div className='overflow-y-auto' style={{ maxHeight: 'calc(100vh - 80px)' }}>
        <div className='flex flex-col gap-6 p-6'>
          {/* ====== Section 1: Contract Details ====== */}
          <Typography variant='subtitle1' className='font-semibold'>
            Contract Details
          </Typography>
          <CustomTextField
            select
            fullWidth
            label='Tenant'
            value={tenant}
            onChange={e => setTenant(e.target.value)}
          >
            <MenuItem value=''>Select Tenant</MenuItem>
            {tenants.map(t => (
              <MenuItem key={t} value={t}>{t}</MenuItem>
            ))}
          </CustomTextField>
          <CustomTextField
            select
            fullWidth
            label='Property (Long-term Only)'
            value={property}
            onChange={e => setProperty(e.target.value)}
          >
            <MenuItem value=''>Select Property</MenuItem>
            {properties.map(p => (
              <MenuItem key={p} value={p}>{p}</MenuItem>
            ))}
          </CustomTextField>
          <CustomTextField
            fullWidth
            type='date'
            label='Start Date'
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <CustomTextField
            fullWidth
            type='date'
            label='End Date'
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <CustomTextField
            fullWidth
            label='Rent Amount'
            placeholder='e.g. 95000'
            value={rentAmount}
            onChange={e => setRentAmount(e.target.value.replace(/\D/g, ''))}
            slotProps={{
              htmlInput: { inputMode: 'numeric' },
              input: { startAdornment: <InputAdornment position='start'>AED</InputAdornment> }
            }}
          />
          <CustomTextField
            select
            fullWidth
            label='Frequency'
            value={frequency}
            onChange={e => setFrequency(e.target.value)}
          >
            <MenuItem value=''>Select Frequency</MenuItem>
            {frequencies.map(f => (
              <MenuItem key={f} value={f}>{f}</MenuItem>
            ))}
          </CustomTextField>

          {/* ====== Section 2: Financial Details ====== */}
          <Divider />
          <Typography variant='subtitle1' className='font-semibold'>
            Financial Details
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={securityDepositRequired}
                onChange={e => {
                  setSecurityDepositRequired(e.target.checked)

                  if (!e.target.checked) setSecurityDepositAmount('')
                }}
              />
            }
            label='Security Deposit Required'
          />
          {securityDepositRequired && (
            <CustomTextField
              fullWidth
              label='Security Deposit Amount (AED)'
              placeholder='e.g. 5000'
              value={securityDepositAmount}
              onChange={e => setSecurityDepositAmount(e.target.value.replace(/\D/g, ''))}
              slotProps={{
                htmlInput: { inputMode: 'numeric' },
                input: { startAdornment: <InputAdornment position='start'>AED</InputAdornment> }
              }}
            />
          )}
          <FormControlLabel
            control={
              <Checkbox
                checked={agencyFeeRequired}
                onChange={e => {
                  setAgencyFeeRequired(e.target.checked)

                  if (!e.target.checked) setAgencyFeeAmount('')
                }}
              />
            }
            label='Agency Fee Required'
          />
          {agencyFeeRequired && (
            <CustomTextField
              fullWidth
              label='Agency Fee Amount (AED)'
              placeholder='e.g. 5000'
              value={agencyFeeAmount}
              onChange={e => setAgencyFeeAmount(e.target.value.replace(/\D/g, ''))}
              slotProps={{
                htmlInput: { inputMode: 'numeric' },
                input: { startAdornment: <InputAdornment position='start'>AED</InputAdornment> }
              }}
            />
          )}

          {/* ====== Section 3: Utilities ====== */}
          <Divider />
          <Typography variant='subtitle1' className='font-semibold'>
            Utilities
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={utilitiesIncluded}
                onChange={e => {
                  setUtilitiesIncluded(e.target.checked)

                  if (!e.target.checked) setSelectedUtilities([])
                }}
              />
            }
            label='Utilities Included'
          />
          {utilitiesIncluded && (
            <div className='flex flex-col gap-2 pis-4'>
              <Typography variant='body2' className='font-medium mbe-1'>
                Utilities Checklist
              </Typography>
              {utilitiesOptions.map(utility => (
                <FormControlLabel
                  key={utility}
                  control={
                    <Checkbox
                      size='small'
                      checked={selectedUtilities.includes(utility)}
                      onChange={() => handleUtilityToggle(utility)}
                    />
                  }
                  label={utility}
                />
              ))}
            </div>
          )}

          {/* ====== Section 4: Maintenance ====== */}
          <Divider />
          <Typography variant='subtitle1' className='font-semibold'>
            Maintenance
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={maintenanceIncluded}
                onChange={e => {
                  setMaintenanceIncluded(e.target.checked)

                  if (!e.target.checked) setMaintenanceResponsibility('')
                }}
              />
            }
            label='Maintenance Included'
          />
          {maintenanceIncluded && (
            <CustomTextField
              select
              fullWidth
              label='Maintenance Responsibility'
              value={maintenanceResponsibility}
              onChange={e => setMaintenanceResponsibility(e.target.value)}
            >
              <MenuItem value=''>Select Responsibility</MenuItem>
              <MenuItem value='Responsibility of Owner'>Responsibility of Owner</MenuItem>
              <MenuItem value='Responsibility of Tenant'>Responsibility of Tenant</MenuItem>
              <MenuItem value='Responsibility of Property Manager'>Responsibility of Property Manager</MenuItem>
            </CustomTextField>
          )}

          {/* ====== Section 5: Property Type ====== */}
          <Divider />
          <Typography variant='subtitle1' className='font-semibold'>
            Property Type
          </Typography>
          <CustomTextField
            select
            fullWidth
            label='Furnishing Status'
            value={furnishingStatus}
            onChange={e => setFurnishingStatus(e.target.value)}
          >
            <MenuItem value=''>Select Furnishing</MenuItem>
            {furnishingOptions.map(f => (
              <MenuItem key={f} value={f}>{f}</MenuItem>
            ))}
          </CustomTextField>

          {/* Property Inventory Table */}
          <Typography variant='body2' className='font-medium'>
            Property Inventory
          </Typography>
          {inventoryItems.length > 0 ? (
            <div className='overflow-x-auto border rounded'>
              <table className={tableStyles.table}>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Type</th>
                    <th>Condition</th>
                    <th>Room</th>
                    <th>Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryItems.map((inv, i) => (
                    <tr key={i}>
                      <td><Typography variant='body2'>{inv.item}</Typography></td>
                      <td><Typography variant='body2'>{inv.type}</Typography></td>
                      <td><Typography variant='body2'>{inv.condition}</Typography></td>
                      <td><Typography variant='body2'>{inv.room}</Typography></td>
                      <td><Typography variant='body2'>{inv.qty}</Typography></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Typography variant='body2' color='text.secondary'>
              {property ? 'No inventory items for this property' : 'Select a property to view inventory'}
            </Typography>
          )}

          {/* ====== Section 6: Documents ====== */}
          <Divider />
          <Typography variant='subtitle1' className='font-semibold'>
            Documents
          </Typography>
          <FileUpload label='Upload Contract PDF' accept='.pdf' />
          <CustomTextField
            fullWidth
            label='Ejari Number'
            placeholder='e.g. 1234567890'
            value={ejariNumber}
            onChange={e => setEjariNumber(e.target.value.replace(/\D/g, ''))}
            slotProps={{ htmlInput: { inputMode: 'numeric' } }}
          />
          <FileUpload label='Upload Ejari Certificate' accept='.pdf,.jpg,.jpeg,.png' />

          {/* ====== Section 7: Entry Photos ====== */}
          <Divider />
          <Typography variant='subtitle1' className='font-semibold'>
            Entry Photos
          </Typography>
          <input
            ref={entryPhotoRef}
            type='file'
            multiple
            accept='.jpg,.jpeg,.png,.webp'
            hidden
            onChange={handleAddEntryPhotos}
          />
          <Button
            variant='tonal'
            color='primary'
            startIcon={<i className='tabler-camera' />}
            onClick={() => entryPhotoRef.current?.click()}
          >
            Upload Photos
          </Button>
          {entryPhotos.length > 0 && (
            <div className='flex flex-wrap gap-2'>
              {entryPhotos.map((photo, index) => (
                <Chip
                  key={index}
                  label={photo.name}
                  size='small'
                  onDelete={() => handleRemoveEntryPhoto(index)}
                />
              ))}
            </div>
          )}

          {/* ====== Section 8: Payment Schedule ====== */}
          <Divider />
          <Typography variant='subtitle1' className='font-semibold'>
            Payment Schedule
          </Typography>
          <Button
            variant='tonal'
            color='primary'
            startIcon={<i className='tabler-plus' />}
            onClick={handleAddPaymentRow}
            disabled={editingRow !== null}
          >
            Add Row
          </Button>

          {(paymentRows.length > 0 || editingRow) && (
            <div className='overflow-x-auto border rounded'>
              <table className={tableStyles.table}>
                <thead>
                  <tr>
                    <th>Transaction Type</th>
                    <th>Amount (AED)</th>
                    <th>Payment Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentRows.map(row => (
                    <tr key={row.id}>
                      <td><Typography variant='body2'>{row.transactionType}</Typography></td>
                      <td><Typography variant='body2'>{`AED ${Number(row.amount).toLocaleString()}`}</Typography></td>
                      <td><Typography variant='body2'>{row.paymentDate}</Typography></td>
                      <td>
                        <IconButton size='small' onClick={() => handleRemovePaymentRow(row.id)}>
                          <i className='tabler-x text-textSecondary' />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                  {editingRow && (
                    <tr>
                      <td>
                        <CustomTextField
                          select
                          size='small'
                          fullWidth
                          value={editingRow.transactionType}
                          onChange={e => setEditingRow({ ...editingRow, transactionType: e.target.value })}
                        >
                          <MenuItem value=''>Select</MenuItem>
                          {transactionTypes.map(t => (
                            <MenuItem key={t} value={t}>{t}</MenuItem>
                          ))}
                        </CustomTextField>
                      </td>
                      <td>
                        <CustomTextField
                          size='small'
                          fullWidth
                          placeholder='Amount'
                          value={editingRow.amount}
                          onChange={e => setEditingRow({ ...editingRow, amount: e.target.value.replace(/\D/g, '') })}
                          slotProps={{ htmlInput: { inputMode: 'numeric' } }}
                        />
                      </td>
                      <td>
                        <CustomTextField
                          size='small'
                          fullWidth
                          type='date'
                          value={editingRow.paymentDate}
                          onChange={e => setEditingRow({ ...editingRow, paymentDate: e.target.value })}
                          slotProps={{ inputLabel: { shrink: true } }}
                        />
                      </td>
                      <td>
                        <div className='flex items-center'>
                          <IconButton size='small' color='success' onClick={handleConfirmPaymentRow}>
                            <i className='tabler-plus' />
                          </IconButton>
                          <IconButton size='small' color='error' onClick={handleCancelEditingRow}>
                            <i className='tabler-x' />
                          </IconButton>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* ====== Submit ====== */}
          <Divider />
          <div className='flex items-center gap-4'>
            <Button variant='contained' onClick={handleSubmit}>
              Submit
            </Button>
            <Button variant='tonal' color='error' onClick={handleReset}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Drawer>
  )
}

export default AddContractDrawer
