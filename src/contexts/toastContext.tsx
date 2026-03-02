'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import type { AlertColor } from '@mui/material/Alert'

type ToastOptions = {
  message: string
  severity?: AlertColor
  duration?: number
}

type ToastContextType = {
  showToast: (options: ToastOptions) => void
  success: (message: string) => void
  error: (message: string) => void
  warning: (message: string) => void
  info: (message: string) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export const useToast = () => {
  const ctx = useContext(ToastContext)

  if (!ctx) throw new Error('useToast must be used within ToastProvider')

  return ctx
}

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState<ToastOptions>({ message: '', severity: 'info', duration: 4000 })

  const showToast = useCallback((options: ToastOptions) => {
    setToast({ severity: 'info', duration: 4000, ...options })
    setOpen(true)
  }, [])

  const success = useCallback((message: string) => showToast({ message, severity: 'success' }), [showToast])
  const error = useCallback((message: string) => showToast({ message, severity: 'error' }), [showToast])
  const warning = useCallback((message: string) => showToast({ message, severity: 'warning' }), [showToast])
  const info = useCallback((message: string) => showToast({ message, severity: 'info' }), [showToast])

  return (
    <ToastContext.Provider value={{ showToast, success, error, warning, info }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={toast.duration}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setOpen(false)} severity={toast.severity} variant='filled' sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  )
}
