import type { Exec } from '@/payload-types'
import { ExecCard } from './ExecsCard'

interface ExecsGridProps {
  execs: Exec[]
}

export function ExecsGrid({ execs }: ExecsGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {execs.map((exec) => (
        <ExecCard key={exec.id} exec={exec} />
      ))}
    </div>
  )
}
