import type { Exec } from '@/payload-types'
import { ExecCard } from './ExecsCard'

interface ExecsGridProps {
  execs: Exec[]
}

export function ExecsGrid({ execs }: ExecsGridProps) {
  return (
    <div className="grid grid-cols-5 gap-4">
      {execs.map((exec) => (
        <ExecCard key={exec.id} exec={exec} />
      ))}
    </div>
  )
}
