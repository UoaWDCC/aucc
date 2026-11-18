import type { Exec } from '@/payload-types'
import { ExecCard } from './ExecsCard'

interface ExecsGridProps {
  execs: Exec[]
}

export function ExecsGrid({ execs }: ExecsGridProps) {
  if (execs.length === 0) {
    return (
      <p
        data-testid="execs-empty-state"
        className="text-abyss font-body py-16 text-center text-lg italic"
      >
        Our executive team will be listed here soon.
      </p>
    )
  }

  return (
    <div className="grid gap-x-0 gap-y-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
      {execs.map((exec) => (
        <ExecCard key={exec.id} exec={exec} />
      ))}
    </div>
  )
}
