import Image from 'next/image'

import type { River } from '@/payload-types'

interface RiverPageProps {
  river: River
}

export function RiverPage({ river }: RiverPageProps) {
  return (
    <div className="p-4">
      <h1 className="text-center text-3xl font-bold">{river.name}</h1>
      <div className="h-150 p-2">
        <div>
          {river.image &&
            typeof river.image !== 'number' &&
            river.image.url && (
              <Image
                src={river.image.url}
                alt={river.name || ''}
                className="h-full w-full object-cover"
                width={200}
                height={150}
              />
            )}
        </div>
        <div className="p-2">
          <div>{river.grade && <p>Grade: {river.grade}</p>}</div>
          <div>{river.description && <p>{river.description}</p>}</div>
        </div>
      </div>
    </div>
  )
}
