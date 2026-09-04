import type { ReactNode } from 'react'
import Image, { type StaticImageData } from 'next/image'

import { cn } from '@/lib/utils/cn'

export type MerchItemVariant =
  | 'image-left'
  | 'image-right'
  | 'image-with-caption'

export type MerchCalloutLabel = {
  label: string
  id?: string | null
}

export interface MerchItemCardProps {
  heading: string
  body?: ReactNode
  imageSrc: string | StaticImageData
  imageAlt?: string
  variant: MerchItemVariant
  calloutLabels?: MerchCalloutLabel[]
  className?: string
}

export function MerchItemCard({
  heading,
  body,
  imageSrc,
  imageAlt = '',
  variant,
  calloutLabels,
  className,
}: MerchItemCardProps) {
  if (variant === 'image-left') {
    return (
      <div
        className={cn(
          'w-full rounded-2xl border border-black/10 bg-white p-6 shadow-sm',
          className,
        )}
      >
        <h2 className="mb-3 text-xl font-extrabold tracking-wider text-green-700 uppercase">
          {heading}
        </h2>
        <div className="relative w-full overflow-hidden rounded-xl">
          <Image
            src={imageSrc}
            alt={imageAlt || heading}
            width={900}
            height={500}
            className="w-full object-cover"
          />
        </div>
      </div>
    )
  }

  if (variant === 'image-right') {
    return (
      <div
        className={cn(
          'flex w-full flex-col gap-6 rounded-2xl border border-black/10 bg-white p-6 shadow-sm sm:flex-row sm:items-center',
          className,
        )}
      >
        {/* Text side */}
        <div className="flex flex-col gap-2 sm:w-1/3">
          <h2 className="text-xl font-extrabold tracking-wider text-green-700 uppercase">
            {heading}
          </h2>
          {body && <div className="text-sm text-gray-700 italic">{body}</div>}
        </div>
        {/* Image side */}
        <div className="relative w-full overflow-hidden rounded-xl sm:w-2/3">
          <Image
            src={imageSrc}
            alt={imageAlt || heading}
            width={900}
            height={600}
            className="w-full object-cover"
          />
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'w-full rounded-2xl border border-black/10 bg-[#1E2A29] p-6 shadow-sm',
        className,
      )}
    >
      <h2 className="mb-3 text-center font-extrabold tracking-widest text-white uppercase">
        {heading}
      </h2>
      <div className="relative w-full overflow-hidden rounded-xl">
        <Image
          src={imageSrc}
          alt={imageAlt || heading}
          width={900}
          height={600}
          className="w-full object-cover"
        />
        {calloutLabels && calloutLabels.length > 0 && (
          <div className="absolute inset-x-0 bottom-0 flex flex-wrap justify-center gap-2 p-4">
            {calloutLabels.map((callout) => (
              <span
                key={callout.id ?? callout.label}
                className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold tracking-wide text-green-700 uppercase"
              >
                {callout.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
