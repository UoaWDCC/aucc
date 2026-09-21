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

export function SwimsLogForm() {
  const [values, setValues] = useState<SwimsFormValues>(emptySwimsForm)
  const [errors, setErrors] = useState<SwimsFormErrors>({})
  const [fileName, setFileName] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const setField = (field: keyof SwimsFormValues) => (value: string) => {
    setValues((previous) => ({ ...previous, [field]: value }))
    setErrors((previous) => ({ ...previous, [field]: undefined }))
  }

  const setBooleanField =
    (field: keyof SwimsFormValues) => (value: boolean) => {
      setValues((previous) => ({ ...previous, [field]: value }))
    }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = validateSwimsForm(values)
    setErrors(nextErrors)

    if (hasErrors(nextErrors)) return

    // UI only for this ticket - no submission logic yet
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

      <div className="flex flex-col gap-5">
        <SwimsFormField
          id="name"
          label="Name:"
          value={values.name}
          onChange={setField('name')}
          error={errors.name}
        />
        <SwimsFormField
          id="riverName"
          label="River Name:"
          value={values.riverName}
          onChange={setField('riverName')}
          error={errors.riverName}
        />
        <SwimsFormField
          id="dateSwam"
          label="Date Swam:"
          type="date"
          max={todayAsInputValue()}
          value={values.dateSwam}
          onChange={setField('dateSwam')}
          error={errors.dateSwam}
        />
        <SwimsFormField
          id="trip"
          label="Trip:"
          value={values.trip}
          onChange={setField('trip')}
          error={errors.trip}
        />
      </div>

      <div className="mt-4 flex items-start gap-3">
        <input
          id="submitterApproved"
          name="submitterApproved"
          type="checkbox"
          checked={Boolean(values.submitterApproved)}
          onChange={(e) =>
            setBooleanField('submitterApproved')(e.target.checked)
          }
          className="h-4 w-4"
        />
        <label
          htmlFor="submitterApproved"
          className="text-[11px] text-[#EFEFE1] md:text-sm"
        >
          I consent to this photo being shared publicly on the AUCC website
        </label>
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

      <div className="mt-6 flex justify-center">
        <button
          type="submit"
          className="rounded-lg border-1 border-white bg-[#98B969] px-5 py-2 text-sm font-normal tracking-widest text-white transition-opacity hover:opacity-90 md:text-base"
        >
          SUBMIT
        </button>
      </div>
    </form>
  )
}
