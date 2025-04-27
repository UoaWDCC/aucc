import Image from 'next/image'

import type { Exec } from '@/payload-types'

interface ExecCardProps {
  exec: Exec
}

export function ExecCard({ exec }: ExecCardProps) {
  return (
    <div className="block border p-2">
      <div className="h-48">
        {exec.image && typeof exec.image !== 'number' && exec.image.url && (
          <Image
            src={exec.image.url}
            alt={exec.name || ''}
            className="h-full w-full object-cover"
            width={1}
            height={1}
            style={{ objectFit: 'contain' }}
          />
        )}
      </div>
      <div>
        <h3 className="text-center font-medium">{exec.name}</h3>
        {exec.pronouns && (
          <p className="text-center break-all text-gray-600">
            ({exec.pronouns})
          </p>
        )}
        {exec.role && (
          <p className="text-center break-all text-gray-600">{exec.role}</p>
        )}
        {exec.email && (
          <p className="text-center break-all text-gray-600">{exec.email}</p>
        )}
      </div>
    </div>
  )
}
