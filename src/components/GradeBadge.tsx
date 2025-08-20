type GradeProps = {
  grade: number
}

export function GradeBadge({ grade }: GradeProps) {
  return (
    <div className="text-algae bg-algae/30 flex h-6 items-center justify-center rounded-2xl px-3 text-sm font-medium">
      Grade {grade}
    </div>
  )
}
