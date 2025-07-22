import Image from 'next/image'
import Link from 'next/link'

import type { River } from '@/payload-types'

interface RiverCardProps {
  river: River
}

export function RiverCard({ river }: RiverCardProps) {
  return (
    <Link
      href={`/rivers/${river.slug}`}
      className="block border p-2 hover:bg-gray-50"
    >
      <div className="h-48 bg-gray-200">
        {river.featuredImage &&
          typeof river.featuredImage !== 'number' &&
          river.featuredImage.url && (
            <Image
              src={river.featuredImage.url}
              alt={river.name || ''}
              className="h-full w-full object-cover"
              width={300}
              height={200}
            />
          )}
      </div>
      <div className="mt-2">
        <h3 className="font-medium">{river.name}</h3>
        {river.grade && <p className="text-gray-600">Grade: {river.grade}</p>}
        {river.description && (
          <p className="line-clamp-2 text-gray-600">{river.description}</p>
        )}
      </div>
    </Link>
  )
}
