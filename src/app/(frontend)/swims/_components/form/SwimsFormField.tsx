'use client'

import { cn } from '@/lib/utils/cn'

interface SwimsFormFieldProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  max?: string
  error?: string
}

export function SwimsFormField({
  id,
  label,
  value,
  onChange,
  type = 'text',
  max,
  error,
}: SwimsFormFieldProps) {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <label htmlFor={id} className="text-xs text-[#EFEFE1] md:text-sm">
        {label}
      </label>

      <input
        id={id}
        name={id}
        type={type}
        value={value}
        max={max}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          'h-8 w-full rounded-sm border border-[#66989F] bg-[#D9D9D9] px-3 text-sm text-[#26342C] outline-none md:h-9',
          'focus-visible:border-[#98B969]',
          error && 'border-red-400',
        )}
      />

      {error ? (
        <p id={`${id}-error`} className="text-[11px] text-red-200">
          {error}
        </p>
      ) : null}
    </div>
  )
}
