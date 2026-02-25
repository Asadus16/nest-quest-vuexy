'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stepper from '@mui/material/Stepper'
import MuiStep from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import type { StepProps as MuiStepProps } from '@mui/material/Step'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Styled Component Imports
import StepperWrapper from '@core/styles/stepper'

// Context Imports
import { RegistrationProvider } from '@/contexts/registrationContext'

// Type Imports
import type { UserRole } from '@/types/userTypes'

// Config Imports
import { wizardSteps } from './config'

// Styled Components
const Step = styled(MuiStep)<MuiStepProps>({
  '&.Mui-completed .step-title, &.Mui-completed .step-subtitle': {
    color: 'var(--mui-palette-text-disabled)'
  }
})

type Props = {
  role: UserRole
}

const RegistrationWizard = ({ role }: Props) => {
  const [activeStep, setActiveStep] = useState(0)

  const steps = wizardSteps[role]

  if (!steps) return null

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1)
    }
  }

  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1)
    }
  }

  const StepComponent = steps[activeStep].component

  // Build step defs (without component) for passing to step components
  const stepDefs = steps.map(({ icon, title, subtitle }) => ({ icon, title, subtitle }))

  // Determine extra props for KYC step based on role
  const extraProps = steps[activeStep].title === 'KYC' ? { showTradeLicense: role === 'property-manager' } : {}

  return (
    <RegistrationProvider role={role}>
    <Card className='flex flex-col lg:flex-row lg:min-bs-[680px]'>
      <CardContent className='max-lg:border-be lg:border-ie lg:min-is-[300px]'>
        <StepperWrapper>
          <Stepper
            activeStep={activeStep}
            orientation='vertical'
            connector={<></>}
            className='flex flex-col gap-4 min-is-[220px]'
          >
            {steps.map((step, index) => (
              <Step key={index} onClick={() => index < activeStep && setActiveStep(index)}>
                <StepLabel icon={<></>} className={classnames('p-1', { 'cursor-pointer': index < activeStep })}>
                  <div className='step-label'>
                    <CustomAvatar
                      variant='rounded'
                      skin={activeStep === index ? 'filled' : 'light'}
                      {...(activeStep >= index && { color: 'primary' })}
                      {...(activeStep === index && { className: 'shadow-primarySm' })}
                      size={38}
                    >
                      <i className={classnames(step.icon, '!text-[22px]')} />
                    </CustomAvatar>
                    <div className='flex flex-col'>
                      <Typography color='text.primary' className='step-title'>
                        {step.title}
                      </Typography>
                      <Typography className='step-subtitle'>{step.subtitle}</Typography>
                    </div>
                  </div>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </StepperWrapper>
      </CardContent>

      <CardContent className='flex-1 pbs-6 overflow-y-auto'>
        <StepComponent
          activeStep={activeStep}
          handleNext={handleNext}
          handlePrev={handlePrev}
          steps={stepDefs}
          {...extraProps}
        />
      </CardContent>
    </Card>
    </RegistrationProvider>
  )
}

export default RegistrationWizard
