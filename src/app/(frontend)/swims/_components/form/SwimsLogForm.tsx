'use client'

import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'

import {
  SWIM_PHOTO_CONSENT_LABEL,
  validateSwimPhoto,
} from '@/lib/utils/swim-photo'
import type { SwimDTO } from '@/queries/swims'
import { SwimsCarousel } from '../SwimsCarousel'
import { preparePhoto } from './prepare-photo'
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

type SwimsLogFormProps = {
  rivers: RiverOption[]
  approvedPhotos: SwimDTO[]
}

// Feedback shown to the user. Whether a request is in flight is tracked
// separately (isSubmitting), so editing a field can clear the feedback
// without re-enabling Submit mid-request.
type SubmitStatus = 'idle' | 'success' | 'error'

export function SwimsLogForm({ rivers, approvedPhotos }: SwimsLogFormProps) {
  const [values, setValues] = useState<SwimsFormValues>(emptySwimsForm)
  const [errors, setErrors] = useState<SwimsFormErrors>({})
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoConsent, setPhotoConsent] = useState(false)
  const [isPreparingPhoto, setIsPreparingPhoto] = useState(false)
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [message, setMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  // A ref, not state, so a second submit in the same render is still blocked
  const submittingRef = useRef(false)
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

  const clearPhoto = () => {
    setPhoto(null)
    setPhotoConsent(false)
    setErrors((previous) => ({ ...previous, photo: undefined }))
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handlePhotoChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsPreparingPhoto(true)
    // Consent is for a specific photo, so ask again for a new one
    setPhotoConsent(false)
    setErrors((previous) => ({ ...previous, photo: undefined }))
    setStatus('idle')
    setMessage(null)
    try {
      setPhoto(await preparePhoto(file))
    } finally {
      setIsPreparingPhoto(false)
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (submittingRef.current) return

    const nextErrors = validateSwimsForm(values)
    if (photo) {
      const photoError = validateSwimPhoto(photo, photoConsent)
      if (photoError) nextErrors.photo = photoError
    }
    setErrors(nextErrors)

    if (hasErrors(nextErrors)) return

    submittingRef.current = true
    setIsSubmitting(true)
    setStatus('idle')
    setMessage(null)

    const body = new FormData()
    body.set('memberName', values.memberName.trim())
    body.set('river', values.river)
    body.set('date', values.date)
    body.set('tripName', values.tripName.trim())
    body.set('email', values.email.trim())
    body.set('honeypot', values.honeypot ?? '')
    if (photo) {
      body.set('photo', photo)
      body.set('photoConsent', String(photoConsent))
    }

    try {
      // No Content-Type header: the browser sets the multipart boundary
      const response = await fetch('/api/swims/submit', {
        method: 'POST',
        body,
      })

      if (response.status === 201) {
        setValues(emptySwimsForm)
        setErrors({})
        clearPhoto()
        setStatus('success')
        setMessage('Thanks, your swim has been logged.')
        return
      }

      const result = await response.json().catch(() => null)

      if (response.status === 400 && result?.fields) {
        setErrors(result.fields as SwimsFormErrors)
        setStatus('error')
        setMessage('Please check the highlighted fields and try again.')
        return
      }

      setStatus('error')
      setMessage(
        response.status === 413
          ? 'That photo is too large. Please choose a smaller one.'
          : (result?.error ?? 'Something went wrong. Please try again.'),
      )
    } catch {
      setStatus('error')
      setMessage('Could not reach the server. Please check your connection.')
    } finally {
      submittingRef.current = false
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="overflow-hidden rounded-md bg-[#26342C] px-6 py-8 md:px-12 md:py-10"
    >
      <h2 className="font-heading mb-8 text-center text-xl font-bold tracking-[0.15em] text-[#EFEFE1] md:text-3xl">
        SWIMS SUBMISSION
      </h2>

      {/* Fields are locked while a submission is in flight, so the request
          can't be duplicated and its response can't overwrite newer edits. */}
      <fieldset disabled={isSubmitting} className="flex min-w-0 flex-col gap-5">
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
      </fieldset>

      {/* Honeypot field for spam protection. Hidden from real users via CSS. */}
      <input
        type="text"
        name="honeypot"
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        className="hidden-hp"
        value={values.honeypot ?? ''}
        onChange={(e) => setField('honeypot')(e.target.value)}
      />

      <div className="mt-8">
        <SwimsCarousel photos={approvedPhotos} />
      </div>

      <fieldset
        disabled={isSubmitting}
        className="mt-8 flex min-w-0 items-center justify-center gap-3"
      >
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
          id="photo"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePhotoChange}
        />
      </fieldset>

      {isPreparingPhoto ? (
        <p className="mt-2 text-center text-[11px] text-[#EFEFE1]/70">
          Preparing photo...
        </p>
      ) : null}

      {photo && !isPreparingPhoto ? (
        <fieldset
          disabled={isSubmitting}
          className="mt-3 flex min-w-0 flex-col items-center gap-3"
        >
          <p className="flex items-center gap-2 text-[11px] text-[#EFEFE1]/70 md:text-xs">
            <span className="max-w-60 truncate">{photo.name}</span>
            <button
              type="button"
              onClick={clearPhoto}
              className="underline hover:text-[#EFEFE1]"
            >
              Remove
            </button>
          </p>
          <label className="flex max-w-sm items-start gap-2 text-left text-[11px] text-[#EFEFE1] md:text-xs">
            <input
              type="checkbox"
              name="photoConsent"
              checked={photoConsent}
              onChange={(event) => {
                setPhotoConsent(event.target.checked)
                setErrors((previous) => ({ ...previous, photo: undefined }))
              }}
              aria-describedby={errors.photo ? 'photo-error' : undefined}
              className="mt-0.5 h-4 w-4 shrink-0 accent-[#98B969]"
            />
            {SWIM_PHOTO_CONSENT_LABEL}
          </label>
        </fieldset>
      ) : null}

      {errors.photo ? (
        <p
          id="photo-error"
          className="mt-2 text-center text-[11px] text-red-200"
        >
          {errors.photo}
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
          disabled={isSubmitting || isPreparingPhoto}
          className="rounded-lg border-1 border-white bg-[#98B969] px-5 py-2 text-sm font-normal tracking-widest text-white transition-opacity hover:opacity-90 disabled:opacity-60 md:text-base"
        >
          {isSubmitting ? 'SENDING...' : 'SUBMIT'}
        </button>
      </div>
    </form>
  )
}
