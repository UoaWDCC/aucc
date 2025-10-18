import Image from 'next/image'

import type { Exec } from '@/payload-types'

interface ExecCardProps {
  exec: Exec
}

export function ExecCard({ exec }: ExecCardProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-abyss mb-4 h-60 w-60 p-3">
        {exec.image && typeof exec.image !== 'number' && exec.image.url && (
          <Image
            src={exec.image.url}
            alt={exec.name || ''}
            className="h-full w-full object-cover"
            width={300}
            height={300}
            style={{ objectFit: 'contain' }}
          />
        )}
      </div>
      <div className="w-60 text-left">
        <h3 className="font-medium">{exec.name}</h3>
        {exec.pronouns && (
          <p className="break-all text-gray-600">({exec.pronouns})</p>
        )}
        {exec.role && <p className="break-all text-gray-600">{exec.role}</p>}
        {exec.email && <p className="break-all text-gray-600">{exec.email}</p>}
      </div>
    </div>
  )
}
