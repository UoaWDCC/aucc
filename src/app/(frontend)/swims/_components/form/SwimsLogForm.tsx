'use client'

import { useRef, useState, type FormEvent } from 'react'

import { SwimsFormField } from './SwimsFormField'
import {
  emptySwimsForm,
  hasErrors,
  todayAsInputValue,
  validateSwimsForm,
  type SwimsFormErrors,
  type SwimsFormValues,
} from './SwimsFormValidation'
import { SwimsSelectField } from './SwimsSelectField'

export interface RiverOption {
  id: number
  name: string
}

interface SwimsLogFormProps {
  rivers: RiverOption[]
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

export function SwimsLogForm({ rivers }: SwimsLogFormProps) {
  const [values, setValues] = useState<SwimsFormValues>(emptySwimsForm)
  const [errors, setErrors] = useState<SwimsFormErrors>({})
  const [fileName, setFileName] = useState<string | null>(null)
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [message, setMessage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const riverOptions = rivers.map((river) => ({
    value: String(river.id),
    label: river.name,
  }))

  const setField = (field: keyof SwimsFormValues) => (value: string) => {
    setValues((previous) => ({ ...previous, [field]: value }))
    setErrors((previous) => ({ ...previous, [field]: undefined }))
    setStatus('idle')
    setMessage(null)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = validateSwimsForm(values)
    setErrors(nextErrors)

    if (hasErrors(nextErrors)) return

    setStatus('submitting')
    setMessage(null)

    try {
      const response = await fetch('/api/swims', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          memberName: values.memberName.trim(),
          river: values.river,
          date: values.date,
          tripName: values.tripName.trim(),
          email: values.email.trim(),
        }),
      })

      if (response.status === 201) {
        setValues(emptySwimsForm)
        setErrors({})
        setFileName(null)
        setStatus('success')
        setMessage('Thanks, your swim has been logged.')
        return
      }

      const body = await response.json().catch(() => null)

      if (response.status === 400 && body?.fields) {
        setErrors(body.fields as SwimsFormErrors)
        setStatus('error')
        setMessage('Please check the highlighted fields and try again.')
        return
      }

      setStatus('error')
      setMessage(body?.error ?? 'Something went wrong. Please try again.')
    } catch {
      setStatus('error')
      setMessage('Could not reach the server. Please check your connection.')
    }
  }

  const isSubmitting = status === 'submitting'

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="overflow-hidden rounded-md bg-[#26342C] px-6 py-8 md:px-12 md:py-10"
    >
      <h2 className="font-heading mb-8 text-center text-xl font-bold tracking-[0.15em] text-[#EFEFE1] md:text-3xl">
        SWIMS SUBMISSION
      </h2>

      <div className="flex flex-col gap-5">
        <SwimsFormField
          id="memberName"
          label="Name:"
          value={values.memberName}
          onChange={setField('memberName')}
          error={errors.memberName}
        />
        <SwimsFormField
          id="email"
          label="Email:"
          type="email"
          value={values.email}
          onChange={setField('email')}
          error={errors.email}
        />
        <SwimsSelectField
          id="river"
          label="River Name:"
          value={values.river}
          options={riverOptions}
          onChange={setField('river')}
          error={errors.river}
        />
        <SwimsFormField
          id="date"
          label="Date Swam:"
          type="date"
          max={todayAsInputValue()}
          value={values.date}
          onChange={setField('date')}
          error={errors.date}
        />
        <SwimsFormField
          id="tripName"
          label="Trip:"
          value={values.tripName}
          onChange={setField('tripName')}
          error={errors.tripName}
        />
      </div>

      <div className="-mx-6 mt-8 grid grid-cols-3 gap-6 md:-mx-12 md:gap-8">
        <div className="aspect-4/3 bg-[#D9D9D9]" />
        <div className="aspect-4/3 bg-[#D9D9D9]" />
        <div className="aspect-4/3 bg-[#D9D9D9]" />
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        <p className="text-[11px] text-[#EFEFE1] md:text-sm">
          Have your own image? Upload it here:
        </p>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          aria-label="Upload an image of your swim"
          className="flex h-6 w-10 items-center justify-center rounded-full bg-[#98B969] md:h-7 md:w-12"
        >
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            aria-hidden="true"
            className="h-3.5 w-3.5 text-white md:h-4 md:w-4"
          >
            <path
              d="M12 15V4M12 4L8 8M12 4L16 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5 14V18C5 18.6 5.4 19 6 19H18C18.6 19 19 18.6 19 18V14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) =>
            setFileName(event.target.files?.[0]?.name ?? null)
          }
        />
      </div>

      {fileName ? (
        <p className="mt-2 text-center text-[11px] text-[#EFEFE1]/70">
          {fileName}
        </p>
      ) : null}

      {message ? (
        <p
          role="status"
          aria-live="polite"
          className={
            status === 'success'
              ? 'mt-6 text-center text-sm text-[#98B969]'
              : 'mt-6 text-center text-sm text-red-300'
          }
        >
          {message}
        </p>
      ) : null}

      <div className="mt-6 flex justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg border-1 border-white bg-[#98B969] px-5 py-2 text-sm font-normal tracking-widest text-white transition-opacity hover:opacity-90 disabled:opacity-60 md:text-base"
        >
          {isSubmitting ? 'SENDING...' : 'SUBMIT'}
        </button>
      </div>
    </form>
  )
}
