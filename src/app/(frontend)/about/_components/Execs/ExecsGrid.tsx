import type { Exec } from '@/payload-types'
import { ExecCard } from './ExecsCard'

interface ExecsGridProps {
  execs: Exec[]
}

export function ExecsGrid({ execs }: ExecsGridProps) {
  return (
    <div className="grid justify-items-center gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {execs.map((exec) => (
        <ExecCard key={exec.id} exec={exec} />
      ))}
    </div>
  )
}
