export interface SwimsFormValues {
  memberName: string
  river: string
  date: string
  tripName: string
  email: string
}

export type SwimsFormErrors = Partial<Record<keyof SwimsFormValues, string>>

export const emptySwimsForm: SwimsFormValues = {
  memberName: '',
  river: '',
  date: '',
  tripName: '',
  email: '',
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function todayAsInputValue() {
  const now = new Date()
  const offsetMs = now.getTimezoneOffset() * 60 * 1000
  return new Date(now.getTime() - offsetMs).toISOString().slice(0, 10)
}

export function validateSwimsForm(values: SwimsFormValues): SwimsFormErrors {
  const errors: SwimsFormErrors = {}

  const memberName = values.memberName.trim()
  if (!memberName) {
    errors.memberName = 'Please enter your name'
  } else if (memberName.length < 2) {
    errors.memberName = 'Name needs at least 2 characters'
  }

  if (!values.river) {
    errors.river = 'Please choose a river'
  }

  if (!values.date) {
    errors.date = 'Please pick the date you swam'
  } else {
    const swamDate = new Date(values.date)
    if (Number.isNaN(swamDate.getTime())) {
      errors.date = 'That date does not look right'
    } else if (values.date > todayAsInputValue()) {
      errors.date = 'The date cannot be in the future'
    }
  }

  if (!values.tripName.trim()) {
    errors.tripName = 'Please enter the trip name'
  }

  const email = values.email.trim()
  if (!email) {
    errors.email = 'Please enter your email'
  } else if (!emailPattern.test(email)) {
    errors.email = 'That email does not look right'
  }

  return errors
}

export function hasErrors(errors: SwimsFormErrors) {
  return Object.values(errors).some(Boolean)
}
