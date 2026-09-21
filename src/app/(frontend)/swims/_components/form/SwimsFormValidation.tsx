export interface SwimsFormValues {
  name: string
  riverName: string
  dateSwam: string
  trip: string
  honeypot?: string
}

export type SwimsFormErrors = Partial<Record<keyof SwimsFormValues, string>>

export const emptySwimsForm: SwimsFormValues = {
  name: '',
  riverName: '',
  dateSwam: '',
  trip: '',
  honeypot: '',
}

export function todayAsInputValue() {
  const now = new Date()
  const offsetMs = now.getTimezoneOffset() * 60 * 1000
  return new Date(now.getTime() - offsetMs).toISOString().slice(0, 10)
}

export function validateSwimsForm(values: SwimsFormValues): SwimsFormErrors {
  const errors: SwimsFormErrors = {}

  const name = values.name.trim()
  if (!name) {
    errors.name = 'Please enter your name'
  } else if (name.length < 2) {
    errors.name = 'Name needs at least 2 characters'
  }

  if (!values.riverName.trim()) {
    errors.riverName = 'Please enter the river name'
  }

  if (!values.dateSwam) {
    errors.dateSwam = 'Please pick the date you swam'
  } else {
    const swamDate = new Date(values.dateSwam)
    if (Number.isNaN(swamDate.getTime())) {
      errors.dateSwam = 'That date does not look right'
    } else if (values.dateSwam > todayAsInputValue()) {
      errors.dateSwam = 'The date cannot be in the future'
    }
  }

  return errors
}

export function hasErrors(errors: SwimsFormErrors) {
  return Object.values(errors).some(Boolean)
}
