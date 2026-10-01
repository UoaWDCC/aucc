'use client'

import { cn } from '@/lib/utils/cn'

interface SwimsSelectOption {
  value: string
  label: string
}

interface SwimsSelectFieldProps {
  id: string
  label: string
  value: string
  options: SwimsSelectOption[]
  onChange: (value: string) => void
  placeholder?: string
  error?: string
}

export function SwimsSelectField({
  id,
  label,
  value,
  options,
  onChange,
  placeholder = 'Select a river',
  error,
}: SwimsSelectFieldProps) {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <label htmlFor={id} className="text-xs text-[#EFEFE1] md:text-sm">
        {label}
      </label>

      <select
        id={id}
        name={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          'h-8 w-full rounded-sm border border-[#66989F] bg-[#D9D9D9] px-3 text-sm text-[#26342C] outline-none md:h-9',
          'focus-visible:border-[#98B969]',
          error && 'border-red-400',
        )}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error ? (
        <p id={`${id}-error`} className="text-[11px] text-red-200">
          {error}
        </p>
      ) : null}
    </div>
  )
}
