import type { ReactNode } from 'react'
import Image, { type StaticImageData } from 'next/image'

export type MerchItemVariant =
  | 'image-left'
  | 'image-right'
  | 'image-with-caption'

export interface MerchItemCardProps {
  heading: string
  body?: ReactNode
  imageSrc: string | StaticImageData
  imageAlt?: string
  variant: MerchItemVariant
  className?: string
}

export function MerchItemCard({
  heading,
  body,
  imageSrc,
  imageAlt = '',
  variant,
  className,
}: MerchItemCardProps) {
  if (variant === 'image-left') {
    return (
      <div className={`w-full rounded-md p-6 ${className ?? ''}`}>
        <h2 className="mb-3 text-xl font-extrabold tracking-wider text-green-700 uppercase">
          {heading}
        </h2>
        <div className="relative w-full overflow-hidden rounded-md">
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
        className={`flex flex-col gap-6 rounded-md p-6 sm:flex-row sm:items-center ${className ?? ''}`}
      >
        {/* Text side */}
        <div className="flex flex-col gap-2 sm:w-1/3">
          <h2 className="text-xl font-extrabold tracking-wider text-green-700 uppercase">
            {heading}
          </h2>
          {body && <div className="text-sm text-gray-700 italic">{body}</div>}
        </div>
        {/* Image side */}
        <div className="relative w-full overflow-hidden rounded-md sm:w-2/3">
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
    <div className={`w-full rounded-md p-6 ${className ?? ''}`}>
      <h2 className="mb-3 text-center font-extrabold tracking-widest text-white uppercase">
        {heading}
      </h2>
      <div className="relative w-full overflow-hidden rounded-md">
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
