'use client'

// React Imports
import { useRef, useState } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

type Props = {
  label: string
  accept?: string
  onChange?: (file: File | null) => void
}

const DropZone = styled('div')<{ selected?: string }>(({ theme, selected }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(4),
  borderRadius: 'var(--mui-shape-borderRadius)',
  border: `2px dashed ${selected ? 'var(--mui-palette-success-main)' : 'var(--mui-palette-divider)'}`,
  cursor: 'pointer',
  backgroundColor: selected ? 'var(--mui-palette-success-lightOpacity)' : 'transparent',
  transition: theme.transitions.create(['border-color', 'background-color'], {
    duration: theme.transitions.duration.shorter
  }),
  '&:hover': {
    borderColor: 'var(--mui-palette-primary-main)',
    backgroundColor: 'var(--mui-palette-action-hover)'
  }
}))

const FileUpload = ({ label, accept, onChange }: Props) => {
  const [fileName, setFileName] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null

    setFileName(file?.name ?? '')
    onChange?.(file)
  }

  return (
    <DropZone onClick={() => inputRef.current?.click()} selected={fileName || undefined}>
      <input ref={inputRef} type='file' hidden accept={accept} onChange={handleChange} />
      <i className={`${fileName ? 'tabler-circle-check text-success' : 'tabler-upload text-textSecondary'} text-[28px]`} />
      <Typography variant='body2' color={fileName ? 'success.main' : 'text.secondary'}>
        {fileName || label}
      </Typography>
    </DropZone>
  )
}

export default FileUpload
