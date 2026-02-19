import type { ComponentType } from 'react'

export type WizardStepDef = {
  icon: string
  title: string
  subtitle: string
}

export type StepProps = {
  activeStep: number
  handleNext: () => void
  handlePrev: () => void
  steps: WizardStepDef[]
}

export type WizardStep = WizardStepDef & {
  component: ComponentType<StepProps>
}
